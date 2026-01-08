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

import type {Element as HastElement} from 'hast';
import {CAN_ADD_ATTRS_ELE} from './constants';
import {Element as HElement} from 'hast';
import {Directives as DirectivesNode} from 'mdast-util-directive';
import {Options, HastTransformerParam, MdastTransformerParam} from './types';

/**
 * 是否是驼峰字符串
 */
export function isCamelCaseWithCapital(str: string) {
    // 正则表达式匹配小驼峰命名和大驼峰命名
    const camelCaseRegExp = /^[a-z][A-Za-z]*$/;
    // 正则表达式匹配至少一个大写字母
    const capitalLetterRegExp = /[A-Z]/;
    return camelCaseRegExp.test(str) && capitalLetterRegExp.test(str);
}

/**
 * 将驼峰命名转换为短横线命名
 * 例如：
 * - 'camelCase' -> 'camel-case'
 * - 'HTMLElement' -> 'h-t-m-l-element'
 * - 'userId' -> 'user-id'
 * @param str 驼峰命名的字符串
 * @returns 短横线命名的字符串
 */
export function camelToDash(str: string): string {
    if (!str) {
        return str;
    }

    return str
        // 先处理第一个大写字母
        .replace(/^[A-Z]/, match => match.toLowerCase())
        // 处理剩余的大写字母，在每个大写字母前添加短横线
        .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

/**
 * -连接字符串转为驼峰
 * @param str -连接字符串
 * @returns 驼峰字符串
 */
export function dashToCamel(str: string) {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
}

export function getAttributesAsObject(element: Element) {
    const attributes = element.attributes;
    const attributeObj: Record<string, string> = {};

    for (const attribute of attributes) {
        if (attribute.name) {
            const attrName = dashToCamel(attribute.name);
            attributeObj[attrName] = attribute.value;
        }
    }

    return attributeObj;
}

export function canAddAttrs(type: string) {
    return CAN_ADD_ATTRS_ELE.includes(type);
}

export function parseAttrs(source: string) {
    const attrs: Record<string, string> = {};
    let match = null;
    const regex = /(\w+)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^}\s]+))/g;

    // 循环匹配所有的键值对
    while ((match = regex.exec(source)) !== null) {

        // 将匹配到的键值对存储在params对象中
        attrs[match[1]] = match[2] || match[3] || match[4];
    }

    return attrs;
}


export function findComments(node: ChildNode): ChildNode[] {
    let comments = [];

    if (node.nodeType === Node.COMMENT_NODE) {
        comments.push(node);
    }

    let child: ChildNode | null = node.firstChild;

    while (child) {
        comments = comments.concat(findComments(child));
        child = child.nextSibling;
    }

    return comments;
}

export function injectPolyfill() {
    if (!Object.prototype.hasOwnProperty.call(Object, 'hasOwn')) {
        Object.defineProperty(Object, 'hasOwn', {
            value: function hasOwn(object: Record<string, unknown>, key: string) {
                return Object.prototype.hasOwnProperty.call(object, key);
            },
            configurable: true,
            enumerable: false,
            writable: true
        });
    }
    if (!String.prototype.matchAll) {
        // @ts-ignore
        // eslint-disable-next-line no-extend-native
        String.prototype.matchAll = function (regexp) {
            const matches = [];
            let match = undefined;
            if (this === null) {
                throw new TypeError("Cannot read property 'matchAll' of null or undefined");
            }
            if (!regexp.global) {
                throw new TypeError("The 'matchAll' method requires a global regular expression");
            }
            // eslint-disable-next-line
            while (match = regexp.exec(this)) {
                matches.push(match);
            }
            return matches;
        };
    }
}

/**
 * Get the programming language of `hast node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {string}
 */
export function getLanguage(node: HastElement) {
    const list = node.properties.className;
    let index = -1;

    if (!Array.isArray(list)) {
        return 'text';
    }

    let name = '';

    while (++index < list.length) {
        const value = String(list[index]);

        if (!name && value.startsWith('lang-')) {
            name = value.slice(5);
        }

        if (!name && value.startsWith('language-')) {
            name = value.slice(9);
        }
    }

    return name;
}

export function isDOMElement(obj: unknown) {
    return obj instanceof HTMLElement;
}

export function processOptions(options?: Options) {

    // 内置指令，禁止外部 options 修改
    const buildInDirectives = ['ml-data'];
    buildInDirectives.forEach(directive => {
        if (options?.directives && options?.directives[directive]) {
            delete options.directives[directive];
        }
        if (options?.transformers?.mdast && options?.transformers.mdast[directive]) {
            delete options?.transformers?.mdast[directive];
        }
        if (options?.transformers?.hast && options?.transformers.hast[directive]) {
            delete options?.transformers?.hast[directive];
        }
    });
}


/**
 * 默认配置：内置ml-data指令，内置代码块的dom处理
 */
export function getDefaultOptions(): Options {
    return {
        transformers: {
            mdast: {
                'ml-data': (params: MdastTransformerParam) => {
                    const directiveNode = params.node as DirectivesNode;
                    const name = directiveNode.attributes?.name;
                    if (directiveNode.children?.length && directiveNode.children[0].type === 'code' && name) {
                        const json = directiveNode.children[0].value;
                        if (params.dataMap) {
                            try {
                                params.dataMap[name] = json ? JSON.parse(json) : null;
                            }
                            catch (e) {
                                new Error('json parse error');
                            }
                        }
                    }

                    // 删除当前 ml-data 指令
                    directiveNode.type = 'definition';
                }
            },
            hast: {

                // 代码块部分 dom 结构内置
                pre: ({
                    node
                }: HastTransformerParam) => {
                    const codeIndex = node.children.findIndex(preItem =>
                        preItem.type === 'element' && preItem.tagName === 'code'
                    );
                    const codeNode = node.children[codeIndex] as HElement;
                    const lang = getLanguage(codeNode);
                    const leftNode: HElement = {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            className: ['code-left']
                        },
                        children: []
                    };
                    const rightNode: HElement = {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            className: ['code-right']
                        },
                        children: [codeNode]
                    };
                    let index = 1;
                    codeNode.children.forEach(item => {
                        if (item.type === 'text' && item.value.includes('\n')) {
                            const element: HElement = {
                                type: 'element',
                                properties: {
                                    'data-line-number': index++,
                                    className: ['code-number']
                                },
                                tagName: 'div',
                                children: []
                            };
                            leftNode.children.push(element);
                        }
                    });
                    node.children[codeIndex] = {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            className: ['code-wrapper']
                        },
                        children: [leftNode, rightNode]
                    };

                    // 添加代码块头部
                    const textElement: HElement = {
                        type: 'element',
                        tagName: 'span',
                        properties: {},
                        children: [
                            {
                                type: 'text',
                                value: lang
                            }
                        ]
                    };
                    node.children.unshift({
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            className: ['code-header']
                        },
                        children: [textElement]
                    });
                }
            }
        }
    };
}
