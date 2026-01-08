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
 * @file 城市数据处理的工具函数
 */

import {City} from '../interface';

// 当国内/国际数据同时存在时，可能重复的城市名称（国内国际均有一套）
const GLOBAL_REPEAT = ['香港', '澳门', '台湾'];

function matchPinyin(pinyin: string, searchStr: string) {
    return (pinyin || '').toLowerCase().includes(searchStr.toLowerCase());
}

function matchName(name: string, searchStr: string) {
    return name.includes(searchStr);
}

/**
 * 搜索框匹配输入城市
 * @param list 城市列表
 * @param searchStr 输入框文字
 * @param isGlobal 是否全球数据（含国内国际）
 * @returns 匹配到的城市列表
 */
export function matchNameAndPinyin(list: City[], searchStr: string, isGlobal = false) {
    if (!searchStr) {
        return [];
    }
    const map = new Map();
    const sugList: string | any[] = [];
    const isPinyin = searchStr.charCodeAt(0) < 255;
    list.forEach(data => {
        const {level, county, city, pinyin, english} = data;
        const name = (level === '2' ? county : city) || '';

        // 英文、拼音，都当拼音搜索
        let itemIsIncluded = false;
        if (isPinyin) {
            const enIsIncluded = english && matchPinyin(english, searchStr);
            itemIsIncluded = matchPinyin(pinyin, searchStr) || !!enIsIncluded;
        }
        else {
            itemIsIncluded = matchName(name, searchStr);
        }
        if (itemIsIncluded) {

            // 当国内/国际数据同时存在时，对可能重复的数据做去重处理
            // 通过唯一标识的 code + name 对搜索结果的港澳台做去重处理
            if (isGlobal && data.code && GLOBAL_REPEAT.some(char =>
                data?.city?.includes(char) || data?.province?.includes(char))) {
                const identifier = `${data.code}${name}`;
                if (!map.has(identifier)) {
                    map.set(identifier, true);
                }
                else {
                    return;
                }
            }
            if (isPinyin) {
                sugList.push({...data});
            }
            else {
                // 分隔搜索词 UE样式要求输入名字的城市 选中的为蓝色
                const viewWord = name.split('').map(
                    (text: string) => ({
                        text,
                        _isSearchWord: searchStr.includes(text)
                    })
                );
                sugList.push({...data, viewWord});
            }
        }

    });
    return sugList;
}

/**
 * 遍历获取寻找已选中的城市，返回高亮样式
 * @param option 需要判断的城市
 * @param selectedCities 已选中城市数组
 */
export function activeCity({option, selectedCities}: {
    option: City; selectedCities: City[];
}) {
    return selectedCities.some(city => city._index === option._index)
        ? ' cos-city-selector-active-city' : '';
}

/**
 * 同名城市展示城市详情
 * @param option 城市数据
 * @returns 需要展示的城市详情
 */
export function sameNameDesc(option: City) {
    if (option.level === '2' && option.city) {
        return option.city;
    }
    return option.province || option.country;
}

/**
 * 事件委托处理中，获取真正触发事件的元素index
 * @param target 目标元素
 * @param closestName 元素类名
 * @returns 真正触发事件的元素的index
 */
export function dataIndex(target: HTMLElement, closestName: string) {
    const index = target?.closest(closestName)?.dataset.index;
    return index ? +index : index;
}


// 兼容 ios 10.2 及其以下版本不支持 Object.values 的情况
export function getObjectValues(obj: any) {
    if (Object.values) {
        return Object.values(obj);
    }
    return Object.keys(obj).map(key => obj[key]);
}

/**
 * 按首字母排序城市列表
 * @param cities 城市列表
 * @returns 已排列好的城市列表
 */
export function sortCities(cities: City[]) {
    return getObjectValues(cities).sort((a, b) => {
        const aInitial = a?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
        const bInitial = b?.pinyin?.trim().charAt(0)?.toUpperCase() || '';
        return aInitial.localeCompare(bInitial);
    });
}

/**
 * 寻找与比较城市相同的城市数据
 * @param cities 城市列表
 * @param compareCity 比较城市
 * @returns 城市数据
 */
export function findSameCity(cities: City[], compareCity: City): { city: City | undefined, index: number } {
    const index = cities.findIndex(city => {
        // 兼容 city.code 和 compareCity.code 一个为数字、一个为字符串；或者两个都是纯字符串的情况
        // eslint-disable-next-line eqeqeq
        return compareCity.code ? city.code == compareCity.code
            : city.city === compareCity.city && city.english === compareCity.english;
    });

    return {
        city: index >= 0 ? cities[index] : undefined,
        index
    };
}

/**
 * 选中城市滚动到可视区中间
 * @param countries 国家列表
 * @param selectedCity 选中城市
 */
export function scrollSelectedCity(countries: HTMLInputElement, selectedCity: HTMLInputElement) {
    if (!selectedCity || !countries) {
        return;
    }
    const countriesRect = countries.getBoundingClientRect();
    const selectedCityRect = selectedCity.getBoundingClientRect();

    // 判断元素是否在可视区居中展示
    const isCenterVisible = selectedCityRect.top - countriesRect.top <= countriesRect.height / 2;
    if (isCenterVisible) {
        return;
    }

    const offsetTop = selectedCityRect.top - countriesRect.top + countries.scrollTop - (countriesRect.height / 2);
    countries.scrollTo({
        top: offsetTop,
        behavior: 'instant'
    });
}