```san export=preview caption=单个示例

import {Component} from 'san';
import LocationCard from '@cosui/cosmic-dqa/location-card';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>基本样式</h3>
            <cosd-location-card s-bind="{{card1}}" />
            <h3>标签</h3>
            <cosd-location-card s-bind="{{card2}}" />
            <h3>营业时间</h3>
            <cosd-location-card s-bind="{{card3}}" />
        </div>
    `;

    static components = {
        'cosd-location-card': LocationCard
    };

    initData() {
        return {
            card1: {
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
            card2: {
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
            card3: {
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
        }
    }
}
```
