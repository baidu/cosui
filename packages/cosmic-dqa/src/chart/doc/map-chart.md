```san export=preview caption=地图基本示例
import {Component} from 'san';
import Chart from '@cosui/cosmic-dqa/chart';
import {mapDataJSON} from './mock';

export default class MapChartDemo extends Component {
    static template = `
        <div style="height: 300px">
            <cosd-chart
                type="map"
                s-ref="mapChart"
                option="{{mapOption}}"
                on-chart-rendered="handleChartRendered"
            />
        </div>
    `;

    static components = {
        'cosd-chart': Chart
    };

    initData() {
        return {
            mapOption: {
                mapName: "beijing",
                visualMap: {
                    "text": [
                        "高",
                        "低"
                    ],
                    "min": 41.9,
                    "max": 2226
                },
                "series": [
                    {
                        "geoIndex": 0,
                        "name": "基础热力地图",
                        "type": "map",
                        "map": "beijing",
                        "data": [
                            {
                                "name": "密云区",
                                "value": 2226,
                                "key": "",
                            },
                            {
                                "name": "怀柔区",
                                "value": 2123,
                                "key": ""
                            },
                            {
                                "name": "延庆区",
                                "value": 1995,
                                "key": ""
                            },
                            {
                                "name": "房山区",
                                "value": 1989.5,
                                "key": ""
                            },
                            {
                                "name": "门头沟区",
                                "value": 1450.7,
                                "key": ""
                            },
                            {
                                "name": "昌平区",
                                "value": 1343.5,
                                "key": ""
                            },
                            {
                                "name": "大兴区",
                                "value": 1036,
                                "key": ""
                            },
                            {
                                "name": "顺义区",
                                "value": 1019.9,
                                "key": ""
                            },
                            {
                                "name": "平谷区",
                                "value": 948,
                                "key": ""
                            },
                            {
                                "name": "通州区",
                                "value": 906.3,
                                "key": ""
                            },
                            {
                                "name": "朝阳区",
                                "value": 455.1,
                                "key": ""
                            },
                            {
                                "name": "海淀区",
                                "value": 430.7,
                                "key": ""
                            },
                            {
                                "name": "丰台区",
                                "value": 305.8,
                                "key": ""
                            },
                            {
                                "name": "石景山区",
                                "value": 84.3,
                                "key": ""
                            },
                            {
                                "name": "西城区",
                                "value": 50.5,
                                "key": ""
                            },
                            {
                                "name": "东城区",
                                "value": 41.9,
                                "key": ""
                            }
                        ]
                    }
                ],
                "geo": {
                    "nameProperty": "adcode",
                    "map": "beijing",
                    selectedMode: "single",
                    "nameMap": {
                        "110101": "东城区",
                        "110102": "西城区",
                        "110105": "朝阳区",
                        "110106": "丰台区",
                        "110107": "石景山区",
                        "110108": "海淀区",
                        "110109": "门头沟区",
                        "110111": "房山区",
                        "110112": "通州区",
                        "110113": "顺义区",
                        "110114": "昌平区",
                        "110115": "大兴区",
                        "110116": "怀柔区",
                        "110117": "平谷区",
                        "110118": "密云区",
                        "110119": "延庆区"
                    }
                }
            }
        }
    }

    attached() {
        this.fetchMapData();
    }
    fetchMapData() {
        // 模拟请求map数据
        setTimeout(() => {
            const chartRef = this.ref('mapChart');
            chartRef.registerMap(mapDataJSON.mapName, mapDataJSON.geoJSON)
        }, 1000);
    }
    handleChartRendered() {
        const chartRef = this.ref('mapChart');
        const echartInstance = chartRef?.getEchartsInstance();
        console.log('map',echartInstance);
        echartInstance.dispatchAction({
            type: 'mapSelect',
            mapName: 'beijing', 
            name: '朝阳区'
        });

        // 默认弹层
        echartInstance.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            name: '朝阳区'
        });
      
    }
}
```
