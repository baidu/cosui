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

const SEARCH_MORE_CLASS = 'cosd-markdown-search-more';
const DIRECTIVE = 'ml-search-more';

const MlSearchMore = san.defineComponent({
    template: `
        <span
            rl-type="stop"
            class="{{_searchMoreClass}}"
            on-click="handleClick"
        >{{text}}</span>
    `,

    initData: function () {
        return {
            _searchMoreClass: SEARCH_MORE_CLASS,
            text: '',
            searchText: '',
            url: ''
        };
    },
    handleClick(event: Event) {
        const {text = '', searchText = '', url = ''} = this.data.get('');
        this.fire('click', {
            event,
            text,
            searchText,
            url
        });
    }
});

const mlSearchMore = {
    directive: DIRECTIVE,
    csr: function (node: DirectiveInfo) {
        const el = document.createElement('span');
        const searchText = node.properties?.text as string;
        const url = node.properties?.url as string;
        const text = node.content || '';
        const comp = new MlSearchMore({
            data: {
                text,
                searchText,
                url
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
        return `<span class="${SEARCH_MORE_CLASS}">${text}</span>`;
    }
};

export default mlSearchMore;
