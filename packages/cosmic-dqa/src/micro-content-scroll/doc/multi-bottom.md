```san export=preview caption=多个内容，作者在底部
import {Component} from 'san';
import MicroContentScroll from '@cosui/cosmic-dqa/micro-content-scroll';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-micro-content-scroll
            items="{{items}}"
            span="{{span}}"
            appearance="{{appearance}}"
            title="{{title}}"
        />
    `;

    static components = {
        'cosd-micro-content-scroll': MicroContentScroll
    };

    initData() {
        return {
            title: '以下是网友评论:',
            items: [
                {
                    avatar: 'https://gips0.baidu.com/it/u=1093237061,3929050000&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f670_792',
                    author: '爱吃狼牙的土豆爱吃狼牙的土豆爱吃狼牙的土豆爱吃狼牙的土豆',
                    content: '内容内容',
                },
                {
                    avatar: 'https://gips0.baidu.com/it/u=1093237061,3929050000&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f670_792',
                    author: '爱吃狼牙的土豆',
                    content: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容',
                },
                {
                    avatar: 'https://gips0.baidu.com/it/u=1093237061,3929050000&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f670_792',
                    author: '爱吃狼牙的土豆',
                    content: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容',
                }
            ],
            span: 8,
            appearance: 'bottom'
        }
    }
}
```