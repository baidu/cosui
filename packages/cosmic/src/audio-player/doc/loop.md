```san export=preview caption=循环播放
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';

export default class AudioPlayerDemo extends Component {
    static template = `
        <div>
            <cos-audio-player src="{{src}}" loop />
        </div>
    `;
    static components = {
        'cos-audio-player': AudioPlayer,
    };

    initData() {
        return {
            src: 'https://sp0.baidu.com/-rM1hT4a2gU2pMbgoY3K/gettts?lan=uk&text=apple&spd=2&source=alading'
        };
    }
}

```
