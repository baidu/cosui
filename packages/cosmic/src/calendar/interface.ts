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
 * @file Calendar Interface
 */

export interface CalendarProps {

    /**
     * 选择类型
     * 单选: 'single'
     * 范围多选: 'range'
     */
    type?: string;

    /**
     * 默认值
     */
    value?: Date | Date[];

    /**
     * 禁用日期
     */
    disabledDate: (date: Date) => boolean;

    /**
     * 可显示的日期范围
     */
    validRange?: Date[];

    /**
     * 内部使用，用于存储选中的值
     */
    _selectedDate?: DayItem[];

    /**
     * 内部使用，用于存储日历数据
     */
    _calendarMap?: Array<{monthMatrix: DayItem[][]}>;

    /**
     * 内部使用，用于存储星期几
     */
    _weekText?: string[];

    /**
     * 内部使用，用于存储鼠标悬停的日期
     */
    _currentHoverDate?: Date | null;
}

export interface DayItem {

    /**
     * 当前日期
     */
    date: Date;

    /**
     * 单选选中
     */
    selected?: boolean;

    /**
     * 范围选择开始
     */
    start?: boolean;

    /**
     * 范围选择中间
     */
    middle?: boolean;

    /**
     * 范围选择结束
     */
    end?: boolean;

    /**
     * 禁用
     */
    disabled?: boolean;

    /**
     * 是否为本月第一天
     */
    first?: boolean;

    /**
     * 是否为本月最后一天
     */
    last?: boolean;

    /**
     * 是否在当月
     */
    currentMonth?: boolean;

    /**
     * 是否在今天
     */
    today?: boolean;

    /**
     * 在范围选择时，仅选取开始时间时，是否是开始时间到被hover日期之间的日期
     */
    hoverInRange?: boolean;

    /**
     * 在范围选择时，仅选取开始时间时，是否为hover到的日期
     */
    hoverEnd?: boolean;
}

export type CalendarData = Required<CalendarProps>;

export interface CalendarEvents {
    /**
     * 日历选择事件
     */
    change: {
        value: DayItem[] | DayItem;
    };
}