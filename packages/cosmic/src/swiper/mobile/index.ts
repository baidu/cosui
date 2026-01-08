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
import {
    SLIDE_BAR_WIDTH
} from '../utils';
import type {SwiperMobileData, SwiperData, SwiperEvents, SwiperMobileMethods} from '../interface';

// 检查是否支持原生 scrollend
const SUPPORTED_SCROLL_END = typeof window !== 'undefined' && 'onscrollend' in window;

export default class Swiper extends Component<SwiperData> implements SwiperMobileMethods {
    static trimWhitespace = 'all';
    static template = `
        <div class="cos-swiper {{indicator === 'outer' ? 'cos-swiper-outer' : ''}}">
            <div
                style="{{autoHeight && _swiperHeight? ' height:' + _swiperHeight + 'px;' : ''}}"
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
                        snapAlignType !== 'none' ? ' cos-swiper-snap' : ''
                    }}{{
                        indicator ? ' cos-swiper-list-indicator' : ''
                    }}{{
                        _isInitialRender && autoHeight ? ' cos-swiper-auto-height-init' : ''
                    }}"
                    style="--snap-align: {{snapAlignType}}; --snap-stop: {{snapStop}}; --space-between: {{
                        spaceBetween}}px; transform: translate({{_offsetX}}px, 30px)"
                    on-scroll="debounceScroll"
                    on-touchstart="handleTouchStart"
                    on-touchmove="handleTouchMove"
                    on-touchend="handleTouchEnd"
                    on-touchcancel="handleTouchEnd"
                >
                    <slot></slot>
                    <a
                        s-if="overscrollUrl || (overscrollLinkInfo && overscrollLinkInfo.href)"
                        s-ref="overscroll"
                        class="cos-swiper-overscroll"
                        href="{{overscrollUrl || (overscrollLinkInfo && overscrollLinkInfo.href)}}"
                        s-bind="overscrollLinkInfo"
                    >
                        <div class="cos-swiper-overscroll-text cos-space-pr-xxs">
                            {{overscrollText}}
                        </div>
                        <cos-icon s-ref="overscrollIcon" name="right" class="cos-swiper-overscroll-icon"/>
                    </a>
                </div>
            </div>
            <div s-if="scrollbar" class="cos-swiper-scrollbar">
                <div
                    style="transform: translateX({{_slide}}px);"
                    class="cos-swiper-slide"
                />
            </div>
            <div
                s-if="indicator && _indicatorItems && _indicatorItems.length > 1"
                class="cos-swiper-indicator cos-swiper-indicator-{{indicator}}"
            >
                <div
                    s-for="item, index in _indicatorItems"
                    key="{{index}}"
                    class="cos-swiper-indicator-default{{index === _activeIndex ? ' cos-swiper-indicator-active' : ''}}"
                    on-click="stop:handleIndicatorClick(index)"
                >
                    <span></span>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-swiper-item': SwiperItem,
        'cos-icon': Icon
    };

    static computed = {
        snapAlignType(this: Swiper) {
            const snapAlign = this.data.get('snapAlign');
            const autoplay = this.data.get('autoplay');
            if (snapAlign !== 'none') {
                return snapAlign;
            }
            if (autoplay) {
                return 'center';
            }
            return 'none';
        },

        /**
         * 判断是否翻页场景
         * 当每一个 item 的宽度接近 swiper 容器宽度时，认为是翻页场景
         */
        isPageScroll(this: Swiper) {
            const items = this.data.get('_swiperItems') || [];
            const containerWidth = this.data.get('_swiperWidth');

            if (!items.length || !containerWidth) {
                return false;
            }

            // 检查所有 item，看每个 item 是否会露出下一个 item
            const spaceBetween = this.data.get('spaceBetween') || 0;
            return items.every((item: Element) => {
                const itemWidth = (item as HTMLElement).offsetWidth;
                const remainingSpace = containerWidth - itemWidth;
                // 如果剩余空间大于间距，说明会露出下一个 item，不是翻页场景
                return remainingSpace <= spaceBetween;
            });
        }
    };

    static messages = {
        'cos:swiper-item-inited': function () {
            const _indicatorItemsLen = (this as any).data.get('_indicatorItemsLen');
            (this as any).data.set('_indicatorItemsLen', _indicatorItemsLen + 1);
            (this as any).data.set(`_indicatorItems[${_indicatorItemsLen}]`, {});
        },
        'cos:swiper-item-attached': function (arg: any) {
            // 触发更新
            const {el} = arg.value;
            (this as any).data.push('_swiperItems', el);
            // 更新 swiper 宽度
            (this as any).nextTick(() => {
                const swiperWidth = (this as any).ref('swiperList').clientWidth;
                (this as any).data.set('_swiperWidth', swiperWidth);
            });
        },
        'cos:swiper-item-detached': function (arg: any) {
            const {el} = arg.value;
            (this as any).data.remove('_swiperItems', el);
            const _indicatorItemsLen = (this as any).data.get('_indicatorItemsLen');
            if (_indicatorItemsLen > 1) {
                (this as any).data.set('_indicatorItemsLen', _indicatorItemsLen - 1);
                (this as any).data.pop('_indicatorItems');
            }

            // 更新 swiper 宽度
            // detached 有可能是 swiper 全被移除，所以需要判断 swiperList 是否存在
            (this as any).nextTick(() => {
                const swiperWidth = (this as any).ref('swiperList')?.clientWidth;
                swiperWidth && (this as any).data.set('_swiperWidth', swiperWidth);
            });
        }
    };

    // 自动播放视口检测器
    observer: IntersectionObserver | null;
    // 动画时间戳
    timer?: number | null;
    // 动画id
    animationFrame?: number | null;
    startX: number;
    touchStartX: number;
    initOverscrollText: string | undefined;
    swiperList: HTMLElement;
    // 用于检测 scroll 结束的定时器
    scrollTimeout: number | null;
    // 是否正在滚动
    isScrolling: boolean;
    // 是否正在触摸
    isTouching: boolean;
    // 滑动触发类型，在每种行为开始时设置
    isAutoPlaying: boolean;
    // 标记滚动到末尾后是否跳转
    isJump: boolean;
    // 是否发生过滚动
    hasScrolled: boolean;
    // 用于防止 scrollend 事件重复触发
    scrollEndTriggered: boolean;
    // 用于记录上一次的 startOffsetLeft
    startOffsetLeft: number;
    // 滑动行为，实际的滑动行为可能与组件props的值不一致，需要在 scrollToIndex 中动态更新
    scrollBehavior: 'auto' | 'smooth' | '';
    // 用于记录延迟的 scroll 动画帧
    scrollAnimationFrame: number | null;
    // 用于记录延迟的 scrollend 动画帧
    scrollendAnimationFrame: number | null;

    // 用于防止在同一个动画帧中重复触发回调
    ticking: boolean;
    scrollendTimeout: number | null;
    scrollEndHandler: () => void;
    swiperViewChangeHandler: () => void;

    initData(): SwiperMobileData {
        return {
            autoplay: false,
            interval: 3000,
            loop: false,
            indicator: '',
            // 用来监听业务是否指定滑动到index
            activeIndex: 0,
            scrollbar: false,
            spaceBetween: 9,
            overscrollUrl: '',
            overscrollLinkInfo: {},
            overscrollText: '左滑更多',
            overscrollMoveText: '松手查看',
            snapAlign: 'none',
            snapStop: 'normal',
            scrollBehavior: '',
            alignType: 'left',
            autoHeight: false,
            _swiperWidth: 0,
            _swiperHeight: 0,
            // 组件内真正使用的 activeIndex，如果不分开 scroll 的时候更新 activeIndex 会闪动停止 scroll
            _activeIndex: 0,
            _swiperItems: [],
            // swiperItem inited 初始化完成的列表，用于 indicator 指示器渲染
            _indicatorItems: [],
            _indicatorItemsLen: 0,
            _prevIndex: 0,
            _slide: 0,
            _offsetX: 0,
            _startIndex: 0,
            _itemHidden: false,
            // 标记触摸是否已结束
            _touchEndPending: false,
            // 初始化阶段，避免 SSR 场景未获取 item 高度导致高度异常
            _isInitialRender: true
        };
    }

    inited() {
        this.startX = 0;
        this.touchStartX = 0;
        this.isJump = false;
        this.isScrolling = false;
        this.isTouching = false;
        this.hasScrolled = false;
        this.scrollEndTriggered = false;
        this.ticking = false;
        this.startOffsetLeft = 0;

        const activeIndex = this.data.get('activeIndex');
        if (activeIndex > 0) {
            this.data.set('_itemHidden', true);
        }
    }

    attached() {
        this.swiperList = this.ref('swiperList') as unknown as HTMLElement;

        if (SUPPORTED_SCROLL_END && this.swiperList) {
            this.scrollEndHandler = this.handleScrollEnd.bind(this);
            this.swiperList?.addEventListener('scrollend', this.scrollEndHandler);
        }

        // 保留第一次设置的值，用于后续内部变更
        this.initOverscrollText = this.data.get('overscrollText');

        this.nextTick(() => {

            const activeIndex = this.data.get('activeIndex');
            const _itemHidden = this.data.get('_itemHidden');
            const swiperItems = this.data.get('_swiperItems');

            this.updateHeight(activeIndex);

            const processItems = () => {
                if (_itemHidden && activeIndex > 0 && activeIndex <= swiperItems.length - 1) {
                    this.data.set('_activeIndex', activeIndex);
                    this.scrollToIndex(activeIndex, 'auto');
                    swiperItems.forEach((item: Element) => {
                        item.classList.remove('cos-invisible');
                    });
                    this.data.set('_itemHidden', false);
                }
                this.requestAnimation();
            };

            if (this.data.get('autoHeight')) {
                // updateHeight 之后非首个元素才可见，需要调 nexttick 延迟，避免切换 activeIndex 无效
                this.nextTick(processItems);
            }
            else {
                processItems();
            }
        });

        this.watch('activeIndex', (newValue: number) => {
            this.isAutoPlaying = false;
            this.shouldScrollToIndex(newValue);
        });

        this.watch('_swiperItems', () => {
            const activeIndex = this.data.get('activeIndex');
            this.shouldScrollToIndex(activeIndex, true);
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
        window.addEventListener('app_font_change', this.swiperViewChangeHandler);
        this.data.get('autoplay') === 'visible' && this.initIntersectionObserver();
    }

    detached() {
        this.data.set('_activeIndex', 0);
        this.cancelAnimation();

        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
        this.scrollendTimeout && clearTimeout(this.scrollendTimeout);
        this.scrollendTimeout = null;
        this.scrollAnimationFrame && cancelAnimationFrame(this.scrollAnimationFrame);
        this.scrollAnimationFrame = null;
        this.scrollendAnimationFrame && cancelAnimationFrame(this.scrollendAnimationFrame);
        this.scrollendAnimationFrame = null;

        if (SUPPORTED_SCROLL_END && this.swiperList) {
            this.swiperList?.removeEventListener('scrollend', this.scrollEndHandler);
        }

        window.removeEventListener('resize', this.swiperViewChangeHandler);
        window.removeEventListener('app_font_change', this.swiperViewChangeHandler);
        this.observer && this.observer.disconnect();
        this.observer = null;
    }

    /**
     * 判断是否需要滑动到 index
     */
    shouldScrollToIndex(index: number, isSwiperItem = false) {
        // 防止过载
        const swiperItems = this.data.get('_swiperItems');
        if (index > swiperItems.length - 1 || index < 0) {
            return;
        }
        // 用户变更 _swiperItems 场景，无法通过触发滚动修正_activeIndex，需要主动更新 _activeIndex
        isSwiperItem && this.data.set('_activeIndex', index);
        this.scrollToIndex(index);
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
                const total = this.data.get('_swiperItems').length;
                // 判断是否切换到最后
                if (nextIndex >= total) {
                    // 如果是循环播放，切换到最后的时候再设置成 0
                    if (this.data.get('loop')) {
                        nextIndex = 0;
                    }
                    else {
                        this.cancelAnimation();
                        return;
                    }
                }
                this.isAutoPlaying = true;
                this.scrollToIndex(nextIndex);
                this.data.set('_prevIndex', activeIndex);
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
        this.isAutoPlaying = false;
    }

    debounceScroll(event: Event) {
        if (!this.ticking) {
            this.scrollAnimationFrame = requestAnimationFrame(() => {
                this.handleScroll(event);
                this.ticking = false;
            });
            this.ticking = true;
        }
        // 只在不支持原生 scrollend 时使用 setTimeout 模拟 scrollend
        if (SUPPORTED_SCROLL_END) {
            return;
        }
        this.isScrolling = true;
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;

            // 在触发 handleScrollEnd 前再次检查条件
            const touchEndPending = this.data.get('_touchEndPending');

            // 检查常规条件或者是否有触摸结束后等待的滚动
            if ((!this.isTouching && this.hasScrolled) || touchEndPending) {
                // 如果是因为 touchEndPending 触发，重置标记
                if (touchEndPending) {
                    this.data.set('_touchEndPending', false);
                }
                this.handleScrollEnd();
            }
        }, 100) as unknown as number;
    }

    handleScroll(event: Event) {
        this.hasScrolled = true;

        // 计算滑块的偏移量
        if (this.data.get('scrollbar')) {
            const swiperList = this.swiperList;
            const clientWidth = swiperList.clientWidth;
            const scrollWidth = swiperList.scrollWidth;
            const scrollLeft = Math.max(0, swiperList.scrollLeft);

            const slide = Math.min((scrollLeft / (scrollWidth - clientWidth)) * SLIDE_BAR_WIDTH, SLIDE_BAR_WIDTH);

            this.data.get('_slide') !== slide && this.data.set('_slide', slide);
        }

        // 有指示器且不是自动切换的时候修改指示器选中位置
        const activeIndex = this.data.get('_activeIndex');
        const swiperItem = this.data.get('_swiperItems');
        if (!swiperItem[activeIndex]) {
            return;
        }
        const nextIndex = this.getNextActiveIndex();
        if (activeIndex !== nextIndex) {
            // 更新下标
            this.data.set('_prevIndex', activeIndex);
            this.data.set('_activeIndex', nextIndex);
            this.updateHeight(nextIndex);
        }
        this.fire<SwiperEvents['scroll']>('scroll', {event});
    }

    getNextActiveIndex() {
        const swiperList = this.swiperList;
        const scrollLeft = swiperList.scrollLeft;
        const clientWidth = swiperList.clientWidth;
        const scrollWidth = swiperList.scrollWidth;
        const swiperItem = this.data.get('_swiperItems');
        const minOffsetLeft = swiperItem[0].offsetLeft;

        // 0.5 是滚动偏差值
        if (scrollLeft <= minOffsetLeft || (Math.abs(scrollLeft - (scrollWidth - clientWidth)) <= 0.5)) {
            return scrollLeft <= minOffsetLeft ? 0 : swiperItem.length - 1;
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

        if (activeIndex < 0) {
            return 0;
        }
        else if (activeIndex > swiperItem.length - 1) {
            return swiperItem.length - 1;
        }
        return activeIndex;
    }

    handleTouchStart(event: TouchEvent) {
        // 触摸横滑时，没有滚动行为
        this.scrollBehavior = '';
        this.cancelAnimation();
        this.touchStartX = event.changedTouches[0].clientX;
        this.isTouching = true; // 标记正在触摸
    }

    handleTouchMove(event: TouchEvent) {
        const overscrollUrl = this.data.get('overscrollUrl');
        const overscrollLinkInfo = this.data.get('overscrollLinkInfo');
        const swiperList = this.swiperList;
        const scrollLeft = swiperList.scrollLeft;
        const clientWidth = swiperList.clientWidth;
        const scrollWidth = swiperList.scrollWidth;
        // .7 是偏移量误差，因大字版场景下偏差较大，偏移量误差从 .5 设置为 .7
        const distance = scrollLeft + clientWidth - scrollWidth + .7;

        // 左滑还是右滑 true 为左滑
        const moveLeft = event.changedTouches[0].clientX - this.touchStartX < 0;

        if ((overscrollUrl || overscrollLinkInfo?.href) && distance >= 0) {
            this.startX = this.startX || event.changedTouches[0].clientX;
            const offsetX = (event.changedTouches[0].clientX - this.startX) / 5;

            // 滑动位置已超过滚动条原有最大滚动位置，查看更多开始变化
            if (moveLeft && offsetX <= 0) {
                this.data.set('_offsetX', offsetX);
                this.overscrollChange(offsetX);
                event.cancelable && event.preventDefault();
            }
        }
        else {
            this.startX = 0;
            this.data.set('_offsetX', 0);
        }
    }

    /**
     * 处理触摸结束事件
     * 作用：
     * 1. 重置触摸状态
     * 2. 在非原生scrollend支持下，协调滚动的结束检测
     * 3. 处理过度滑动（Overscroll）后的跳转逻辑，如果满足条件(isJump为true)则触发跳转
     */
    handleTouchEnd() {
        this.isTouching = false;
        // 等待滚动结束并触发 scrollend
        if (!SUPPORTED_SCROLL_END) {
            // 设置一个标记，表示触摸已结束，滚动结束后应该触发 handleScrollEnd
            this.data.set('_touchEndPending', true);
        }
        if (!SUPPORTED_SCROLL_END && !this.isScrolling && this.hasScrolled) {
            this.handleScrollEnd();
        }
        this.requestAnimation();
        this.hasScrolled = false;

        const overscrollUrl = this.data.get('overscrollUrl');
        const overscrollLinkInfo = this.data.get('overscrollLinkInfo');
        if (overscrollUrl || overscrollLinkInfo?.href) {
            const isJump = this.isJump;
            const overscrollRef = this.ref('overscroll');
            // 模拟点击跳转
            if (isJump && overscrollRef) {
                const overscrollEl = overscrollRef as unknown as HTMLElement;
                const touch = new Touch({
                    identifier: 0,
                    target: overscrollEl,
                    pageX: 0,
                    pageY: 0
                });
                const event = new TouchEvent('touchstart', {
                    touches: [touch],
                    changedTouches: [touch],
                    bubbles: true,
                    cancelable: true
                });
                overscrollEl.dispatchEvent(event);
                overscrollEl.click();
                this.isJump = false;
                this.fire<SwiperEvents['over-scroll']>('over-scroll', {
                    el: overscrollEl
                });
            }

            this.data.set('_offsetX', 0);
            this.startX = 0;
            this.overscrollChange(0);
        }
    }

    handleScrollEnd() {
        const processScrollEnd = () => {
            if (this.scrollEndTriggered) {
                return;
            }

            const activeIndex = this.data.get('_activeIndex');
            const prevIndex = this.data.get('_startIndex');

            if (activeIndex !== prevIndex) {
                this.fire<SwiperEvents['change']>('change', {
                    index: activeIndex,
                    prevIndex: prevIndex,
                    autoplay: this.isAutoPlaying,
                    event: null
                });
            }

            this.scrollEndTriggered = true;
            // 重置自动播放状态
            this.isAutoPlaying = false;

            this.fire<SwiperEvents['scrollend']>('scrollend', {
                index: activeIndex,
                prevIndex: prevIndex
            });
            this.data.set('_startIndex', activeIndex);
            this.startOffsetLeft = this.swiperList?.scrollLeft || 0;

            // 增加延迟时间(130ms），确保所有滚动事件都已处理完毕
            this.scrollendTimeout = setTimeout(() => {
                this.scrollEndTriggered = false;
            }, 130) as unknown as number;
        };

        // 当 scrollBehavior 为 auto 且支持原生 scrollend 时，需要延迟执行
        // 问题：auto 模式下 scroll 事件可能只触发 1 次，但被防抖延迟到下一帧执行
        // 而 scrollend 事件会立即触发，导致执行顺序错乱：scrollend 先于 scroll 执行
        // 解决：延迟 scrollend 处理，确保 scroll 事件先更新 _activeIndex 状态后再执行 scrollend
        if (this.scrollBehavior === 'auto' && SUPPORTED_SCROLL_END) {
            this.scrollendAnimationFrame = requestAnimationFrame(processScrollEnd);
        }
        else {
            processScrollEnd();
        }

    }

    /**
     * 处理过度滑动（Overscroll）时的UI变化和状态更新
     * @param offsetX 滑动的偏移量
     * 作用：
     * 1. 根据滑动距离更新图标旋转状态
     * 2. 触发震动反馈
     * 3. 设置 isJump 标志位，决定松手后是否需要跳转
     */
    overscrollChange(offsetX: number) {
        const overscrollIconRef = this.ref('overscrollIcon') as unknown as any;
        if (!this.ref('overscrollIcon') || !overscrollIconRef?.el?.style) {
            return;
        }
        overscrollIconRef.el.style.transition = 'transform 300ms linear';
        const offsetThreshold = this.data.get('isPageScroll') ? 5 : 15;

        // 提高触发【查看更多】跳转的阈值
        if ((Math.abs(offsetX) > offsetThreshold) && offsetX < 0) {
            if (this.isJump) {
                return;
            }
            overscrollIconRef.el.style.transform = 'rotate(180deg)';
            this.data.set('overscrollText', this.data.get('overscrollMoveText'));
            this.isJump = true;
        }
        else {
            overscrollIconRef.el.style.transform = 'rotate(0deg)';
            this.data.set('overscrollText', this.initOverscrollText || '');
            this.isJump = false;
        }
    }

    scrollToIndex(index: number, behavior?: 'auto' | 'smooth') {
        const swiperItems = this.data.get('_swiperItems');
        const scrollBehavior = this.data.get('scrollBehavior');
        if (swiperItems[index]) {
            const swiperList = this.swiperList;
            const alignType = this.data.get('alignType');
            let scrollLeft = index === 0 ? 0 : swiperItems[index].offsetLeft;
            if (alignType === 'center' && index !== 0) {
                scrollLeft = scrollLeft - (swiperList.clientWidth - swiperItems[index].clientWidth) / 2;
            }
            if (typeof swiperList.scrollTo === 'function') {
                this.scrollBehavior = scrollBehavior && ['auto', 'smooth'].includes(scrollBehavior)
                    ? scrollBehavior
                    : behavior || (index === 0 ? 'auto' : 'smooth');
                swiperList.scrollTo({
                    top: 0,
                    left: scrollLeft,
                    behavior: this.scrollBehavior
                });
            }
            this.updateHeight(index);
        }
    }

    // 处理指示器点击事件, 切换到对应的index
    handleIndicatorClick(index: number) {
        this.cancelAnimation();
        this.data.set('activeIndex', index);
        this.requestAnimation();
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
        if (contentEl && contentEl.offsetHeight) {
            // 设置容器高度
            this.data.set('_swiperHeight', contentEl.offsetHeight);
        }

        this.data.get('_isInitialRender') && this.data.set('_isInitialRender', false);
    }

    /**
     * 视口变化 / 字体变化时重新更新高度
     */
    swiperViewChange() {
        const activeIndex = this.data.get('_activeIndex');
        this.updateHeight(activeIndex);
    }

    /**
     * 初始化视口检测
     */
    initIntersectionObserver() {
        // 先判断目前环境是否支持 IntersectionObserver
        if (!IntersectionObserver) {
            return;
        }
        const sentinel = this.ref('sentinel') as unknown as any;
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
