```san export=preview caption=异常情况
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';

export default class AudioPlayerDemo extends Component {
    static template = `
        <div style="display:flex;">
            <h3>src 为空: </h3>
            <cos-audio-player />
        </div>
    `;
    static components = {
        'cos-audio-player': AudioPlayer
    };
}

```