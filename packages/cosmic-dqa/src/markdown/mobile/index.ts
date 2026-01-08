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
                    'ml-search-more': mlSearchMore.ssr
                },
                transformers: getTransformers()
            }).render(this.getContent(content));
            this.data.set('_html', html);
        }
    }

    attached() {
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
                ...directives
            },
            transformers: getTransformers()
        };
        // bug: PC 端 SSR 取不到 html 的值，所以暂时按照 querySelector 的方式判断
        // const html = this.data.get('html');
        const html = el.querySelector('.marklang');
        const marklangIns = marklang(marklangOptions);
        this.data.set('_marklangIns', marklangIns);
        // TODO：待san升级后，放开限制
        const hasPreCode = html?.querySelector('pre');
        if (!html || hasPreCode) {
            if (this.data.get('typing')) {
                this.data.push('_typingList', content);
                this.typingContent(el);
            }
            else {
                content && marklangIns.renderToElement(this.getContent(content), el);
            }
        }
        else {
            marklangIns.hydrate(el);
        }
        this.watch('content', (newVal: string) => {
            this.updateContent(newVal);
        });
    }
}
