/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * @file AudioPlayer
 */

import {Component} from 'san';
import {EnhanceAudioPlayerData, AudioStatus, AudioPreload, AudioPlayerEvents, AudioPlayerMethods} from './interface';
import {LoopPlayIcon, LoopInitIcon, PlayIcon, PauseIcon} from './svg';
import EnhanceAudio from './enhance-audio';

export default class AudioPlayer extends Component<EnhanceAudioPlayerData> implements AudioPlayerMethods {

    static trimWhitespace = 'all';
    static template = `
        <span class="cos-audio-player {{playStatusClass}}">
            <cos-enhance-audio
                s-if="appearance === 'enhance'"
                loop="{{loop}}"
                title="{{title}}"
                poster="{{poster}}"
                _playStatus="{{_playStatus}}"
                _currentTime="{{_currentTime}}"
                _duration="{{_duration}}"
                on-click="toggle" />
            <span s-else class="cos-audio-player-icon" on-click="toggle">
                <slot>
                    <template s-if="loop">
                        <template s-if="_playStatus === 0">
                            ${LoopInitIcon}
                        </template>
                        <template s-else-if="_playStatus === 1">
                            ${LoopPlayIcon}
                        </template>
                        <template s-else>
                            ${PauseIcon}
                        </template>
                    </template>
                    <template s-else>
                        ${PlayIcon}
                    </template>
                </slot>
            </span>
            <audio
                s-ref="audio"
                src="{{src}}"
                preload="{{preload}}"
                on-play="playHandler($event)"
                on-loadedmetadata="loadedmetadata"
                on-durationchange="durationchange"
                on-pause="pauseHandler($event)"
                on-ended="ended($event)"
                on-timeupdate="timeupdate($event)"
                on-canplay="canplay($event)"
                on-canplaythrough="canplaythrough($event)"/>
        </span>
    `;

    static components = {
        'cos-enhance-audio': EnhanceAudio
    };

    static computed = {
        playStatusClass(this: AudioPlayer) {
            const _playStatus = this.data.get('_playStatus');
            if (!this.data.get('loop') || this.data.get('appearance') === 'enhance') {
                return _playStatus === AudioStatus.PLAYING ? 'cos-audio-player-play' : 'cos-audio-player-init';
            }
            if (_playStatus === AudioStatus.PLAYING) {
                return 'cos-audio-player-play';
            }
            return _playStatus === AudioStatus.PENDING ? 'cos-audio-player-init' : 'cos-audio-player-pause';
        }
    };

    audio: HTMLMediaElement;
    timer: ReturnType<typeof setTimeout> | null;
    visibilityChangeCallback: () => void;

    initData(): EnhanceAudioPlayerData {
        return {
            src: '',
            loop: false,
            appearance: '',
            title: '',
            poster: 'https://now.bdstatic.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/answer_audio_album.png',
            preload: AudioPreload.NONE,
            _playStatus: AudioStatus.PENDING,
            _duration: 0,
            _currentTime: 0
        };
    }

    attached() {
        this.audio = (this.ref('audio') as unknown) as HTMLMediaElement;
        // 监听页面可见性事件，暂停播放
        this.visibilityChangeCallback = this.visibilityChange.bind(this);
        window.addEventListener('visibilitychange', this.visibilityChangeCallback);
        window.addEventListener('pagehide', this.visibilityChangeCallback);

        // enhance 模式不支持循环播放
        if (this.isEnhance()) {
            return;
        }
        // 在 audio 模版上设置 loop 属性时，主模版无法解析 loop="false"，一直处于循环播放状态（原因未知）,因此通过 js 设置
        if (this.data.get('loop')) {
            this.audio.loop = true;
        }
        this.watch('loop', loop => {
            this.audio.loop = loop;
        });
    }

    detached() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        window.removeEventListener('visibilitychange', this.visibilityChangeCallback);
        window.removeEventListener('pagehide', this.visibilityChangeCallback);
    }

    isEnhance() {
        return this.data.get('appearance') === 'enhance';
    }
    visibilityChange() {
        if (this.isPlaying() && document.hidden) {
            this.pause();
            this.data.set('_playStatus', AudioStatus.PAUSED);
        }
    }

    toggle(e: Event) {
        if (!this.data.get('src')) {
            return;
        }
        const _playStatus = this.data.get('_playStatus');
        _playStatus === AudioStatus.PLAYING
            ? (this.pause(), this.data.set('_playStatus', AudioStatus.PAUSED))
            : (this.play(), this.data.set('_playStatus', AudioStatus.PLAYING));
        this.fire<AudioPlayerEvents['user-activation']>('user-activation', {
            event: e,
            action: this.isPlaying() ? 'play' : 'pause'});
    }

    loadedmetadata() {
        this.data.set('_duration', this.audio.duration === Infinity ? 0 : this.audio.duration);
    }

    durationchange() {
        if (this.audio.duration !== Infinity) {
            this.data.set('_duration', this.audio.duration);
        }
    }

    playHandler(event: Event) {
        this.data.set('_playStatus', AudioStatus.PLAYING);
        this.fire<AudioPlayerEvents['play']>('play', {event});
        this.isEnhance() && this.updateCurrentTime();
    }

    pauseHandler(event: Event) {
        this.data.set('_playStatus', AudioStatus.PAUSED);
        this.fire<AudioPlayerEvents['pause']>('pause', {event});
    }

    ended(event: Event) {
        this.data.set('_currentTime', 0);
        this.data.set('_playStatus', AudioStatus.PENDING);
        this.fire<AudioPlayerEvents['ended']>('ended', {event});
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    canplay(event: Event) {
        this.fire<AudioPlayerEvents['canplay']>('canplay', {event});
    }

    canplaythrough(event: Event) {
        this.fire<AudioPlayerEvents['canplaythrough']>('canplaythrough', {event});
    }

    timeupdate(event: Event) {
        this.fire<AudioPlayerEvents['timeupdate']>('timeupdate', {event});
    }

    isPlaying() {
        return this.data.get('_playStatus') === AudioStatus.PLAYING;
    }

    /**
     * 更新当前播放时间
     */
    updateCurrentTime() {
        const tick = () => {
            if (this.audio?.paused) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                return;
            }
            this.data.set('_currentTime', this.audio?.currentTime);
            this.timer = setTimeout(tick, 100);
        };

        this.timer = setTimeout(() => {
            tick();
        }, 100);
    }
}


