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

import type {
    EChartsOption,
    RadarSeriesOption,
    SeriesOption
} from 'echarts';
import BaseChart from './base-chart';
import {Type} from './interface';
import {deepMerge} from './utils';

export default class RadarChart extends BaseChart {
    initData() {
        const baseData = super.initData();

        return {
            ...baseData,
            type: Type.RADAR
        };
    }

    // 重写获取默认配置方法，添加折线图特有的样式
    getDefaultOption(): EChartsOption {
        const baseOption = super.getDefaultOption();
        const radarDefaultOption: EChartsOption = {
            radar: {
                splitArea: {
                    show: false
                },
                axisName: {
                    color: this.getDesignToken('--cos-color-text-minor'),
                }
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            legend: {
                top: 'bottom'
            }
        };
        return deepMerge(baseOption, radarDefaultOption);
    }

    // 重写后处理方法
    postProcessOption(option: EChartsOption): EChartsOption {
        if (option.series && Array.isArray(option.series)) {
            option.series = this.setSeries(option.series);
        }

        return super.postProcessOption(option);
    }
    // 设置 series 的默认样式
    setSeries(series: SeriesOption[]): RadarSeriesOption[] {
        return series.map((item, index) => {
            const radarSeriesOption: RadarSeriesOption = {
                type: Type.RADAR,
                areaStyle: {
                    opacity: 0.05
                },
                lineStyle: {
                    width: 2
                }
            };

            return {
                ...radarSeriesOption,
                // 放最后方便用户覆盖
                ...item
            } as RadarSeriesOption;
        });
    }
}
