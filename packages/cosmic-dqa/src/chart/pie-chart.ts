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
    PieSeriesOption,
    SeriesOption,
    TooltipComponentFormatterCallbackParams
} from 'echarts';
import BaseChart from './base-chart';
import {Type} from './interface';
import {deepMerge} from './utils';

export default class PieChart extends BaseChart {
    initData() {
        const baseData = super.initData();

        return {
            ...baseData,
            type: Type.PIE
        };
    }

    // 重写获取默认配置方法，添加饼图特有的样式
    getDefaultOption(): EChartsOption {
        const baseOption = super.getDefaultOption();
        const pieDefaultOption: EChartsOption = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: 0,
                top: 'auto',
                left: 'center'
            },
            xAxis: {
                axisLine: {
                    show: false
                }
            }
        };

        return deepMerge(baseOption, pieDefaultOption);
    }

    // pie chart的tooltip格式化函数
    tooltipFormatter(params: TooltipComponentFormatterCallbackParams): string {
        // 对于饼图，params 是单个 CallbackDataParams 对象
        const param = Array.isArray(params) ? params[0] : params;

        return `${param.marker}${param.name}: ${param.value} (${param.percent}%)`;
    }

    // 重写后处理方法
    postProcessOption(option: EChartsOption): EChartsOption {
        if (option.series && Array.isArray(option.series)) {
            option.series = this.setSeries(option.series);
        }

        const tooltip = option.tooltip;

        if (tooltip && !Array.isArray(tooltip) && tooltip.trigger === undefined) {
            tooltip.trigger = 'item';
        }

        return super.postProcessOption(option);
    }
    getTooltipFormatter() {
        return this.tooltipFormatter;
    }
    // 设置 series 的默认样式
    setSeries(series: SeriesOption[]): PieSeriesOption[] {
        return series.map((item: SeriesOption) => {
            const pieSeriesOption: PieSeriesOption = {
                type: Type.PIE,
                padAngle: 3,
                startAngle: 135,
                radius: ['32.25%', '65%'],
                minAngle: 4,
                itemStyle: {
                    borderRadius: 6,
                    borderWidth: 0
                },
                label: {
                    show: false
                }
            };

            return {
                ...pieSeriesOption,
                // 放最后方便用户覆盖
                ...item
            } as PieSeriesOption;
        });
    }
}
