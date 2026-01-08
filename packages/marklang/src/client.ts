/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file markdown 渲染器
 */

import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkMarkers from './extensions/remark-markers';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from './extensions/remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import {customRehypePlugin} from './extensions/rehype-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import {remarkExtendedTable, extendedTableHandlers} from 'remark-extended-table';
import {customRemarkPlugin} from './extensions/remark-plugin';
import {findComments, injectPolyfill, isDOMElement, processOptions,
    getDefaultOptions, getAttributesAsObject} from './utils';
import {Options, Directives, DataMap} from './types';

injectPolyfill();
function replaceDirective(el: HTMLElement, {
    directives,
    dataMap
}: {
    directives: Directives;
    dataMap: DataMap;
}) {
    const directiveKeys = Object.keys(directives);
    directiveKeys.forEach(directive => {
        const doms = el.querySelectorAll(`${directive}`);
        doms.forEach(dom => {
            const properties = getAttributesAsObject(dom);
            const newDom = directives[directive]({
                name: directive,
                properties: {
                    ...properties,
                    data: properties.data ? dataMap[properties.data] || properties.data : null
                },
                content: dom.innerHTML
            }, dom) as HTMLElement;
            if (newDom && dom.parentNode) {
                dom.parentNode.replaceChild(newDom, dom);
            }
        });
    });
}

function marklang(options?: Options) {

    processOptions(options);

    // 指令对应的数据映射:
    // 如 :ml-citation{data="data1"}\n\n:::ml-data{name="data1"}\n ${JSON.stringify(data1 JSON)}\n:::\n
    // dataMap = {data1: ${JSON.parse(data1 JSON)}}
    const dataMap: Record<string, unknown> = {};

    const defaultOptions = getDefaultOptions();

    // 指令 handler 存储器
    const directives = {
        ...defaultOptions.directives,
        ...options?.directives
    };

    // mdast 和 hast 节点的 handler 存储器
    const transformers = {
        mdast: {
            ...defaultOptions.transformers?.mdast,
            ...options?.transformers?.mdast
        },
        hast: {
            ...defaultOptions.transformers?.hast,
            ...options?.transformers?.hast
        }
    };

    const instance = unified()
        .use(remarkParse)

        // \n 换行
        .use(remarkBreaks)

        // 数学公式
        .use(remarkMath)
        .use(remarkGfm, {
            singleTilde: !!options?.singleTilde,
            autolink: options?.autolink
        })

        // ==高亮语法==
        .use(remarkMarkers)
        .use(remarkDirective)

        // 自定义插件，修改 mdast 语法树(放在 remarkRehype 之前)
        .use(customRemarkPlugin, {
            transformers,
            dataMap
        })

        // 表格处理
        .use(remarkExtendedTable)
        .use(remarkRehype, {
            allowDangerousHtml: true,
            handlers: extendedTableHandlers
        })
        .use(rehypeKatex, {
            errorColor: 'var(--marklang-math-error-color, #1e1f24)'
        })

        // 代码高亮处理
        .use(rehypeHighlight)

        // 自定义插件，修改 hast 语法树(放在 remarkRehype 之后)
        .use(customRehypePlugin, {
            isDomRender: true,
            directives,
            transformers,
            dataMap
        })
        .use(rehypeStringify);

    return {

        renderToElement(source: string, el: HTMLElement) {
            const file = instance.processSync(source);
            const html = String(file);
            // bca-disable-line
            el.innerHTML = `<div class="marklang">
                    ${html}
                </div>`;
            replaceDirective(el, {
                directives,
                dataMap
            });
        },

        /**
         * 将服务端渲染的产物进行 hydrate
         * @param el
         */
        hydrate(el: HTMLElement) {

            // 查找HTML文档的所有 comment 节点
            const comments = findComments(el);
            comments.forEach(comment => {
                const nodeMatch = comment.textContent?.match(/^\s*ml-data:([\s\S]+)?$/);
                if (nodeMatch && nodeMatch[1]) {
                    try {
                        const tree = JSON.parse(nodeMatch[1]);
                        const el = comment.nextSibling as HTMLElement;

                        // 找到下一个节点，并移除 comment 节点，hydrate 只能执行一次
                        const dom = directives[tree.tagName] ? directives[tree.tagName]({
                            name: tree.tagName,
                            content: tree.children.length ? tree.children[0].value : '',
                            properties: tree.properties
                        }, el) as HTMLElement : null;
                        if (dom && isDOMElement(dom) && el && el.parentElement) {
                            el.parentElement.replaceChild(dom, el);
                        }

                        // 移除 comment 节点
                        comment.parentNode && comment.parentNode.removeChild(comment);
                    }
                    // eslint-disable-next-line
                    catch (e) {}
                }
            });
        }
    };
}

marklang.dataToSource = function (key: string, value: unknown) {
    try {
        const valueStr = JSON.stringify(value);
        return `\n\n:::ml-data{name=${key}}\n\`\`\`json\n${valueStr}\n\`\`\`\n:::\n\n`;
    }
    catch (e) {
        new Error('value is not a valid JSON');
    }
};
marklang.dataToAst = function (markdown: string) {
    const tree = unified()
        .use(remarkParse)
        .parse(markdown);
    return tree;
};

export default marklang;
