```san export=preview caption=基础用法 shadow=none
import {Component} from 'san';
import AudioPlayer from '@cosui/cosmic/audio-player';
import Icon from '@cosui/cosmic/icon';

export default class AudioPlayerDemo extends Component {
    static template = `
        <div>
            <cos-audio-player src="{{src}}" on-ended="handleEnded" on-user-activation="handleClick"/>
            <p class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">自定义图标示例</p>
            <cos-audio-player s-ref="audio" src="{{src}}" on-ended="handleEnded" on-user-activation="handleClickIcon">
                <cos-icon name="{{playStatus}}"/>
            </cos-audio-player>
        </div>
    `;

    static components = {
        'cos-audio-player': AudioPlayer,
        'cos-icon': Icon
    };

    initData() {
        return {
            src: 'https://sensearch.baidu.com/gettts?lan=en&text=Rotation%20of%20one%20person%20in%20front%20and%20one%20person%20in%20back&source=alading',
            playStatus: 'play'
        };
    }
    attached() {
        this.audio = this.ref('audio');
        // 监听页面可见性事件，暂停播放
        const visibilityChangeCallback = this.visibilityChange.bind(this);
        window.addEventListener('visibilitychange', visibilityChangeCallback);
        window.addEventListener('pagehide', visibilityChangeCallback);
        this.visibilityChangeCallback = visibilityChangeCallback;
    }

    detached() {
        window.removeEventListener('visibilitychange', this.visibilityChangeCallback);
        window.removeEventListener('pagehide', this.visibilityChangeCallback);
    }

    visibilityChange() {
        if (this.data.get('playStatus') === 'pause' && document.hidden) {
            this.data.set('playStatus', 'play');
            this.audio?.pause();
        }
    }
    handleEnded(e) {
        console.log('audio ended!');
        this.data.set('playStatus', 'play');
    }
    handleClick({e, action}) {
        console.log('click');
    }
    handleClickIcon(e) {
        console.log('click icon');
        this.data.set('playStatus', this.data.get('playStatus') === 'play' ? 'pause' : 'play');
    }
}
