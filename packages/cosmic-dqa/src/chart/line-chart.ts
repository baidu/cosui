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
    LineSeriesOption,
    SeriesOption
} from 'echarts';
import BaseChart from './base-chart';
import {seriesAreaColors} from './constant';
import {Type} from './interface';
import {deepMerge} from './utils';

export default class LineChart extends BaseChart {
    initData() {
        const baseData = super.initData();

        return {
            ...baseData,
            type: Type.LINE
        };
    }

    // 重写获取默认配置方法，添加折线图特有的样式
    getDefaultOption(): EChartsOption {
        const baseOption = super.getDefaultOption();
        const lineDefaultOption: EChartsOption = {
            legend: {
                right: 0
            },
            tooltip: {
                axisPointer: {
                    type: 'line',
                    animationDurationUpdate: 0,
                    lineStyle: {
                        color: this.getDesignToken('--cos-color-border'),
                        type: 'dashed'
                    },
                    z: 1
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                type: 'value'
            }
        };
        return deepMerge(baseOption, lineDefaultOption);
    }

    // 目前版本echart的tooltip params类型没有axis相关信息，因此any绕过，后续升级了echart到5.5+再处理
    // https://app.unpkg.com/echarts@5.5.0/files/types/src/component/tooltip/TooltipView.d.ts
    tooltipFormatter(params: any): string {
        if (Array.isArray(params)) {
            let tooltip = `${params[0].axisValue}<br/>`;

            params.forEach((param: any) => {
                tooltip += `${param.marker}${param.seriesName}: ${param.value}<br/>`;
            });

            return tooltip;
        }

        return `${params.axisValue}<br/>${params.marker}${params.seriesName}: ${params.value}`;
    }

    // 重写后处理方法
    postProcessOption(option: EChartsOption): EChartsOption {
        if (option.series && Array.isArray(option.series)) {
            option.series = this.setSeries(option.series);
        }

        return super.postProcessOption(option);
    }
    getTooltipFormatter() {
        return this.tooltipFormatter;
    }
    // 设置 series 的默认样式
    setSeries(series: SeriesOption[]): LineSeriesOption[] {
        return series.map((item, index) => {
            const lineSeriesOption: LineSeriesOption = {
                type: Type.LINE,
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 8,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    borderColor: this.getDesignToken('--cos-color-bg'),
                    borderWidth: 2
                },
                areaStyle: {
                    origin: 'start',
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: seriesAreaColors && seriesAreaColors[index][0]
                        }, {
                            offset: 1, color: seriesAreaColors && seriesAreaColors[index][1]
                        }],
                        global: false
                    }
                }
            };

            return {
                ...lineSeriesOption,
                // 放最后方便用户覆盖
                ...item
            } as LineSeriesOption;
        });
    }
}
