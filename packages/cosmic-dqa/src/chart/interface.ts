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
 * @file chart interface
 */

import type {EChartsOption, ECharts} from 'echarts';

export interface ChartProps {
    /**
     * 图表类型
     */
    type: Type;

    /**
     * 外部传入的配置项，完全对齐 EChartsOption
     */
    option: EChartsOption;
}

export interface ChartData {
    _loading: boolean;
}

export enum Type {
    /**
     * 折线图
     */
    LINE = 'line',

    /**
     * 柱状图
     */
    BAR = 'bar',

    /**
     * 饼图
     */
    PIE = 'pie',
}

export enum Theme {
    /**
     * 亮色主题
     */
    LIGHT = 'light',

    /**
     * 暗色主题
     */
    DARK = 'dark',
}

export interface ChartMethods {
    getEchartsInstance(): ECharts | null;
}