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

export function getLanguage(node: HastNode) {
    const list = node.properties?.className;

    if (!Array.isArray(list)) {
        return 'text';
    }

    return list
        .filter(item => item.startsWith('language-'))
        .map(item => item.substring(9))[0] || '';
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
            /**
             * 代码块增加头部：语言+复制按钮
             */
            pre: ({
                node
            }: { node: HastNode }) => {
                if (!node.children || !node.children.length) {
                    return node;
                }
                const codeIndex = node.children.findIndex(preItem =>
                    preItem.type === 'element' && preItem.tagName === 'code'
                );

                if (codeIndex === -1) {
                    return node;
                }

                const codeNode = node.children[codeIndex];
                const lang = getLanguage(codeNode);
                const lineNumberClassName = 'code-number';
                const codeLeftClassName = 'code-left';
                const codeRightClassName = 'code-right';
                const codeWrapperClassName = 'code-wrapper';
                const codeHeaderClassName = 'code-header';
                const copyButtonClassName = ['cosd-markdown-code-copy', 'cos-link'];

                // 创建左侧行号节点
                const leftNode: HastNode = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [codeLeftClassName]
                    },
                    children: []
                };

                // 创建右侧代码节点
                const rightNode: HastNode = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [codeRightClassName]
                    },
                    children: [codeNode]
                };

                // 添加行号
                let index = 1;
                codeNode.children?.forEach(item => {
                    const lineNumber = getLineNumbers(item);
                    for (let i = 0; i < lineNumber; i++) {
                        const lineNumberNode: HastNode = {
                            type: 'element',
                            properties: {
                                'data-line-number': index++,
                                className: [lineNumberClassName]
                            },
                            tagName: 'div',
                            children: []
                        };
                        leftNode.children.push(lineNumberNode);
                    };
                });

                // 包装代码节点
                node.children[codeIndex] = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [codeWrapperClassName]
                    },
                    children: [leftNode, rightNode]
                };

                // 创建头部包含语言标签和复制按钮
                const createHeaderButton = (text: string, className?: string[]) => ({
                    type: 'element',
                    tagName: 'span',
                    properties: {
                        className,
                        'rl-type': 'stop'
                    },
                    children: [{
                        type: 'text',
                        value: text
                    }]
                });

                const headerNode: HastNode = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: [codeHeaderClassName]
                    },
                    children: [
                        createHeaderButton(lang),
                        createHeaderButton('Copy Code', copyButtonClassName)
                    ]
                };

                node.children.unshift(headerNode);
                return node;
            }
        }
    };
}
