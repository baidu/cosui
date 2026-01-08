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
 * 修改 mdast 语法树
 */

import {visit} from 'unist-util-visit';
import {h} from 'hastscript';
import type {Root, Node, Parent} from 'mdast';
import type {Directives} from 'mdast-util-directive';
import {parseAttrs, canAddAttrs} from '../utils';
import {DataMap, Transformers} from '../types';

/**
 * 添加自定义属性语法 [link](https://x){key1="value1" key2="value2"}
 * @param node 当前节点
 * @param index 当前节点的 index
 * @param parent 父节点
 */
function parseCustomAttributes(node: Node, index: number | undefined, parent: Parent) {
    if (canAddAttrs(node.type) && index !== undefined && index >= 0) {
        const nextNode = parent.children[index + 1];
        let end = 0;
        if (nextNode && nextNode.type === 'text' && nextNode.value.startsWith('{')
            && (end = nextNode.value.indexOf('}')) > 0) {
            const str = nextNode.value.slice(1, end);
            const obj = parseAttrs(str);
            node.data = node.data || {};
            if (!node.data.hProperties) {
                node.data.hProperties = {};
            }
            Object.assign(node.data.hProperties, obj);
            nextNode.value = nextNode.value.slice(end + 1, nextNode.value.length);
        }
    }
}

const directiveTypes = ['containerDirective', 'leafDirective', 'textDirective'];
function isDirectiveNode(node: Node) {
    return directiveTypes.includes(node.type);
}

function customTransfromerPlugin({
    node,
    index,
    parent,
    transformers,
    dataMap
}: {
    node: Node;
    index?: number | undefined;
    parent: Parent;
    transformers: Transformers;
    dataMap: DataMap;
}) {
    const data = node.data || (node.data = {});

    /**
     * directive -> text 的条件
     * 1. 非 -
     * 2. 无 {}
     * 3. 无 []
     * 4. inline directive
     */
    if (node.type === 'textDirective'
        && !node.name.includes('-')
        && !node.children?.length
        && (!node.attributes || !Object.keys(node.attributes).length)
    ) {
        node.type = 'text';
        node.value = ':' + node.name;
    }
    if (isDirectiveNode(node)) {
        const directiveNode = node as Directives;
        if (directiveNode.type === 'textDirective') {
            directiveNode.attributes._type = directiveNode.type;
        }
        const hast = h(directiveNode.name, directiveNode.attributes || {});
        data.hName = hast.tagName;
        data.hProperties = hast.properties;

        // 如果是指令，执行 hast.tagName 对应的语法树 handler
        if (transformers.mdast && transformers.mdast[hast.tagName]) {
            transformers.mdast[hast.tagName]({
                node,
                index,
                parent,
                dataMap
            });
        }
    }
    else {

        // 执行 node.type 对应的语法树 handler
        if (transformers.mdast && transformers.mdast[node.type]) {
            transformers.mdast[node.type]({
                node,
                index,
                parent,
                dataMap
            });
        }
    }
}

export function customRemarkPlugin({
    transformers,
    dataMap
}: {
    transformers: Transformers;
    dataMap: DataMap;
 }) {
    return (tree: Root) => {
        visit(tree, function (node: Node, index, parent: Parent) {

            if (node.type === 'link') {
                if (node.url && /^javascript:/i.test(node.url)) {
                    // 移除不安全链接，防止 xss 攻击
                    node.url = 'javascript:void(0)';
                }
            }

            // 添加自定义属性语法 [link](https://x){key1="value1" key2="value2"}
            parseCustomAttributes(node, index, parent);
            customTransfromerPlugin({
                node,
                index,
                parent,
                transformers,
                dataMap
            });
        });
    };
}
