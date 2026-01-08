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

import type {RollingData} from '../util/date-time';

export interface TimePickerProps {
    /**
     * 时间格式，例如：'HH-mm-ss'
     */
    format: 'HH-mm-ss' | 'HH-mm' | 'HH';

    /**
     * 标题，例如：'选择时间'
     * mobile
     */
    title?: string;

    /**
     * 组件默认时间 ｜ 初始时间
     */
    value?: Date;

    /**
     * 输入框占位符
     */
    placeholder?: string;

    /**
     * 禁用时间
     */
    disabledTime?: (date: Date) => boolean;

    /**
     * 可选范围
     */
    range?: Date[];

    /**
     * 选中时间
     */
    _selectedValue: Date | null;

    /**
     * 时间滚轮展示信息
     */
    _timeInfo?: RollingData;

    /**
     * 选择器面板开关
     */
    _open: boolean;

    /**
     * 入口文本
     */
    _entryText: string;

    /**
     * 时间格式数组
     */
    _format: string[];
}

export type TimePickerData = Required<TimePickerProps>;

export interface TimePickerEvents {
    /**
     * 确认时间
     */
    confirm: {
        value: Date;
    };

    /**
     * 关闭时间选择器
     */
    close: void;

    /**
     * 时间变化
     */
    change: {
        value: Date | Date[];
    };
}