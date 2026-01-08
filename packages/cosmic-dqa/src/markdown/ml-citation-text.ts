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

import {DirectiveInfo} from './interface';

const mlCitationText = {
    directive: 'ml-citation-text',
    ssr: function (node: DirectiveInfo) {
        const text = node.content;
        let str = `<span class="cosd-citation-citationId cosd-markdown-citation-text">${text}</span>`;
        return `<span disable-audio>${str}</span>`;
    },
    csr: function (node: DirectiveInfo) {
        const element = document.createElement('span');
        element.setAttribute('disable-audio', 'true');
        const text = node.content;
        const el = document.createElement('span');
        // 复用普通溯源样式
        el.className = 'cosd-citation-citationId cosd-markdown-citation-text';
        el.textContent = text;
        el.addEventListener('click', () => {
            this.fire('click', {
                directive: mlCitationText.directive,
                data: node.properties
            });
        });
        this.setDirectiveComponents('ml-citation-text', null);
        element.appendChild(el);
        return element;
    }
};
export default mlCitationText;
