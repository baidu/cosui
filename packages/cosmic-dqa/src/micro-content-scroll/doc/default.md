```san export=preview caption=基本示例
import {Component} from 'san';
import MicroContentScroll from '@cosui/cosmic-dqa/micro-content-scroll';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-micro-content-scroll
            items="{{items}}"
            title="{{title}}"
        />
    `;

    static components = {
        'cosd-micro-content-scroll': MicroContentScroll
    };

    initData() {
        return {
            title: '以下是网友的评论:',
            items: [
                {
                    avatar: 'https://gips0.baidu.com/it/u=1093237061,3929050000&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f670_792',
                    author: '爱吃狼牙的土豆',
                    content: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容',
                    thumbnail: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
                    linkInfo: {
                        href: 'https://www.baidu.com'
                    },
                }
            ]
        }
    }
}
```