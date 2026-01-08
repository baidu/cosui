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

import AudioPlayer from '@cosui/cosmic/audio-player';
// import DqaPoi from '@cosui/cosmic-dqa/poi';
import {DirectiveInfo} from './interface';

function getSrc(node: DirectiveInfo) {
    let data = node.properties || {};
    if (node.properties?.data && typeof node.properties?.data === 'object') {
        data = node.properties?.data || {};
    }
    return data.src;
}

const mlTts = {
    directive: 'ml-tts',
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        el.innerText = node.content || '';
        const iconEl = document.createElement('span');
        iconEl.className = 'cosd-markdown-icon-wrapper';
        iconEl.setAttribute('rl-type', 'stop');
        const src = getSrc(node);
        const audioComp = new AudioPlayer({
            data: {
                src
            }
        });
        audioComp?.on('user-activation', (params: any) => {
            this.fire('click', {
                directive: mlTts.directive,
                ...params
            });
        });
        audioComp.attach(iconEl);
        el.append(iconEl);
        // @ts-ignore
        this.setDirectiveComponents(mlTts.directive, audioComp);
        return el;
    },
    ssr: (node: DirectiveInfo) => {
        // @ts-ignore
        // eslint-disable-next-line @babel/new-cap
        const audioHtml = AudioPlayer({
            src: getSrc(node)
        });
        // eslint-disable-next-line max-len
        return `<span>${node.content}<span rl-type="stop" class="cosd-markdown-icon-wrapper">${audioHtml}</span></span>`;
    }
};
export default mlTts;
