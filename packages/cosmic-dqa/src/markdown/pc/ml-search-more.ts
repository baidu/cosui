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

import type {DirectiveInfo} from '../interface';
import san from 'san';

const DIRECTIVE = 'ml-search-more';

const MlSearchMore = san.defineComponent({
    template: `
        <span
            rl-type="stop"
            class="{{SEARCH_MORE_CLASS}}"
            on-click="handleClick"
        >{{text}}<i s-if="icon" class="{{ICON_CLASS}}"></i></span>
    `,

    initData: function () {
        return {
            text: '',
            searchText: '',
            icon: ''
        };
    },
    computed: {
        SEARCH_MORE_CLASS() {
            const icon = this.data.get('icon');
            return icon ? `cosd-markdown-search-more-${icon}` : 'cosd-markdown-search-more';
        },
        ICON_CLASS() {
            const BASE_ICON_CLASS = 'cos-icon cosd-markdown-search-more-icon';
            const icon = this.data.get('icon');
            return `${BASE_ICON_CLASS} cos-icon-${icon}`;
        }
    },
    handleClick(event: Event) {
        const {text = '', searchText = ''} = this.data.get('');
        this.fire('click', {
            event,
            text,
            searchText
        });
    }
});

const mlSearchMore = {
    directive: DIRECTIVE,
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        const searchText = node.properties?.text as string;
        const icon = node.properties?.icon as string;
        const text = node.content || '';
        const comp = new MlSearchMore({
            data: {
                text,
                searchText,
                icon
            }
        });

        if (!comp) {
            return el;
        }

        comp.on('click', (data: string) => {
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
        return `<span>${text}</span>`;
    }
};

export default mlSearchMore;
