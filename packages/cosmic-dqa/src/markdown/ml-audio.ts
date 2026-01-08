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
import {DirectiveInfo} from './interface';

function getProps(node: DirectiveInfo) {
    // @ts-ignore
    const {src, title, poster} = node.properties || {};
    return {src, title, poster: poster || null};
}

const mlAudio = {
    directive: 'ml-audio',
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        // tts 不播报
        el.setAttribute('disable-audio', '');
        // 互动复制时不复制这个文本
        el.setAttribute('disable-copy', '');
        el.className = 'cosd-markdown-audio-wrapper';

        const {src, title, poster} = getProps(node);
        const audioComp = new AudioPlayer({
            data: {
                appearance: 'enhance',
                preload: 'metadata',
                title,
                src
            }
        });
        poster && audioComp?.data?.set('poster', poster);

        audioComp?.on('user-activation', (params: any) => {
            this.fire('click', {
                directive: mlAudio.directive,
                target: audioComp,
                ...params
            });
        });


        audioComp?.on('ended', (params: any) => {
            this.fire('click', {
                directive: mlAudio.directive,
                action: 'ended',
                target: audioComp,
                ...params
            });
        });
        audioComp?.attach(el);

        this.fire('show', {
            directive: mlAudio.directive,
            target: audioComp
        });
        // @ts-ignore
        this.setDirectiveComponents(mlAudio.directive, audioComp);
        return el;
    },
    ssr: (node: DirectiveInfo) => {
        const {src, title, poster} = getProps(node.properties);
        const audioComp = new AudioPlayer({
            appearance: 'enhance',
            preload: 'metadata',
            title,
            src
        });
        poster && audioComp?.data?.set('poster', poster);

        return `<span class="cosd-markdown-audio-wrapper" disable-audio disable-copy>${audioComp}</span>`;
    }
};
export default mlAudio;