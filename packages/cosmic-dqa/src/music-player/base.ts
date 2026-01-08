/**
 * @file MusicPlayerBase 组件
 */
import {Component} from 'san';
import type {MusicPlayerProps, MusicPlayerEvents} from './interface';
import {MusicPlayerStatus, Status} from './interface';

export default class BaseMusicPlayer extends Component<MusicPlayerProps> {

    initData(): MusicPlayerProps {
        return {
            _playStatus: MusicPlayerStatus.PENDING,
            _currentLyricIndex: 0,
            _progress: 0,
            _isSeeking: false,
            _vinyl: 'https://gips2.baidu.com/it/u=2059581208,4043524228&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f544_544',
            icon: '',
            title: '',
            poster: '',
            lyrics: [],
            src: '',
            currentTime: 0,
            duration: 0,
            status: Status.FINISHED
        };
    }

    // 获取是否是播报状态
    isPlaying(status: boolean) {
        this.data.set('_playStatus', status ? MusicPlayerStatus.PLAYING : MusicPlayerStatus.PAUSED);
        return status;
    }

    // 播放
    play(event?: Event) {
        this.data.set('_playStatus', MusicPlayerStatus.PLAYING);
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        if (!audio || event?.defaultPrevented) {
            return;
        }
        // 互斥逻辑，暂停其他音频播放
        const audios = document.querySelectorAll('audio');
        for (const audio of audios) {
            if (audio !== event?.target) {
                audio.pause();
            }
        }
        audio.play();
    }

    // 暂停播放
    pause(event?: Event) {
        this.data.set('_playStatus', MusicPlayerStatus.PAUSED);
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        if (!audio || event?.defaultPrevented) {
            return;
        }
        audio.pause();
    }

    // 点击播放/暂停按钮
    toggle(event: Event) {
        const _playStatus = this.data.get('_playStatus');
        const isPlaying = _playStatus === MusicPlayerStatus.PLAYING;
        this.fire<MusicPlayerEvents['play' | 'pause']>(
            isPlaying ? 'pause' : 'play',
            {event, currentTime: this.data.get('currentTime')}
        );
        event.stopPropagation();
        if (!this.data.get('src')) {
            return;
        }
        isPlaying ? this.pause(event) : this.play(event);
    }
}
