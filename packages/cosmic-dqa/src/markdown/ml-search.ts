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

import {DirectiveInfo, HastNode, MlSearchConfig, MlSearchLinkContext, MlSearchLinkInfo} from './interface';
import san from 'san';

interface SsrShowText {
    /** 完整的回搜展示文本 */
    text: string;

    /** 是否强制作为普通文本处理，避免将标签描述识别成 HTML */
    forceText: boolean;
}

const DEFAULT_SA = 're_dqa_zy';

/**
 * 转义 HTML 文本节点中的特殊字符
 * @param text 待转义的普通文本
 * @returns 可安全插入 HTML 文本节点的字符串
 */
function escapeHtmlText(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * 递归提取 HAST 节点及其子节点的文本内容
 * @param node HAST 节点
 * @returns 节点包含的完整文本
 */
function getNodeText(node: HastNode): string {
    if (typeof node.value === 'string') {
        return node.value;
    }
    return node.children?.map(getNodeText).join('') || '';
}

/**
 * marklang 服务端只会把第一个子节点的 value 赋给 content。
 * 当展示文本包含 `<a>` 这类标签描述时，它会被拆成 raw + text 节点，
 * 需要从 children 恢复完整文本并标记为纯文本，避免与回搜链接的外层 a 标签嵌套。
 * @param node ml-search 指令节点
 * @returns SSR 使用的完整展示文本及其处理方式
 */
function getSsrShowText(node: DirectiveInfo): SsrShowText {
    const children = node.children || [];
    if (children.some(child => child.type === 'raw')) {
        return {
            text: children.map(getNodeText).join(''),
            forceText: true
        };
    }
    return {
        text: node.content || '',
        forceText: false
    };
}

function getLinkInfo(text: string, platform: string, config?: MlSearchConfig) {
    const hostName = platform === 'pc' ? 'https://www.baidu.com' : 'https://m.baidu.com';
    const target = platform === 'pc' ? '_blank' : '_self';
    if (config && typeof config.getLinkInfo === 'function') {
        const linkInfo = config.getLinkInfo(text);
        return {
            target,
            ...linkInfo
        };
    }

    // config也可只配置sa
    const sa = config?.sa || DEFAULT_SA;
    return {
        target,
        href: ''
    };
}

/**
 * 解析 CSR 场景下 ml-search 当前的链接信息。
 * 配置 getLinkInfo 时，将初始查询词和指令 ID 交给业务解析，并补齐默认 target、query 和 clickable；
 * 未配置时，根据平台、查询词和 sa 生成默认的百度搜索链接。
 */
function getCsrLinkInfo(
    text: string,
    platform: string,
    config: MlSearchConfig | undefined,
    context: MlSearchLinkContext
): MlSearchLinkInfo {
    const hostName = platform === 'pc' ? 'https://www.baidu.com' : 'https://m.baidu.com';
    const target = platform === 'pc' ? '_blank' : '_self';
    if (typeof config?.getLinkInfo === 'function') {
        const linkInfo = config.getLinkInfo(text, context) || {};
        return {
            target,
            query: text,
            // 兼容业务只返回 href 的用法：未指定 clickable 时，有 href 即视为可点击；显式 false 则保持不可点击
            clickable: linkInfo.clickable ?? !!linkInfo.href,
            ...linkInfo
        };
    }

    const sa = config?.sa || DEFAULT_SA;
    return {
        target,
        href: `${hostName}/s?word=${encodeURIComponent(text)}&sa=${sa}`,
        query: text,
        clickable: true
    };
}

function containsHtmlTags(str: string) {
    return /<[^>]*>/g.test(str);
}

/**
 * 获取回搜的html
 * @param text 回搜文本 或者 html(文本内有其他语法的情况)
 * @param forceText 是否强制作为普通文本转义，忽略其中类似 HTML 标签的内容
 * @returns 回搜html
 */
function getChildHtml(text: string, forceText = false): string {
    if (!text) {
        return '';
    }
    const ICON_CLASS = 'cos-icon cos-icon-research cosd-markdown-research-icon';
    // 如果文本中包含了html标签，则直接返回
    if (!forceText && containsHtmlTags(text)) {
        return `<span>${text}<i class="${ICON_CLASS}"></i></span>`;
    }
    const characters = Array.from(text);
    const lastWord = characters.pop() || '';
    const beforeWord = characters.join('');
    const wordParts = [
        escapeHtmlText(beforeWord),
        `<span style="white-space: nowrap;">${escapeHtmlText(lastWord)}`
            + `<i class="${ICON_CLASS}"></i></span>`
    ];
    return wordParts.join('');
}
const LINK_CLASS = 'cosd-markdown-research cos-color-text-link cos-space-mr-3xs';

// 不可点击的纯文本形态
const DISABLED_CLASS = 'cosd-markdown-research-disabled';
const DIRECTIVE = 'ml-search';
const MlSearch = san.defineComponent({
    trimWhitespace: 'all',
    template: `<span
        on-click="clickHandler"
        rl-type="stop"
        href="{{href}}"
        target="{{target}}"
        class="{{clickable ? LINK_CLASS : DISABLED_CLASS}}"
    >
        <span s-if="isContainHtml">{{word}}<i s-if="clickable" class="{{ICON_CLASS}}"></i></span>
        <span s-else>{{beforeWord}}<span
            style="white-space: nowrap;">{{lastWord}}<i s-if="clickable" class="{{ICON_CLASS}}"></i></span>
        </span>
    </span>`,

    initData: function () {
        return {
            id: '',
            href: '',
            target: '',
            word: '',
            query: '',
            // 正常 CSR 创建时会由 getCsrLinkInfo 返回的实际点击状态决定
            // - 业务明确传 clickable → 优先使用业务配置
            // - 业务没有传 clickable → 根据 href 推断 → href 为空不可点击；否则可点击
            clickable: false
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
        },
        DISABLED_CLASS() {
            return DISABLED_CLASS;
        }
    },

    setLinkInfo(linkInfo: MlSearchLinkInfo) {
        this.data.set('href', linkInfo.href || '');
        this.data.set('target', linkInfo.target || '');
        this.data.set('query', linkInfo.query || '');
        this.data.set('clickable', !!linkInfo.clickable && !!linkInfo.href);
    },

    refreshLinkInfo(ids?: ReadonlySet<string>) {
        const id = this.data.get('id');
        if (ids && (!id || !ids.has(id))) {
            return;
        }
        const linkInfoResolver = this.linkInfoResolver;
        if (linkInfoResolver) {
            const linkInfo = linkInfoResolver();
            this.setLinkInfo(linkInfo);
        }
    },

    clickHandler(event: Event) {
        if (!this.data.get('clickable')) {
            return;
        }

        const href = this.data.get('href');
        const word = this.data.get('word');
        const target = this.data.get('target');
        const id = this.data.get('id');
        const query = this.data.get('query');
        event.stopPropagation();
        event.preventDefault();
        this.fire('click', {
            event,
            id,
            word,
            query,
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

            // - id: 每条回搜对应的唯一 id
            const id = node.properties?.id as string;
            const config = this.data.get('config')[DIRECTIVE] as MlSearchConfig | undefined;
            const query = searchText || showText;
            const context = {id};
            // 保存重新解析链接信息的能力，refreshLinkInfo 会再次调用该函数读取业务侧的最新状态，
            // 例如渲染完成后的链接激活状态和改写后的查询词。
            const linkInfoResolver = () => getCsrLinkInfo(query, platform, config, context);
            const linkInfo = linkInfoResolver();
            const comp = new MlSearch({
                data: {
                    id,
                    href: linkInfo.href,
                    target: linkInfo.target,
                    word: showText,
                    query: linkInfo.query,
                    clickable: !!linkInfo.clickable && !!linkInfo.href
                }
            });
            comp && (comp.linkInfoResolver = linkInfoResolver);
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
            const {text: showText, forceText} = getSsrShowText(node);
            const wordHtml = getChildHtml(showText, forceText);
            const config = this.data.get('config')[DIRECTIVE];
            const linkInfo = getLinkInfo(searchText || showText, platform, config);
            const url = linkInfo.href;
            return `<a class="${LINK_CLASS}" href="${url}" target="${linkInfo.target}" rl-type="stop">${wordHtml}</a>`;
        }
    };
}
export default getMlSearch;
