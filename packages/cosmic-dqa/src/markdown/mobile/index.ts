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
 * @file markdown mobile 组件，在继承 markdown pc 的基础上做了单端特有的处理
 */

import PcMarkdown from '../pc';
import mlCopy from '../ml-copy';
import mlTts from '../ml-tts';
import mlAudio from '../ml-audio';
import mlRelationship from '../ml-relationship';
import mlCitation from '../ml-citation';
import mlCitationText from '../ml-citation-text';
import mlTagLink from '../ml-tag-link';
import mlPoi from '../ml-poi';
import mlShopAddress from '../ml-shop-address';
import mlSearch from './ml-search';
import mlSiteVcard from '../ml-site-vcard';
import mlSearchMore from './ml-search-more';
import mlIntent from '../ml-intent';
import {getTransformers} from '../transformers';
import marklang from 'marklang';
import {ANIMATION_CONFIG, TypingSentenceManager} from '../typing-sentence';

export default class Markdown extends PcMarkdown {
    static template = PcMarkdown.template;

    inited() {
        const content = this.data.get('content');
        this.data.set('_showContent', content);
        const isServer = typeof window === 'undefined';
        if (isServer) {
            const html = marklang({
                autolink: this.data.get('autolink'),
                directives: {
                    'ml-poi': mlPoi.ssr,
                    'ml-shop-address': mlShopAddress.ssr,
                    'ml-tts': mlTts.ssr,
                    'ml-copy': mlCopy.ssr,
                    'ml-citation': mlCitation.ssr.bind(this),
                    'ml-relationship': mlRelationship.ssr,
                    'ml-search': mlSearch.ssr.bind(this),
                    'ml-citation-text': mlCitationText.ssr.bind(this),
                    'ml-tag-link': mlTagLink.ssr,
                    'ml-audio': mlAudio.ssr,
                    'ml-site-vcard': mlSiteVcard.ssr,
                    'ml-search-more': mlSearchMore.ssr,
                    'ml-intent': mlIntent.ssr
                },
                transformers: getTransformers.bind(this)()
            }).render(this.getContent(content));
            this.data.set('_html', html);
        }
    }

    async attached() {
        if (marklang.registerPlugin) {
            marklang.registerPlugin({
                name: 'math',
                feature: /\$\$[\s\S]*?\$\$|\$[^$\n]+\$/,
                // eslint-disable-next-line max-len
                load: () => [import('marklang/plugins/remark-math'), import('marklang/plugins/rehype-katex')]
            });
            marklang.registerPlugin({
                name: 'highlight',
                feature: /```(\w*)\n([\s\S]*?)\n```/,
                load: () => [import('marklang/plugins/rehype-highlight')]
            });
        }

        this._tempRootOfSentenceMode = document.createElement('div');
        const sentenceMode = this.data.get('typing')?.mode === 'sentence';

        const el = sentenceMode
            ? this._tempRootOfSentenceMode as unknown as HTMLElement
            : this.ref('markdownRef') as unknown as HTMLElement;

        if (sentenceMode) {
            const typingConfig = this.data.get('typing');
            const duration = typingConfig?.animationDuration && typingConfig?.animationDuration >= 0
                ? typingConfig.animationDuration
                : ANIMATION_CONFIG.DEFAULT_ANIMATION_DURATION;

            document.documentElement.style.setProperty('--sentence-animation-duration', `${duration}ms`);
            this._typingSentenceManager = new TypingSentenceManager(
                this.ref('sentenceMarkdownRef') as unknown as HTMLElement,
                duration
            );
        }

        const content = this.data.get('content');
        this.data.set('_showContent', content);
        const _directives = this.data.get('_directives');
        const directives = Object.keys(_directives).reduce((newDirectives, key) => {
            newDirectives[key] = _directives[key].bind(this);
            return newDirectives;
        }, {});
        const marklangOptions = {
            autolink: this.data.get('autolink'),
            directives: {
                'ml-copy': mlCopy.csr.bind(this),
                'ml-tts': mlTts.csr.bind(this),
                'ml-relationship': mlRelationship.csr.bind(this),
                'ml-search': mlSearch.csr.bind(this),
                'ml-poi': mlPoi.csr.bind(this),
                'ml-shop-address': mlShopAddress.csr.bind(this),
                'ml-citation': mlCitation.csr.bind(this),
                'ml-citation-text': mlCitationText.csr.bind(this),
                'ml-tag-link': mlTagLink.csr.bind(this),
                'ml-audio': mlAudio.csr.bind(this),
                'ml-site-vcard': mlSiteVcard.csr.bind(this),
                'ml-search-more': mlSearchMore.csr.bind(this),
                'ml-intent': mlIntent.csr.bind(this),
                ...directives
            },
            transformers: getTransformers.bind(this)()
        };
        this.watch('table.fullscreen', async (newVal: string) => {
            newVal && this.setFullscreenIcon();
        });
        this.watch('code.fullscreen', async (newVal: string) => {
            newVal && this.setFullscreenIcon();
        });
        this.watch('table.download', async (newVal: string) => {
            newVal && this.setDownloadIcon();
        });
        // bug: PC 端 SSR 取不到 html 的值，所以暂时按照 querySelector 的方式判断
        // const html = this.data.get('html');
        const html = el.querySelector('.marklang');
        const marklangIns = marklang(marklangOptions);
        this.data.set('_marklangIns', marklangIns);
        // 由于结果页服务端渲染后会把\n替换为空格，所以代码块的逻辑需要重新渲染
        const hasPreCode = html?.querySelector('pre');
        if (!html || hasPreCode) {
            if (this.data.get('typing')) {
                this.data.push('_typingList', content);
                this.typingContent(el);
            }
            else {
                content && marklangIns.renderToElementAsync
                    ? await marklangIns.renderToElementAsync(this.getContent(content), el)
                    : marklangIns.renderToElement(this.getContent(content), el);
                this.reconcileCollapsibleCode(el);
                this.fire('render-complete');
            }
        }
        else {
            marklangIns.hydrate(el);
            this.reconcileCollapsibleCode(el);
        }
        this.watch('content', (newVal: string) => {
            this.updateContent(newVal);
        });
    }
    setFullscreenIcon() {
        if (!this.el) {
            return;
        }
        // table 与 code 共用本方法，但分别由 table.fullscreen / code.fullscreen 两个 watch 触发。
        const tableFullscreen = this.data.get('table')?.fullscreen;
        const codeFullscreen = this.data.get('code')?.fullscreen;
        if (tableFullscreen) {
            const tableWrapperList = this.el.querySelectorAll('.cosd-markdown-table');
            tableWrapperList.forEach(tableWrapper => {
                const rightBox = tableWrapper.querySelector('.cosd-markdown-table-header-right');
                if (!rightBox || rightBox?.querySelector('.cos-icon-full-screen')) {
                    return;
                }
                const i = document.createElement('i');
                i.classList.add('cos-icon', 'cos-icon-full-screen');
                rightBox.appendChild(i);
            });
        }
        if (codeFullscreen) {
            const codeBlockList = this.el.querySelectorAll('pre .code-header');
            codeBlockList.forEach(codeHeader => {
                // 原文/译文引用块（cosd-markdown-code-quote）由 语法 显式声明 fullscreen=false，
                // 全局 code.fullscreen=true 不应覆盖它——否则引用块会误挂全屏按钮。语法 优先级更高。
                if (codeHeader.closest('pre')?.classList.contains('cosd-markdown-code-quote')) {
                    return;
                }
                const headerRight = codeHeader.querySelector('.code-header-right');
                if (!headerRight || headerRight?.querySelector('.cos-icon-full-screen')) {
                    return;
                }
                const fullscreenIcon = document.createElement('i');
                fullscreenIcon.classList.add('cos-icon', 'cos-icon-full-screen');
                headerRight.appendChild(fullscreenIcon);
            });
        }
    }

    setDownloadIcon() {
        if (!this.el) {
            return;
        }

        const tableWrapperList = this.el.querySelectorAll('.cosd-markdown-table');

        tableWrapperList.forEach(tableWrapper => {
            const rightBox = tableWrapper.querySelector('.cosd-markdown-table-header-right');

            if (!rightBox || rightBox?.querySelector('.cos-icon-download')) {
                return;
            }

            const i = document.createElement('i');

            i.classList.add('cos-icon', 'cos-icon-download');
            rightBox.appendChild(i);
        });
    }
}
