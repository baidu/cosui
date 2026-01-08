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
import {CitySelectorContentData, City, From} from '../interface';
import CityContent from './initial-content';
import Icon from '@cosui/cosmic/icon';
import {activeCity, dataIndex, sameNameDesc, scrollSelectedCity} from '../util/city';

export default class CitySelectorForeign extends Component<CitySelectorContentData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-city-selector-content">

            <!-- 国际大洲菜单 -->
            <div class="cos-city-selector-content-menu" on-click="handleClickMenu">
                <div s-for="item, index in _menuList" data-index="{{index}}"
                    class="cos-city-selector-content-menu-item{{
                        _activeMenuIndex === index ? ' cos-city-selector-content-menu-active' : ''}}"
                >{{item.label}}</div>
            </div>

            <!-- 字母查询城市面板 -->
            <cos-city-content
                s-if="_activeMenuIndex === _menuList.length - 1"
                _useContinent
                selectedCities="{{selectedCities}}"
                _cities="{{_cities}}"
                _initialList="{{_initialList}}"
                on-select="selectCity" />

            <!-- 国际城市面板 -->
            <div s-else s-ref="countries" class="cos-city-selector-content-countries">
                <div s-for="country, index in _renderCityList" on-click="handleClickCity"
                    class="cos-city-selector-content-country">
                    <div class="cos-city-selector-content-initial">{{country.label}}</div>
                    <div class="cos-city-selector-content-cities">
                        <template s-for="option, cityIndex in country.cities">

                            <div s-if="{{cityIndex <= _ellipsisCount || !(country.cities[_ellipsisCount]._ellipsis)}}"
                            class="cos-city-selector-content-city{{
                                {option, selectedCities} | activeCity}}"
                                s-ref="{{{option, selectedCities} | activeCity}}"
                            >

                                <!-- 展示省略标记 -->
                                <div s-if="cityIndex === _ellipsisCount && option._ellipsis"
                                    class="cos-city-selector-content-city-more"
                                    on-click="handleClickMore($event, index, cityIndex)">
                                    更多<cos-icon name="down"/>
                                </div>

                                <!-- 正常展示城市信息 -->
                                <div s-else data-index="{{index}}-{{cityIndex}}"
                                    class="cos-city-selector-content-city-label{{option.same
                                        ? ' cos-city-selector-content-city-same' : ''}}">
                                    <!-- 同名城市展示 desc -->
                                    <template s-if="option.same">
                                        <span class="cos-line-clamp-1">{{option._showMenuLabel}}</span>
                                        <span class="cos-line-clamp-1 cos-city-selector-content-city-same-desc">
                                            ({{option | sameNameDesc}})</span>
                                    </template>
                                    <span s-else class="cos-line-clamp-2{{option._showMenuLabel.length > 5
                                        ? ' cos-city-selector-content-city-label-small' : ''}}">
                                        {{option._showMenuLabel}}
                                    </span>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-city-content': CityContent,
        'cos-icon': Icon
    };

    static filters = {
        activeCity: activeCity,
        sameNameDesc: sameNameDesc
    };

    initData() {
        return {
            _activeMenuIndex: 0,
            _renderCityList: [],
            _menuList: [],
            _foreignNoEllipsis: []
        };
    }

    attached() {
        const selectedCity = this.data.get('selectedCities')?.[0];
        const anchor = this.data.get('anchor');
        let activeIndex = 0;

        if (anchor && selectedCity?._activeTab === 1) {
            this.data.set('anchor', false);
            activeIndex = selectedCity.hot ? 0 : (selectedCity?._menuIndex || 0);
            this.data.set('_activeMenuIndex', activeIndex);
            this.nextTick(() => {
                const countries = this.ref('countries') as unknown as HTMLInputElement;
                const selectedCityRef = this.ref(' cos-city-selector-active-city') as unknown as HTMLInputElement;
                scrollSelectedCity(countries, selectedCityRef);
            });
        }
        this.updateRenderCity(activeIndex);
        this.watch('_menuList', () => {
            this.updateRenderCity(this.data.get('_activeMenuIndex'));
        });
    }

    updateRenderCity(index: number) {
        const menuList = this.data.get('_menuList');
        if (!menuList.length || !menuList?.[index]?.content) {
            return;
        }
        const foreignNoEllipsis = this.data.get('_foreignNoEllipsis');
        // 简单深拷贝，避免 _ellipsis 的修改影响原始数据
        const menuItem = JSON.parse(JSON.stringify(menuList[index].content));
        const _ellipsisCount = this.data.get('_ellipsisCount');

        /**
         * 需要强制展开省略的城市，展开场景：
         * 1.用户手动点击“更多”，需要保持展开
         * 2.已选城市在被省略的范畴，需要展开滚动到可视区
         */
        foreignNoEllipsis[index]?.forEach(({index}: {index: number}) => {
            // 找到被记录为省略开头的城市，把省略标记设置为 false，表示强制展开
            menuItem[index].cities?.[_ellipsisCount] && (menuItem[index].cities[_ellipsisCount]._ellipsis = false);
        });
        this.data.set('_renderCityList', menuItem);
    }

    handleClickMenu(e: Event) {
        const index = dataIndex(e.target, '.cos-city-selector-content-menu-item');
        if (!index && index !== 0) {
            return;
        }
        this.data.set('_activeMenuIndex', index);
        if (index === this.data.get('_menuList').length - 1) {
            return;
        }
        this.updateRenderCity(index);
        this.nextTick(() => {
            (this.ref('countries') as unknown as HTMLElement).scrollTop = 0;
        });
    }

    selectCity({city, from}: {city: City, from?: From}) {
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
        city && this.selectCity({city, from: this.data.get('_activeMenuIndex') === 0 && city.hot
            ? From.HOT : From.MENU});
    }

    handleClickMore(e: Event, index: number, cityIndex: number) {
        e.stopPropagation();
        const menuIndex = this.data.get('_activeMenuIndex');
        this.data.set(`_renderCityList.${index}.cities.${cityIndex}._ellipsis`, false);
        this.fire('more', {menuIndex, index, cityIndex});
    }
}