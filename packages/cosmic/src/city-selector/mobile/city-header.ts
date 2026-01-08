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
import {CitySelectorHeaderData, City, From} from '../interface';
import Icon from '@cosui/cosmic/icon';
import {matchNameAndPinyin, dataIndex} from '../util/city';
import SearchInput from '../../common/search-input';

export default class CitySelectorHeader extends Component<CitySelectorHeaderData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-header">
            <cos-search-input
                value="{{_value}}"
                placeholder="{{placeholder}}"
                active="{{_isSearch}}"
                on-focus="startSearch"
                on-input="handleInputChange"
                on-clear="clearInput"
                on-cancel="cancelSearch"
            />
            <div s-ref="options"
                style="{{{
                    'display': _isSearch ? 'block' : 'none',
                    'opacity': _isSearch ? 1 : 0
                }}}" class="cos-city-selector-header-list"
                on-touchmove="cityScroll" on-click="selectCity">
                <div
                    s-for="option, index in _sugList"
                    data-index="{{index}}"
                    class="cos-city-selector-header-option">

                    <cos-icon name="search"></cos-icon>
                    <div>
                        <template s-for="word, idx in option.viewWord">
                            <span s-if="word._isSearchWord"
                                class="cos-city-selector-header-option-highlight">{{ word.text }}</span>
                            <template s-else>{{ word.text }}</template>
                        </template>
                        <template s-if="!option.viewWord.length">
                            {{ option._showMenuLabel}}
                         </template>
                        <span
                            s-if="option.english"
                            class="cos-city-selector-header-option-english"
                            >{{option.english}}</span>
                        <span class="cos-city-selector-header-option-desc">{{option | optionDesc}}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-search-input': SearchInput
    };

    static filters = {
        optionDesc(option: City) {
            const desc = option.continent
                ? `${option.province ? option.province + '-' : ''}${option.country}`
                : (option.province || '');
            return option?.level === '2' ? `${option.city}${desc ? '-' + desc : ''}` : desc;
        }
    };

    allSugList: City[];
    initData() {
        return {
            _isSearch: false,
            foreignCities: [],
            _sugList: [],
            nativeCities: [],
            _value: ''
        };
    }

    inited() {
        this.allSugList = [];
    }

    startSearch() {
        this.data.set('_isSearch', true);
    }

    cancelSearch() {
        this.data.set('_value', '');
        this.clearInput();
        this.data.set('_isSearch', false);
    }

    clearInput() {
        this.data.set('_sugList', []);
        this.data.set('_value', '');
    }
    handleInputChange(value: string) {
        if (!value) {
            this.clearInput();
        }
        this.data.set('_value', value);
        this.searchCity(value);
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
    }

    // 如果当前搜索列表的下一页已经不够一屏展示，加载下一页
    cityScroll() {
        const _sugList = this.data.get('_sugList');
        const searchList = this.ref('options') as unknown as HTMLElement;
        if (_sugList.length < 100 || !this.allSugList.length || !searchList) {
            return;
        }
        if (searchList.offsetHeight - searchList.scrollTop < window.innerHeight * 5) {
            this.searchListRender();
        }
    }

    selectCity(e: Event) {
        const index = dataIndex(e.target, '.cos-city-selector-header-option');
        if (!index && index !== 0) {
            return;
        }
        const _sugList = this.data.get('_sugList');
        _sugList[index] && this.fire('select', {city: _sugList[index], from: From.SEARCH});
    }
}