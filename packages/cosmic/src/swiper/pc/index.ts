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
 *
 * @file Swiper
 */

import {Component} from 'san';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Icon from '@cosui/cosmic/icon';
import type {SwiperPcData, SwiperData, SwiperPCMethods, SwiperEvents} from '../interface';

// 检查是否支持原生 scrollend
const SUPPORTED_SCROLL_END = typeof window !== 'undefined' && 'onscrollend' in window;

export default class Swiper extends Component<SwiperData> implements SwiperPCMethods {
    static trimWhitespace = 'all';
    static template = `
        <div class="cos-swiper{{
            indicator === 'outer' ? ' cos-swiper-outer' : ''}}"
        >
            <div
                style="{{autoHeight && _swiperHeight? 'height:' + _swiperHeight + 'px;' : ''}}"
                class="cos-swiper-content"
            >
                <!-- 哨兵元素，不可见，与swiper一样大小，用于视口检测 -->
                <div
                    s-ref="sentinel"
                    class="cos-swiper-sentinel">
                </div>
                <div
                    s-ref="swiperList"
                    class="cos-swiper-list{{
                        _startLoop || !transition ? ' cos-swiper-transition-none' : ''
                    }}{{
                        _isInitialRender && autoHeight ? ' cos-swiper-auto-height-init' : ''
                    }}{{
                        _snapAlignType !== 'none' ? ' cos-swiper-snap' : ''
                    }}"
                    style="--snap-align: {{_snapAlignType}}; --snap-stop: {{snapStop}};
                        overflow-x: {{scrollable ? 'auto' : 'hidden'}}; --space-between: {{_spaceBetween}}px"
                    on-scroll="debounceScroll"
                    on-wheel="handleWheel"
                >
                    <slot></slot>
                </div>
            </div>
            <div
                s-if="indicator && _indicatorItems && _indicatorItems.length > 1 && indicator !== 'number'}}"
                class="cos-swiper-indicator cos-swiper-indicator-{{indicator}}"
            >
                <div
                    s-for="item, index in _indicatorItems"
                    key="{{index}}"
                    class="cos-swiper-indicator-item {{
                        index === _activeIndex ? 'cos-swiper-indicator-active' : ''}}"
                    on-click="stop:handleIndicatorClick(index)"
                >
                    <span></span>
                </div>
            </div>
            <div class="cos-swiper-control">
                <template s-if="{{arrow !== 'bottom'}}">
                    <div
                        s-if="_showPrev"
                        class="cos-swiper-control-prev"
                        on-click="prev()"
                    >
                        <cos-icon class="cos-swiper-control-icon" name="left" />
                    </div>
                    <div
                        s-if="_showNext"
                        class="cos-swiper-control-next"
                        on-click="next()"
                    >
                        <cos-icon class="cos-swiper-control-icon" name="right" />
                    </div>
                </template>
                <div s-else class="cos-swiper-control-bottom">
                    <div class="cos-swiper-control-bottom-content">
                        <div
                            class="cos-swiper-control-bottom-content-prev{{
                                _showPrev ? '' : ' cos-swiper-control-bottom-content-disabled'
                            }}"
                            on-click="prev()"
                        >
                            <cos-icon class="cos-swiper-control-bottom-content-icon" name="left" />
                        </div>
                        <span
                            s-if="indicator==='number'"
                            class="cos-swiper-control-bottom-content-page"
                        >{{_activeIndex+1}}/{{_swiperItemsLen}}</span>
                        <div
                            class="cos-swiper-control-bottom-content-next{{
                                _showNext ? '' : ' cos-swiper-control-bottom-content-disabled'
                            }}"
                            on-click="next()"
                        >
                            <cos-icon class="cos-swiper-control-bottom-content-icon" name="right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-swiper-item': SwiperItem,
        'cos-icon': Icon
    };

    static messages = {
        'cos:swiper-item-inited': function () {
            const _indicatorItemsLen = (this as any).data.get('_indicatorItemsLen');
            (this as any).data.set('_indicatorItemsLen', _indicatorItemsLen + 1);
            (this as any).data.set('_swiperItemsLen', _indicatorItemsLen + 1);
            (this as any).data.set(`_indicatorItems[${_indicatorItemsLen}]`, {});
        },
        'cos:swiper-item-attached': function (this: Swiper, arg: any) {
            // 触发数组数据更新
            const {elWidth} = arg.value;
            this.data.set('_swiperItems', Array.from(this.swiperList.children));
            const _totalWidth = this.data.get('_totalWidth');
            const spaceBetween = this.data.get('_spaceBetween');

            // offsetWidth 会四舍五入无法获取精确值，这里使用 getBoundingClientRect 获取
            const width = elWidth || 0;
            // swiper-item 可能动态变更，为确保 totalWidth去掉最后一个节点的 spaceBetween，在列表有内容时就减去
            const totalWidth = _totalWidth + width + (_totalWidth === 0 ? 0 : spaceBetween);

            width && this.data.set('_totalWidth', totalWidth);
            // 组件渲染完后又异步更新数据，需要更新视口宽度
            if (this.swiperHasAttached) {
                this.data.set('_swiperListWidth', this.swiperList?.clientWidth || 0);
            }
            this.swiperItemChangeHandle();
        },
        'cos:swiper-item-detached': function (this: Swiper, arg: any) {
            const {el, elWidth} = arg.value;
            this.data.remove('_swiperItems', el);
            const _totalWidth = this.data.get('_totalWidth');
            const spaceBetween = this.data.get('_spaceBetween');
            const width = elWidth || 0;

            const _indicatorItemsLen = (this as any).data.get('_indicatorItemsLen');
            if (_indicatorItemsLen > 1) {
                (this as any).data.set('_indicatorItemsLen', _indicatorItemsLen - 1);
                (this as any).data.pop('_indicatorItems');
                (this as any).data.set('_swiperItemsLen', _indicatorItemsLen - 1);
            }

            this.data.set('_totalWidth', Math.max(0, _totalWidth - width - spaceBetween));
            if (this.swiperHasAttached) {
                this.data.set('_swiperListWidth', this.swiperList?.clientWidth || 0);
            }
            this.swiperItemChangeHandle();
        }
    };

    static computed = {
        _spaceBetween(this: Swiper) {
            const spaceBetween = this.data.get('spaceBetween');
            // 无法转成数字的 spaceBetween 返回默认间距
            if (isNaN(spaceBetween)) {
                return 9;
            }
            return +spaceBetween;
        },
        _showPrev(this: Swiper) {
            const _transOffset = this.data.get('_transOffset');
            return _transOffset !== 0;
        },
        _showNext(this: Swiper) {
            const _transOffset = this.data.get('_transOffset');
            const _totalWidth = this.data.get('_totalWidth');
            const swiperWidth = this.data.get('_swiperListWidth');
            return _transOffset + swiperWidth < Math.floor(_totalWidth);
        },
        _snapAlignType(this: Swiper) {
            const snapAlign = this.data.get('snapAlign');
            const autoplay = this.data.get('autoplay');
            if (snapAlign !== 'none') {
                return snapAlign;
            }
            if (autoplay) {
                return 'center';
            }
            return 'none';
        }
    };

    // 自动播放视口检测器
    observer: IntersectionObserver | null;
    // 用于防止在滚动事件同一个动画帧中重复触发回调
    ticking: boolean;
    // 动画时间戳
    timer?: number | null;
    // 动画id
    animationFrame?: number | null;
    swiperList: HTMLElement;
    // 第一次翻页
    firstTurnPage: boolean;
    // 组件已渲染完成
    swiperHasAttached: boolean;
    // 实际滑动行为
    scrollBehavior: 'auto' | 'smooth' | '';
    // 用于检测 scroll 结束的定时器
    scrollTimeout: ReturnType<typeof setTimeout> | null;
    // 用于记录scroll节流的requestAnimationFrame的id
    scrollAnimationFrame?: number | null;
    // 用于记录scrollend节流的requestAnimationFrame的id
    scrollendAnimationFrame?: number | null;
    // 是否正在滚动
    isScrolling: boolean;
    // 是否正在自动播放
    isAutoplaying: boolean;
    // 是否正在用触控板滚动
    isWheeling: boolean;
    // 用于记录上一次的 startOffsetLeft
    startOffsetLeft: number;
    // 用于记录滚动开始的activeIndex
    _startIndex: number;
    // 用于记录上次触发change的activeIndex
    _prevIndex: number;
    swiperViewChangeHandler: () => void;
    scrollEndHandler: (event: Event) => void;
    isTouching: boolean;
    touchStartX: number;
    touchStartY: number;

    initData(): SwiperPcData {
        return {
            arrow: 'sides',
            autoplay: false,
            interval: 3000,
            loop: false,
            indicator: '',
            activeIndex: 0,
            spaceBetween: 9,
            alignType: 'left',
            autoHeight: false,
            scrollable: false,
            scrollBehavior: 'smooth',
            snapAlign: 'none',
            snapStop: 'normal',
            // 组件内真正使用的 activeIndex，如果不分开 scroll 的时候更新 activeIndex 会闪动停止 scroll
            _activeIndex: 0,
            _swiperHeight: 0,
            _transOffset: 0,
            _totalWidth: 0,
            _swiperItems: [],
            _swiperItemsLen: 0,
            // swiperItem inited 初始化完成的列表，用于 indicator 指示器渲染
            _indicatorItems: [],
            _indicatorItemsLen: 0,
            _startLoop: false,
            _prevActiveIndex: 0,
            _swiperListWidth: 0,
            // 初始化阶段，避免 SSR 场景未获取 item 高度导致高度异常
            _isInitialRender: true
        };
    }

    inited() {
        this.firstTurnPage = true;
        this.ticking = false;
        this.startOffsetLeft = 0;
        this.isScrolling = false;
        this._startIndex = 0;
        this.data.set('_activeIndex', this.data.get('activeIndex'));
    }

    attached() {
        const swiperList = this.ref('swiperList') as unknown as HTMLElement;
        this.swiperList = swiperList;
        this.data.set('_isInitialRender', false);

        if (SUPPORTED_SCROLL_END && this.swiperList) {
            this.scrollEndHandler = this.handleScrollEnd.bind(this);
            this.swiperList?.addEventListener('scrollend', this.scrollEndHandler);
        }

        // 如果不放到 nextTick 中 width 拿到的是 0
        this.nextTick(() => {
            this._prevIndex = this.data.get('_activeIndex');
            this.swiperHasAttached = true;
            this.data.set('_swiperListWidth', swiperList?.clientWidth || 0);
            this.updateHeight(this.data.get('activeIndex'));
            this.updatedWidth();
            this.requestAnimation();
        });

        this.watch('activeIndex', (value: number) => {
            // 防止过载
            const length = this.data.get('_swiperItems').length;
            const _activeIndex = this.data.get('_activeIndex');
            if (value > length - 1 || value < 0 || value === _activeIndex) {
                return;
            }
            this.isAutoplaying = false;
            this.scrollToIndex(value);
        });

        this.watch('autoplay', (value: boolean | 'visible', {oldValue}) => {
            if (value === 'visible') {
                if (this.observer) {
                    const sentinel = this.ref('sentinel') as unknown as HTMLElement;
                    this.observer.observe(sentinel);
                }
                else {
                    this.initIntersectionObserver();
                }
                return;
            }

            oldValue === 'visible' && this.observer && this.observer.disconnect();
            value ? this.requestAnimation() : this.cancelAnimation();
        });

        this.swiperViewChangeHandler = this.swiperViewChange.bind(this);
        window.addEventListener('resize', this.swiperViewChangeHandler);
        this.data.get('autoplay') === 'visible' && this.initIntersectionObserver();
    }

    detached() {
        this.data.set('activeIndex', 0);
        this.data.set('_activeIndex', 0);
        this.cancelAnimation();
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
        this.scrollAnimationFrame && cancelAnimationFrame(this.scrollAnimationFrame);
        this.scrollAnimationFrame = null;
        this.scrollendAnimationFrame && cancelAnimationFrame(this.scrollendAnimationFrame);
        this.scrollendAnimationFrame = null;

        window.removeEventListener('resize', this.swiperViewChangeHandler);
        if (SUPPORTED_SCROLL_END && this.swiperList) {
            this.swiperList?.removeEventListener('scrollend', this.scrollEndHandler);
        }
        this.observer && this.observer.disconnect();
        this.observer = null;
    }

    /**
     * swiperItem 变更后需：
     * - 更新 totalWidth，总长度需要减去最后一个节点的 spaceBetween
     * - 判断是否需要滚动至 activeIndex
     */
    swiperItemChangeHandle() {
        const activeIndex = this.data.get('_activeIndex');
        // 视口宽度
        // 防止过载
        const length = this.data.get('_swiperItems').length;
        const swiperItemsLen = this.data.get('_swiperItemsLen');
        if (activeIndex > length - 1 || activeIndex < 0) {
            this.data.set('_activeIndex', Math.max(0, Math.min(activeIndex, length - 1)));
            return;
        }

        // updateHeight 之后非首个元素才可见，需要调 nexttick 延迟，避免切换 activeIndex 无效
        if (this.data.get('autoHeight')) {
            // 第一次更新时需要等待高度计算完成
            this.nextTick(() => {
                this.scrollToIndex(activeIndex, true);
            });
            return;
        }
        // 确保swiperItem都attached后再触发滚动，否则attach一个swiperitem就会触发一次滚动，不仅频繁触发且scrollToIndex中获取宽度全部错误
        if (swiperItemsLen === length) {
            this.scrollToIndex(activeIndex, true);
        }
    }

    requestAnimation() {
        if (!this.data.get('autoplay')) {
            return;
        }
        // 避免重复调用 requestAnimation 导致的前一帧丢失问题：
        // 如果在上一自动播放时再次调用，会导致无法取消未执行的动画请求，
        // 因此需在发起新请求前主动取消未执行的动画帧。
        this.cancelAnimation();

        const interval = this.data.get('interval');

        const loopAnimation = (timestamp: number) => {
            if (!this.timer) {
                // 首次执行时记录timestamp
                this.timer = timestamp;
            }

            if (timestamp - this.timer >= interval) {
                this.timer = timestamp;

                const activeIndex = this.data.get('_activeIndex');
                let nextIndex = activeIndex + 1;
                let startLoop = false;
                const total = this.data.get('_swiperItems').length;
                // 判断是否切换到最后
                if (nextIndex >= total) {
                    // 如果是循环播放，切换到最后的时候再设置成 0
                    if (this.data.get('loop')) {
                        nextIndex = 0;
                        startLoop = true;
                    }
                    else {
                        this.cancelAnimation();
                        return;
                    }
                }
                this.isAutoplaying = true;
                this.onNext(startLoop);
                this.data.set('_activeIndex', nextIndex);
            }
            this.animationFrame = requestAnimationFrame(loopAnimation);
        };
        this.animationFrame = requestAnimationFrame(loopAnimation);
    }

    cancelAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = null;
        this.timer = null;
        this.isAutoplaying = false;
    }

    onPrev() {
        if (this.firstTurnPage) {
            this.firstTurnPage = false;
            this.updatedWidth();
        }

        // 视口宽度
        const windowWidth = this.data.get('_swiperListWidth');
        const swiperItems = this.data.get('_swiperItems');
        const activeIndex = this.data.get('_activeIndex');
        // 内容间距
        const spaceBetween = this.data.get('_spaceBetween');

        // 当前transform 偏移量
        const oldTransOffset = this.data.get('_transOffset');

        // 偏移小于一屏距离时，移动到0
        if (oldTransOffset <= windowWidth + spaceBetween) {
            this.scrollToIndex(0);
            return;
        }
        // 移动步数
        let step = activeIndex;
        // transform 偏移量
        let transOffset = oldTransOffset;
        while (oldTransOffset - transOffset <= windowWidth && step > 0) {
            step--;
            transOffset = swiperItems[step].offsetLeft;
        }

        // 正常情况上面while会走到应该移动的元素的前一个，需要回退一个
        // 当一个 元素宽度 >= 视口宽度 的时候，step只会走一下，这种情况不需要回退
        if (activeIndex - step > 1) {
            step++;
        }
        this.scrollToIndex(step);
    }

    prev() {
        this.cancelAnimation();
        this.onPrev();
        this.requestAnimation();
    }

    next() {
        this.cancelAnimation();
        this.onNext();
        this.requestAnimation();
    }

    onNext(startLoop?: boolean) {
        // startLoop表示从头开始的循环播放
        if (startLoop) {
            this.scrollBehavior = 'auto';
            this.swiperList.scrollTo({
                left: 0,
                behavior: 'auto'
            });
            return;
        }

        // 为避免由于缩放动画等原因，attached 时拿到的宽度不对，第一次切换下一页时主动调用 updatedWidth 更新记录的 swiper 总宽度
        if (this.firstTurnPage) {
            this.firstTurnPage = false;
            this.updatedWidth();
        }
        // 总宽度
        const totalWidth = this.data.get('_totalWidth');
        // 内容间距
        const spaceBetween = this.data.get('_spaceBetween');
        // 视口宽度
        const windowWidth = this.data.get('_swiperListWidth');
        const swiperItems = this.data.get('_swiperItems');
        const activeIndex = this.data.get('_activeIndex');

        // 当前transform 偏移量
        const oldTransOffset = this.data.get('_transOffset');
        // 这次移动的偏移量
        let transOffset = this.data.get('_transOffset') - windowWidth - spaceBetween;

        // 移动宽度
        let moveWidth = 0;
        // 移动步数
        let step = 0;
        while (moveWidth <= windowWidth && (step <= swiperItems.length - 1)) {
            const width = swiperItems[activeIndex + step]?.getBoundingClientRect().width || 0;
            moveWidth += width + spaceBetween;
            step++;
        }

        // 移动步数大于1，说明需要回退最后一次移动的步数和偏移量；减去第一张的宽度
        if (step > 1) {
            step--;
            const width = swiperItems[activeIndex + step]?.getBoundingClientRect().width || 0;
            moveWidth -= width + spaceBetween;
        }
        transOffset = oldTransOffset - moveWidth;

        // 如果当前的偏移量加上视口的宽度已经大于等于内容总宽度
        if (Math.abs(transOffset) + windowWidth >= totalWidth) {
            transOffset = windowWidth - totalWidth;

            // 直接切换到最后
            step = swiperItems.length - 1 - activeIndex;
        }

        this.scrollToIndex(activeIndex + step);
        this.data.set('_startLoop', !!startLoop);
    }

    /**
     * @description 滚动到指定索引位置
     * @param {number} index 目标索引位置
     */
    scrollToIndex(index: number, needFireChange = false) {
        const alignType = this.data.get('alignType');
        const swiperItems = this.data.get('_swiperItems');

        if (!swiperItems[index]) {
            return;
        }
        const transOffset = this.data.get('_transOffset');
        // 滚动子元素总宽度
        const totalWidth = this.data.get('_totalWidth');
        // 滚动容器cos-swiper-list宽度
        const windowWidth = this.swiperList?.clientWidth || this.data.get('_swiperListWidth') || 0;

        if (index >= swiperItems.length || index < 0) {
            return;
        }

        // 目标item的相对滚动容器偏移宽度与元素宽度
        const itemOffsetLeft = swiperItems[index].offsetLeft;
        const itemWidth = swiperItems[index].clientWidth;

        // 本次滚动偏移的距离
        let scrollOffsetLeft = 0;

        // 元素总宽度小于视口宽度，不进行滚动，偏移量置零
        if (totalWidth <= windowWidth) {
            this.data.set('_transOffset', 0);
            return;
        }

        // 居中显示时针对右侧吸附处理
        if (alignType === 'center') {
            scrollOffsetLeft = itemOffsetLeft - (windowWidth - itemWidth) / 2;
        }
        else {
            scrollOffsetLeft = itemOffsetLeft;
        }

        if (transOffset === scrollOffsetLeft) {
            return;
        }
        // 平滑滚动，会继续触发scroll事件
        const scrollBehavior = this.data.get('scrollBehavior');
        if (typeof this.swiperList.scrollTo === 'function') {
            this.scrollBehavior = scrollBehavior && ['auto', 'smooth'].includes(scrollBehavior)
                ? scrollBehavior
                : 'smooth';
            this.swiperList.scrollTo({
                left: scrollOffsetLeft,
                behavior: this.scrollBehavior
            });
        }

        // swiper item 动态更新需要补发 change 事件
        // 在当前item前插入元素时，会导致当前item的索引发生变化，此时需要补发change事件
        if (needFireChange) {
            this.updateHeight(index);

            const changed = this.data.get('_activeIndex') !== index;
            changed && this.fire<SwiperEvents['change']>('change', {
                index,
                prevIndex: this.data.get('_prevActiveIndex'),
                autoplay: true,
                event: undefined
            });
        }
    }

    // 处理指示器点击事件, 切换到对应的index
    handleIndicatorClick(index: number) {
        this.cancelAnimation();
        this.data.set('activeIndex', index);
        this.requestAnimation();
    }

    // 更新 swiper 的总宽度，判断是否展现翻页按钮
    updatedWidth() {
        const swiperItems = this.data.get('_swiperItems');
        const spaceBetween = this.data.get('_spaceBetween');
        // 视口宽度
        const windowWidth = this.swiperList?.getBoundingClientRect().width;
        if (!windowWidth) {
            return;
        }
        let index = 0;
        let totalWidth = 0;
        while (index < swiperItems.length) {
            const width = swiperItems[index]?.getBoundingClientRect()?.width || 0;
            totalWidth += width + spaceBetween;
            index++;
        }
        totalWidth -= spaceBetween;
        this.data.set('_totalWidth', totalWidth);
        this.data.set('_swiperListWidth', windowWidth);
    }

    /**
     * 配置自适应高度时，更新当前 swiper 的高度
     * @param index 当前 swiperItem 索引
     */
    updateHeight(index: number) {
        const autoHeight = this.data.get('autoHeight');
        const swiperItems = this.data.get('_swiperItems');
        if (!autoHeight
            || index < 0
            || index > swiperItems.length
            || !swiperItems[index]
        ) {
            return;
        }

        // 获取内容元素
        const contentEl = swiperItems[index]?.querySelector('.cos-swiper-item-content');
        if (!contentEl || !contentEl.offsetHeight) {
            return;
        }
        // 设置容器高度
        this.data.set('_swiperHeight', contentEl.offsetHeight);
    }

    /**
     * 视口变化 / 字体变化时重新更新高度
     */
    swiperViewChange() {
        const activeIndex = this.data.get('_activeIndex');
        this.updateHeight(activeIndex);
    }

    /**
    * 计算滚动结束后应该激活的滑块索引
    * 作用：根据当前滚动位置、滑块布局及滑动方向，确定哪个滑块应被激活
    * @returns {number} 计算得到的下一个激活滑块的索引
    */
    getNextActiveIndex() {
        const swiperList = this.swiperList;
        const scrollLeft = swiperList.scrollLeft;
        const clientWidth = swiperList.clientWidth;
        const scrollWidth = swiperList.scrollWidth;
        const swiperItem = this.data.get('_swiperItems');
        const minOffsetLeft = swiperItem[0].offsetLeft;
        const maxIndex = swiperItem.length - 1;

        // 0.5 是滚动偏差值
        if (scrollLeft <= minOffsetLeft || (Math.abs(scrollLeft - (scrollWidth - clientWidth)) <= 0.5)) {
            return scrollLeft <= minOffsetLeft ? 0 : maxIndex;
        }

        let activeIndex = this.data.get('_activeIndex');
        let checkPosition = swiperItem[activeIndex].offsetLeft + swiperItem[activeIndex].clientWidth / 2;
        // 向右滑动
        if (scrollLeft < this.startOffsetLeft) {
            // 往前翻（向右滑动，左边出东西)
            while (activeIndex > 0 && scrollLeft < checkPosition) {
                --activeIndex;
                checkPosition = swiperItem[activeIndex].offsetLeft + swiperItem[activeIndex].clientWidth / 2;
            }
            activeIndex++;

            // 边界场景修正，第一个元素展现超过半个的情况
            if (activeIndex === 1 && scrollLeft < swiperItem[0].clientWidth / 2) {
                activeIndex = 0;
            }
        }
        else {
            // 往后翻(向左滑动了，右边出东西)
            while (scrollLeft > checkPosition) {
                ++activeIndex;
                checkPosition = swiperItem[activeIndex].offsetLeft + swiperItem[activeIndex].clientWidth / 2;
            }
        }

        // 更新 startOffsetLeft 为当前滚动位置，确保下次准确判断滑动方向
        this.startOffsetLeft = scrollLeft;

        return activeIndex < 0 ? 0 : activeIndex > maxIndex ? maxIndex : activeIndex;
    }

    // 滚动事件处理函数
    handleWheel() {
        // 排除触摸板滑动/鼠标滚轮滚动，但实际并没有滚动的情况
        // 比如上下滑、左右边界
        if (!this.isWheeling && this.isScrolling) {
            this.scrollBehavior = '';
            this.isWheeling = true;
            this.cancelAnimation();
        }
    }

    // 滚动处理函数
    handleScroll(event: Event) {
        this.data.set('_transOffset', this.swiperList.scrollLeft);
        const activeIndex = this.data.get('_activeIndex');
        const swiperItem = this.data.get('_swiperItems');
        const scrollable = this.data.get('scrollable');
        if (!swiperItem[activeIndex]) {
            return;
        }
        const nextIndex = this.getNextActiveIndex();
        if (activeIndex !== nextIndex) {
            // 更新下标
            this._prevIndex = activeIndex;
            this.data.set('_activeIndex', nextIndex);

            this.updateHeight(nextIndex);
        }
        scrollable && this.fire<SwiperEvents['scroll']>('scroll', {event});
    }

    /**
    * 处理滚动结束后的逻辑
    * 作用：记录滚动结束时的状态，根据滚动是否可用触发不同事件，并更新起始索引
    */
    handleScrollEnd() {
        const processScrollEnd = () => {
            this.isScrolling = false;
            this.startOffsetLeft = this.swiperList?.scrollLeft || 0;
            const scrollable = this.data.get('scrollable');
            const activeIndex = this.data.get('_activeIndex');

            // 仅支持横滑时，触发 scrollend
            scrollable && this.fire<SwiperEvents['scrollend']>('scrollend', {
                index: activeIndex,
                prevIndex: this._startIndex
            });

            const changed = this._startIndex !== activeIndex;
            changed && this.fire<SwiperEvents['change']>('change', {
                index: activeIndex,
                prevIndex: this._startIndex,
                autoplay: this.isAutoplaying,
                event: null
            });
            this._startIndex = this.data.get('_activeIndex');
            // 滚动结束后重置状态
            this.isAutoplaying = false;
            if (this.isWheeling) {
                this.isWheeling = false;
                this.requestAnimation();
            }
        };

        // 当 scrollBehavior 为 auto 且支持原生 scrollend 时，需要延迟执行
        // 问题：auto 模式下 scroll 事件可能只触发 1 次，但被防抖延迟到下一帧执行
        // 而 scrollend 事件会立即触发，导致执行顺序错乱：scrollend 先于 scroll 执行
        // 解决：延迟 scrollend 处理，确保 scroll 事件先更新 _activeIndex 状态后再执行 scrollend
        if (this.scrollBehavior && SUPPORTED_SCROLL_END) {
            this.scrollendAnimationFrame = requestAnimationFrame(processScrollEnd);
        }
        else {
            processScrollEnd();
        }
    }

    /**
    * 防抖处理滚动事件，优化滚动性能并管理滚动状态
    * 作用：避免频繁频繁触发的滚动事件进行节流（使用requestAnimationFrame），
    * 同时通过定时器判断滚动是否结束，执行收尾操作。
    * safari不支持scrollend事件，采用防抖模拟
    * @param {Event} event - 滚动事件对象
    */
    debounceScroll(event: Event) {
        if (!this.ticking) {
            this.scrollAnimationFrame = requestAnimationFrame(() => {
                this.handleScroll(event);
                this.ticking = false;
            });
            this.ticking = true;
        }
        this.isScrolling = true;
        // 只在不支持原生 scrollend 时使用 setTimeout 模拟 scrollend
        if (SUPPORTED_SCROLL_END) {
            return;
        }
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = null;
        }
        this.scrollTimeout = setTimeout(() => {
            this.handleScrollEnd();
        }, 100);
    }

    /**
     * 初始化视口检测
     */
    initIntersectionObserver() {
        // 先判断目前环境是否支持 IntersectionObserver
        if (!IntersectionObserver) {
            return;
        }
        const sentinel = this.ref('sentinel') as unknown as HTMLElement;
        this.observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.requestAnimation();
                }
                else {
                    this.cancelAnimation();
                }
            }
        });

        this.observer && this.observer.observe(sentinel);
    }
}