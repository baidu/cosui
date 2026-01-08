```san export=preview caption=enhance用法 shadow=none
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';

export default class AudioPlayerDemo extends Component {
    static template = `
        <div>
            <cos-audio-player
                appearance="enhance"
                src="{{src}}"
                preload="metadata"
                title="你好你好"
                on-ended="handleEnded"
                on-user-activation="handleClick"
            />
        </div>
    `;
    static components = {
        'cos-audio-player': AudioPlayer
    };

    initData() {
        return {
            src: 'https://sensearch.baidu.com/gettts?lan=en&text=Rotation%20of%20one%20person%20in%20front%20and%20one%20person%20in%20back&source=alading'
        };
    }

    handleEnded(e) {
        console.log('audio ended!');
    }
    handleClick({e, action}) {
        console.log('click');
    }
}

```
