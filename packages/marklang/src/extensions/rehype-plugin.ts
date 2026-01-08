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
 * 修改 hast 语法树
 */

import {visit} from 'unist-util-visit';
import {fromHtml} from 'hast-util-from-html';
import {Transformers, DataMap, Directives} from '../types';
import type {Root, Nodes, RootContent, Element, Text, Comment} from 'hast';
import {camelToDash, isCamelCaseWithCapital} from '../utils';

function parseDirective({
    node,
    index,
    parent,
    directives,
    dataMap
}: {
    node: Element;
    index?: number;
    parent?: Element | Root;
    directives: Directives;
    dataMap: DataMap;
}) {
    if (!directives[node.tagName]) {
        return;
    }

    if (!node.properties) {
        node.properties = {};
    };

    const data = node.properties?.data
        ? dataMap[node.properties.data as string] || node.properties?.data
        : '';

    // 自定义指令处理
    let html = directives[node.tagName]({
        name: node.tagName,
        content: node.children.length ? (node.children[0] as Text).value : '',
        children: node.children,
        properties: {
            ...node.properties,
            data
        }
    });
    if (typeof html !== 'string') {
        throw new Error('调用 render 的自定义指令返回的 html 必须是字符串');
    }

    if (!html) {
        html = '<span></span>';
    }
    const customTree = fromHtml(html, {fragment: true});
    if (customTree.children.length > 1) {
        throw new Error('自定义指令返回的 html 只能有一个根节点');
    }
    if (parent && index !== undefined) {
        parent.children[index] = customTree.children[0] as Element;

        // browser-build-remove-start
        // 添加注释，方便后续 hydrate 解析
        const commentHtml = `ml-data:${JSON.stringify({
            ...node,
            properties: {
                ...node.properties,
                data
            }
        })}`;
        const commentNode: Comment = {
            type: 'comment',
            value: commentHtml
        };
        parent.children.splice(index, 0, commentNode);

        // browser-build-remove-end
    }
}

export function customRehypePlugin({
    isDomRender,
    directives,
    transformers,
    dataMap
}: {
    isDomRender?: boolean;
    directives: Directives;
    transformers: Transformers;
    dataMap: DataMap;
}) {
    return function (tree: Nodes) {
        visit(tree, 'element', function (node: Element, index, parent?: Element | Root) {

            if (isDomRender) {
                if (node.properties._type === 'textDirective') {
                    for (const prop in node.properties) {
                        if (isCamelCaseWithCapital(prop)) {
                            const propName = camelToDash(prop);
                            node.properties[propName] = node.properties[prop];
                            delete node.properties[prop];
                        }
                    }
                }
            }
            else {
                parseDirective({
                    node,
                    index,
                    parent,
                    directives,
                    dataMap
                });
            }

            if (node.tagName === 'a') {
                node.properties.className = node.properties.className || 'marklang-link';
            }
            if (node.tagName === 'p') {
                node.properties.className = node.properties.className || 'marklang-paragraph';
            }
            if (node.tagName === 'img') {
                node.properties.className = node.properties.className || 'marklang-img';
            }

            // 执行 element 对应的语法树 handler
            if (transformers.hast && transformers.hast[node.tagName]) {
                transformers.hast[node.tagName]({
                    node,
                    index,
                    parent,
                    dataMap
                });
            }
        });

        visit(tree, 'raw', function (node: RootContent) {

            // @ts-ignore
            if (/<br\s*\/?>$/.exec(node.value)) {

                // @ts-ignore
                node.tagName = 'br';
                node.type = 'element';
            }
        });
    };
}
