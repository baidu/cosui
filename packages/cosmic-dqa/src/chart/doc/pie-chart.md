```san export=preview caption=饼图基本示例
import {Component} from 'san';
import Chart from '@cosui/cosmic-dqa/chart';

export default class PieChartDemo extends Component {
    static template = `
        <div style="height: 300px">
            <cosd-chart
                type="pie"
                option="{{pieOption}}"
                on-chart-rendered="handleChartRendered"
            />
        </div>
    `;

    static components = {
        'cosd-chart': Chart
    };

    initData() {
        return {
            pieOption: {
                title: {
                    text: '饼图示例',
                },
                series: [
                    {
                        name: 'Week',
                        data: [
                            {value: 1048, name: 'Mon'},
                            {value: 735, name: 'Tue'},
                            {value: 580, name: 'Wed'},
                            {value: 484, name: 'Thu'},
                            {value: 300, name: 'Fri'},
                            {value: 1048, name: 'Mon1'},
                            {value: 735, name: 'Tue1'},
                            {value: 580, name: 'Wed1'},
                            {value: 484, name: 'Thu1'},
                            {value: 300, name: 'Fri1'},
                            {value: 1048, name: 'Mon2'},
                            {value: 735, name: 'Tue2'},
                            {value: 580, name: 'Wed2'},
                            {value: 484, name: 'Thu2'},
                            {value: 300, name: 'Fri2'},
                        ],
                    }
                ]
            }
        }
    }

    handleChartRendered() {
        console.log('Pie chart rendered');
    }
}
```
