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
 */

import {MdastNode, HastNode} from './interface';

// 折叠阈值：折叠态锁定的纯内容区（.code-right）高度 448px = 28px 行高 × 16 行，不含 wrapper 的上下 padding。
// 超过才折叠。每次展开步进见 pc/index.ts（448 * 2）。
// 与 pc/index.ts 运行时测高逻辑及 code.less 的 max-height 保持一致。
export const CODE_FOLD_MAX_HEIGHT = 448;

// 原文引用块的 fence 语言标签：策略下发的原文引用以 ```原文/```译文 标注 info string。
// 这类块语义是「引用」而非普通代码
export const QUOTE_LANGS = new Set(['原文', '译文']);

export function getLanguage(node: HastNode) {
    const list = node.properties?.className;

    if (!Array.isArray(list)) {
        return 'text';
    }

    return list
        .filter(item => item.startsWith('language-'))
        .map(item => item.substring(9))[0] || '';
}

/**
 * 解析代码围栏 language 后面的配置项，形如 ```java {lineNumbers=false} 中的 `{lineNumbers=false}`。
 * marklang 会把这段元信息挂到 code 节点的 data.meta 上。
 * 支持 `key=value`（value 为 true/false 时转成布尔值）以及裸 `key`（等价于 key=true）。
 * 注意：优先级低于外侧全局 code 配置，仅在全局未显式设置对应项时生效。
 */
export function parseCodeMeta(meta?: string): Record<string, string | boolean> {
    const result: Record<string, string | boolean> = {};
    if (!meta) {
        return result;
    }
    // 取出 {...} 内的内容，没有花括号时直接解析整串
    const braceMatch = /\{([^}]*)\}/.exec(meta);
    const raw = braceMatch ? braceMatch[1] : meta;
    raw
        .split(/[\s,]+/)
        .filter(Boolean)
        .forEach(pair => {
            const [key, value] = pair.split('=');
            if (!key) {
                return;
            }
            if (value === undefined) {
                result[key] = true;
                return;
            }
            if (value === 'true' || value === 'false') {
                result[key] = value === 'true';
                return;
            }
            result[key] = value;
        });
    return result;
}

function getLineNumbers(node?: HastNode) {
    let lineNumber = 0;
    if (!node) {
        return 0;
    }
    if (node.type === 'text' && node.value && node.value.includes('\n')) {
        lineNumber += node.value.split('\n').length - 1;
    }
    if (node.type === 'element' && node.children) {
        node.children.forEach(childNode => {
            lineNumber += getLineNumbers(childNode);
        });
    }
    return lineNumber;
}

function createTextNode(value: string) {
    return {
        type: 'text',
        value
    } as HastNode;
}

function createElement(
    tagName: string,
    className?: string[],
    children: HastNode[] = [],
    properties: Record<string, unknown> = {}
) {
    return {
        type: 'element',
        tagName,
        properties: {className, ...properties},
        children
    } as HastNode;
}

export function getTransformers() {
    return {
        mdast: {
            link: ({node}: { node: MdastNode }) => {
                if (!node.data) {
                    node.data = {};
                }
                if (!node?.data?.hProperties) {
                    node.data.hProperties = {};
                }
                const properties = node.data?.hProperties as Record<string, unknown>;
                if (node.url) {
                    properties['rl-type'] = 'stop';
                }
                if (properties && ['img', 'agent'].includes(properties.type as string) && properties.src) {
                    properties.style = `--marklang-link-img: url(${properties.src})`;
                }
            }
        },
        hast: {
            table: ({
                node,
                index,
                parent
            }: { node: HastNode, index: number, parent: HastNode }) => {
                // @ts-ignore
                const table = this.data.get('table');
                if (!table || !node.children?.length) {
                    return node;
                }

                const {copy, fullscreen, download} = table;
                const headerIconsNodes: HastNode[] = [];

                if (copy) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-copy'], []));
                }
                if (download) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-download'], []));
                }
                if (fullscreen) {
                    // eslint-disable-next-line max-len
                    headerIconsNodes.push(createElement('i', ['cos-icon cos-icon-full-screen'], []));
                }

                const leftNode = createElement('span', ['cosd-markdown-table-header-left'], [createTextNode('表格')]);
                const rightNode = createElement('span', ['cosd-markdown-table-header-right'], headerIconsNodes);
                const headerNode = createElement('div', ['cosd-markdown-table-header'], [leftNode, rightNode]);
                const newTableNode = createElement('div', ['cosd-markdown-table'], [headerNode, node]);
                if (parent.children) {
                    parent.children[index] = newTableNode;
                }
            },
            /**
             * 代码块增加头部：语言+复制按钮+放大按钮
             */
            pre: ({node}: {node: HastNode}) => {
                if (!node.children?.length) {
                    return node;
                }
                // @ts-ignore
                const globalCode = this.data.get('code') || {};

                const codeIndex = node.children.findIndex(preItem =>
                    preItem.type === 'element' && preItem.tagName === 'code'
                );
                if (codeIndex === -1) {
                    return node;
                }

                const codeNode = node.children[codeIndex];
                const lang = getLanguage(codeNode);

                // 原文/译文块标记为引用
                const isQuote = QUOTE_LANGS.has(lang);

                // 代码围栏 language 后面的配置项（如 ```java {lineNumbers=false}）。
                // 围栏配置优先级更高：围栏显式设置时以围栏为准，否则回退到全局 code 配置，最后取默认值。
                const meta = parseCodeMeta(codeNode.data?.meta);
                const resolveFlag = (key: 'lineNumbers' | 'fullscreen' | 'foldable', defaultValue: boolean) => {
                    if (typeof meta[key] === 'boolean') {
                        return meta[key] as boolean;
                    }
                    if (typeof globalCode[key] === 'boolean') {
                        return globalCode[key] as boolean;
                    }
                    return defaultValue;
                };
                const lineNumbers = resolveFlag('lineNumbers', true);
                const fullscreen = resolveFlag('fullscreen', false);
                const foldable = resolveFlag('foldable', false);

                // 添加行号
                const lineNumberNodes: HastNode[] = [];
                let lineIndex = 1;
                codeNode.children?.forEach(item => {
                    const lineCount = getLineNumbers(item);
                    if (lineNumbers) {
                        for (let i = 0; i < lineCount; i++) {
                            lineNumberNodes.push({
                                type: 'element',
                                properties: {
                                    'data-line-number': lineIndex++,
                                    className: ['code-number']
                                },
                                tagName: 'div',
                                children: []
                            });
                        }
                    }
                });

                // 构建header
                const headerButtons: HastNode[] = [
                    createElement('i', ['cos-icon', 'cos-icon-copy'])
                ];
                if (fullscreen) {
                    headerButtons.push(createElement('i', ['cos-icon', 'cos-icon-full-screen']));
                }

                const headerNode = createElement('div', ['code-header'], [
                    createElement('span', ['code-header-left'], [createTextNode(lang)]),
                    createElement('span', ['code-header-right'], headerButtons)
                ]);

                // 包装代码节点
                const wrapperChildren: HastNode[] = lineNumbers
                    ? [
                        createElement('div', ['code-left'], lineNumberNodes),
                        createElement('div', ['code-right'], [codeNode])
                    ]
                    : [createElement('div', ['code-right'], [codeNode])];
                node.children[codeIndex] = createElement('div', ['code-wrapper'], wrapperChildren);
                node.children.unshift(headerNode);

                // 原文/译文引用块打标记类，供业务层区分「引用」与「代码」日志。
                if (isQuote) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-quote']
                    };
                }

                // 无行号场景（如原文引用纯文本），超长单行自动换行而非横向滚动
                if (!lineNumbers) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-plain']
                    };
                }

                // 折叠逻辑改为运行时按真实高度判定（见 pc/index.ts reconcileCollapsibleCode）：
                // 构建期无法拿到 DOM 高度，纯文本自动换行后的视觉高度更是无法静态估算，
                // 因此这里不再预判折叠，只保留 foldable 标记类，交给运行时测高决定是否折叠+挂按钮。
                if (foldable) {
                    const existingClass = (node.properties?.className as string[]) || [];
                    node.properties = {
                        ...(node.properties || {}),
                        className: [...existingClass, 'cosd-markdown-code-foldable']
                    };
                }

                return node;
            }
        }
    };
}
