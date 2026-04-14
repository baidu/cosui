```san export=preview caption=Card 样式

import {Component} from 'san';
import GreetingCard from '@cosui/cosmic-dqa/greeting-card';

export default class CardDemo extends Component {
    static template = `
        <div>
            <cosd-greeting-card
                avatar="{{avatar}}"
                title="{{title}}"
                content="{{content}}"
                appearance="card"
                voice="{{voice}}"
                video="{{video}}"
                s-ref='greetingCard'
                on-voice-click="handleVoiceClick"
                on-video-click="handleVideoClick"
            >
            </cosd-greeting-card>
        </div>
    `;

    static components = {
        'cosd-greeting-card': GreetingCard
    };

    initData() {
        return {
            avatar: 'https://gips2.baidu.com/it/u=862978906,2063477461&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f900_990',
            title: '你好，我是小度',
            content: '天呐，听起来很难过？要不要试着跟我打电话细说一下？',
            voice: {
                icon: 'https://gips1.baidu.com/it/u=3333793116,1979905079&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f54_54',
                text: '语音',
            },
            video: {
                icon: 'https://gips3.baidu.com/it/u=2104997159,917643187&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f54_54',
                text: '视频',
            }
        };
    }

    handleVoiceClick() {
        console.log('语音被点击');
    }

    handleVideoClick() {
        console.log('视频被点击');
    }
}
```
