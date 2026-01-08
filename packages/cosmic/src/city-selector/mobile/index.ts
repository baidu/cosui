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
import {CitySelectorData, City, Initial, MenuCity,
    From, CitySelectorMethods, CitySelectorEvents,
    CitySelectorProps} from '../interface';
import Drawer from '@cosui/cosmic/drawer';
import CityHeader from './city-header';
import CityContent from './initial-content';
import ForeignContent from './menu-content';
import Icon from '@cosui/cosmic/icon';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import {getObjectValues, findSameCity} from '../util/city';

/**
 * 格式化城市数据
 * @param cities 城市列表
 * @param hotTitle 热门城市标题
 * @param useContinent 是否使用大洲面板
 * @returns 格式化的城市数据
 */
function getCityList(cities: City[], hotTitle?: string, useContinent?: boolean): {
    hotCities: City[];
    initialList: Initial[];
    cities: City[];
    menuList: MenuCity[];
} {
    // 热门城市
    const hotCities: City[] = [];
    // 字母列表
    const initialList: Initial[] = [];
    // 国际分类
    const menuList: MenuCity[] = [];

    cities = getObjectValues(cities).sort((a, b) => {
        const aInitial = a?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
        const bInitial = b?.pinyin?.trim().charAt(0)?.toUpperCase() || '';

        // 避免打乱业务热门城市顺序，在这里存下 hot 数据
        b.hot && !hotCities.includes(b) && hotCities.push(b);

        // 按照字母排序城市，国际面板避免打乱业务 menu 展现顺序，存下顺序
        if (hotTitle && useContinent) {
            let labelIndex = menuList.findIndex(country => country.label === a.continent);

            // 分类大洲
            labelIndex === -1 && menuList.push({
                label: a.continent,
                content: []
            });
            labelIndex = labelIndex !== -1 ? labelIndex : menuList.length - 1;
            let countryIndex = menuList[labelIndex].content.findIndex(city => city.label === a.country);
            // 分类国家
            countryIndex === -1 && menuList[labelIndex].content.push({
                label: a.country,
                cities: []
            });
        }
        return aInitial.localeCompare(bInitial);
    });

    cities.forEach((region, index) => {
        if (!region.city && !region.county && !region.province) {
            throw new Error('please provide correct data fields');
        }

        region._index = index;
        const initial = region?.pinyin?.trim().charAt(0)?.toUpperCase() || '';

        // 字母索引
        if (!initialList.some(item => item.initial === initial)) {
            region._initial = initial;
            initialList.push({
                initial,
                index
            });
        }
        if (hotTitle && useContinent) {
            let labelIndex = menuList.findIndex(country => country.label === region.continent);


            let countryIndex = menuList[labelIndex].content.findIndex(city => city.label === region.country);

            countryIndex = countryIndex !== -1 ? countryIndex : menuList[labelIndex].content.length - 1;
            const currentCountry = menuList[labelIndex].content[countryIndex].cities;
            if (region.english && region.english.length) {
                region.english = region.english.charAt(0).toUpperCase() + region.english.slice(1);
            }

            // 如果当前国家的城市数量多于8个（小屏省略）或12个（大屏省略），添加省略标记
            // 通过省略标记来判断是否省略可以兼容用户点击 “更多” 要求不省略的情况
            if (currentCountry.length === 8 || currentCountry.length === 12) {
                currentCountry[currentCountry.length - 1]._ellipsis = true;
            }

            // 有热门城市 menu 时，当前的 menuIndex 要 +1 才是最终的 menuIndex
            region._menuIndex = labelIndex + (hotTitle && useContinent ? 1 : 0);

            region._cityIndex = currentCountry.length;
            currentCountry.push(region);
        }
        if (region?.level === '2') {
            region._showLabel = region.province
                ? `${region.county}, ${region.city}, ${region.province}`
                : `${region.county}, ${region.city}`;
            region._showMenuLabel = region.county;
        }
        else {
            region._showLabel = region.province
                ? `${region.city}, ${region.province}`
                : region.city;
            region._showMenuLabel = region.city;
        }
        region._showLabel = region.country ? `${region._showLabel}, ${region.country}` : region._showLabel;
    });

    if (hotTitle && useContinent) {
        hotCities.length && menuList.unshift({
            label: '热门',
            content: [
                {
                    label: hotTitle,
                    cities: hotCities
                }
            ]
        });
        menuList.push({
            label: '字母查询',
            content: []
        });

    }

    return {
        hotCities,
        initialList,
        cities,
        menuList
    };
}

export default class CitySelector extends Component<CitySelectorData> implements CitySelectorMethods {

    static trimWhitespace = 'all';

    static template = `
        <cos-drawer
            open="{=open=}"
            title="{{title}}"
            getPopupContainer="{{getPopupContainer}}"
            on-close="handleClose"
            class="cos-city-selector"
        >
            <cos-city-header
                placeholder="{{placeholder}}"
                nativeCities="{{nativeCities}}"
                foreignCities="{{foreignCities}}"
                on-select="selectCity" />

            <template s-if="isForeign">
                <cos-tabs appearance="line" activeIndex="{{activeTab}}"
                    class="cos-city-selector-tabs"
                    on-change="handleChange">
                    <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                    <div class="cos-divider" style="width: 100%"></div>
                    <cos-tab-pane s-for="tab,index in tabs">

                        <cos-city-content
                            s-if="activeTab === 0"
                            hotTitle="{{hotTitle}}"
                            selectedCities="{{selectedCities}}"
                            anchor="{=anchor=}"
                            _hotCities="{{cityData.hotCities}}"
                            _cities="{{cityData.cities}}"
                            _initialList="{{cityData.initialList}}"
                            on-select="selectCity" />
                        <component
                            s-is="{{useContinent ? 'cos-foreign-content' : 'cos-city-content'}}"
                            s-if="activeTab === 1"
                            hotTitle="{{hotTitle}}"
                            anchor="{=anchor=}"
                            selectedCities="{{selectedCities}}"
                            _useContinent="{{useContinent}}"
                            _hotCities="{{foreignData.hotCities}}"
                            _cities="{{foreignData.cities}}"
                            _activeForeign="{{activeForeign}}"
                            _menuList="{{foreignData.menuList}}"
                            _initialList="{{foreignData.initialList}}"
                            _foreignNoEllipsis="{{_foreignNoEllipsis}}"
                            _ellipsisCount="{{_ellipsisCount}}"
                            on-more="handleMore"
                            on-select="selectCity" />
                    </cos-tab-pane>
                </cos-tabs>
            </template>

            <div s-else class="cos-city-selector-wrap">
                <cos-city-content
                    hotTitle="{{hotTitle}}"
                    selectedCities="{{selectedCities}}"
                    anchor="{=anchor=}"
                    _hotCities="{{cityData.hotCities}}"
                    _cities="{{cityData.cities}}"
                    _initialList="{{cityData.initialList}}"
                    on-select="selectCity" />
            </div>
        </cos-drawer>
    `;

    static components = {
        'cos-drawer': Drawer,
        'cos-city-header': CityHeader,
        'cos-city-content': CityContent,
        'cos-foreign-content': ForeignContent,
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-icon': Icon
    };

    static computed = {
        // 是否有国际数据
        isForeign(this: CitySelector) {
            return this.data.get('foreignCities') && this.data.get('foreignCities').length;
        },

        // 是否使用大洲面板，国际数据没有大洲数据项时，不使用大洲面板
        useContinent(this: CitySelector) {
            const foreignCities = this.data.get('foreignCities');
            return foreignCities?.[0]?.continent;
        },

        activeForeign(this: CitySelector) {
            return this.data.get('isForeign') && this.data.get('activeTab') === 1;
        },

        cityData(this: CitySelector) {
            return getCityList(this.data.get('nativeCities'));
        },

        foreignData(this: CitySelector) {
            return getCityList(this.data.get('foreignCities'),
                this.data.get('hotTitle'), this.data.get('useContinent'));
        }
    };

    initData(): CitySelectorProps {
        return {
            open: false,
            title: '城市选择',
            placeholder: '搜索国内外城市/区域名称',
            activeTab: 0,
            hotTitle: '热门城市',
            foreignCities: [],
            nativeCities: [],
            tabs: ['国内', '国际/中国港澳台'],
            selectedCities: [],
            getPopupContainer: undefined,
            anchor: false,
            _foreignNoEllipsis: {},
            _from: From,
            _ellipsisCount: 11
        };
    }

    attached() {
        this.data.set('_ellipsisCount', window.innerWidth <= 360 ? 7 : 11);
        // 不开启自动锚定，或者国际面板走降级时，不加载自动锚定逻辑
        if (!this.data.get('anchor') || this.data.get('foreignCities')?.length && !this.data.get('useContinent')) {
            return;
        }
        this.anchorSelectedCity();
        this.watch('open', (val: boolean) => {
            if (!val) {
                return;
            }
            this.anchorSelectedCity();
        });
    }

    anchorSelectedCity() {
        const selectedCities = this.data.get('selectedCities');
        if (!selectedCities?.[0]) {
            return;
        }

        let selectedCity = selectedCities[0];

        // 用户传入的已选城市可能会没有 _activeTab、_menuIndex、_index，需要遍历查找
        if (selectedCity._activeTab === undefined
                || selectedCity._index === undefined
                || selectedCity?.continent && (selectedCity._menuIndex === undefined
                || selectedCity._cityIndex === undefined)) {
            selectedCity = this.formatSelectedCity(selectedCity) as City;
        }

        // menu 面板下，当已选城市的数量达到省略数量，可能会被省略，需要强制展开
        const _ellipsisCount = this.data.get('_ellipsisCount');
        if (selectedCity?.continent && selectedCity._cityIndex && selectedCity._cityIndex >= _ellipsisCount) {
            const menuList = this.data.get('foreignData').menuList;
            const countryIndex = menuList[selectedCity._menuIndex].content
                .findIndex((item: MenuCity) => item.label === selectedCity.country);
            this.handleMore({
                menuIndex: selectedCity._menuIndex, index: countryIndex, cityIndex: selectedCity._cityIndex});
        }

        selectedCity?._activeTab !== undefined && this.data.set('activeTab', selectedCity._activeTab);
        this.data.set('anchor', true);
    }

    formatSelectedCity(selectedCity: City) {
        let newSelectedCity = {} as City;
        // 已选城市是国际城市
        if (selectedCity.continent) {
            const {menuList} = this.data.get('foreignData');
            if (!menuList?.length) {
                return;
            }
            let menu = [];
            let menuIndex = 0;
            let countryIndex = 0;
            for (let i = 0; i < menuList.length; i++) {
                const item = menuList[i];

                // 热门城市单独查找；因为 selectedCity.continent 不是【热门】而是具体的大洲
                if (i === 0 && item.content?.[0]?.cities?.[0]?.hot) {
                    menu = menuList[0].content[0].cities;
                    const city = findSameCity(menu, selectedCity).city;
                    if (city) {
                        newSelectedCity = city;
                        break;
                    }
                    continue;
                }

                // 大洲一致，再比对城市
                if (selectedCity.continent !== item.label) {
                    continue;
                }
                menuIndex = i;
                countryIndex = item.content.findIndex((cities: MenuCity) => cities.label === selectedCity.country);
                break;
            }

            // 没有找到国家，说明用户传入的已选城市信息不正确
            if (countryIndex === -1) {
                return;
            }

            menu = menuList[menuIndex].content[countryIndex].cities;
            const sameParams = findSameCity(menu, selectedCity);

            if (!sameParams?.city) {
                return;
            }
            newSelectedCity = sameParams.city;
            newSelectedCity._cityIndex = sameParams.index;
        }

        // 已选城市是国内城市
        else {
            const {cities, initialList, hotCities} = this.data.get('cityData');
            if (!cities?.length || !initialList?.length || !selectedCity.pinyin) {
                return;
            }

            if (hotCities?.length) {
                for (const city of hotCities) {
                    const sameParams = findSameCity(cities, city);
                    if (sameParams.city) {
                        newSelectedCity = sameParams.city;
                        break;
                    }
                }
            }

            const initial = selectedCity?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
            const initialIndex = initialList.findIndex((item: Initial) => item.initial === initial);
            if (initialIndex === -1) {
                return;
            }
            const endIndex = initialIndex === initialList.length - 1
                ? cities.length : initialList[initialIndex + 1].index;

            // 根据拼音获取对应字母索引的城市列表，减少遍历范围
            const list = cities.slice(initialList[initialIndex].index, endIndex);
            newSelectedCity = findSameCity(list, selectedCity).city as City;
        }

        if (!newSelectedCity) {
            return;
        }
        newSelectedCity._activeTab = selectedCity.continent ? 1 : 0;
        this.data.set('selectedCities', [newSelectedCity]);
        return newSelectedCity;
    }

    handleChange({index}: {index: number}) {
        this.data.set('activeTab', index);
    }

    selectCity({city, from}: {city: City, from: From}) {
        city._activeTab = city.continent ? 1 : 0;
        this.data.set('selectedCities', [city]);
        this.data.set('_foreignNoEllipsis', {});
        this.fire<CitySelectorEvents['change']>('change', {city, from});
        this.data.set('open', false);
    }

    handleClose() {
        this.data.set('_foreignNoEllipsis', {});
        this.data.set('open', false);
        this.fire('close');
    }

    handleMore({menuIndex, index, cityIndex}: {menuIndex: number, index: number, cityIndex: number}) {
        const _foreignNoEllipsis = this.data.get('_foreignNoEllipsis');
        if (!_foreignNoEllipsis[menuIndex]) {
            _foreignNoEllipsis[menuIndex] = [];
        }
        _foreignNoEllipsis[menuIndex].push({index, cityIndex});
        this.data.set('_foreignNoEllipsis', _foreignNoEllipsis);
    }

}