```san export=preview caption=基本示例

import {Component} from 'san';
import RoutePlanner from '@cosui/cosmic-dqa/route-planner';

export default class DefaultDemo extends Component {

    static template = `
        <cosd-route-planner
            locationList="{{routePlannerData.locationList}}"
            routeList="{{routePlannerData.routeList}}"
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
                    {
                        id: '3',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点3',
                        score: 4.5,
                        address: 'xx区-xxx路xxx街xx号',
                        category: '品类',
                        averageCost: '100元/人',
                        openingHours: '08:00-12:00,13:00-17:00'
                    },
                    {
                        id: '4',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点4',
                        score: 4.5,
                        address: 'xx区-xxx路xxx街xx号',
                        category: '品类',
                        averageCost: '100元/人'
                    },
                    {
                        id: '5',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点5',
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
                    {
                        id: '6',
                        linkInfo: {},
                        thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                        title: '景点6',
                        score: 4.5,
                        address: 'xx区-xxx路xxx街xx号',
                        category: '品类',
                        averageCost: '100元/人',
                        openingHours: '08:00-12:00,13:00-17:00'
                    }
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
                                duration: '11分钟'
                            }
                        ]
                    },
                    {
                        startLocationId: '2',
                        endLocationId: '3',
                        distance: '相距1.6km',
                        linkInfo: {},
                        transportOptions: [
                            {
                                type: 'car',
                                duration: '11分钟'
                            },
                            {
                                type: 'walk',
                                duration: '12分钟'
                            }
                        ]
                    },
                    {
                        startLocationId: '3',
                        endLocationId: '4',
                        distance: '相距1.6km',
                        linkInfo: {},
                        transportOptions: [
                            {
                                type: 'car',
                                duration: '11分钟'
                            },
                            {
                                type: 'publicTransport',
                                duration: '12分钟'
                            },
                            {
                                type: 'walk',
                                duration: '12分钟'
                            }
                        ]
                    },
                    {
                        startLocationId: '4',
                        endLocationId: '5',
                        distance: '相距1.6km',
                        linkInfo: {},
                        transportOptions: [
                            {
                                type: 'car',
                                duration: '11分钟'
                            },
                            {
                                type: 'publicTransport',
                                duration: '12分钟'
                            },
                            {
                                type: 'walk',
                                duration: '12分钟'
                            }
                        ]
                    },
                    {
                        startLocationId: '5',
                        endLocationId: '6',
                        distance: '相距1.6km',
                        linkInfo: {},
                        transportOptions: [
                            {
                                type: 'car',
                                duration: '11分钟'
                            },
                            {
                                type: 'publicTransport',
                                duration: '12分钟'
                            },
                            {
                                type: 'walk',
                                duration: '12分钟'
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```
