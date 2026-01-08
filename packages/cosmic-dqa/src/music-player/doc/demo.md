```san export=preview caption=多媒体播放器组件

import {Component} from 'san';
import MusicPlayer from '@cosui/cosmic-dqa/music-player';

export default class MobileDemo extends Component {
    static template = `
        <div style="height: 300px;">
            <cosd-music-player
                s-ref="music-player"
                src="{{src}}"
                icon="{{icon}}"
                name="{{name}}"
                title="{{title}}"
                lyrics="{{lyrics}}"
                poster="{{poster}}"
                currentTime="{{currentTime}}"
                duration="{{duration}}"
                tag="{{tag}}"
                download="{{isPc ? '' : download}}"
                status="{{status}}"
                on-play="handlePlay"
                on-pause="handlePause"
                on-download="handleDownload"
                on-click="native:handleClick"
                on-timeupdate="handleTimeUpdate"
            />
        </div>
    `;

    static components = {
        'cosd-music-player': MusicPlayer,
    };

    initData() {
        return {
            icon: 'ai-music',
            name: 'AI音乐',
            autoplay: false,
            currentTime: 0,
            download: '',
            duration: 179748,
            loop: false,
            lyrics: [
                {
                    content: '站台只剩风声在回响',
                    startTime: 19160,
                    endTime: 26560
                },
                {
                    content: '路灯拉长我身影摇晃',
                    startTime: 26560,
                    endTime: 34000
                },
                {
                    content: '铁轨延伸向未知远方',
                    startTime: 34000,
                    endTime: 40880
                },
                {
                    content: '末班车带走最后的光',
                    startTime: 40880,
                    endTime: 47800
                },
                {
                    content: '错过的不只是末班车厢',
                    startTime: 47800,
                    endTime: 54720
                },
                {
                    content: '还有你眼里的整个星芒',
                    startTime: 54720,
                    endTime: 62560
                },
                {
                    content: '时间像铁轨冰冷漫长',
                    startTime: 62560,
                    endTime: 70840
                },
                {
                    content: '我们终成彼此的远方',
                    startTime: 70840,
                    endTime: 93120
                },
                {
                    content: '检票口散落旧车票张',
                    startTime: 93120,
                    endTime: 100440
                },
                {
                    content: '像被退回的约定泛黄',
                    startTime: 100440,
                    endTime: 107800
                },
                {
                    content: '广播里传来机械女嗓',
                    startTime: 107800,
                    endTime: 114720
                },
                {
                    content: '提醒这是终点站方向',
                    startTime: 114720,
                    endTime: 121640
                },
                {
                    content: '错过的不只是末班车厢',
                    startTime: 121640,
                    endTime: 128560
                },
                {
                    content: '还有你眼里的整个星芒',
                    startTime: 128560,
                    endTime: 136400
                },
                {
                    content: '时间像铁轨冰冷漫长',
                    startTime: 136400,
                    endTime: 145160
                },
                {
                    content: '我们终成彼此的远方',
                    startTime: 145160,
                    endTime: 151600
                },
                {
                    content: '候车长椅渐渐变凉',
                    startTime: 151600,
                    endTime: 159000
                },
                {
                    content: '月光在时刻表上流淌',
                    startTime: 159000,
                    endTime: 166400
                },
                {
                    content: '下一班要等到天亮',
                    startTime: 166400,
                    endTime: 179750
                }
            ],
            poster: 'http://biyeji.bj.bcebos.com/biyeji/8a1a0957-fad3-4503-8dc7-0975ba952fe3_cover.jpg?authorization=bce-auth-v1%2FALTAKmda7zOvhZVbRzBLewvCMU%2F2025-09-27T06%3A51%3A39Z%2F-1%2F%2Fceddb8b1063c646800bad57ec817c7da3b435ffe0d6823adef7637247ec0375a',
            src: 'http://biyeji.bj.bcebos.com/biyeji/8a1a0957-fad3-4503-8dc7-0975ba952fe3_0.mp3?authorization=bce-auth-v1%2FALTAKmda7zOvhZVbRzBLewvCMU%2F2025-09-27T06%3A51%3A39Z%2F-1%2F%2F7291c56076c5ab123b517158d99809965855bb4d689680f084871056836d55c9',
            status: 'finished',
            tag: 'https://gips0.baidu.com/it/u=4287628262,3630730191&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f192_45',
            title: '夜车与星空'
        };
    }
}
```
