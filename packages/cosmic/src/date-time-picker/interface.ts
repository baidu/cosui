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
 * @file DateTimePicker Interface
 */

import type {RollingColumnData} from '../util/date-time';

export interface DateTimePickerProps {

    /**
     * 默认值
     */
    value?: Date;

    /**
     * 是否禁用选择器入口
     */
    disabled?: boolean;

    /**
     * 禁用的日期时间
     */
    disabledDate?: (date: Date) => boolean;

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
     * 时间格式
     */
    format?: 'YYYY-MM-DD-HH-mm-ss'| 'YYYY-MM-DD-HH-mm' | 'YYYY-MM-HH-mm' | 'YYYY-MM-DD-HH';

    /**
     * format 时间格式数组
     */
    _format: string[];

    /**
     * 农历开关状态，默认为false
     * @default false
     */
    lunar?: boolean;

    /**
     * 农历开关状态，默认为false
     */
    _lunar?: boolean;

    /**
     * 是否显示农历开关,默认false
     */
    _showLunarSwitch?: boolean;

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
    _dateTimeInfo?: {
        [key: string]: RollingColumnData;
    };

    /**
     * 滚轮数据结构，用于渲染PickerView组件
     */
    _pickerViewData?: {
        type?: string;
        list: number[] | string[];
        selectedIndex: number;
    };

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
     * 弹层开关
     */
    open?: boolean;

    /**
     * 已选中值
     */
    _selectedValue?: Date;

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
     * 按照fomrt格式化的时间，用于展示回填文本
     */
    _rangeText?: Record<string, string>;

    /**
     * 指定父级 DOM，弹层将会渲染至该 DOM
     * @default undefined
     */
    getPopupContainer?: () => HTMLElement;


    /**
     * 传入 drawer 的 class 类名，仅在使用了 getPopupContainer 挂载 body 上，无法覆盖特定 drawer 样式时使用
     */
    drawerClass?: string;
}

export type DateTimePickerData = Required<DateTimePickerProps>;

export interface DateTimePickerEvents {
    open: void;
    close: void;
     change: {
        value?: Date | Date[];
        lunarValue?: { year: number, month: number, day: number };
    };
    confirm: {value?: Date | Date[], lunarValue?: {year: number, month: number, day: number}};
}