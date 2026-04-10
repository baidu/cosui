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
import remarkGfm from './extensions/remark-gfm';
import remarkBreaks from 'remark-breaks';
import {customRehypePlugin} from './extensions/rehype-plugin';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import {remarkExtendedTable, extendedTableHandlers} from 'remark-extended-table';
import {customRemarkPlugin} from './extensions/remark-plugin';
import {findComments, injectPolyfill, isDOMElement, processOptions,
    getDefaultOptions, getAttributesAsObject} from './utils';
import {Options, Directives, DataMap} from './types';

let registeredPlugins = [];
let loadedPluginModules: {[key: string]: any} = {};
let loadingPluginModules: {[key: string]: Promise<void>} = {};
injectPolyfill();

// 从模块中提取插件函数（兼容不同的导出格式）
function extractPluginFunction(mod: any) {
    // 格式1: { default: [Function: rehypeXxx] } - marklang/plugins/* 导出格式
    if (mod.default && typeof mod.default === 'function') {
        return {fn: mod.default, name: mod.default.name || ''};
    }
    // 格式2: { rehypeXxx: [Function] } 或 { remarkXxx: [Function] } - 命名导出
    const keys = Object.keys(mod).filter(k => k !== 'default');
    for (const key of keys) {
        if (typeof mod[key] === 'function') {
            return {fn: mod[key], name: key};
        }
    }
    return null;
}

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

interface Plugin {
    name: string;
    feature: RegExp;
    load: () => Promise<any>;
}
// @ts-ignore
function preloadPlugin(source?: string): Promise<void[]> {
    // @ts-ignore
    const promises: Promise<void>[] = [];
    registeredPlugins.forEach((plugin: Plugin) => {
        if (plugin.feature && plugin.feature.test(source)) {
            // 已加载完成，跳过
            if (loadedPluginModules[plugin.name]) {
                return;
            }
            // 正在加载中，复用已有的 Promise
            if (loadingPluginModules[plugin.name]) {
                promises.push(loadingPluginModules[plugin.name]);
                return;
            }
            // 开始加载
            const loaders = plugin.load();
            if (loaders && loaders.length) {
                const modules: any[] = [];
                const loaderPromises = loaders.map(loader =>
                    loader.then(mod => {
                        modules.push(mod);
                    })
                );
                loadingPluginModules[plugin.name] = Promise.all(loaderPromises).then(() => {
                    // 加载完成后才设置，确保缓存键变化时模块已就绪
                    loadedPluginModules[plugin.name] = modules;
                });
                promises.push(loadingPluginModules[plugin.name]);
            }
        }
    });
    return Promise.all(promises);
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

    // 缓存的 unified 实例
    let cachedInstance: any = null;
    // 记录创建缓存时已加载的插件名称列表
    let cachedPluginKeys: string = '';

    function createUnifinedInstance() {
        const instance = unified().use(remarkParse).use(remarkBreaks);

        // remark 插件
        Object.keys(loadedPluginModules).sort().forEach(name => {
            loadedPluginModules[name].forEach(module => {
                const plugin = extractPluginFunction(module);
                if (plugin && !plugin.name.startsWith('rehype')) {
                    instance.use(plugin.fn);
                }
            });
        });
        instance.use(remarkGfm, {
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
            });
        // rehype 插件
        Object.keys(loadedPluginModules).sort().forEach(name => {
            loadedPluginModules[name].forEach(module => {
                const plugin = extractPluginFunction(module);
                if (plugin && plugin.name.startsWith('rehype')) {
                    instance.use(plugin.fn);
                }
            });
        });

        // 自定义插件，修改 hast 语法树(放在 remarkRehype 之后)
        instance.use(customRehypePlugin, {
            isDomRender: true,
            directives,
            transformers,
            dataMap
        }).use(rehypeStringify);

        return instance;
    }

    function getPluginCacheKey(): string {
        return Object.keys(loadedPluginModules).sort().join(',');
    }

    // 同步获取缓存的实例，如果插件列表变化则重新创建
    function getCachedInstance() {
        const pluginKeys = getPluginCacheKey();
        if (!cachedInstance || cachedPluginKeys !== pluginKeys) {
            cachedInstance = createUnifinedInstance();
            cachedPluginKeys = pluginKeys;
        }
        return cachedInstance;
    }

    async function getUnifiedInstance(source: string) {
        await preloadPlugin(source);
        return getCachedInstance();
    }

    return {
        async getUnifiedInstance(source: string) {
            return getUnifiedInstance(source);
        },
        async renderToElementAsync(source: string, el: HTMLElement) {
            const instance = await getUnifiedInstance(source);
            const file = await instance.process(source);
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

        renderToElement(source: string, el: HTMLElement) {
            // 警告：同步渲染不会等待插件加载，确保已通过 preloadPlugin 预加载
            preloadPlugin(source);
            const instance = getCachedInstance();
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
marklang.registerPlugin = function ({
    name,
    feature,
    load
}: Plugin) {
    registeredPlugins.push({
        name,
        feature,
        load
    });
};
marklang.preloadPlugin = function (source) {
    return preloadPlugin(source);
};
export default marklang;
