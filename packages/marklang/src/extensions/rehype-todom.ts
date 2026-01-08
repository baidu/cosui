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
 * 编译 markdown 文本为 DOM 节点
 */

import {toDom} from 'hast-util-to-dom';
import {getAttributesAsObject} from '../utils';
import {Directives, DataMap} from '../types';
import type {Nodes} from 'hast';

export default function rehypeToDom(this: any, {
    directives,
    dataMap
}: {
    directives: Directives;
    dataMap: DataMap;
}) {
    /**
     * @type {Compiler}
     */
    function compiler(tree: Nodes) {
        const el = toDom(tree);

        // 创建一个新的<div>元素
        const newEl = document.createElement('div');
        newEl.className = 'marklang';

        // 检查 el 是否存在且是一个 HTMLElement
        if (el instanceof HTMLElement) {
            el.childNodes.forEach(node => {
                newEl.appendChild(node);
            });
        }
        const directiveKeys = Object.keys(directives);
        directiveKeys.forEach(directive => {
            const doms = newEl.querySelectorAll(`${directive}`);
            doms.forEach(dom => {
                const properties = getAttributesAsObject(dom);
                const newDom = directives[directive]({
                    name: directive,
                    properties: {
                        ...getAttributesAsObject(dom),
                        data: properties.data ? dataMap[properties.data] || properties.data : null
                    },
                    content: dom.innerHTML
                }, dom) as HTMLElement;
                if (newDom && dom.parentNode) {
                    dom.parentNode.replaceChild(newDom, dom);
                }
            });
        });
        return newEl;
    }


    this.compiler = compiler;
}
