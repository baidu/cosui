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

import {DirectiveInfo, Config} from './interface';
import san from 'san';

function getLinkInfo(text: string, platform: string, config: Config) {
    const target = platform === 'pc' ? '_blank' : '_self';
    if (config && typeof config.getLinkInfo === 'function') {
        const linkInfo = config.getLinkInfo(text);
        return {
            target,
            ...linkInfo
        };
    }

    return {
        target,
        href: ''
    };
}

function containsHtmlTags(str: string) {
    return /<[^>]*>/g.test(str);
}

/**
 * 获取回搜的html
 * @param text 回搜文本 或者 html(文本内有其他语法的情况)
 * @returns 回搜html
 */
function getChildHtml(text: string): string {
    if (!text) {
        return '';
    }
    const ICON_CLASS = 'cos-icon cos-icon-research cosd-markdown-research-icon';
    // 如果文本中包含了html标签，则直接返回
    if (containsHtmlTags(text)) {
        return `<span>${text}<i class="${ICON_CLASS}"></i></span>`;
    }
    const beforeWord = text.slice(0, text.length - 1);
    const lastWord = text.slice(-1);
    const wordParts = [
        beforeWord,
        `<span style="white-space: nowrap;">${lastWord}<i class="${ICON_CLASS}"></i></span>`
    ];
    return wordParts.join('');
}
const LINK_CLASS = 'cosd-markdown-research cos-color-text-link cos-space-mr-3xs';
const DIRECTIVE = 'ml-search';
const MlSearch = san.defineComponent({
    template: `<span
        on-click="clickHandler"
        rl-type="stop"
        href="{{href}}"
        target="{{target}}"
        class="{{LINK_CLASS}}"
    >
        <span s-if="isContainHtml">{{word}}<i class="{{ICON_CLASS}}"></i></span>
        <span s-else>{{beforeWord}}<span
            style="white-space: nowrap;">{{lastWord}}<i class="{{ICON_CLASS}}"></i></span>
        </span>
    </span>`,

    initData: function () {
        return {
            href: '',
            target: '',
            word: ''
        };
    },
    computed: {
        isContainHtml() {
            const word = this.data.get('word');
            return containsHtmlTags(word);
        },
        beforeWord() {
            const word = this.data.get('word');
            return word.slice(0, word.length - 1);
        },
        lastWord() {
            const word = this.data.get('word');
            return word.slice(-1);
        },
        ICON_CLASS() {
            return 'cos-icon cos-icon-research cosd-markdown-research-icon';
        },
        LINK_CLASS() {
            return LINK_CLASS;
        }
    },
    clickHandler(event: Event) {
        const href = this.data.get('href');
        const word = this.data.get('word');
        const target = this.data.get('target');
        event.stopPropagation();
        event.preventDefault();
        this.fire('click', {
            event,
            word,
            href
        });
        href && window.open(href, target);
    }
});
function getMlSearch(platform: string) {
    return {
        csr: function (node: DirectiveInfo, dom: HTMLElement) {
            if (dom.tagName !== 'ML-SEARCH') {
                return dom;
            }

            const el = document.createElement('span');
            //  - text: 回搜词，和实际显示的文字不同。如链接文本是“百度”，但点击后搜索词是“百度百科”
            const searchText = node.properties?.text as string;
            const showText = node.content || '';
            const config = this.data.get('config')[DIRECTIVE];
            const linkInfo = getLinkInfo(searchText || showText, platform, config);
            const comp = new MlSearch({
                data: {
                    href: linkInfo.href,
                    target: linkInfo.target,
                    word: showText
                }
            });
            comp && comp.on('click', (params: any) => {
                this.fire('click', {
                    directive: DIRECTIVE,
                    ...params
                });
            });
            comp && comp.attach(el);
            this.setDirectiveComponents(DIRECTIVE, comp);
            return el;
        },
        ssr: function (node: DirectiveInfo) {
            const searchText = node.properties?.text as string;
            const showText = node.content || '';
            const wordHtml = getChildHtml(showText);
            const config = this.data.get('config')[DIRECTIVE];
            const linkInfo = getLinkInfo(searchText || showText, platform, config);
            const url = linkInfo.href;
            return `<a class="${LINK_CLASS}" href="${url}" target="${linkInfo.target}" rl-type="stop">${wordHtml}</a>`;
        }
    };
}
export default getMlSearch;
