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
    MapSeriesOption,
    SeriesOption
} from 'echarts';
import BaseChart from './base-chart';
import {seriesAreaColors} from './constant';
import {Type} from './interface';
import {deepMerge} from './utils';

export default class MapChart extends BaseChart {
    initData() {
        const baseData = super.initData();

        return {
            ...baseData,
            type: Type.MAP
        };
    }

    // 重写获取默认配置方法，添加折线图特有的样式
    getDefaultOption(): EChartsOption {
        const baseOption = super.getDefaultOption();
        const mapDefaultOption: EChartsOption = {
            tooltip: {
                show: true,
                trigger: 'item',
                backgroundColor: this.getDesignToken('--cos-color-bg'),
                shadowColor: this.getDesignToken('--cos-color-bg-raised-inverse'),
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderColor: this.getDesignToken('--cos-color-border'),
                borderRadius: 6,
                textStyle: {
                    "color": this.getDesignToken('--cos-color-text')
                }
            },
            legend: {
                show: false
            },
            visualMap: {
                backgroundColor: this.getDesignToken('--cos-color-bg'),
                opacity: 0.9,
                inRange: {
                    color: [
                        "#D6E6FF",
                        "#3366FF"
                    ]
                },
                calculable: true,
                precision: 0,
                left: 10,
                bottom: 8,
                textGap: 4,
                hoverLink: true,
                itemWidth: 16,
                itemHeight: 54,
                indicatorIcon: 'path://M 79.5,20.5 C 80.1667,20.5 80.8333,20.5 81.5,20.5C 81.8333,20.5 82.1667,20.5 82.5,20.5C 85.1667,20.5 87.8333,20.5 90.5,20.5C 90.8333,20.5 91.1667,20.5 91.5,20.5C 94.5,20.5 97.5,20.5 100.5,20.5C 100.833,20.5 101.167,20.5 101.5,20.5C 104.5,20.5 107.5,20.5 110.5,20.5C 110.833,20.5 111.167,20.5 111.5,20.5C 114.5,20.5 117.5,20.5 120.5,20.5C 120.833,20.5 121.167,20.5 121.5,20.5C 124.167,20.5 126.833,20.5 129.5,20.5C 129.833,20.5 130.167,20.5 130.5,20.5C 133.5,20.5 136.5,20.5 139.5,20.5C 139.833,20.5 140.167,20.5 140.5,20.5C 143.5,20.5 146.5,20.5 149.5,20.5C 149.833,20.5 150.167,20.5 150.5,20.5C 153.5,20.5 156.5,20.5 159.5,20.5C 159.833,20.5 160.167,20.5 160.5,20.5C 163.5,20.5 166.5,20.5 169.5,20.5C 169.833,20.5 170.167,20.5 170.5,20.5C 173.167,20.5 175.833,20.5 178.5,20.5C 178.833,20.5 179.167,20.5 179.5,20.5C 182.5,20.5 185.5,20.5 188.5,20.5C 188.833,20.5 189.167,20.5 189.5,20.5C 192.5,20.5 195.5,20.5 198.5,20.5C 198.833,20.5 199.167,20.5 199.5,20.5C 202.5,20.5 205.5,20.5 208.5,20.5C 208.833,20.5 209.167,20.5 209.5,20.5C 212.167,20.5 214.833,20.5 217.5,20.5C 217.833,20.5 218.167,20.5 218.5,20.5C 221.831,21.6154 225.164,22.9487 228.5,24.5C 231.503,25.6662 234.17,27.3328 236.5,29.5C 237.167,30.8333 238.167,31.8333 239.5,32.5C 241.167,35.1667 242.833,37.8333 244.5,40.5C 248.757,50.6673 248.423,60.6673 243.5,70.5C 241.833,73.1667 240.167,75.8333 238.5,78.5C 237.5,78.8333 236.833,79.5 236.5,80.5C 233.833,82.1667 231.167,83.8333 228.5,85.5C 225.284,86.9382 221.951,88.1048 218.5,89C 172.833,89.6667 127.167,89.6667 81.5,89C 78.0662,88.4424 74.7328,87.609 71.5,86.5C 68.5229,84.5333 65.5229,82.5333 62.5,80.5C 62.5,79.8333 62.1667,79.5 61.5,79.5C 59.5,76.5 57.5,73.5 55.5,70.5C 54.1581,67.0921 52.8248,63.7588 51.5,60.5C 51.5,60.1667 51.5,59.8333 51.5,59.5C 51.5,56.5 51.5,53.5 51.5,50.5C 51.5,50.1667 51.5,49.8333 51.5,49.5C 51.5,49.1667 51.5,48.8333 51.5,48.5C 52.871,46.064 53.871,43.3973 54.5,40.5C 56.1667,37.8333 57.8333,35.1667 59.5,32.5C 60.5,32.1667 61.1667,31.5 61.5,30.5C 62.5,30.1667 63.1667,29.5 63.5,28.5C 66.1667,26.8333 68.8333,25.1667 71.5,23.5C 74.4855,23.0972 77.1522,22.0972 79.5,20.5 Z\"',
                indicatorSize: "150%",
                indicatorStyle: {
                    borderColor: this.getDesignToken('--cos-color-bg'),
                    borderWidth: 2,
                },
                textStyle: {
                    color: this.getDesignToken('--cos-color-text-minor')
                },
                handleStyle: {
                    opacity: 0
                },
            },
            geo: {
                type: 'map',
                zoom: 1,
                scaleLimit: {
                    min: 0.8,
                    max: 5
                },
                roam: true,
                label: {
                    show: true,
                    color: this.getDesignToken('--cos-color-text'),
                    fontSize: 10,
                    textBorderWidth: 1,
                    textBorderColor: this.getDesignToken('--cos-color-bg'),
                    fontWeight: 500
                },
                emphasis: {
                    itemStyle: {
                        color: '#FFBF00',
                        borderColor: this.getDesignToken('--cos-color-bg')
                    },
                    label: {
                        color: this.getDesignToken('--cos-color-text'),
                        show: true,
                    }
                },
                select: {
                    itemStyle: {
                        color: '#FFBF00',
                        borderColor: this.getDesignToken('--cos-color-bg')
                    },
                    label: {
                        color: this.getDesignToken('--cos-color-text'),
                        show: true,
                    }
                },
                layoutCenter: ['50%', '50%'],
                aspectScale: 1,
                itemStyle: {
                    borderColor: this.getDesignToken('--cos-color-bg'),
                    borderWidth: 1,
                }
            }
        }
        return deepMerge(baseOption, mapDefaultOption);
    }

    // 目前版本echart的tooltip params类型没有axis相关信息，因此any绕过，后续升级了echart到5.5+再处理
    // https://app.unpkg.com/echarts@5.5.0/files/types/src/component/tooltip/TooltipView.d.ts
    tooltipFormatter(params: any): string {
        const tooltipStrFn = (params: any) => {  
            return `${params.name}<br/>${params.marker}${params.value}`;
        }
        if (Array.isArray(params)) {
            let tooltip = `${params[0].axisValue}<br/>`;
            params.forEach((param: any) => {
                tooltip += `${tooltipStrFn(param)}`;
            });

            return tooltip;
        }

        return `${tooltipStrFn(params)}`;
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
    setSeries(series: SeriesOption[]): MapSeriesOption[] {
        return series.map((item, index) => {
            const mapSeriesOption: MapSeriesOption = {
                type: Type.MAP
            };

            return {
                ...mapSeriesOption,
                // 放最后方便用户覆盖
                ...item
            } as MapSeriesOption;
        });
    }
}
