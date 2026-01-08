```san export=preview caption=展开示例

import {Component} from 'san';
import RoutePlanner from '@cosui/cosmic-dqa/route-planner';

export default class DefaultDemo extends Component {

    static template = `
        <cosd-route-planner
            folded={{false}}
            locationList="{{routePlannerData.locationList}}"
            routeList="{{routePlannerData.routeList}}"
            on-location-click="handleLocationClick"
            on-route-click="handleRouteClick"
        />
    `;

    static components = {
        'cosd-route-planner': RoutePlanner
    };

    initData() {
        return {
            routePlannerData: {
                locationList: [
                    {
                        id: '1',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点1景点1景点1景点1',
                        score: 4.5,
                        address: 'xx区-xxx路xxx街xx号',
                        category: '品类',
                        averageCost: '100元/人'
                    },
                    {
                        id: '2',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点2',
                        score: 4.5,
                        address: 'xx区-xxx路xxx街xx号',
                        category: '品类',
                        averageCost: '100元/人',
                        tags: [
                            {
                                text: 'xx美食热门榜 第1名',
                                color: 'blue'
                            },
                            // 简写形式，默认为灰色、线型的标签
                            '打卡好去处'
                        ]
                    },
                ],
                routeList: [
                    {
                        startLocationId: '1',
                        endLocationId: '2',
                        distance: '相距1.6km',
                        linkInfo: {},
                        transportOptions: [
                            {
                                type: 'car',
                                duration: '1 小时 11 分钟'
                            },
                            {
                                type: 'publicTransport',
                                duration: '1 小时 11 分钟'
                            },
                            {
                                type: 'walk',
                                duration: '1 小时 11 分钟'
                            }
                        ]
                    }
                ]
            }
        }
    }

    handleLocationClick({event, index, item}) {
        console.log('[route-planner] location click event', event, index, item);
    }

    handleRouteClick({event, index, item}) {
        console.log('[route-planner] route click event', event, index, item);
    }
}
```
