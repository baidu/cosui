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
 */

import Icon from '@cosui/cosmic/icon';
import type {MusicPlayerProps, MusicPlayerEvents} from './interface';
import {MusicPlayerStatus, Status} from './interface';
import MusicPlayerBase from './base';
import {isURL} from '@cosui/cosmic/util';

export default class MusicPlayer extends MusicPlayerBase {
    static template = `
        <div class="cosd-music-player">
            <div class="cosd-music-player-panel">
                <div>
                    <div class="cosd-music-player-type">
                        <img
                            s-if="_isUrl"
                            src="{{icon}}"
                            class="cosd-music-player-type-img"
                        />
                        <cos-icon
                            s-else
                            name="{{icon}}"
                            class="cosd-music-player-type-icon"
                        />
                        <div class="cosd-music-player-type-title">
                            {{ name }}
                        </div>
                    </div>
                    <div class="cosd-music-player-poster-wrapper">
                        <div class="cosd-music-player-poster-box">
                            <img
                                class="cosd-music-player-poster"
                                src="{{poster}}"
                                on-click="toggle"
                            />
                            <cos-icon
                                class="cosd-music-player-poster-icon"
                                name="{{_playStatus === '1' ? 'pause' : 'play'}}"
                                on-click="native:toggle"
                            />
                        </div>
                        <img
                            class="cosd-music-player-vinyl"
                            src="{{_vinyl}}"
                        />
                        <img
                            class="cosd-music-player-vinyl-poster"
                            src="{{poster}}"
                        />
                    </div>
                    <div
                        s-if="{{download}}"
                        class="cosd-music-player-download"
                        on-click="handleDownload"
                    >
                        <cos-icon name="download" />
                        <span class="cosd-music-player-download-text">下载</span>
                    </div>
                </div>
                <div class="cosd-music-player-content">
                    <div class="cosd-music-player-content-title">
                        {{ title }}
                    </div>
                    <div
                        s-ref="lyricsWrapper"
                        class="cosd-music-player-content-lyrics"
                    >
                        <div
                            s-for="item,index in lyrics"
                            class="cosd-music-player-content-lyric {{
                                    _currentLyricIndex === index ? 'cosd-music-player-content-lyric-active' : 'cosd-music-player-content-lyric-inactive'
                                }}"
                        >
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                s-if="{{_playStatus !== '0'}}"
                class="cosd-music-player-progress"
            >
                <div class="cosd-music-player-progress-bar {{status === 'finished' ? '' : 'cosd-music-player-progress-bar-loading'}}">
                    <div
                        s-ref="progressBar"
                        class="cosd-music-player-progress-inner {{status === 'finished' ? '' : 'cosd-music-player-progress-loading'}}"
                        style="{{{width: (status === 'finished' ? _progress : 100) + '%'}}}"
                    ></div>
                </div>
            </div>
            <audio
                s-ref="audio"
                src="{{src}}"
                on-play="play($event)"
                on-pause="pause($event)"
                on-timeupdate="onTimeUpdate($event)"
            ></audio>
            <img
                s-if="{{tag}}"
                class="cosd-music-player-tag"
                src="{{tag}}"
            />
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        _isUrl(this: MusicPlayer): boolean {
            const icon = this.data.get('icon');
            return isURL(icon);
        }
    };

    private _onTimeUpdate: (e: Event) => void;
    private _onPlay: (e: Event) => void;
    private _onPause: (e: Event) => void;

    initData(): MusicPlayerProps {
        return {
            _playStatus: MusicPlayerStatus.PENDING,
            _currentLyricIndex: 0,
            _progress: 0,
            // 黑胶背景图
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

    attached() {
        const audio = this.ref('audio') as unknown as HTMLAudioElement;

        this._onTimeUpdate = this.onTimeUpdate.bind(this);
        this._onPlay = this.play.bind(this);
        this._onPause = this.pause.bind(this);

        audio.addEventListener('timeupdate', this._onTimeUpdate);
        audio.addEventListener('play', this._onPlay);
        audio.addEventListener('pause', this._onPause);
    }

    detached() {
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        if (audio) {
            audio.removeEventListener('timeupdate', this._onTimeUpdate);
            audio.removeEventListener('play', this._onPlay);
            audio.removeEventListener('pause', this._onPause);
        }
    }

    // 时间戳更新 + 滚动歌词
    onTimeUpdate(event: any) {
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        const currentTime = event.currentTime || (audio.currentTime * 1000);
        const duration = event.duration || (audio.duration * 1000);

        // 更新进度条
        const progress = (currentTime / duration) * 100;
        this.data.set('_progress', progress);

        // 更新歌词
        const lyrics = this.data.get('lyrics') || [];

        const index = lyrics.findIndex(
            lyric => (lyric.startTime ?? 0) <= currentTime && currentTime < (lyric.endTime ?? Infinity)
        );

        requestAnimationFrame(() => {
            if (index !== -1 && this.data.get('_currentLyricIndex') !== index) {
                this.data.set('_currentLyricIndex', index);
                this.scrollLyrics(index);
            }
        });
    }

    // 滚动歌词，让当前高亮居中
    scrollLyrics(index: number) {
        const lyrics = this.ref('lyricsWrapper') as unknown as HTMLElement;
        if (!lyrics) {
            return;
        }

        const lyricNodes = lyrics.querySelectorAll('.cosd-music-player-content-lyric');
        const activeLyric = lyricNodes[index] as HTMLElement;
        if (!activeLyric) {
            return;
        }

        // 获取高亮元素和容器尺寸
        const containerHeight = lyrics.clientHeight;
        const lineHeight = activeLyric.offsetHeight;

        // 获取高亮元素相对于容器位置
        const lineRect = activeLyric.getBoundingClientRect();
        const containerRect = lyrics.getBoundingClientRect();
        const relativePosition = lineRect.top - containerRect.top;

        const scrollTop = relativePosition + lyrics.scrollTop - (containerHeight / 2) + (lineHeight / 2);

        lyrics.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }

    handleDownload(event: Event) {
        this.fire<MusicPlayerEvents['download']>('download', {event});
    }
}
