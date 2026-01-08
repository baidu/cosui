```san export=preview caption=多audio互斥
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';

export default class AudioPlayerDemo extends Component {
    static template = `
        <div>
            <div on-click="handleClick1">
                <cos-audio-player src="{{src}}" s-ref="audio1" />
            </div>
            <div on-click="handleClick2">
                <cos-audio-player src="{{src}}" s-ref="audio2" />
            </div>
        </div>
    `;
    static components = {
        'cos-audio-player': AudioPlayer
    };

    handleClick1() {
        if (this.ref('audio2').isPlaying()) {
            this.ref('audio2').pause();
        }
    }
    handleClick2() {
        if (this.ref('audio1').isPlaying()) {
            this.ref('audio1').pause();
        }
    }

    initData() {
        return {
            src: 'https://sensearch.baidu.com/gettts?lan=en&text=Rotation%20of%20one%20person%20in%20front%20and%20one%20person%20in%20back&source=alading'
        };
    }
}

```
