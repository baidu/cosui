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

import type {DirectiveInfo, MlIntentData} from './interface';
import san from 'san';

const DIRECTIVE = 'ml-intent';

const MlIntent = san.defineComponent({
    /* eslint-disable max-len */
    // 使用 white-space: nowrap 将最后一个字和图标绑在一起，避免markdown换行时图标单独出现在行首
    // 注意：span 标签内不能换行，否则会产生额外空格
    template: `
        <span
            rl-type="stop"
            class="cosd-markdown-intent"
            on-click="handleClick"
        >{{beforeText}}<span style="white-space: nowrap;">{{lastChar}}<i class="cos-icon cos-icon-re-search-ai cosd-markdown-intent-icon"></i></span></span>
    `,
    /* eslint-enable max-len */

    initData: function () {
        return {
            text: '',
            index: NaN,
            intentText: ''
        };
    },

    computed: {
        beforeText() {
            const text = this.data.get('text');
            return text ? text.slice(0, text.length - 1) : '';
        },
        lastChar() {
            const text = this.data.get('text');
            return text ? text.slice(-1) : '';
        }
    },

    handleClick() {
        const {text = '', intentText = ''} = this.data.get();
        const index = this.data.get('index');
        const data: {text: string, intentText: string, index?: number} = {
            text,
            intentText
        };
        if (Number.isFinite(index)) {
            data.index = index;
        }
        this.fire('click', data);
    }
});

const mlIntent = {
    directive: DIRECTIVE,
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        const intentText = node.properties?.text as string;
        const index = Number((node.properties?.index as string) || NaN);
        const text = node.content || '';
        const data: MlIntentData = {text, intentText};
        if (Number.isFinite(index)) {
            data.index = index;
        }
        const comp = new MlIntent({
            data
        });
        if (!comp) {
            return el;
        }
        comp.on('click', (data: MlIntentData) => {
            // @ts-ignore
            this.fire('click', {
                directive: DIRECTIVE,
                data
            });
        });

        comp.attach(el);

        // 注册指令和对应组件实例
        // @ts-ignore
        this.setDirectiveComponents(DIRECTIVE, comp);
        return el;
    },

    ssr: function (node: DirectiveInfo) {
        const text = node.content || '';
        const beforeText = text.slice(0, text.length - 1);
        const lastChar = text.slice(-1);
        // 注意：span 标签内不能换行，否则会产生额外空格
        // eslint-disable-next-line max-len
        return `<span class="cosd-markdown-intent">${beforeText}<span style="white-space: nowrap;">${lastChar}<i class="cos-icon cos-icon-re-search-ai cosd-markdown-intent-icon"></i></span></span>`;
    }
};

export default mlIntent;
