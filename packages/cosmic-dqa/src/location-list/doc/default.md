```san export=preview caption=列表展示

import {Component} from 'san';
import LocationList from '@cosui/cosmic-dqa/location-list';

export default class MultiDemo extends Component {

    static template = `
        <div>
            <h3>数据<= 3 条，直接展示：</h3>
            <cosd-location-list items="{{items1}}" />
            <br/><h3>数据 > 3 条，分页展示，支持横滑翻页查看：</h3>
            <cosd-location-list items="{{items2}}" />
        </div>
    `;

    static components = {
        'cosd-location-list': LocationList
    };

    initData() {
        return {
            items1: [
                {
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
                    score: 4.5,
                    address: 'xx区-xxx路xxx街xx号',
                    category: '品类',
                    averageCost: '100元/人'
                },
                {
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
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
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
                    score: 4.5,
                    address: 'xx区-xxx路xxx街xx号',
                    category: '品类',
                    averageCost: '100元/人',
                    openingHours: '08:00-12:00,13:00-17:00'
                }
            ],
            items2: [
                {
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
                    score: 4.5,
                    address: 'xx区-xxx路xxx街xx号',
                    category: '品类',
                    averageCost: '100元/人'
                },
                {
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
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
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
                    score: 4.5,
                    address: 'xx区-xxx路xxx街xx号',
                    category: '品类',
                    averageCost: '100元/人',
                    openingHours: '08:00-12:00,13:00-17:00'
                },
                {
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
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
                    linkInfo: {
                        href: 'http://www.baidu.com'
                    },
                    thumbnail: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    title: '店铺名字限制1行地点A名字限制1行',
                    score: 4.5,
                    address: 'xx区-xxx路xxx街xx号',
                    category: '品类',
                    averageCost: '100元/人',
                    openingHours: '08:00-12:00,13:00-17:00'
                }
            ]
        }
    }
}
```
