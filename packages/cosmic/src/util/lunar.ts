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

import {RollingDate} from './date-time';

export const LUNAR_MONTH_LIST = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
export const LUNAR_LEAP_MONTH = ['闰一月', '闰二月', '闰三月', '闰四月', '闰五月', '闰六月', '闰七月', '闰八月', '闰九月', '闰十月', '闰冬月', '闰腊月'];
export const LUNAR_DATE_LIST = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四',
    '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900 - 1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x096d5, 0x095b0, 0x049b0, // 1910 - 1919
    0x0a974, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920 - 1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930 - 1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940 - 1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950 - 1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960 - 1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970 - 1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980 - 1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990 - 1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000 - 2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010 - 2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020 - 2029
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030 - 2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040 - 2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050 - 2059
    0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060 - 2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070 - 2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080 - 2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252 // 2090 - 2099
];

/**
 * 是否是闰月
 */
export function getLeapMonth(year: number) {
    return lunarInfo[year - 1900] & 0xf; // 后 4 位表示闰月
}

/**
 * 获取闰月的天数
 */
export function getLeapMonthDays(year: number) {
    const yearData = lunarInfo[year - 1900];
    return getLeapMonth(year) ? ((yearData & 0x10000) ? 30 : 29) : 0;
}

/**
 * 获取指定农历年份的天数。
 */
export function getLunarYearDays(year: number) {
    const yearData = lunarInfo[year - 1900];
    let sum = 348; // 12 个月的小月天数（29 天 * 12）

    // 加上大月天数
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (yearData & i) ? 1 : 0;
    }

    // 加上闰月天数（如果有闰月）
    const leapMonthDays = getLeapMonthDays(year);
    return sum + leapMonthDays;
}


/**
 * 获取指定农历月份的天数。
 */
export function getLunarMonthDays(year: number, month: number) {
    const yearData = lunarInfo[year - 1900];
    return (yearData & (0x10000 >> month)) ? 30 : 29;
}

export function solarToLunarByDay(year: number, month: number, day: number) {
    // 基准日期：阳历 1900-01-31 对应农历 1900-正月初一
    const baseDate = Date.UTC(1900, 0, 31);
    const currentDate = Date.UTC(year, month - 1, day);
    const offset = Math.floor((currentDate - baseDate) / (24 * 60 * 60 * 1000));

    let days = offset;
    let lunarYear = 1900;
    let lunarMonth = 1;
    let lunarDay = 1;
    let isLeapMonth = false;

    // 找到对应的农历年份
    for (; lunarYear < 2100 && days > 0; lunarYear++) {
        const yearDays = getLunarYearDays(lunarYear);
        if (days < yearDays) {
            break;
        }
        days -= yearDays;
    }

    // 找到对应的农历月份
    const leapMonth = getLeapMonth(lunarYear);
    for (; lunarMonth <= 12 && days > 0; lunarMonth++) {
        let monthDays = getLunarMonthDays(lunarYear, lunarMonth);
        if (days < monthDays) {
            break;
        }
        days -= monthDays;
        if (lunarMonth === leapMonth) {
            monthDays = getLeapMonthDays(lunarYear);
            if (days < monthDays) {
                isLeapMonth = true;
                break;
            } // 在闰月内
            days -= monthDays;
        }
    }

    lunarDay += days;
    return {year: lunarYear, month: lunarMonth, day: lunarDay, isLeapMonth};
}

/**
 * 根据农历年份数据和指定月份，计算从年初到该月之前的总天数
 * @param {number} yearData - 16 位整型表示的农历年份数据
 * @param {number} month - 指定月份 (1-12 或者包括闰月)
 * @return {number} - 从年初到指定月之前的总天数
 */
function getLunarDaysUntilMonth(year: number, month: number): number {
    const yearData = lunarInfo[year - 1900];
    // 提取闰月信息（低 4 位表示）
    const leapMonth = yearData & 0xF; // 闰月 (0 表示无闰月，1-12 表示闰月的月份)
    let totalDays = 0;

    // 遍历从 1 到 month-1 的月份
    for (let i = 1; i < month; i++) {
        // 检查该月是大月还是小月（高 12 位中的对应位置）
        totalDays += getLunarMonthDays(year, i);

        // 如果当前月是闰月，累加闰月的天数
        if (i === leapMonth) {
            totalDays += getLeapMonthDays(year);
        }
    }

    return totalDays;
}

/**
* 农历转阳历
* @param {number} year 农历年份
* @param {number} month 农历月份（1-12）
* @param {number} day 农历日期
* @param {boolean} isLeapMonth 是否为闰月
*/
// 阳历起始日期：1900 年 1 月 31 日
const solarBaseDate = new Date(1900, 0, 31);

// 农历转阳历
export function lunarToSolarByDay(year: number, month: number, day: number, isLeapMonth = false) {
    let days = 0;

    // 累加前几年总天数
    for (let i = 1900; i < year; i++) {
        days += getLunarYearDays(i);
    }

    days += getLunarDaysUntilMonth(year, month);
    const leapMonth = getLeapMonth(year);

    // 累加闰月前面的月份天数
    if (isLeapMonth && leapMonth === month) {
        days += getLunarMonthDays(year, month);
    }

    // 累加当前月天数
    days += day - 1;

    // 转换为阳历日期
    const solarDate = new Date(solarBaseDate);
    solarDate.setDate(solarBaseDate.getDate() + days);
    return {
        year: solarDate.getFullYear(),
        month: solarDate.getMonth() + 1,
        day: solarDate.getDate()
    };
}

export function adjustNextDateLunar(
    year: number, month: number, changeListType: string, originDate: Record<string, any>) {

    if (changeListType !== 'YYYY' && changeListType !== 'MM') {
        return;
    }

    let _month = month - 1;
    const result = {};
    // 年变更 先调整月
    if (changeListType === 'YYYY') {
        // 获取农历年的闰月
        const leapMonth = getLeapMonth(year);
        let lunarMonth = [...LUNAR_MONTH_LIST];
        // 有闰月，插入到农历数组中
        if (leapMonth > 0) {
            const leapMonthText = LUNAR_LEAP_MONTH[leapMonth - 1];
            lunarMonth = [
                ...LUNAR_MONTH_LIST.slice(0, leapMonth),
                leapMonthText,
                ...LUNAR_MONTH_LIST.slice(leapMonth)
            ];
        }
        result.MM = {
            list: lunarMonth,
            selectedIndex: _month,
            startSelectedIndex: _month
        };
        const selectedIndex = originDate.MM.selectedIndex;
        if (lunarMonth.length - 1 < selectedIndex) {
            _month = lunarMonth.length - 1;
            result.MM.selectedIndex = lunarMonth.length - 1;
            result.MM.startSelectedIndex = lunarMonth.length - 1;
        }
    }

    // 当前选中农历月份文本
    const monthText = result.MM?.list[_month] || originDate.MM.list[_month];

    // 判断是否是闰月
    const isLeapMonth = monthText.includes('闰');
    const lunarDays = isLeapMonth ? getLeapMonthDays(year) : getLunarMonthDays(year, _month + 1);
    const selectedIndex = originDate.DD.selectedIndex > lunarDays - 1
        ? lunarDays - 1
        : originDate.DD.selectedIndex;

    result.DD = {
        list: LUNAR_DATE_LIST.slice(0, lunarDays),
        selectedIndex,
        startSelectedIndex: selectedIndex
    };
    return {
        ...originDate,
        ...result
    };
}

/**
 * 阳历->农历
 * @param {number} year 阳历年份
 * @param {number} month 阳历月份
 * @param {number} day 阳历日期
 * @param {object} originDate 原始日期数据
 * @returns {object} 农历数据
 */
export function solorToLunar(year: number, month: number, day: number, originDate: Record<string, any>) {
    // month 和 day 从1开始计算
    let {year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
        isLeapMonth
    } = solarToLunarByDay(year, month, day);
    // 获取农历年的闰月
    const leapMonth = getLeapMonth(lunarYear);
    let lunarMonthList = [...LUNAR_MONTH_LIST];

    // 有闰月，插入到农历数组中
    if (leapMonth > 0) {
        const leapMonthText = LUNAR_LEAP_MONTH[leapMonth - 1];
        lunarMonthList = [
            ...LUNAR_MONTH_LIST.slice(0, leapMonth),
            leapMonthText,
            ...LUNAR_MONTH_LIST.slice(leapMonth)
        ];
        if (isLeapMonth || lunarMonth > leapMonth) {
            lunarMonth += 1;
        }
    }

    // 获取农历日
    const lunarDays = isLeapMonth ? getLeapMonthDays(lunarYear) : getLunarMonthDays(lunarYear, lunarMonth);
    return {
        ...originDate,
        YYYY: {
            list: originDate.YYYY.list,
            selectedIndex: originDate.YYYY.list.indexOf(`${lunarYear} 年`),
            startSelectedIndex: originDate.YYYY.list.indexOf(`${lunarYear} 年`)
        },
        MM: {
            list: lunarMonthList,
            selectedIndex: lunarMonth - 1,
            startSelectedIndex: lunarMonth - 1
        },
        DD: {
            list: LUNAR_DATE_LIST.slice(0, lunarDays),
            selectedIndex: lunarDay - 1,
            startSelectedIndex: lunarDay - 1
        }
    };
}

/**
 * 农历->阳历
 */
export function lunarToSolor(year: number, month: number, day: number, originDate: Record<string, any>) {
    const monthText = originDate.MM.list[month - 1] || '';
    const leapMonth = getLeapMonth(year);

    // 判断是否是闰月
    const isLeapMonth = monthText.includes('闰');
    // 这里的月份代表选择器的索引，存在闰月的年份，范围为1-13
    const selectedMonth = leapMonth && month > leapMonth ? month - 1 : month;
    const {
        year: solorYear,
        month: solorMonth,
        day: solorDay
    } = lunarToSolarByDay(year, selectedMonth, day, isLeapMonth);
    const selectedValue = new Date(solorYear, solorMonth - 1, solorDay);
    const solorDate = new RollingDate('YYYY-MM-DD', [], false).generateRollingDate(selectedValue, ['YYYY', 'MM', 'DD']);

    return {
        ...originDate,
        ...solorDate
    };
}
