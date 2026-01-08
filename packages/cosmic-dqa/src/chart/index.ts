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
 * @file chart index
 */

import {Component} from 'san';
import {componentNameMap} from './constant';
import BarChart from './bar-chart';
import LineChart from './line-chart';
import PieChart from './pie-chart';
import {ChartProps, ChartMethods} from './interface';
import {ECharts} from 'echarts';
import BaseChart from './base-chart';

export default class Chart extends Component<ChartProps> implements ChartMethods {
    static trimWhitespace = 'all';

    static template = `
        <component
            s-is="{{componentChart}}"
            s-ref="base-chart"
            option="{{option}}"
            on-chart-rendered="handleChartRendered"
        />
    `;

    static components = {
        'cosd-line-chart': LineChart,
        'cosd-bar-chart': BarChart,
        'cosd-pie-chart': PieChart
    };

    static computed = {
        componentChart(this: Chart) {
            return componentNameMap[this.data.get('type')];
        }
    };
    getEchartsInstance(): ECharts | null {
        const baseChart = this.ref<BaseChart>('base-chart');
        return baseChart.chartInstance;
    }
    handleChartRendered() {
        this.fire('chart-rendered');
    }
}
