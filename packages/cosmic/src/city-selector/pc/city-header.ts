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
import {CitySelectorData, City, From} from '../interface';
import Input from '@cosui/cosmic/input';
import Icon from '@cosui/cosmic/icon';
import Popover from '@cosui/cosmic/popover';
import Tooltip from '@cosui/cosmic/tooltip';
import {Debounce} from '../../util';
import {matchNameAndPinyin, dataIndex} from '../util/city';

export default class CitySelector extends Component<CitySelectorData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-header">
            <div class="cos-city-selector-header-search">
                <cos-input
                    s-ref="input"
                    clear
                    size="sm"
                    class="{{_isSearch ? 'cos-city-selector-header-input' : ''}}"
                    value="{=_value=}"
                    placeholder="{{placeholder}}"
                    on-input="changeInput"
                    on-clear="clearInput"
                    on-focus="focusInput"
                >
                    <cos-icon slot="title" name="search" />
                </cos-input>
            </div>
            <cos-popover
                open="{=_open=}"
                on-close="handleClose"
            >
                <div s-if="_sugList.length" s-ref="searchWrap"
                    class="cos-city-selector-header-list"
                    on-scroll="cityScroll" on-click="selectCity">
                    <div s-for="option, index in _sugList" data-index="{{index}}"
                        class="cos-line-clamp-1 cos-city-selector-header-option">
                        <template s-for="word, idx in option.viewWord">
                            <span s-if="word._isSearchWord"
                                class="cos-city-selector-header-option-highlight">{{ word.text }}</span>
                            <template s-else>{{ word.text }}</template>
                        </template>
                        <template s-if="!option.viewWord.length">
                            {{ option._showMenuLabel }}
                        </template>
                        <span class="cos-city-selector-header-option-desc">
                            {{option | optionDesc}}</span>
                    </div>
                </div>
                <div s-else class="cos-city-selector-header-none">
                    暂无内容
                </div>
            </cos-popover>
        </div>
    `;

    static components = {
        'cos-input': Input,
        'cos-icon': Icon,
        'cos-popover': Popover,
        'cos-tooltip': Tooltip
    };

    static filters = {
        optionDesc: (option: City) => {
            const desc = option.country
                ? `, ${option.province ? option.province + ', ' : ''}${option.country}`
                : `${option.province ? ', ' + option.province : ''}`;
            return option?.level === '2' ? `${option.city ? ', ' + option.city : ''}${desc}` : desc;
        }
    };

    debounce: Debounce | null;
    allSugList: City[];
    currScrollTop: number;

    initData() {
        return {
            _isSearch: false,
            _sugList: [],
            nativeCities: [],
            foreignCities: [],
            _value: '',
            _open: false
        };
    }

    inited() {
        this.allSugList = [];
        this.currScrollTop = 0;
    }

    detached() {
        this.debounce?.clean();
    }

    focusInput() {
        this.data.set('_isSearch', true);
    }

    changeInput({value}: {value: string}) {
        if (!value) {
            this.clearInput();
        }

        if (!this.debounce) {
            this.debounce = new Debounce(10);
        }
        this.debounce?.debounce(this.searchCity.bind(this, value), this);
    }

    clearInput() {
        this.data.set('_sugList', []);
    }

    searchCity(selectedCities: string) {
        this.data.set('_sugList', []);
        const nativeCities = this.data.get('nativeCities') || [];
        const foreignCities = this.data.get('foreignCities') || [];
        // 搜索城市
        const datalist = [...nativeCities, ...foreignCities];
        this.allSugList = matchNameAndPinyin(datalist, selectedCities,
            nativeCities.length && foreignCities.length
        );
        // 切片渲染
        this.searchListRender();
        this.data.set('_open', true);
    }

    searchListRender() {
        if (!this.allSugList.length) {
            return;
        }
        const renderSearchList = this.data.get('_sugList') || [];
        if (renderSearchList.length >= this.allSugList.length) {
            return;
        }
        const incrementList = this.allSugList.slice(renderSearchList.length, renderSearchList.length + 100);
        this.data.splice('_sugList', [renderSearchList.length, 0, ...(incrementList || [])]);
    }

    handleClose() {
        this.data.set('_value', '');
        this.data.set('_isSearch', false);
    }

    /**
     * 可滚动距离小于 300 时，拼接增加 100 条数据
     */
    cityScroll() {
        const searchWrap = this.ref('searchWrap') as unknown as HTMLElement;
        const {scrollHeight, scrollTop, clientHeight} = searchWrap;
        const isPullDown = this.currScrollTop < scrollTop;
        if (!isPullDown) {
            return;
        }
        this.currScrollTop = scrollTop;
        const offset = scrollHeight - clientHeight - scrollTop;
        if (offset >= 300 || !this.allSugList.length) {
            return;
        }
        this.searchListRender();
    }

    selectCity(e: Event) {
        const index = dataIndex(e.target, '.cos-city-selector-header-option');
        if (!index && index !== 0) {
            return;
        }
        const sugList = this.data.get('_sugList');
        sugList[index] && this.fire('select', {city: sugList[index], from: From.SEARCH});
        this.data.set('_open', false);
    }
}