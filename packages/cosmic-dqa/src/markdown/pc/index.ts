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
 * @file markdown 组件
 */

import {Component} from 'san';
import Toast from '@cosui/cosmic/toast';
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
import {MarkdownData} from '../interface';
import {copyTextToClipboard} from '../copy';
import {handleNotTyping, findLastElement} from '../typing';
import {ANIMATION_CONFIG, TypingSentenceManager} from '../typing-sentence';
import marklang from 'marklang';

export default class Markdown extends Component<MarkdownData> {

    static trimWhitespace = 'all';
    static template = `
        <div class="cosd-markdown" on-click="handleClick">
            <template s-if="isTypingAllMode && !_isStop">
                <div s-if="!typing.hideMask" class="cosd-markdown-mask" s-ref="mask"></div>
            </template>
            <div
                s-if="isTypingSentenceMode"
                class="cosd-markdown-content marklang cosd-markdown-content-typingall"
            >
                <!--此处为支持 marklang 库的样式，classname = marklang -->
                <div class="marklang" s-ref="sentenceMarkdownRef"></div>
            </div>
            <div
                s-else
                s-ref="markdownRef"
                class="cosd-markdown-content {{isTypingAllMode ? 'cosd-markdown-content-typingall' : ''}}"
            >
                <!--bca-disable-next-line-->
                {{_html | raw}}
            </div>
        </div>
    `;

    static computed = {
        isTypingAllMode(this: Markdown) {
            const typingConfig = this.data.get('typing');
            return typingConfig && typingConfig.mode === 'all';
        },

        isTypingSentenceMode(this: Markdown) {
            const typingConfig = this.data.get('typing');
            return typingConfig && typingConfig.mode === 'sentence';
        }
    };

    // 逐句打印模式下，用于暂时记录 html 节点产物但不渲染上屏，等处理完动画再上屏
    _tempRootOfSentenceMode: HTMLElement | null;

    // 逐句模式打印时，渲染状态管理器
    _typingSentenceManager: TypingSentenceManager | null;
    timer: number | null;
    _renderedDirectiveComponentsMap: object | null;
    _renderingDom: HTMLElement | null;
    modeAllTimer: number | null;

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

    initData() {
        return {
            // 初始 markdown 文本
            content: '',
            normalizeContent: null,
            typing: null,
            config: {},
            autolink: false,
            // 展示的 markdown 文本
            _showContent: '',
            _directiveComponentsMap: {},
            _html: '',
            _marklangIns: null,
            _lastTotalHeight: 0,
            _typingList: [],
            _storeText: '',
            _typingEndText: '',
            _isStop: false,
            _directives: {},
            _prevMediaText: ''
        };
    }
    detached() {
        if (this.timer) {
            cancelAnimationFrame(this.timer);
            this.timer = null;
        }

        this._typingSentenceManager?.clearTimer();
        this._tempRootOfSentenceMode = null;
        this._typingSentenceManager = null;
    }

    destroyComponents() {
        const _directiveComponentsMap = this.data.get('_directiveComponentsMap');
        Object.keys(_directiveComponentsMap).forEach(directive => {
            const components = _directiveComponentsMap[directive];
            components.forEach(component => {
                if (!component) {
                    return;
                }
                if (this._renderedDirectiveComponentsMap && this._renderedDirectiveComponentsMap[directive]) {
                    const _renderComponents = this._renderedDirectiveComponentsMap[directive];
                    if (_renderComponents.find(_renderComponent => _renderComponent === component)) {
                        return;
                    }
                }

                if (!this.data.get('isTypingSentenceMode')) {
                    // 逐句打字模式下，不卸载，因为卸载后没法立刻渲染上去，会导致节点消失
                    component.detach();
                    component.dispose();
                }
            });
        });
        this.data.set('_directiveComponentsMap', {});
    }

    attached() {
        this._tempRootOfSentenceMode = document.createElement('div');
        const sentenceMode = this.data.get('isTypingSentenceMode');

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
    getContent(content: string) {
        const normalizeContent = this.data.get('normalizeContent');
        const source = typeof normalizeContent === 'function' ? normalizeContent(content) : content;
        // 解决加粗语法内部以标点符号结尾的case。&zwnj;是零宽非连接符
        return source.replace(/(\*{2,})(.*?)(\*{2,})/g, '&zwnj;$1$2$3&zwnj;');
    }
    /**
     * 更新content
     * @param content Markdown 文本
     */
    updateContent(content: string) {
        const el = this.ref('markdownRef') as unknown as HTMLElement;
        this.data.set('_showContent', content);
        if (this.data.get('typing')) {
            this.stop();
            this.data.set('_typingList', [content]);
            this.typingContent(el);
        }
        else {
            const marklangIns = this.data.get('_marklangIns');
            content && marklangIns.renderToElement(this.getContent(content), this._renderingDom || el);
        }
    }
    /**
     * 追加 markdown content
     * @param content string
     */
    appendContent(content: string) {
        const el = this.data.get('isTypingSentenceMode')
            ? this._tempRootOfSentenceMode : this.ref('markdownRef');

        if (this.data.get('typing')) {
            this.data.push('_typingList', content);
            this.typingContent(el as unknown as HTMLElement);
        }
        else {
            const oldContent = this.data.get('_showContent');
            const _showContent = oldContent + content;
            this.data.set('_showContent', _showContent);
            const marklangIns = this.data.get('_marklangIns');
            this.destroyComponents();
            _showContent && marklangIns.renderToElement(this.getContent(_showContent), this._renderingDom || el);
        }
    }
    typingContent(el: HTMLElement) {
        const typingConfig = this.data.get('typing');
        if (typingConfig && (typingConfig.mode === 'all' || typingConfig.mode === 'sentence')) {
            // 逐包或者逐句打印
            this.typingAllOrSentence(el);
        }
        else {
            // 逐字打印
            this.typingText(el);
        }
    }
    getBeforeAndAfterText(str: string) {
        // 找到最后一个换行符的位置
        const lastNewlineIndex = str.lastIndexOf('\n');
        if (lastNewlineIndex !== -1) {
            return {
                before: str.slice(0, lastNewlineIndex + 1),
                after: str.slice(lastNewlineIndex + 1)
            };
        }
        return {
            before: str,
            after: ''
        };
    }
    typingAllOrSentence(el: HTMLElement) {
        if (this.modeAllTimer) {
            return;
        }
        const typingList = this.data.get('_typingList');
        const typingConfig = this.data.get('typing');
        const text = typingList[0];
        const marklangIns = this.data.get('_marklangIns');
        const _lastTotalHeight = this.data.get('_lastTotalHeight') || el.getBoundingClientRect().height;
        el.style.height = _lastTotalHeight + 'px';
        let storeText = this.data.get('_storeText');
        if (this.processMediaDirectiveComponents()) {
            storeText = '';
        }

        this.data.set('_typingEndText', this.data.get('_typingEndText') + text);
        // 取出最后一个\n前面的全部text给storeText
        const {before, after} = this.getBeforeAndAfterText(text);
        storeText += before;
        this.data.set('_storeText', storeText);
        this.destroyComponents();

        const sentenceMode = this.data.get('isTypingSentenceMode');
        const content = this.getContent(storeText);

        marklangIns.renderToElement(content, this._renderingDom || el);
        if (sentenceMode) {
            this.removeCursor();
            this._typingSentenceManager?.render(el, () => {
                this.addCursor();
            });
        }
        // 若存在换行符，则判断是否是p标签结尾
        if (before.endsWith('\n')) {
            const dom = this._renderingDom || el;

            const lastEl = dom.firstChild.lastElementChild;
            // p标签结尾，且内容不包含表格语法
            if (lastEl && lastEl.tagName === 'P' && !storeText.includes('|')) {
                storeText = after;
                this.data.set('_storeText', storeText);
                const markdownRef = this.ref('markdownRef');
                const newDom = document.createElement('div');

                sentenceMode ? this._tempRootOfSentenceMode?.appendChild(newDom) : markdownRef.appendChild(newDom);
                this._renderingDom = newDom;

                this.clearDirectiveComponentsMap();
                if (after) {
                    this.removeCursor();
                    const content = this.getContent(storeText);
                    marklangIns.renderToElement(content, this._renderingDom);
                    if (sentenceMode) {
                        this._typingSentenceManager?.render(
                            this._tempRootOfSentenceMode as unknown as HTMLElement,
                            () => {
                                this.addCursor();
                            }
                        );
                    }
                }
            }
            else {
                storeText += after;
                this.data.set('_storeText', storeText);
            }
        }

        if (!sentenceMode) {
            this.addCursor();
        }

        // 强制浏览器重排
        void el.offsetHeight;
        // 动效部分逻辑处理
        if (text) {
            const totalHeight = el.scrollHeight;
            el.style.height = totalHeight + 'px';
            this.data.set('_lastTotalHeight', totalHeight);
            const height = Math.max(totalHeight - _lastTotalHeight, 30);
            const maskDom = this.ref('mask') as unknown as HTMLElement;
            this.fire('typing-start', {height});
            if (maskDom) {
                maskDom.style.animation = 'none';
                maskDom.style.height = '0px';
            }
            setTimeout(() => {
                if (maskDom) {
                    maskDom.style.animation = 'markdownMask 400ms linear 500ms 1 forwards';
                    maskDom.style.height = height + 'px';
                }
            });
        }
        else {
            el.style.height = 'auto';
        }

        let intervalTime = 0;
        const frameInterval = (typingConfig.speed || 320) / (1000 / 60);
        const frameFunction = () => {
            intervalTime++;
            if (intervalTime >= frameInterval) {
                this.modeAllTimer = null;
                this.data.shift('_typingList');
                if (this.data.get('_typingList').length) {
                    this.typingAllOrSentence(el);
                }
                else {
                    this.fire('typing-finished');
                }
            }
            else {
                this.modeAllTimer = requestAnimationFrame(frameFunction);
            }
        };
        this.modeAllTimer = requestAnimationFrame(frameFunction);
    }

    getComponentsByDirective(directive: string) {
        const _directiveComponentsMap = this.data.get('_directiveComponentsMap');
        const directiveComponent = _directiveComponentsMap[directive] || [];
        if (this._renderedDirectiveComponentsMap && this._renderedDirectiveComponentsMap[directive]) {
            return [...this._renderedDirectiveComponentsMap[directive], ...directiveComponent];
        }
        return directiveComponent;
    }

    getDirectives() {
        const _directiveComponentsMap = this.data.get('_directiveComponentsMap');
        const directiveMap = {};
        for (let directive in _directiveComponentsMap) {
            directiveMap[directive] = this.getComponentsByDirective(directive);
        }
        return directiveMap;
    }

    setDirectiveComponents(directive: string, component: any) {
        const _directiveComponentsMap = this.data.get('_directiveComponentsMap');
        const _directiveComponents = _directiveComponentsMap[directive];
        if (!_directiveComponents) {
            _directiveComponentsMap[directive] = [component];
            return;
        }
        _directiveComponents.push(component);
    }

    stopTyping({immediate}: {immediate: boolean}) {
        // 非打字机场景不需要调用 stop 方法
        if (!this.data.get('typing')) {
            // 不要使用 render-finish 事件名，会和现有的业务监听事件重复
            this.fire('render-complete');
            return;
        }
        this.data.set('_isStop', true);
        if (this.timer) {
            cancelAnimationFrame(this.timer);
            this.timer = null;
        }
        if (this.modeAllTimer) {
            cancelAnimationFrame(this.modeAllTimer);
            this.modeAllTimer = null;
        }

        const sentenceMode = this.data.get('isTypingSentenceMode');

        const el = sentenceMode
            ? this.ref('sentenceMarkdownRef') as unknown as HTMLElement
            : this.ref('markdownRef') as unknown as HTMLElement;
        const marklangIns = this.data.get('_marklangIns');
        const storeText = this.data.get('_typingEndText');

        if (!this.isMediaDirectiveComponents()) {
            this.destroyComponents();

            const content = this.getContent(storeText);

            if (sentenceMode) {
                marklangIns.renderToElement(content, this._tempRootOfSentenceMode!);
                if (immediate) {
                    this._typingSentenceManager?.stop(this._tempRootOfSentenceMode!);
                }
                else {
                    const tempNode = this._tempRootOfSentenceMode!;
                    marklangIns.renderToElement(content, tempNode);
                    this._typingSentenceManager?.finishRender(tempNode, () => {
                        // 不要使用 render-finish 事件名，会和现有的业务监听事件重复
                        this.fire('render-complete');
                    });
                }
            }
            else {
                marklangIns.renderToElement(content, el);
                // 不要使用 render-finish 事件名，会和现有的业务监听事件重复
                this.fire('render-complete');
            }
        }
        el.style.height = 'auto';
        this.removeCursor();
    }

    finish() {
        return this.stopTyping({immediate: false});
    }

    /**
     * 终止内容输出
     * @param immediate 是否立刻停止所有打印动画
     */
    stop() {
        return this.stopTyping({immediate: true});
    }
    addCursor() {
        const typingConfig = this.data.get('typing') || {};
        const sentenceMode = this.data.get('isTypingSentenceMode');

        const el = sentenceMode
            ? this.ref('sentenceMarkdownRef') as unknown as HTMLElement
            : this.ref('markdownRef') as unknown as HTMLElement;

        const showCursor = !this.data.get('_isStop') && typingConfig.cursor;
        if (!showCursor) {
            return;
        }
        const cursorClassName = typingConfig.mode === 'all' || sentenceMode
            ? 'cosd-markdown-loading' : 'cosd-markdown-cursor';
        const cursorSelectorClassName = `.${cursorClassName}`;
        const renderedCursorDom = el.querySelector(cursorSelectorClassName);
        // 若存在已渲染的 cursorDom 则先删除
        renderedCursorDom && renderedCursorDom?.parentNode?.removeChild(renderedCursorDom);
        const cursorDom = document.createElement('span');
        cursorDom.className = cursorClassName;
        const lastChild = findLastElement(el);
        lastChild && lastChild.appendChild(cursorDom);
    }
    removeCursor() {
        const typingConfig = this.data.get('typing') || {};

        const sentenceMode = this.data.get('isTypingSentenceMode');

        const el = sentenceMode ? this.ref('sentenceMarkdownRef') : this.ref('markdownRef');

        const cursorClassName = typingConfig.mode === 'all' || sentenceMode
            ? 'cosd-markdown-loading' : 'cosd-markdown-cursor';

        const cursorSelectorClassName = `.${cursorClassName}`;
        const renderedCursorDom = (el as unknown as HTMLElement).querySelector(cursorSelectorClassName);
        // 若存在已渲染的 cursorDom 则先删除
        renderedCursorDom && renderedCursorDom?.parentNode?.removeChild(renderedCursorDom);
    }

    typingText(el: HTMLElement) {
        if (this.timer) {
            return;
        }

        const typingList = this.data.get('_typingList');
        let text = typingList[0];
        let textIndex = 0;
        const marklangIns = this.data.get('_marklangIns');
        const speed = this.data.get('typing').speed || 30;
        let lastTime = 0;

        let type = (time: number) => {
            if (lastTime === 0) {
                lastTime = time;
            }
            const delta = time - lastTime;

            if (delta >= speed) {
                lastTime = time;
                let storeText = this.data.get('_typingEndText');
                if (this.processMediaDirectiveComponents()) {
                    storeText = '';
                }
                if (textIndex < text.length) {
                    storeText += text.charAt(textIndex);
                    textIndex++;
                    const {str, length} = handleNotTyping(text, storeText, textIndex);
                    storeText += str;
                    textIndex += length;
                    this.data.set('_typingEndText', storeText);
                    this.destroyComponents();
                    marklangIns.renderToElement(this.getContent(storeText), this._renderingDom || el);
                    this.addCursor();
                    this.timer = requestAnimationFrame(type);
                }
                else {
                    cancelAnimationFrame(this.timer as number);
                    this.timer = null;
                    // @ts-ignore
                    type = null;
                    this.data.shift('_typingList');

                    if (this.data.get('_typingList').length) {
                        this.typingText(el);
                    }
                    else {
                        this.fire('typing-finished');
                    }
                }
            }
            else {
                this.timer = requestAnimationFrame(type);
            }
        };
        this.fire('typing-start', {height: 0});
        this.timer = requestAnimationFrame(type);
    }

    // 判断是否是音频指令
    isMediaDirectiveComponents() {
        const audioRegex = /::ml-audio{[^}]*}/;
        const storeText = this.data.get('_typingEndText');
        const prevMediaText = this.data.get('_prevMediaText');
        const typing = this.data.get('typing');

        // 打字机模式下去掉上一个音频指令文本，只保留当前文本。避免每次判断存在音频时重新创建 DOM 渲染内容，导致每一包都在独立 DOM 中渲染
        const text = typing ? storeText.replace(prevMediaText, '') : storeText;

        const res = audioRegex.test(text) || audioRegex.test(this.getContent(text));

        if (res) {
            this.data.set('_prevMediaText', storeText);
        }

        return res;
    }

    // 遇到音视频指令时，分段渲染
    processMediaDirectiveComponents() {
        const isMediaDirectiveComponent = this.isMediaDirectiveComponents();
        if (!isMediaDirectiveComponent) {
            return isMediaDirectiveComponent;
        }

        // 新建渲染节点，从音视频指令后用新渲染节点渲染
        const newDom = document.createElement('div');
        newDom.className = 'marklang';

        const sentenceMode = this.data.get('isTypingSentenceMode');

        if (sentenceMode) {
            this._tempRootOfSentenceMode?.appendChild(newDom);
        }
        else {
            const markdownRef = this.ref('markdownRef') as unknown as HTMLElement;
            markdownRef.appendChild(newDom);
        }
        this._renderingDom = newDom;

        this.clearDirectiveComponentsMap();
        return isMediaDirectiveComponent;
    }

    clearDirectiveComponentsMap() {
        // 存储已经确定不会重新渲染的指令节点
        const _directiveComponentsMap = this.data.get('_directiveComponentsMap');
        if (this._renderedDirectiveComponentsMap) {
            Object.keys(_directiveComponentsMap).forEach(directive => {
                const components = _directiveComponentsMap[directive] || [];
                this._renderedDirectiveComponentsMap[directive] = this._renderedDirectiveComponentsMap[directive]
                    ? [...this._renderedDirectiveComponentsMap[directive], ...components]
                    : components;
            });
        }
        else {
            this._renderedDirectiveComponentsMap = this.data.get('_directiveComponentsMap');
        }

        this.data.set('_directiveComponentsMap', {});
    }

    handleClick(event: Event) {
        this.showImage(event);
        this.handleLink(event);
        this.handleCodeCopy(event);
    }
    handleCodeCopy(event: Event) {
        const target = event.target as HTMLElement;
        if (!target || !target.closest('.cosd-markdown-code-copy')) {
            return;
        }
        event.stopPropagation();
        const preDom = target.closest('pre');
        const codeDom = preDom ? preDom.querySelector('code') : null;
        codeDom && this.copyText(codeDom.innerText, event);
    }

    handleLink(event: Event) {
        const eventTarget = event?.target as HTMLElement;
        if (eventTarget?.closest('a.cosd-markdown-research')) {
            this.fire('click', {
                event,
                directive: 'ml-search'
            });
        }
        else if (eventTarget?.closest('a.marklang-link')) {
            this.fire('click', {
                event,
                from: 'link'
            });
        }
        else if (eventTarget?.closest('a.cosd-site-vcard')) {
            this.fire('click', {
                event,
                directive: 'ml-site-vcard'
            });
        }
    }

    /**
     * 点击图片，展示大图查看器
     */
    showImage(event: Event) {
        const target = event?.target as HTMLElement;
        if (target?.closest('img.marklang-img')) {
            this.fire('click', {
                event,
                from: 'img'
            });
        }
    }

    copyText(text: string, event?: Event) {
        copyTextToClipboard(text).then(() => {
            this.fire('click', {
                action: 'copy',
                event
            });
            Toast.show({
                message: '复制成功',
                size: 'md'
            });
        }).catch(() => {
            this.fire('click', {
                action: 'copy',
                event
            });
            Toast.show({
                message: '复制失败',
                size: 'md'
            });
        });
    }
}