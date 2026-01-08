```san export=preview caption=折线图基本示例
import {Component} from 'san';
import Chart from '@cosui/cosmic-dqa/chart';

export default class LineChartDemo extends Component {
    static template = `
        <div style="height: 300px">
            <cosd-chart
                type="line"
                s-ref="lineChart"
                option="{{lineOption}}"
                on-chart-rendered="handleChartRendered"
            />
        </div>
    `;

    static components = {
        'cosd-chart': Chart
    };

    initData() {
        return {
            lineOption: {
                title: {
                    text: '折线图示例'
                },
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    name: '日期',
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        name: 'Line 1',
                    },
                    {
                        data: [120, 182, 191, 234, 290, 330, 310],
                        name: 'Line 2',
                    }
                ]
            },
        }
    }

    handleChartRendered() {
        console.log('Line Chart rendered');
        const chartRef = this.ref('lineChart');
        const echartInstance = chartRef?.getEchartsInstance();
        console.log(echartInstance);
        echartInstance.on('legendselectchanged', (params) => {
           console.log(params);
        });
        echartInstance.on('highlight', (params) => {
            console.log(params);
        })
    }
}
```
