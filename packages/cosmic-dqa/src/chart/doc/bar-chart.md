```san export=preview caption=柱状图基本示例
import {Component} from 'san';
import Chart from '@cosui/cosmic-dqa/chart';

export default class BarChartDemo extends Component {
    static template = `
        <div style="height: 300px">
            <cosd-chart
                type="bar"
                option="{{barOption}}"
                on-chart-rendered="handleChartRendered"
            />
        </div>
    `;

    static components = {
        'cosd-chart': Chart
    };

    initData() {
        return {
            barOption: {
                title: {
                    text: '柱状图示例'
                },
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    name: 'x轴标题',
                },
                grid: {
                    bottom: '10%'
                },
                series: [
                    {
                        data: [120, 132, 101, 134, 90, 230, 210],
                        name: 'Bar 1',
                    },
                    {
                        data: [220, 182, 191, 234, 290, 330, 310],
                        name: 'Bar 2',
                    }
                ]
            },
        }
    }

    handleChartRendered() {
        console.log('Bar Chart rendered');
    }
}
```
