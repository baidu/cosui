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
import {CitySelectorData, City, Initial, From} from '../interface';
import {activeCity, dataIndex, sameNameDesc} from '../util/city';

export default class CitySelector extends Component<CitySelectorData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-initial" on-scroll="onCityScroll" on-click="selectCity">
            <!-- 顶部导航 -->
            <div s-ref="sideBarWrapper" on-click="clickInitial" class="cos-city-selector-initial-list">
                <div s-for="item, index in _initialList" data-index="{{index}}"
                    class="{{_currentInitial.index === index ? 'cos-city-selector-initial-active' : ''}}">
                    {{ item.initial }}
                </div>
            </div>

            <div s-for="data, index in _renderCityData" class="cos-city-selector-initial-cities"
                    s-ref="{{data.initial ? 'initialItemDom-' + data.initial : ''}}"
                    style="{{index === 0 ? 'margin-top:140px;': ''}}">
                <div s-if="data.initial" class="cos-city-selector-initial-label">{{data.initial}}</div>
                <div class="cos-city-selector-initial-options">
                    <div class="cos-city-selector-initial-option" s-for="option, cityIndex in data.cities">
                        <div class="cos-city-selector-initial-option-label{{
                            {option, selectedCities} | activeCity}}{{
                             option.same ? ' cos-city-selector-initial-same' : ''}}"
                             data-index="{{index}}-{{cityIndex}}">
                            <!-- 同名城市展示 desc -->
                            <template s-if="option.same">
                                <span class="cos-line-clamp-1">{{option._showMenuLabel}}</span>
                                <span class="cos-line-clamp-1 cos-city-selector-initial-same-desc">
                                    ({{option | sameNameDesc}})</span>
                            </template>
                            <span s-else class="cos-line-clamp-2{{option._showMenuLabel.length > 5
                                ? ' cos-city-selector-initial-label-small' : ''}}">
                                {{option._showMenuLabel}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static filters = {
        activeCity: activeCity,
        sameNameDesc: sameNameDesc
    };

    currScrollTop: number;
    renderTimer: ReturnType<typeof setTimeout> | null;
    renderOptimize: boolean;
    markIndex: number;
    markList: number[];
    start: number;
    end: number;
    clickScroll: boolean;
    initData() {
        return {
            _currentInitial: {
                initial: 'A',
                index: 0
            },
            _renderCityData: []
        };
    }

    inited() {
        this.currScrollTop = 0;
        this.renderOptimize = true;
        this.markIndex = 0;
        this.markList = [];
        this.start = 0;
        this.end = 0;
        this.clickScroll = false;
    }

    attached() {
        const cities = this.data.get('_cities');
        // 小于 500 条城市数据不需要做数据渲染优化
        this.renderOptimize = cities.length > 500;
        this.handleCityDataLoad(this.data.get('_initialList'));
        this.watch('_initialList', val => {
            this.handleCityDataLoad(val);
        });
    }

    detached() {
        this.renderTimer && clearTimeout(this.renderTimer);
        this.renderTimer = null;
    }

    handleCityDataLoad(_initialList) {
        if (this.renderOptimize) {
            this.data.set('_renderCityData', [_initialList[0]]);
        }
        else {
            this.cityRender(_initialList);
        }
        this.updatedMarkList();
    }

    /**
     * 不需要渲染优化场景使用，分片排队全部渲染城市数据
     * @param cityList 城市列表数据
     */
    cityRender(cityList: City[]) {
        if (!cityList.length) {
            return;
        }
        let renderCityList = this.data.get('_renderCityData') || [];
        if (renderCityList.length >= cityList.length) {
            // 切片渲染结束再收集偏移数组
            this.updatedMarkList();
            return;
        }

        const list = cityList.slice(renderCityList.length, renderCityList.length + 1);

        this.data.splice('_renderCityData', [renderCityList.length, 0, ...(list || [])]);
        this.renderTimer = setTimeout(this.cityRender.bind(this, cityList), 0);
    }

    updatedMarkList() {
        this.nextTick(() => {
            const _initialList = this.data.get('_initialList');
            this.markList = _initialList?.map((item: {initial: Initial}) =>
                this.ref(`initialItemDom-${item.initial}`)?.offsetTop) || [];
        });
    }

    /**
     * 根据字母索引列表的 offsetTop；计算出当前处于哪个字母范围
     * @returns 字母索引 index
     */
    stepScroll() {
        // @ts-ignore
        let {scrollTop, clientHeight} = this.el;
        scrollTop = scrollTop + clientHeight;

        if (this.markList[this.markList.length - 1]
            && scrollTop >= this.markList[this.markList.length - 1]) {
            return this.markList.length - 1;
        }
        let index = this.markList.findIndex((step: number) => scrollTop <= step) - 1;
        if (index === -2) {
            for (let i = this.markList.length - 1; i >= 0; i--) {
                // 检查当前项是否为数字
                if (typeof this.markList[i] === 'number') {
                    index = i;
                    break;
                }
            }
        }
        return Math.max(index, 0);
    }

    /**
     * 监听城市列表滚动；更新当前选中的字母索引
     */
    onCityScroll() {
        if (this.clickScroll) {
            this.clickScroll = false;
            return;
        }
        const citiesWrap = this.el as unknown as HTMLElement;
        const {scrollHeight, scrollTop, clientHeight} = citiesWrap;
        if (this.currScrollTop === scrollTop) {
            return;
        }
        const isPullUp = this.currScrollTop > scrollTop;
        this.currScrollTop = scrollTop;
        const _initialList = this.data.get('_initialList');
        let currentIndex = this.stepScroll();

        // currentIndex 纠正 往上滚但是索引值变大
        if (isPullUp && currentIndex > this.markIndex) {
            currentIndex = this.markIndex;
        }
        const currentInitial = _initialList[currentIndex];
        const scrollInfo = {
            isPullUp,
            clientHeight,
            scrollHeight,
            scrollTop
        };
        if (currentIndex !== this.markIndex) {
            this.markIndex = currentIndex;
            this.nextTick(() => {
                this.data.set('_currentInitial', {
                    initial: currentInitial.initial,
                    index: currentIndex
                });
            });
        }
        if (!this.renderOptimize) {
            return;
        }
        // 向上滚动时，每次滚动到索引项时，往上一个新的索引项数据
        const scrollDataInfo = this.getCityScrollDataInfo(scrollInfo);

        if (scrollDataInfo) {
            const {start, end, data} = scrollDataInfo;
            this.start = start;
            this.end = end;
            const renderCityData = this.data.get('_renderCityData');
            if (isPullUp) {
                // eslint-disable-next-line max-len
                const top = this.ref(`initialItemDom-${_initialList[currentIndex].initial}`)?.offsetTop - this.el.scrollTop;
                this.data.set('_renderCityData', [...data, ...renderCityData]);
                this.nextTick(() => {
                    this.clickScroll = true;
                    this.el.scrollTop = this.ref(`initialItemDom-${_initialList[currentIndex].initial}`).offsetTop
                        - this.ref('sideBarWrapper').offsetHeight - top;
                    this.el.scrollBy(0, -1);
                });
            }
            else {
                this.data.set('_renderCityData', [...renderCityData, ...data]);
            }
        }
        this.updatedMarkList();
    }

    /**
     * 根据滚动情况拼接返回新的城市列表数据
     * @param scrollInfo 滚动情况参数
     * @returns
     */
    getCityScrollDataInfo(scrollInfo: {
        isPullUp: boolean;
        clientHeight: number;
        scrollHeight: number;
        scrollTop: number;
        currentIndex: number;
    }) {
        const {
            isPullUp,
            clientHeight,
            scrollHeight,
            scrollTop
        } = scrollInfo;
        const _initialList = this.data.get('_initialList');

        // 上拉过程
        if (isPullUp && scrollTop < 500) {
            let preInitial = this.start > 0
                ? [_initialList[this.start - 1]]
                : null;
            // 已无法再加载往上一个索引的数据
            if (!preInitial) {
                return;
            }

            let start = this.start - 1;
            // 已经加载了上一个索引的数据但可滚动距离仍不够 300
            if (start > 0) {
                start -= 1;
                preInitial = [_initialList[start], ...preInitial];
            }

            return {
                start,
                end: this.end,
                data: preInitial
            };
        }

        // 下拉过程
        const offset = scrollHeight - clientHeight - scrollTop;
        // 可下拉高度大于 300 或者已无法下拉
        if (offset >= 300 || this.end === _initialList.length - 1) {
            return;
        }
        return {
            start: this.start,
            end: this.end + 1,
            data: [_initialList[this.end + 1]]
        };
    }

    /**
     * 点击切换索引；渲染优化场景加载当前点击索引和上一个索引的数据
     */
    clickInitial(e: Event) {
        e.stopPropagation();
        e.preventDefault();
        const index = dataIndex(e.target, 'div');
        if (!index && index !== 0) {
            return;
        }
        const _initialList = this.data.get('_initialList');
        const item = _initialList[index];
        if (!this.renderOptimize) {
            this.scrollInitial(item, index);
            return;
        }
        const renderCityData = index === 0 ? [item] : [_initialList[index - 1], item];
        this.data.set('_renderCityData', index === _initialList.length - 1
            ? renderCityData
            : [...renderCityData, _initialList[index + 1]]);
        this.start = Math.max(index - 1, 0);
        this.end = Math.min(index + 1, _initialList.length - 1);
        this.clickScroll = true;
        this.el.scrollTop = 0;
        this.scrollInitial(item, index);
    }

    scrollInitial(item: Initial, index: number) {
        this.nextTick(() => {
            this.data.set('_currentInitial', {
                initial: item.initial,
                index
            });
            this.markIndex = index;
            this.renderOptimize && this.updatedMarkList();
            this.clickScroll = true;
            this.el.scrollTop = this.ref(`initialItemDom-${item.initial}`).offsetTop
                - this.ref('sideBarWrapper').offsetHeight - (this.renderOptimize ? this.el.scrollTop : 0);
            this.currScrollTop = this.el.scrollTop;
        });
    }

    selectCity(e: Event) {
        const indexStr = e.target?.closest('.cos-city-selector-initial-option-label')?.dataset.index;
        if (!indexStr) {
            return;
        }
        const indexArr = indexStr.split('-');
        const renderCityData = this.data.get('_renderCityData');
        const city = renderCityData?.[+indexArr[0]]?.cities?.[+indexArr[1]];
        city && this.fire('select', {city, from: From.LETTER});
    }
}