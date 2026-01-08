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
 * @file 处理Date/Time Picker滚动列表的数据
 */

export interface RollingData {
    [key: string]: RollingColumnData;
}

export interface RollingColumnData {

    /**
     * 滚动列表
     */
    list: number[] | string[];

    /**
     * 当前选中索引
     */
    selectedIndex: number;

    /**
     * 开始时间选中索引
     */
    startSelectedIndex: number;

    /**
     * 结束时间选中索引
     */
    endSelectedIndex?: number;
}

const WEEK_MAP = ['日', '一', '二', '三', '四', '五', '六'];

const QUARTER_LIST = ['Q1', 'Q2', 'Q3', 'Q4'];

const START_YEAR = 1900;
const END_YEAR = 2099;

/**
 * 已知年月，计算当月天数
 * @param year 年
 * @param month 月
 * @returns string
 */
export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

export const buildDateText = (date: Date) => {
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = `周${WEEK_MAP[date.getDay()]}`;

    if (year === currentYear) {
        return `${month}月${day}日（${dayOfWeek}）`;
    }

    return `${year}年${month}月${day}日（${dayOfWeek}）`;
};

export class RollingDate {
    format: string;
    range: Date[];
    showWeek: boolean;
    singleDigit: boolean;
    startYear: number;
    endYear: number;
    dateTimeUnits: Record<string, any>;

    /**
     * 构造函数
     * @param format 时间格式，eg：'YYYY-MM-DD-HH-mm-ss'
     * @param range 选择范围，用于年份
     * @param showWeek 是否显示星期
     * @param singleDigit 是否显示单数（单数显示一位，双数显示两位，时分秒使用） 默认显示双数 eg: 1->01,2->02,3->03
     */
    constructor(
        format: string,
        range: Date[] = [],
        showWeek: boolean = false,
        singleDigit: boolean = false
    ) {
        this.format = format.replace(/-WW/, '');
        this.range = range;
        this.showWeek = showWeek;
        this.singleDigit = singleDigit;
        // 年范围
        this.startYear = range[0]?.getFullYear() || START_YEAR;
        this.endYear = range[1]?.getFullYear() || END_YEAR;

        this.dateTimeUnits = {
            YYYY: {
                length: this.endYear - this.startYear + 1, start: this.startYear, suffix: ' 年',
                getSelectedIndex: (value: Date) => value?.getFullYear() - this.startYear,
                setValue: (value: Date, year: number) => value?.setFullYear(year)
            },
            MM: {
                length: 12, start: 1, suffix: ' 月',
                getSelectedIndex: (value: Date) => value?.getMonth(),
                setValue: (value: Date, month: number) => value?.setMonth(month)
            },
            DD: {
                length: 30, start: 1, suffix: ' 日',
                getSelectedIndex: (value: Date) => value?.getDate() - 1,
                setValue: (value: Date, date: number) => value?.setDate(date)
            },
            QQ: {
                list: QUARTER_LIST,
                getSelectedIndex: (value: Date) => Math.floor(value?.getMonth() / 3),
                setValue: (value: Date, quarter: number) => value?.setMonth(quarter * 3)
            },
            HH: {
                length: 24, start: 0, suffix: ' 时',
                getSelectedIndex: (value: Date) => value?.getHours(),
                setValue: (value: Date, hour: number) => value?.setHours(hour)
            },
            mm: {
                length: 60, start: 0, suffix: ' 分',
                getSelectedIndex: (value: Date) => value?.getMinutes(),
                setValue: (value: Date, minute: number) => value?.setMinutes(minute)
            },
            ss: {
                length: 60, start: 0, suffix: ' 秒',
                getSelectedIndex: (value: Date) => value?.getSeconds(),
                setValue: (value: Date, second: number) => value?.setSeconds(second)
            }
        };
    }

    /**
     * 构造滚动时间数据
     * @param defaultValue 默认选中时间
     * @param format 需构造的时间
     * @returns 时间数据
     */
    generateRollingDate(
        defaultValue: Date | Date[],
        format: string[]
    ): RollingData {
        const value = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
        // 默认开始时间和结束时间
        const startValue = value[0];
        const endValue = value[1];

        // 默认月下的日长度
        const daysInMonth = getDaysInMonth(startValue?.getFullYear(), startValue?.getMonth());
        const weekInfo = {
            showWeek: this.showWeek,
            year: startValue?.getFullYear(),
            month: startValue?.getMonth()
        };

        const result = {} as RollingData;
        this.dateTimeUnits.DD.length = daysInMonth;

        format.forEach((item: string) => {
            if (this.dateTimeUnits[item]) {
                const {length, start, suffix, list} = this.dateTimeUnits[item];
                let showList = list || Array.from({length}, (_, i) => {
                    return `${start + i}${suffix}`;
                });

                // 日期携带周展现特殊处理
                if (item === 'DD' && weekInfo.showWeek) {
                    showList = Array.from({length}, (_, index) => {
                        const date = start + index;
                        const day = ` 周${WEEK_MAP[new Date(weekInfo.year, weekInfo.month, date).getDay()]}`;
                        return `${date}${suffix}${day}`;
                    });
                }
                if (!this.singleDigit && ['HH', 'mm', 'ss'].includes(item)) {
                    showList = Array.from({length}, (_, i) =>
                        `${i < 10 ? '0' : ''}${i}`
                    );
                }
                const startSelectedIndex = this.dateTimeUnits[item].getSelectedIndex(startValue);
                const endSelectedIndex = this.dateTimeUnits[item].getSelectedIndex(endValue) || -1;

                result[item] = {
                    list: showList,
                    selectedIndex: startSelectedIndex,
                    startSelectedIndex,
                    endSelectedIndex
                };
            }
        });
        return result;
    }

    /**
     * 调整日长度
     * @param year 年
     * @param month 月
     * @param changeListType 时间类型
     * @param originDate 原始滚动时间数据
     * @param isStart 是否是开始时间
     * @returns 调整后的滚动时间数据
     */
    adjustNextDateSolor(
        year: number,
        month: number,
        changeListType: string,
        originDate: Record<string, any>,
        isStart: boolean = true
    ): RollingData | undefined {
        if (changeListType !== 'YYYY' && changeListType !== 'MM') {
            return;
        }
        const correctDateLength = getDaysInMonth(year, month);

        const selectedIndex = originDate.DD.selectedIndex > correctDateLength - 1
            ? correctDateLength - 1
            : originDate.DD.selectedIndex;

        return {
            ...originDate,
            DD: {
                list: Array.from({length: correctDateLength}, (_, index) => {
                    const day = this.showWeek ? ` 周${WEEK_MAP[new Date(year, month, index + 1).getDay()]}` : '';
                    return `${index + 1} 日${day}`;
                }),
                selectedIndex: selectedIndex,
                startSelectedIndex: isStart ? selectedIndex : originDate.DD.startSelectedIndex,
                endSelectedIndex: isStart ? originDate.DD.endSelectedIndex : selectedIndex
            }
        };
    }

    /**
     * 获取当前选中的时间以及格式化后的时间字符串
     * @param type 开始时间 ｜ 结束时间
     * @param dateTimeInfo 时间数据对象
     * @returns {value: Date, formatValue: string}
     */
    getValue(type: 'start' | 'end' = 'start', dateTimeInfo: RollingData, isLunar = false) {
        const selectedIndex = type === 'start' ? 'startSelectedIndex' : 'endSelectedIndex';
        // 只是为了构建一个初始值，方便后面遍历的去设置真实日期，这里采用当月 1 号，因为日的长度不固定
        const now = new Date();
        let value = new Date(now.getFullYear(), now.getMonth(), 1);
        const dateFormat: number[] | string[] = [];
        let timeFormat: number[] | string[] = [];
        let existFlag = false;
        this.format.split('-').forEach((item: string) => {

            if (dateTimeInfo[item] && dateTimeInfo[item][selectedIndex] > -1) {
                existFlag = true;
                let itemIndex = dateTimeInfo[item][selectedIndex] as number;
                let itemValue = dateTimeInfo[item].list[itemIndex];

                // 去掉年月日时分秒中文字符 eg:2025 年->2025;1 月->1;
                !isLunar && (itemValue = String(itemValue).replace(/ [年月日时分秒]/, ''));

                if (['MM', 'DD'].includes(item) && !isLunar) {
                    +itemIndex < 9 && (itemValue = '0' + itemValue);
                }

                // 时分秒格式化处理，显示完整格式00:00:00
                if (['HH', 'mm', 'ss'].includes(item)) {
                    this.singleDigit && +itemIndex < 10 && (itemValue = '0' + itemValue);
                    timeFormat.push(itemValue);
                }
                // 年月日格式化处理
                else {
                    dateFormat.push(itemValue);
                }

                itemIndex = item === 'YYYY'
                    ? itemIndex + this.startYear
                    : item === 'DD' ? itemIndex + 1 : itemIndex;

                if (['YYYY', 'MM', 'DD'].includes(item) && isLunar) {
                    return;
                }
                value = new Date(this.dateTimeUnits[item].setValue(value, itemIndex));
            }
        });

        // 需要显示时间，但是时间格式化长度只显示小时时，补齐分钟 12 -> 12:00
        if (timeFormat?.length && timeFormat.length < 2) {
            timeFormat.push('00');
        }
        const formatValue = dateFormat.join('/') + ' ' + timeFormat.join(':');
        return existFlag ? {value, formatValue} : {formatValue: ''};
    }

    /**
     * 获取当前选中的时间以及范围的时间格式化后的时间字符串
     * @param dateTimeInfo 时间数据对象
     * @param type 时间类型 单选｜范围选择
     * @param isLunar 是否为农历时间
     * @returns {value: Date[] | Date, rangeText: {start: string, end: string}}
     */
    getValueAndRangeText(
        dateTimeInfo: Record<string, any>,
        type: 'single' | 'range' = 'single',
        isLunar: boolean = false
    ) {
        const {value: startValue, formatValue: startFormat} = this.getValue('start', dateTimeInfo, isLunar);
        const {value: endValue, formatValue: endFormat} = this.getValue('end', dateTimeInfo, isLunar);
        const {YYYY, MM, DD} = dateTimeInfo;
        return {
            value: type === 'single' ? startValue : [startValue, endValue],
            rangeText: {
                start: startFormat,
                end: endFormat
            },
            lunarValue: isLunar ? {
                year: YYYY.list[YYYY.selectedIndex],
                month: MM.list[MM.selectedIndex],
                day: DD.list[DD.selectedIndex]
            } : null
        };
    }
}