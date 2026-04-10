```san export=preview caption=Filled 样式

import {Component} from 'san';
import GreetingCard from '@cosui/cosmic-dqa/greeting-card';

export default class FilledDemo extends Component {
    static template = `
        <div>
            <cosd-greeting-card
                avatar="{{avatar}}"
                title="{{title}}"
                content="{{content}}"
                appearance="filled"
                voice="{{voice}}"
                video="{{video}}"
                s-ref='greetingCard'
            />
        </div>
    `;

    static components = {
        'cosd-greeting-card': GreetingCard
    };

    initData() {
        return {
            avatar: 'https://gips1.baidu.com/it/u=3202627837,1816445209&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f190_189',
            title: '别急别急，我帮你捋捋！',
            content: '可以和我电话聊聊',
            voice: {
                icon: 'https://gips0.baidu.com/it/u=1835758425,4258149038&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f45_45',
                text: '语音',
            },
            video: {
                icon: 'https://gips1.baidu.com/it/u=582878962,2389627290&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f45_45',
                text: '视频',
            }
        };
    }
}
```
