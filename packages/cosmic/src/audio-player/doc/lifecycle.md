``` san export=preview caption=生命周期
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';
import Button from '@cosui/cosmic/button';

export default class Lifecycle extends Component {

    static template = `
        <div data-testid="button-lifecycle">
            <h3>控制audio的生命周期</h3>
            <div class="cos-row cos-gutter cos-space-mt-xs">
                <cos-audio-player s-if="showAudio" src="{{src}}" on-ended="handleEnded" />
                <cos-button
                    appearance="secondary"
                    on-click="removeAudio"
                >
                    移除audio
                </cos-button>
            </div>
        </div>
    `;

    static components = {
        'cos-audio-player': AudioPlayer,
        'cos-button': Button
    };

    initData() {
        return {
            src: 'https://sensearch.baidu.com/gettts?lan=en&text=Rotation%20of%20one%20person%20in%20front%20and%20one%20person%20in%20back&source=alading',
            showAudio: true
        };
    }

    removeAudio() {
        this.data.set('showAudio', false)
    }
}

```