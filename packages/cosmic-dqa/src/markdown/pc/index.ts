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
import {getTransformers, CODE_FOLD_MAX_HEIGHT} from '../transformers';
import mlIntent from '../ml-intent';
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
    // 记录用户对可折叠代码块的手动展开状态，key 为该块在渲染根下 foldable 列表中的序号。
    // 打字机每包会重建 DOM，reconcile 后据此恢复，避免用户展开后打完字又缩回折叠态。
    _codeFoldState: Array<{expanded: boolean, maxHeight: string}> = [];

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

    initData() {
        return {
            // 初始 markdown 文本
            content: '',
            normalizeContent: null,
            typing: null,
            config: {},
            // table的配置项
            table: null,
            // code的配置项
            code: null,
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

    async attached() {
        if (marklang.registerPlugin) {
            marklang.registerPlugin({
                name: 'math',
                feature: /\$\$[\s\S]*?\$\$|\$[^$\n]+\$/,
                load: () => {
                    // eslint-disable-next-line max-len
                    return [import('marklang/plugins/remark-math'), import('marklang/plugins/rehype-katex')];
                }
            });

            marklang.registerPlugin({
                name: 'highlight',
                feature: /(?<!(?:::ml-data[\s\S]*?))```[\s\S]*?```/,
                load: () => {
                    return [import('marklang/plugins/rehype-highlight')];
                }
            });
        }

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
                'ml-intent': mlIntent.csr.bind(this),
                ...directives
            },
            transformers: getTransformers.bind(this)()
        };
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
    async updateContent(content: string) {
        const el = this.ref('markdownRef') as unknown as HTMLElement;
        this.data.set('_showContent', content);
        // 整篇内容替换：清空折叠状态记录。_codeFoldState 以代码块序号为 key，
        // 换新内容后旧序号语义失效，不清会让新内容的同序号代码块误用上一篇的展开状态。
        // （打字机逐包追加走 appendContent，是同一篇内容增长，不经过这里，状态得以保留）
        this._codeFoldState = [];
        if (this.data.get('typing')) {
            this.stop();
            this.data.set('_typingList', [content]);
            this.typingContent(el);
        }
        else {
            const marklangIns = this.data.get('_marklangIns');
            content && marklangIns.renderToElementAsync
                ? await marklangIns.renderToElementAsync(this.getContent(content), this._renderingDom || el)
                : marklangIns.renderToElement(this.getContent(content), this._renderingDom || el);
            this.reconcileCollapsibleCode(el);
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
            if (_showContent && marklangIns.renderToElementAsync) {
                marklangIns.renderToElementAsync(this.getContent(_showContent), this._renderingDom || el)
                    .then(() => this.reconcileCollapsibleCode(el as unknown as HTMLElement))
                    // 与同文件 updateContent 中 await 场景不同，这里是"发射即忘"的追加渲染，
                    // 不 catch 会产生 unhandled promise rejection；渲染失败时也无从上层恢复，
                    // 静默吞掉以避免污染宿主页面控制台，同时后续 reconcile 会在下一次渲染中自然补齐折叠态。
                    .catch(() => {});
            }
            else {
                marklangIns.renderToElement(this.getContent(_showContent), this._renderingDom || el);
                this.reconcileCollapsibleCode(el as unknown as HTMLElement);
            }
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
    async typingAllOrSentence(el: HTMLElement) {
        // 如果正在打印，返回（等待当前打印完成）
        if (this.modeAllTimer) {
            return;
        }
        // 检查是否停止打印
        if (this.data.get('_isStop')) {
            return;
        }
        // 标记正在打印
        this.modeAllTimer = 1;

        // 开始打印
        const typingList = this.data.get('_typingList');
        if (!typingList || !typingList.length) {
            this.modeAllTimer = null;
            return;
        }
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

        marklangIns.renderToElementAsync
            ? await marklangIns.renderToElementAsync(content, this._renderingDom || el)
            : marklangIns.renderToElement(content, this._renderingDom || el);
        if (sentenceMode) {
            this.removeCursor();
            this._typingSentenceManager?.render(el, () => {
                this.addCursor();
            });
        }
        // 打字过程中每包渲染后即时判定：code 高度一超过阈值（CODE_FOLD_MAX_HEIGHT）就折叠出按钮，不必等全部打完
        this.reconcileCollapsibleCode(el);
        // 若存在换行符，则判断是否是p标签结尾
        if (before.endsWith('\n')) {
            const dom = this._renderingDom || el;

            const firstChild = dom.firstElementChild;
            const lastEl = firstChild?.lastElementChild;
            // p标签结尾，且内容不包含表格语法，不包含溯源数据
            if (lastEl && lastEl.tagName === 'P' && !storeText.includes('|') && !storeText.includes('ml-data')) {
                storeText = after;
                this.data.set('_storeText', storeText);
                const markdownRef = this.ref('markdownRef') as unknown as HTMLElement;
                const newDom = document.createElement('div');

                sentenceMode ? this._tempRootOfSentenceMode?.appendChild(newDom) : markdownRef.appendChild(newDom);
                this._renderingDom = newDom;

                this.clearDirectiveComponentsMap();
                if (after) {
                    this.removeCursor();
                    const content = this.getContent(storeText);
                    marklangIns.renderToElementAsync
                        ? await marklangIns.renderToElementAsync(content, this._renderingDom)
                        : marklangIns.renderToElement(content, this._renderingDom);
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

        // 检查是否已停止
        if (this.data.get('_isStop')) {
            this.data.shift('_typingList');
            return;
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
            this.fire('typing-start', {height: totalHeight - _lastTotalHeight});
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

        // 使用 Promise 等待动画间隔时间
        const delayTime = typingConfig?.speed || 320;
        await new Promise(resolve => {
            setTimeout(resolve, delayTime);
        });

        // 移除当前打印的内容，继续下一个
        this.data.shift('_typingList');
        // 清除打印标记
        this.modeAllTimer = null;

        // 检查是否还有待打印内容
        if (this.data.get('_typingList').length) {
            this.typingAllOrSentence(el);
        }
        else {
            this.reconcileCollapsibleCode(el);
            this.fire('typing-finished');
        }
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

    /**
     * 刷新已渲染的 ml-search 链接状态。
     * 不传 ids 时刷新全部；传入数组时只刷新指定指令，空数组不刷新，非数组入参不处理。
     */
    refreshMlSearchLinks(ids?: string[]) {
        // 非数组入参不处理
        if (ids && !Array.isArray(ids)) {
            return;
        }

        // 区分有无 ids 参数，有则处理为 Set
        const idSet = ids ? new Set(ids) : undefined;
        const components = this.getComponentsByDirective('ml-search');
        components.forEach((component: any) => component?.refreshLinkInfo?.(idSet));
    }

    stopTyping({immediate}: {immediate: boolean}) {
        // 非打字机场景不需要调用 stop 方法
        if (!this.data.get('typing')) {
            // 不要使用 render-finish 事件名，会和现有的业务监听事件重复
            this.fire('render-complete');
            return;
        }
        this.data.set('_isStop', true);
        this.timer = null;
        this.modeAllTimer = null;

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
                        this.reconcileCollapsibleCode(el);
                        // 不要使用 render-finish 事件名，会和现有的业务监听事件重复
                        this.fire('render-complete');
                    });
                }
            }
            else {
                marklangIns.renderToElement(content, el);
                this.reconcileCollapsibleCode(el);
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

    async typingText(el: HTMLElement) {
        if (this.timer) {
            return;
        }

        this.fire('typing-start', {height: 0});
        this.timer = 1;

        const typingList = this.data.get('_typingList');
        let text = typingList[0];
        let textIndex = 0;
        const marklangIns = this.data.get('_marklangIns');
        const speed = this.data.get('typing').speed || 30;
        let storeText = this.data.get('_typingEndText') || '';

        while (!this.data.get('_isStop') && textIndex < text.length) {
            if (this.processMediaDirectiveComponents()) {
                storeText = '';
            }

            storeText += text.charAt(textIndex);
            textIndex++;
            const {str, length} = handleNotTyping(text, storeText, textIndex);
            storeText += str;
            textIndex += length;

            this.data.set('_typingEndText', storeText);
            this.destroyComponents();
            const content = this.getContent(storeText);
            if (marklangIns.renderToElementAsync) {
                await marklangIns.renderToElementAsync(content, this._renderingDom || el);
            }
            else {
                marklangIns.renderToElement(content, this._renderingDom || el);
            }
            this.addCursor();
            // 逐字模式同样每次渲染后即时判定：code 高度超过阈值即折叠出按钮，不必等全部打完
            this.reconcileCollapsibleCode(el);
            await new Promise(resolve => setTimeout(resolve, speed));
        }

        this.timer = null;

        if (!this.data.get('_isStop')) {
            this.data.shift('_typingList');

            if (this.data.get('_typingList').length) {
                this.typingText(el);
            }
            else {
                this.reconcileCollapsibleCode(el);
                this.fire('typing-finished');
            }
        }
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
        this.handleCode(event);
        this.handleTable(event);
    }
    handleTable(event: Event) {
        const target = event.target as HTMLElement;
        if (!target || !target.classList.contains('cos-icon') || !target.closest('.cosd-markdown-table-header')) {
            return;
        }
        const tableParent = target.closest('.cosd-markdown-table');
        const iconClassList = Array.from(target.classList);
        let action = iconClassList.find(item => item.startsWith('cos-icon-'))?.replace('cos-icon-', '') || '';
        if (action === 'full-screen') {
            action = 'fullscreen';
        }
        event.stopPropagation();
        this.fire('click', {
            event,
            data: {
                tableDom: tableParent?.querySelector('table')
            },
            action,
            from: 'table'
        });
    }
    handleCode(event: Event) {
        const target = event.target as HTMLElement;
        const preDom = target?.closest('pre');

        if (!preDom?.querySelector('.code-header')) {
            return;
        }

        // 原文/译文引用块由 transformers 打上 cosd-markdown-code-quote 类，语义为「引用」，
        const isQuote = preDom.classList.contains('cosd-markdown-code-quote');

        // 折叠/展开
        const toggleDom = target?.closest('.cosd-code-fold');
        if (toggleDom) {
            event.stopPropagation();
            const codeRight = preDom.querySelector<HTMLElement>('.code-right');
            const expanded = this.toggleCodeFold(preDom, codeRight);

            const textDom = toggleDom.querySelector('.cosd-code-fold-text');
            if (textDom) {
                textDom.textContent = expanded ? '收起' : '展开';
            }
            const iconDom = toggleDom.querySelector('.cosd-code-fold-icon');
            if (iconDom) {
                iconDom.classList.toggle('cos-icon-down', !expanded);
                iconDom.classList.toggle('cos-icon-up', expanded);
            }

            // 记录用户手动状态，供打字机后续重渲染后恢复，避免打完字缩回折叠态
            this.saveCodeFoldState(preDom, codeRight);

            this.fire('click', {
                event,
                data: {preDom, isQuote},
                action: expanded ? 'unfold' : 'fold',
                from: 'code'
            });
            return;
        }

        if (!target?.classList.contains('cos-icon') || target.classList.contains('cosd-code-fold-icon')) {
            return;
        }

        let action = Array.from(target.classList)
            .find(item => item.startsWith('cos-icon-'))?.replace('cos-icon-', '') || '';
        if (action === 'full-screen') {
            action = 'fullscreen';
        }
        event.stopPropagation();

        if (action === 'copy') {
            const codeDom = preDom?.querySelector('code');
            codeDom && this.copyText(codeDom.innerText, event);
        }
        this.fire('click', {
            event,
            data: {preDom, isQuote},
            action,
            from: 'code'
        });
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
                from: 'img',
                data: {
                    removePreview: true
                }
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

    // 折叠态锁纯内容区（.code-right）高度 CODE_FOLD_MAX_HEIGHT(448px)。每点一次展开 +448*2px，直到露出全部内容变为完全展开。
    // codeRight 为 .code-right 内容区（不含 wrapper 的上下 padding，测量口径与折叠锁高一致）。
    // returns true when block is now fully expanded, false when collapsed/partially expanded
    toggleCodeFold(preDom: Element, codeRight: HTMLElement | null): boolean {
        if (preDom.classList.contains('cosd-markdown-code-expanded')) {
            preDom.classList.remove('cosd-markdown-code-expanded');
            if (codeRight) {
                codeRight.style.maxHeight = '';
            }
            return false;
        }
        if (!codeRight) {
            return false;
        }
        const inlineMax = parseFloat(codeRight.style.maxHeight);
        const computedMax = parseFloat(getComputedStyle(codeRight).maxHeight);
        const currentMax = Number.isFinite(inlineMax)
            ? inlineMax
            : (Number.isFinite(computedMax) ? computedMax : codeRight.clientHeight);
        const next = currentMax + CODE_FOLD_MAX_HEIGHT * 2;
        if (next >= codeRight.scrollHeight) {
            codeRight.style.maxHeight = '';
            preDom.classList.add('cosd-markdown-code-expanded');
            return true;
        }
        codeRight.style.maxHeight = `${next}px`;
        return false;
    }

    /**
     * 记录某个可折叠代码块的用户手动状态，key 为它在渲染根下 foldable 列表中的序号。
     * 打字机每包会重建 DOM，reconcile 后据此恢复，避免用户展开后打完字又缩回折叠态。
     */
    saveCodeFoldState(preDom: Element, codeRight: HTMLElement | null) {
        const root = this.el;
        if (!root) {
            return;
        }
        const list = Array.from(root.querySelectorAll('pre.cosd-markdown-code-foldable'));
        const index = list.indexOf(preDom);
        if (index === -1) {
            return;
        }
        this._codeFoldState[index] = {
            expanded: preDom.classList.contains('cosd-markdown-code-expanded'),
            maxHeight: codeRight?.style.maxHeight || ''
        };
    }

    /** 按记录的状态恢复折叠块的展开态、内联高度与按钮文案/图标 */
    applyFoldSwitchUI(preDom: Element, expanded: boolean) {
        const textDom = preDom.querySelector('.cosd-code-fold-text');
        if (textDom) {
            textDom.textContent = expanded ? '收起' : '展开';
        }
        const iconDom = preDom.querySelector('.cosd-code-fold-icon');
        if (iconDom) {
            iconDom.classList.toggle('cos-icon-down', !expanded);
            iconDom.classList.toggle('cos-icon-up', expanded);
        }
    }

    /**
     * 运行时按真实高度判定折叠：纯内容区 .code-right 实际高度超过 CODE_FOLD_MAX_HEIGHT 才折叠并挂展开按钮。
     * 测量 .code-right（不含 wrapper padding），与折叠锁高口径一致，避免 padding 计入导致临界误判。
     * 纯高度判定，与行数、字号、是否换行无关，从根本上避免行数临界误判。
     * SSR/CSR/打字机每次渲染结束后调用，幂等：已折叠/内容变短都能正确恢复；
     * 并按 _codeFoldState 恢复用户手动展开状态，避免打字机重渲染后缩回折叠态。
     */
    reconcileCollapsibleCode(root: HTMLElement | null) {
        if (!root) {
            return;
        }
        const preList = root.querySelectorAll<HTMLElement>('pre.cosd-markdown-code-foldable');
        preList.forEach((preDom, index) => {
            const codeRight = preDom.querySelector<HTMLElement>('.code-right');
            if (!codeRight) {
                return;
            }
            // 临界值上再大一点容差，避免行数临界误判
            const shouldFold = codeRight.scrollHeight > CODE_FOLD_MAX_HEIGHT + 20;
            const hasSwitch = !!preDom.querySelector('.cosd-code-fold');

            if (shouldFold) {
                preDom.classList.add('cosd-markdown-code-collapsible');
                if (!hasSwitch) {
                    preDom.appendChild(this.createFoldSwitch());
                }
                // 恢复用户手动展开状态：重渲染会清掉 cosd-markdown-code-expanded 和内联高度，这里按记录还原
                const saved = this._codeFoldState[index];
                if (saved?.expanded) {
                    preDom.classList.add('cosd-markdown-code-expanded');
                    codeRight.style.maxHeight = '';
                    this.applyFoldSwitchUI(preDom, true);
                }
                else if (saved?.maxHeight) {
                    codeRight.style.maxHeight = saved.maxHeight;
                    this.applyFoldSwitchUI(preDom, false);
                }
                else {
                    // 无历史记录：保持默认折叠态，不额外处理
                }
            }
            else {
                // 内容不足一屏：移除折叠态和按钮，避免出现点了没变化的按钮
                preDom.classList.remove('cosd-markdown-code-collapsible', 'cosd-markdown-code-expanded');
                codeRight.style.maxHeight = '';
                preDom.querySelector('.cosd-code-fold')?.remove();
            }
        });
    }

    createFoldSwitch(): HTMLElement {
        const switchDom = document.createElement('div');
        switchDom.className = 'cosd-code-fold';
        // 展开/收起是交互控件，不属于正文，避免被 TTS 念出「展开」「收起」
        switchDom.setAttribute('disable-tts', '');
        // 显隐由 CSS 依据 pre.cosd-markdown-code-expanded 控制，无需 JS 切换
        const mask = document.createElement('div');
        mask.className = 'cosd-code-fold-mask';
        switchDom.appendChild(mask);
        const context = document.createElement('div');
        context.className = 'cosd-code-fold-context';
        const text = document.createElement('span');
        text.className = 'cosd-code-fold-text';
        text.textContent = '展开';
        const icon = document.createElement('i');
        icon.className = 'cos-icon cos-icon-down cosd-code-fold-icon';
        context.appendChild(text);
        context.appendChild(icon);
        switchDom.appendChild(context);
        return switchDom;
    }
}
