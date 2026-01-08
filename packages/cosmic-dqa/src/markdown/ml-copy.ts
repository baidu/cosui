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

import Icon from '@cosui/cosmic/icon';
import {DirectiveInfo} from './interface';

const mlCopy = {
    directive: 'ml-copy',
    csr: function (node: DirectiveInfo) {
        const text = node.content || node.properties?.text as string;
        let span = document.createElement('span');
        // bca-disable-line
        span.innerHTML = node.content || '';
        let iconWrap = document.createElement('span');
        iconWrap.setAttribute('rl-type', 'stop');
        iconWrap.className = 'cosd-markdown-icon-wrapper';
        const iconDom = new Icon({
            data: {
                name: 'copy'
            }
        });
        iconDom.attach(iconWrap);
        span.append(iconWrap);
        iconWrap.addEventListener('click', (event: Event) => {
            text && this.copyText(text, event);
        });
        this.setDirectiveComponents(mlCopy.directive, null);
        return span;
    },
    ssr: (node: DirectiveInfo) => {
        // eslint-disable-next-line max-len
        return `<span rl-type="stop">${node.content}<span class="cosd-markdown-icon-wrapper"><i class="cos-icon cos-icon-copy"></i></span></span>`;
    }
};
export default mlCopy;
