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
 * @file DatePicker Interface
 */

import type {RollingColumnData} from '../util/date-time';
import type {DatePickerPanelProps, DayItem} from '../common/date-picker-panel/interface';
export interface DatePickerProps extends DatePickerPanelProps {

    /**
     * 是否禁用选择器入口
     */
    disabled?: boolean;

    /**
     * 标题，仅 Mobile
     */
    title?: string;

    /**
     * 未选择的占位内容
     */
    placeholder?: string | {start: string, end?: string};

    /**
     * 有效的日期范围
     */
    range?: Date[];

    /**
     * 变体
     */
    appearance?: 'panel' | 'rolling';

    /**
     * 时间格式
     * @default 'YYYY-MM-DD'
     */
    format?: 'YYYY-MM-DD' | 'YYYY-MM-DD-WW' | 'YYYY-MM' | 'YYYY' | 'YYYY-QQ';

    /**
     * format 时间格式数组
     */
    _format?: string[];

    /**
     * 有效的日期范围
     */
    _range?: Date[];

    /**
     * 回填文本
     */
    _entryText?: string | Record<string, string>;

    /**
     * 时间Picker内部数据结构，用于计算年月日等信息
     */
    _dateInfo?: {
        [key: string]: RollingColumnData;
    };

    /**
     * 农历开关状态，默认为false，在data-time-picker中使用
     * @default false
     */
    lunar?: boolean;

    /**
     * 农历开关状态，默认为false
     */
    _lunar?: boolean;

    /**
     * 农历日期值（内部状态）
     */
    _lunarValue?: {
        year: number;
        month: number;
        day: number;
    };

    /**
     * 弹层开关
     */
    _open?: boolean;

    /**
     * 时间选中对象：开始时间/结束时间
     */
    _currentSelectTarget?: string;

    /**
     * 已选中值
     */
    _selectedValue?: Date | Date[];

    /**
     * 控制日历面板显示的年份月份数据
     * - 单选模式: 长度=1
     * - 范围模式: 长度=2
     */
    _controlDate?: Array<{
        year: number;
        month: number;
    }>;

    /**
     * 用于标识输入框的激活状态
     */
    _active?: {start: boolean, end: boolean};

    /**
     * 已选中年份
     */
    _selectedYear?: number;

    /**
     * 已选中月份
     */
    _selectedMonth?: number;

    /**
     * 已选中日期
     */
    _selectedDate?: number;

    /**
     * 展示week
     */
    _showWeek?: boolean;

    /**
     * 按照fomrt格式化的时间，用于展示回填文本
     */
    _formatText?: Record<string, string>;

    _rangeText?: {
        start?: string;
        end?: string;
    };
}

export type DatePickerData = Required<DatePickerProps>;


export interface DatePickerEvents {
    open: void;
    close: void;
    change: {
        value: Date | Date[] | DayItem | DayItem[] | { date: Date | Date[] };
        lunarValue?: {year: number, month: number, day: number};
    };
    confirm: {value?: Date | Date[], lunarValue?: {year: number, month: number, day: number}};
}