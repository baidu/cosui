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

import {Type} from './interface';

/**
 * 图表组件映射配置
 */
export const componentNameMap = {
    [Type.LINE]: 'cosd-line-chart',
    [Type.BAR]: 'cosd-bar-chart',
    [Type.PIE]: 'cosd-pie-chart'
};

/**
 * 自定义特殊颜色token
 */
export const customColors = {
    chartBg: 'rgba(255, 255, 255, .95)',
    chartBgDark: 'rgba(51, 51, 51, .95)',
    chartShadowColor: 'rgba(0, 0, 0, 0.2)',
    lightGradientStart: 'rgba(24, 144, 255, 0)',
    lightGradientEnd: 'rgba(24, 144, 255, .15)',
    lightGradientMiddle: 'rgba(24, 144, 255, .1)',
    darkGradientStart: 'rgba(34, 34, 34, 0)',
    darkGradientEnd: 'rgba(34, 34, 34, 1)'
};

/**
 * 图表色集
 */
export const colors: string[] = [
    '#3366FF', '#00B5F2', '#00D9D9', '#00E5AC', '#85F218',
    '#B5F200', '#FFBF00', '#FF8C1A', '#FF6633', '#FF4D4D',
    '#FF3366', '#FF1A8C', '#D900D9', '#8C1AFF', '#6633FF'
];

/**
 * 图表高亮色集
 */
export const emphasisColors: string[] = [
    '#5C8AFF', '#31CAF5', '#2DE0DA', '#2FEBB5', '#A3F545',
    '#CAF531', '#FFD333', '#FFA947', '#FF8A5C', '#FF7570',
    '#FF5C8A', '#FF479D', '#E02DDA', '#A947FF', '#8A5CFF'
];

/**
 * 折线图阴影面积色集
 */
export const seriesAreaColors: string[][] = [
    ['rgba(51, 102, 255, .1)', 'rgba(51, 102, 255, 0)'],
    ['rgba(0, 181, 242, .1)', 'rgba(0, 181, 242, 0)'],
    ['rgba(0, 217, 217, .1)', 'rgba(0, 217, 217, 0)']
];

/**
 * 柱状图兜底颜色
 */
export const barDefaultColor = 'rgba(51, 102, 255, .1)';
export const barDefaultColorDark = 'rgba(51, 102, 255, .5)';
