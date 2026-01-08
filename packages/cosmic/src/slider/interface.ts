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
 * 刻度边界情况
 */

export enum Boundary {
    MAX = 'max',
    MIN = 'min',
    NONE = 'none'
}

export interface SliderProps {

    /**
     * 当前进度百分比
     * @default 0
     */
    value: number | [number, number];

    /**
     * 是否禁用
     * @default false
     */
    disabled: boolean;

    /**
     * 滑块范围最大值
     * @default 100
     */
    max: number;

    /**
     * 滑块范围最小值
     * @default 0
     */
    min: number;

    /**
     * 步长
     * @default 1
     */
    step: number;

    /**
     * 刻度标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，为 true 时展现间断点
     * @default false
     */
    marks: Record<number, string> | boolean;

    /**
     * 是否开启双滑块模式
     * @default false
     */
    range: boolean;

    /**
     * 是否显示 tooltip
     * @default true
     */
    tooltip: boolean;

    /**
     * 设置Tooltip的展示格式，默认显示当前 value 值
     * @param value value 值
     * @returns 格式化后的内容
     * @default value
     */
    tooltipFormat: null | [(value: number) => string | number];

    /**
     * 指定 tooltip 父级 DOM
     * @returns DOM
     */
    _getPopupContainer: () => Element | undefined;

    /**
     * 控制左手柄 tooltip 的显示
     */
    _open: boolean;

    /**
     * 控制右手柄 tooltip 的显示
     */
    _rightOpen: boolean;

    /**
     * track 的位置样式
     */
    _trackPosition: string;


    /**
     * marks format 处理后的刻度对象
     */
    _marks: Array<{ label: string, offset: number, boundary: Boundary}>;
};

export type SliderData = Required<SliderProps>;

export interface SliderEvents {
    /**
     * 值改变时触发
     */
    change: {value: number | number[]};

    /**
     *
     */
    'change-complete': {value: number | number[]};
}