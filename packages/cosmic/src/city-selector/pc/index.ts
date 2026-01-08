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
import {CitySelectorData, City, MenuCity,
    Initial, From, CitySelectorEvents, CitySelectorProps} from '../interface';
import Popover from '@cosui/cosmic/popover';
import CityHeader from './city-header';
import CityContent from './menu-content';
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
 * @param isForeign 是否是外国城市
 * @returns 格式化的城市数据
 */
function getCityList(cities: City[], hotTitle: string, useContinent?: boolean, isForeign?: boolean): {
    hotCities: City[];
    initialList: Initial[];
    cities: City[];
    menuList: MenuCity;
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
        if (useContinent) {
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

    // 遍历城市项，处理数据
    cities?.forEach((region, index) => {
        if (!region.city && !region.county && !region.province) {
            throw new Error('please provide correct data fields');
        }

        region._index = index;
        const initial = region?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
        region._showMenuLabel = region?.level === '2' ? region.county : region.city;

        // 国际数据不使用大洲面板时，_showMenuLabel 增加国家名称
        if (isForeign && !useContinent) {
            // 处理 same 数据
            const sameDesc = region.same ? (region.level === '2'
                ? region.city : region.province) : '';
            region._showMenuLabel = `${region._showMenuLabel}${
                sameDesc ? ', ' + sameDesc : ''}, ${region.country}`;
        }
        // 字母索引
        if (!initialList.some(item => item.initial === initial)) {
            region._initial = initial;
            initialList.push({
                initial,
                index
            });
        }

        if (useContinent) {
            let labelIndex = menuList.findIndex(country => country.label === region.continent);
            region._menuIndex = labelIndex + (hotTitle && useContinent ? 1 : 0);
            let countryIndex = menuList[labelIndex].content.findIndex(city => city.label === region.country);

            countryIndex = countryIndex !== -1 ? countryIndex : menuList[labelIndex].content.length - 1;
            menuList[labelIndex].content[countryIndex].cities.push(region);
        }
    });

    if (useContinent) {
        initialList.forEach((data, index) => {
            const initialCities: City[] = index === initialList.length - 1
                ? cities.slice(data.index, cities.length)
                : cities.slice(data.index, initialList[index + 1].index);
            data.cities = initialCities;
        });
    }
    else {
        for (let i = 0; i < initialList.length; i += 4) {
            const initialArr = i + 4 >= initialList.length
                ? initialList.slice(i, initialList.length)
                : initialList.slice(i, i + 4);
            const menuItem: MenuCity = initialArr.reduce((pre, cur, index) => {
                let menuItemCities: City[] = cur.initial === initialList[initialList.length - 1].initial
                    ? cities.slice(cur.index, cities.length)
                    : cities.slice(cur.index, initialList[i + index + 1].index);

                return {
                    label: pre.label + cur.initial,
                    content: [...pre.content, {
                        label: cur.initial,
                        cities: menuItemCities
                    }]
                };
            }, {
                label: '',
                content: []
            });
            menuList.push(menuItem);
        }
    }

    if (hotTitle) {
        hotCities.length && menuList.unshift({
            label: '热门',
            content: [
                {
                    label: hotTitle,
                    cities: hotCities
                }
            ]
        });
    }

    if (useContinent) {
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


export default class CitySelector extends Component<CitySelectorData> {

    static trimWhitespace = 'all';

    static template = `
        <cos-popover
            open="{=open=}"
            class="cos-city-selector"
            on-close="handleClose"
        >
            <cos-city-header
                title="{{title}}"
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
                            selectedCities="{{selectedCities}}"
                            anchor="{=anchor=}"
                            _menuList="{{cityData.menuList}}"
                            _initialList="{{cityData.initialList}}"
                            on-select="selectCity" />
                        <cos-city-content
                            s-if="activeTab === 1"
                            selectedCities="{{selectedCities}}"
                            anchor="{=anchor=}"
                            _useContinent="{{useContinent}}"
                            _activeForeign="{{_activeForeign}}"
                            _menuList="{{foreignData.menuList}}"
                            _cities="{{foreignData.cities}}"
                            _initialList="{{foreignData.initialList}}"
                            on-select="selectCity" />
                    </cos-tab-pane>
                </cos-tabs>
            </template>

            <template s-else>
                <div class="cos-divider" style="width: 100%"></div>
                <cos-city-content
                    selectedCities="{{selectedCities}}"
                    anchor="{=anchor=}"
                    _menuList="{{cityData.menuList}}"
                    _initialList="{{cityData.initialList}}"
                    on-select="selectCity" />
            </template>
        </cos-popover>
    `;

    static components = {
        'cos-popover': Popover,
        'cos-city-header': CityHeader,
        'cos-city-content': CityContent,
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-icon': Icon
    };

    static computed = {

        isForeign(this: CitySelector) {
            return this.data.get('foreignCities') && this.data.get('foreignCities').length;
        },

        // 是否使用大洲面板，国际数据没有大洲数据项时，不使用大洲面板
        useContinent(this: CitySelector) {
            const foreignCities = this.data.get('foreignCities');
            return foreignCities?.length && foreignCities[0].continent;
        },

        _activeForeign(this: CitySelector) {
            return this.data.get('isForeign') && this.data.get('activeTab') === 1;
        },

        cityData(this: CitySelector) {
            return getCityList(this.data.get('nativeCities'), this.data.get('hotTitle'));
        },

        foreignData(this: CitySelector) {
            return getCityList(this.data.get('foreignCities'),
                this.data.get('hotTitle'), this.data.get('useContinent'), true);
        }

    };

    failHint: ReturnType<typeof setTimeout> | null;

    initData(): CitySelectorProps {
        return {
            open: false,
            title: '城市选择',
            placeholder: '搜索国内外城市/区域名称',
            activeTab: 0,
            hotTitle: '热门城市',
            foreignCities: [],
            nativeCities: [],
            selectedCities: [],
            tabs: ['国内', '国际/中国港澳台'],
            anchor: false
        };
    }

    attached() {

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

    detached() {
        this.failHint && clearTimeout(this.failHint);
        this.failHint = null;
    }

    anchorSelectedCity() {
        const selectedCities = this.data.get('selectedCities');

        if (!selectedCities?.[0]) {
            return;
        }

        let selectedCity = selectedCities[0];

        // 如果已选城市没有 _activeTab、_menuIndex、_index，需要遍历查找
        if (selectedCity._activeTab === undefined
                || selectedCity._index === undefined
                || selectedCity._menuIndex === undefined) {
            selectedCity = this.formatSelectedCity(selectedCity) as City;
        }
        selectedCity?._activeTab !== undefined && this.data.set('activeTab', selectedCity._activeTab);
        this.data.set('anchor', true);
    }

    formatSelectedCity(selectedCity: City) {
        const menuList = selectedCity.code ? this.data.get('cityData')?.menuList
            : this.data.get('foreignData')?.menuList;

        if (!menuList?.length) {
            return;
        }

        let newSelectedCity = {} as City;
        let menu = [];
        let menuIndex = 0;
        let contentIndex = 0;

        // 已选城市是国际城市
        if (selectedCity.continent) {
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

                if (selectedCity.continent !== item.label) {
                    continue;
                }
                menuIndex = i;
                contentIndex = item.content.findIndex((menuCity: MenuCity) =>
                    menuCity.label === selectedCity.country);
                break;
            }
            if (contentIndex === -1) {
                return;
            }
            menu = menuList[menuIndex].content[contentIndex].cities;
            newSelectedCity = findSameCity(menu, selectedCity).city as City;
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
            for (let i = 0; i < menuList.length; i++) {
                const item = menuList[i];

                if (!item.label.includes(initial)) {
                    continue;
                }
                menuIndex = i;
                contentIndex = item.content.findIndex((menuCity: MenuCity) => menuCity.label === initial);
                break;
            }
            if (contentIndex === -1) {
                return;
            }
            menu = menuList[menuIndex].content[contentIndex].cities;
            newSelectedCity = findSameCity(menu, selectedCity).city as City;
        }
        if (!newSelectedCity) {
            return selectedCity;
        }
        newSelectedCity._menuIndex = menuIndex;
        newSelectedCity._activeTab = selectedCity.continent ? 1 : 0;
        this.data.set('selectedCities', [newSelectedCity]);
        return newSelectedCity;
    }

    handleClose() {
        this.fire('close');
    }

    handleChange({index}: {index: number}) {
        this.data.set('activeTab', index);
    }

    selectCity({city, from}: {city: City, from: From}) {
        city._activeTab = city.continent ? 1 : 0;
        this.data.set('selectedCities', [city]);
        this.fire<CitySelectorEvents['change']>('change', {city, from});
        this.data.set('open', false);
    }
}