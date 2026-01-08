```san export=preview caption=比对组件

import {Component} from 'san';
import Comparison from '@cosui/cosmic-dqa/comparison';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <cosd-comparison linkInfo="{{linkInfo}}" targets="{{targets}}" bar="{{bar}}" items="{{items}}" />
        </div>
    `;

    static components = {
        'cosd-comparison': Comparison
    };

    initData() {
        return {
            linkInfo: {
                href: 'http://www.baidu.com'
            },
            targets: [
                {
                    name: '队伍名1',
                    image: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9'
                },
                {
                    name: '队伍名2',
                    image: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9'
                }
            ],
            bar: [
                {
                    "value": .48,
                    "color": "#FC3250",
                    "text": "胜48%"
                },
                {
                    "value": .40,
                    "color": "#FFBE0D",
                    "text": "平40%"
                },
                {
                    "value": .12,
                    "color": "#0335FE",
                    "text": "胜12%"
                }
            ],
            items: [
                {
                    name: '近6场交锋',
                    values: ['2胜1平3负', '2胜1平3负']
                },
                {
                    name: '近10场交锋',
                    values: ['3胜3平4负', '5胜1平4负']
                },
                 {
                    name: '近10场交锋',
                    values: ['3胜3平4负', '5胜1平4负']
                }
            ]
        }
    }
}
```
