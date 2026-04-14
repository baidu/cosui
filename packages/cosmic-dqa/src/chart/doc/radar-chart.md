```san export=preview caption=雷达图基本示例
import {Component} from 'san';
import Chart from '@cosui/cosmic-dqa/chart';

export default class RadarChartDemo extends Component {
    static template = `
        <div style="height: 300px">
            <cosd-chart
                type="radar"
                s-ref="radarChart"
                option="{{radarOption}}"
                on-chart-rendered="handleChartRendered"
            />
        </div>
    `;

    static components = {
        'cosd-chart': Chart
    };

    initData() {
        return {
            radarOption: {
                radar: {
                    indicator: [
                        { name: '维度一', max: 6500 },
                        { name: '维度二', max: 16000 },
                        { name: '维度三', max: 30000 },
                        { name: '维度四', max: 38000 },
                        { name: '维度五', max: 52000 },
                    ],
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: '数据1',
                    
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: '数据2'
                    }]
                }]
            },
        }
    }

    handleChartRendered() {
        console.log('Radar Chart rendered');
        const chartRef = this.ref('radarChart');
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
