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

import {Component} from 'san';
import {CitySelectorContentData, City, Initial, From} from '../interface';
import {BubbleIcon} from '../svg';
import {Debounce, Throttle} from '../../util';
import {activeCity, dataIndex} from '../util/city';

// 虚拟列表缓冲区渲染数量
const BUFFER_COUNT = 6;

// 虚拟列表每次渲染总数量
const RENDER_COUNT = 30;

export default class CitySelector extends Component<CitySelectorContentData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-initial">
            <!-- 设置 data-index 是为了进行事件委托时可以获知具体触发事件的项,其他处同 -->
            <!-- 右侧导航 -->
            <ul
                s-ref="sideBarWrapper"
                class="cos-city-selector-initial-list"
                style="top: 9px;"
                on-touchstart="touchStart"
                on-touchmove="touchMove"
                on-touchend="touchEnd"
                on-contextmenu="stopMenu">
                <div
                    s-show="_showBubble || _isTouching"
                    class="cos-city-selector-initial-list-bubble"
                    style="top: {{_currentInitial.index * _initialHeight - 18}}px;">
                    ${BubbleIcon}</div>
                <li
                    s-for="item, index in _initialList"
                    s-ref="initial"
                    data-index="{{index}}">
                    <span class="{{_currentInitial.index === index ? 'cos-city-selector-initial-list-active' : ''}}">
                        {{ item.initial }}</span>
                </li>
            </ul>
            <div class="cos-city-selector-initial-cities-wrap" s-ref="citiesWrap">
                <!-- 虚拟列表 -->
                <div class="cos-city-selector-initial-virtual" style="height: {{_citiesHeight}}px;"></div>

                <div class="cos-city-selector-initial-cities" style="transform:translate3d(0,{{startOffset}}px,0)"
                    on-click="selectCity">
                    <!-- 热门城市 -->
                    <div s-if="_hotCities && _hotCities.length" s-ref="hotTitle"
                    class="cos-city-selector-initial-hot-title" style="opacity: {{_hideHot ? 0 : 1}}">{{hotTitle}}</div>
                    <div s-if="_hotCities && _hotCities.length" s-ref="hotCities" style="opacity: {{_hideHot ? 0 : 1}}"
                        class="cos-city-selector-initial-hot-cities" on-click="selectHotCity">
                        <div
                            s-for="option, index in _hotCities"
                            class="cos-space-mb-xs cos-city-selector-initial-hot-city{{
                                {option, selectedCities} | activeCity}}">
                            <div data-index="{{index}}"
                                class="cos-city-selector-initial-hot-label">{{option.city}}</div>
                        </div>
                    </div>

                    <!-- 城市列表 -->
                    <div s-for="item, index in _renderCityList"
                        s-ref="{{'cityItemDom-' + item._index}}"
                        class="cos-city-selector-initial-city{{
                            _useContinent ? ' cos-city-selector-initial-menu' : ''}}">
                        <div s-if="item._initial" class="cos-city-selector-initial-city-initial">{{item._initial}}</div>
                        <div class="cos-city-selector-initial-city-wrap" data-index="{{index}}">
                            <div s-if="_useContinent" class="cos-city-selector-initial-menu-city">
                                <div class="cos-city-selector-initial-menu-city-label">
                                    {{item.level === '2' ? item.county : item.city}}
                                    <span>{{item.country}}</span>
                                </div>
                                <div s-if="item.english" class="cos-city-selector-initial-menu-city-label">
                                    {{item.english}}</div>
                            </div>
                            <div s-else class="cos-city-selector-initial-city-label">{{item._showLabel}}</div>
                            <div class="cos-divider"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static filters = {
        activeCity: activeCity
    };

    activeInitialIndex: number;
    debounce: Debounce | null;
    throttle: Throttle | null;
    clickDebounce: Debounce | null;
    scrollFn: () => void;
    clickScroll: boolean;
    cancelClickScroll: boolean;
    lastScrollTop: number;
    lastScrollTime: number;
    cityHeight: number;
    hotHeight: number;
    position: Array<{ index: number, height: number, top: number, bottom: number }>;
    initHeightFn: () => void;
    initData() {
        return {
            _currentInitial: {
                initial: 'A',
                index: 0
            },
            _isTouching: false,
            _showBubble: false,
            _initialHeight: 0,
            _renderCityList: [],
            _cities: [],
            _citiesHeight: 0,
            _hideHot: false,
            _useContinent: false
        };
    }

    inited() {
        this.activeInitialIndex = 0;
        this.clickScroll = false;
        this.cancelClickScroll = false;
        this.lastScrollTop = 0;
        this.lastScrollTime = 0;
        this.cityHeight = 0;
        this.hotHeight = 0;
        this.position = [];
    }

    attached() {
        this.handleCityDataLoad(this.data.get('_cities'));
        this.watch('_cities', _cities => {
            this.handleCityDataLoad(_cities);
        });

        // 用户可能会滑动很快，节流优化的时候时间必须要设置的够短，否则会出现白屏问题
        this.throttle = new Throttle(30);
        this.scrollFn = () => {
            this.throttle?.throttle(this.onScroll, this);
        };
        this.initHeightFn = this.initHeight.bind(this);
        this.ref('citiesWrap')?.addEventListener('scroll', this.scrollFn);
        window.addEventListener('app_font_change', this.initHeightFn);

        const selectedCity = this.data.get('selectedCities')?.[0];
        const anchor = this.data.get('anchor');
        if (anchor && selectedCity?._activeTab === 0) {
            this.data.set('anchor', false);
            this.nextTick(() => {
                this.scrollSelectedCity(selectedCity);
            });
        }
    }

    detached() {
        this.debounce?.clean();
        this.clickDebounce?.clean();
        this.throttle?.clean();
        this.ref('citiesWrap')?.removeEventListener('scroll', this.scrollFn);
        window.removeEventListener('app_font_change', this.initHeightFn);
    }

    scrollSelectedCity(selectedCity: City) {
        const citiesWrap = this.ref('citiesWrap') as unknown as HTMLInputElement;
        // 如果没有 citiesWrap 或者是热门城市，直接返回，无需滚动
        if (!citiesWrap || selectedCity.hot) {
            return;
        }

        const citiesWrapRect = citiesWrap.getBoundingClientRect();
        const scrollTop = (selectedCity._index + 1) * this.cityHeight + this.hotHeight;
        if (scrollTop <= citiesWrap.scrollTop + citiesWrapRect.height) {
            return;
        }

        // 滚动到当前索引对应的城市
        this.scrollCurrentCityIndex(selectedCity._index);
        // 主动触发一次滚动计算，更新字母索引
        this.onScroll();
    }

    /**
     * 计算初始高度
     */
    initHeight() {
        // 17 是索引字母高度
        this.data.set('_initialHeight', this.ref('initial')?.getBoundingClientRect()?.height || 17);
        const cities = this.data.get('_cities');
        const list = this.data.get('_renderCityList');
        const item = list.find(item => !item._initial);
        const index = item?._index || 0;
        const cityItemDom = this.ref(`cityItemDom-${index}`) as unknown as HTMLElement;
        this.cityHeight = cityItemDom?.clientHeight || 0;
        const hotCities = this.ref('hotCities') as unknown as HTMLElement;
        const hotTitle = this.ref('hotTitle') as unknown as HTMLElement;
        const hotHeight = hotCities?.clientHeight + hotTitle?.clientHeight;
        this.hotHeight = Number.isNaN(hotHeight) ? 0 : hotHeight;
        this.data.set('_citiesHeight', cities.length * this.cityHeight + this.hotHeight);
    }

    selectHotCity(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        const index = dataIndex(e.target, '.cos-city-selector-initial-hot-label');
        if (!index && index !== 0) {
            return;
        }
        const hotCities = this.data.get('_hotCities');
        hotCities?.length && this.fire('select', {city: hotCities[index], from: From.HOT});
    }

    selectCity(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        const index = dataIndex(e.target, '.cos-city-selector-initial-city-wrap');
        if (!index && index !== 0) {
            return;
        }
        const renderCityList = this.data.get('_renderCityList');
        renderCityList?.length && this.fire('select', {city: renderCityList[index], from: From.LETTER});
    }

    handleCityDataLoad(cities: City[]) {
        if (!cities?.length) {
            return;
        }
        const list = cities.slice(0, RENDER_COUNT);
        this.data.set('_renderCityList', list);
        this.nextTick(() => {
            this.initHeight();
            this.position = cities.map((item, index) => {
                return {
                    index,
                    height: this.cityHeight,
                    top: index * this.cityHeight,
                    bottom: (index + 1) * this.cityHeight
                };
            });
        });
    }

    /**
     * 计算当前偏移量
     * @param start 开始索引
     * @param currentBuffer 缓冲值
     * @returns 当前偏移量
     */
    getCurrentOffset(start: number, currentBuffer: number) {
        if (start <= 0) {
            return 0;
        }
        const differTop = this.position[start - currentBuffer]?.top || 0;
        return this.position[start - 1].bottom - this.position[start].top + differTop;
    }

    /**
     * 更新列表每项高度
     */
    updatePositions() {
        const list = this.data.get('_renderCityList');
        list.forEach(item => {
            const index = item._index;
            const node = this.ref(`cityItemDom-${index}`) as unknown as HTMLElement;
            if (!node) {
                return;
            }
            // 获取 真实DOM高度
            const height = node.clientHeight;
            let oldHeight = this.position[index].height;
            // dValue：真实高度与预估高度的差值 决定该列表项是否要更新
            let dValue = oldHeight - height;
            // 如果有高度差 !!dValue === true
            if (dValue) {
                // 更新对应列表项的 bottom 和 height
                this.position[index].bottom -= dValue;
                this.position[index].height = height;
                // 依次更新positions中后续元素的 top bottom
                for (let k = index + 1; k < this.position.length; k++) {
                    this.position[k].top = this.position[k - 1].bottom;
                    this.position[k].bottom -= dValue;
                }
            }
        });
        this.data.set('_citiesHeight', this.position[this.position.length - 1].bottom + this.hotHeight);
    }

    /**
     * 更新当前索引
     * @param list 城市列表
     * @param currentBuffer 缓冲值
     */
    updateCurrentInitial(list: City[], currentBuffer: number) {
        const initial = list[currentBuffer]?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
        const currentInitial = this.data.get('_currentInitial');
        if (!initial || initial === currentInitial.initial) {
            return;
        }

        const _initialList = this.data.get('_initialList');
        const index = _initialList.findIndex((item: {initial: Initial}) => item.initial === initial);
        this.data.set('_currentInitial', {
            initial,
            index
        });
    }

    /**
     * 二分法查找开始索引
     * @param scrollTop 滚动高度
     */
    getStartIndex(scrollTop: number) {
        let start = 0;
        let end = this.position.length - 1;
        let tempIndex = null;
        while (start <= end) {
            // 向下取整
            let midIndex = (start + end) >> 1;
            let midValue = this.position[midIndex].bottom;
            if (midValue === scrollTop) {
                tempIndex = midIndex + 1;
                break;
            }
            else if (midValue < scrollTop) {
                start = midIndex + 1;
            }
            else {
                if (tempIndex === null || tempIndex > midIndex) {
                    tempIndex = midIndex;
                }
                end = midIndex - 1;
            }
        }
        return tempIndex;
    }

    /**
     * 获取城市滚动数据信息
     * @param index 开始索引
     */
    getCityScrollDataInfo(index?: number, buffer?: number) {
        const citiesWrap = this.ref('citiesWrap') as unknown as HTMLElement;
        const scrollTop = citiesWrap.scrollTop;
        let startIndex = (index !== undefined ? index : this.getStartIndex(scrollTop)) as number;
        // 预留缓冲区
        const currentBuffer = buffer && buffer > 0 ? buffer
            : (startIndex < BUFFER_COUNT ? startIndex : BUFFER_COUNT);
        const startOffset = this.getCurrentOffset(startIndex, currentBuffer);
        startIndex = startIndex - currentBuffer;
        // 往下滑动一定距离后隐藏热门城市，避免往上滑动太快时，热门城市若隐若现的问题
        this.data.set('_hideHot', startOffset / 2 > this.hotHeight);
        return {
            startOffset,
            startIndex,
            currentBuffer
        };
    }

    scrollCurrentCityIndex(index: number) {
        const cities = this.data.get('_cities');

        // 当判断当前选中索引的后续数据较少，无法支持前后 6 条数据作为滚动缓冲区时，直接渲染到最后，RENDER_COUNT 缺少数量往前取
        const start = (index + RENDER_COUNT - BUFFER_COUNT) > cities.length
            ? (cities.length - RENDER_COUNT)
            : index;
        const {startOffset, startIndex, currentBuffer}
            = this.getCityScrollDataInfo(index, index - start);
        const endIdx = startIndex + RENDER_COUNT;
        const list = cities.slice(startIndex, endIdx);
        const citiesWrap = this.ref('citiesWrap') as unknown as HTMLElement;
        this.data.set('_renderCityList', list);
        this.clickScroll = true;
        this.nextTick(() => {
            citiesWrap.style.webkitOverflowScrolling = 'auto';
            citiesWrap.scrollTo(0, startOffset + currentBuffer * this.cityHeight + this.hotHeight);
            this.data.set('startOffset', startOffset);
            this.updatePositions();
            citiesWrap.style.webkitOverflowScrolling = 'touch';
            this.lastScrollTop = this.ref('citiesWrap').scrollTop;
            this.lastScrollTime = Date.now();
        });
    }

    /**
     * 滚动到当前索引
     * @param index 字母索引
     */
    scrollCurrentInitialCites(index: number) {
        const _initialList = this.data.get('_initialList');
        const currentInitial = _initialList[index];
        this.scrollCurrentCityIndex(currentInitial.index);
    }

    onScroll() {
        if (this.clickScroll) {
            this.clickScroll = false;
            return;
        }
        this.updatePositions();
        let {startOffset, startIndex, currentBuffer} = this.getCityScrollDataInfo();
        const cities = this.data.get('_cities');
        const endIdx = startIndex + RENDER_COUNT;
        const list = cities.slice(startIndex, endIdx);
        this.updateCurrentInitial(list, currentBuffer);
        this.data.set('_renderCityList', list);
        this.data.set('startOffset', startOffset);
        this.lastScrollTop = this.ref('citiesWrap').scrollTop;
        this.lastScrollTime = Date.now();
    }

    stopMenu(event: { preventDefault: () => void }) {
        event.preventDefault();
    }

    stepMove(e: any) {
        const {clientY} = e.changedTouches[0];
        const sideBarStep = this.data.get('sideBarStep');
        if (!sideBarStep?.length) {
            return;
        }
        if (clientY >= sideBarStep[sideBarStep.length - 1]) {
            return sideBarStep.length - 1;
        }
        const stepIndex = Math.max(sideBarStep.findIndex((step: number) => clientY < step), 0);
        return stepIndex;
    }

    touchStart(e: Event) {
        const index = dataIndex(e.target, 'li');
        if (!index && index !== 0) {
            return;
        }
        this.cancelClickScroll = false;
        const _initialList = this.data.get('_initialList');
        const deltaTime = Date.now() - this.lastScrollTime;

        // 避免在快速滚动过程中点击，容易出现白屏
        if (deltaTime < 100) {
            this.cancelClickScroll = true;
            return;
        }
        this.data.set('_currentInitial', {
            initial: _initialList[index].initial,
            index
        });
        this.showBubble();
        this.data.set('_isTouching', true);
        // @ts-ignore
        const {top, height} = (this.ref('sideBarWrapper')).getClientRects()[0];
        const step = height / _initialList.length;
        // sideBarStep 记录每个字母的位置
        const sideBarStep = new Array(_initialList.length).fill(1).map((item, index) => (index + 1) * step + top);
        this.data.set('sideBarStep', sideBarStep);
    }

    touchMove(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        const index = dataIndex(e.target, 'li');
        if ((!index && index !== 0) || this.cancelClickScroll) {
            return;
        }
        const currentIndex = this.stepMove(e);
        if (this.activeInitialIndex === currentIndex) {
            return;
        }
        this.activeInitialIndex = currentIndex;
        const _initialList = this.data.get('_initialList');
        const currentInitial = _initialList[currentIndex];
        this.data.set('_currentInitial', {
            initial: currentInitial.initial,
            index: currentIndex
        });
        if (!this.clickDebounce) {
            this.clickDebounce = new Debounce(80);
        }
        this.clickDebounce?.debounce(this.scrollCurrentInitialCites.bind(this, currentIndex), this);
        this.showBubble();
    }

    touchEnd(e: Event) {
        this.data.set('_isTouching', false);
        const index = dataIndex(e.target, 'li');
        if ((!index && index !== 0) || this.cancelClickScroll) {
            return;
        }
        const currentIndex = this.stepMove(e);
        this.scrollCurrentInitialCites(currentIndex);
    }

    showBubble() {
        this.data.set('_showBubble', true);
        if (!this.debounce) {
            this.debounce = new Debounce(1000);
        }
        this.debounce?.debounce(() => {
            this.data.set('_showBubble', false);
        }, this);
    }
}