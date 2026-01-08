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
import InitialContent from './initial-content';
import {activeCity, dataIndex, sameNameDesc, scrollSelectedCity} from '../util/city';

export default class CitySelector extends Component<CitySelectorData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-content">
            <div class="cos-city-selector-content-menu" on-click="handleClickMenu">
                <div s-for="item, index in _menuList" data-index="{{index}}"
                    class="cos-city-selector-content-menu-item{{_activeMenuIndex === index
                        ? ' cos-city-selector-content-menu-active' : ''}}">{{item.label}}</div>
            </div>
            <cos-initial-content
                s-if="useInitial"
                selectedCities="{{selectedCities}}"
                _cities="{{_cities}}"
                _initialList="{{_initialList}}"
                on-select="selectCity" />
            <div s-else class="cos-city-selector-content-countries" s-ref="countries" on-click="handleClickCity">
                <div s-for="country, index in _renderCityList"
                    class="cos-city-selector-content-country">
                    <div s-if="_activeMenuIndex !== 0" class="cos-city-selector-content-label">{{country.label}}</div>
                    <div class="cos-city-selector-content-cities">

                        <div s-for="option, cityIndex in country.cities" class="cos-city-selector-content-city{{
                        foreignNotUseContinent ? ' cos-city-selector-content-not-continent' : ''}}">
                            <div class="cos-city-selector-content-city-label{{
                                {option, selectedCities} | activeCity}}{{
                                option.same && !foreignNotUseContinent ? ' cos-city-selector-content-city-same' : ''}}"
                                s-ref="{{selectedCities.length && option._index == selectedCities[0]._index
                                    ? 'selectedCity' : ''}}"
                                data-index="{{index}}-{{cityIndex}}">

                                 <!-- 热门城市 -->
                                <span s-if="{{_activeMenuIndex === 0 && option.hot}}"
                                      class="cos-line-clamp-1 cos-city-selector-content-city-hot">
                                    {{option.level === '2' ? option.county: option.city}}</span>

                                <!-- 同名城市展示 desc -->
                                <template s-elif="option.same && !foreignNotUseContinent">
                                    <span class="cos-line-clamp-1">{{option._showMenuLabel}}</span>
                                    <span class="cos-line-clamp-1 cos-city-selector-content-city-same-desc">
                                        ({{option | sameNameDesc}})</span>
                                </template>

                                <span s-else class="cos-line-clamp-2{{
                                option | small(foreignNotUseContinent)}}">
                                    {{option._showMenuLabel}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-initial-content': InitialContent
    };

    static computed = {
        /**
         * 是否使用字母索引面板
         */
        useInitial(this: CitySelector) {
            return this.data.get('_useContinent') && this.data.get('_activeForeign')
                && this.data.get('_activeMenuIndex') === (this.data.get('_menuList')?.length - 1);
        },

        /**
         * 国际数据不使用大洲面板的情况
         */
        foreignNotUseContinent(this: CitySelector) {
            return this.data.get('_activeForeign') && !this.data.get('_useContinent');
        }

    };
    static filters = {
        activeCity: activeCity,
        sameNameDesc: sameNameDesc,

        /**
         * 使用小字体
         * @param option 城市数据
         * @param foreignNotUseContinent 国际数据不使用大洲面板的情况
         */
        small: (option: City, foreignNotUseContinent: boolean) => {
            return ((option._showMenuLabel.length > 5 && !foreignNotUseContinent)
                || option._showMenuLabel.length > 10)
                ? ' cos-city-selector-content-city-label-small' : '';
        }
    };

    initData() {
        return {
            _activeMenuIndex: 0,
            _renderCityList: [],
            _menuList: [],
            _useContinent: false,
            _activeForeign: false
        };
    }

    attached() {
        const selectedCity = this.data.get('selectedCities')?.[0];
        const anchor = this.data.get('anchor');
        let activeIndex = 0;
        if (selectedCity && anchor) {
            activeIndex = selectedCity.hot ? 0 : (selectedCity?._menuIndex || 0);

            // 仅在打开窗口时自动滚动到选中城市
            this.data.set('anchor', false);
            this.data.set('_activeMenuIndex', activeIndex);

            this.updateRenderCity(activeIndex);

            this.nextTick(() => {
                const countries = this.ref('countries') as unknown as HTMLInputElement;
                const selectedCity = this.ref('selectedCity') as unknown as HTMLInputElement;
                scrollSelectedCity(countries, selectedCity);
            });
        }
        else {
            this.updateRenderCity(activeIndex);
        }

        this.watch('_menuList', () => {
            this.updateRenderCity(this.data.get('_activeMenuIndex'));
        });
    }

    updateRenderCity(index: number) {
        const _menuList = this.data.get('_menuList');
        if (!_menuList?.length || !_menuList?.[index]?.content) {
            return;
        }
        this.data.set('_renderCityList', _menuList[index].content || []);
    }

    handleClickMenu(e: Event) {
        const index = dataIndex(e.target, '.cos-city-selector-content-menu-item');
        if (!index && index !== 0) {
            return;
        }
        this.data.set('_activeMenuIndex', index);
        if (this.data.get('useInitial')) {
            return;
        }
        this.updateRenderCity(index);
        this.nextTick(() => {
            this.ref('countries').scrollTop = 0;
        });
    }

    selectCity({city, from}: {city: City, from: From}) {
        city._menuIndex = this.data.get('_activeMenuIndex');
        if (from === From.LETTER) {
            const countryIndex = this.data.get('_menuList')?.findIndex(country => country.label === city.continent);
            city._menuIndex = countryIndex || 0;
        }
        this.fire('select', {city, from});
    }

    handleClickCity(e: Event) {
        const indexStr = e.target?.closest('.cos-city-selector-content-city-label')?.dataset.index;
        if (!indexStr) {
            return;
        }
        const indexArr = indexStr.split('-');
        const renderCityList = this.data.get('_renderCityList');
        const city = renderCityList?.[+indexArr[0]]?.cities?.[+indexArr[1]];
        if (!city) {
            return;
        }
        const menuIndex = this.data.get('_activeMenuIndex');
        city._menuIndex = menuIndex;
        this.selectCity({city, from: menuIndex === 0 && city.hot
            ? From.HOT : From.MENU});
    }
}