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
import type {MusicPlayerProps, MusicPlayerEvents, lyricItem} from './interface';
import {MusicPlayerStatus, Status} from './interface';
import MusicPlayerBase from './base';
import {isURL} from '@cosui/cosmic/util';

export default class MusicPlayer extends MusicPlayerBase {
    static template = `
        <div class="cosd-music-player">
            <div class="cosd-music-player-panel">
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
                <div class="cosd-music-player-wrapper">
                    <div class="cosd-music-player-poster-wrapper">
                        <div class="cosd-music-player-vinyl {{_playStatus === '1' ? 'cosd-music-player-vinyl-playing' : ''}}">
                            <div class="cosd-music-player-vinyl-wrapper {{_playStatus === '1' ? 'cosd-music-player-vinyl-wrapper-rotate' : ''}}">
                                <div
                                    class="cosd-music-player-vinyl-poster"
                                    style="--url: url({{poster}})"
                                >
                                </div>
                            </div>
                        </div>
                        <div class="cosd-music-player-poster-box">
                            <img
                                class="cosd-music-player-poster"
                                src="{{poster}}"
                                on-click="toggle"
                            />
                            <cos-icon
                                class="cosd-music-player-poster-icon {{_playStatus === '1' ? '' : 'cosd-music-player-poster-icon-play'}}"
                                name="{{_playStatus === '1' ? 'pause' : 'play'}}"
                                on-click="native:toggle"
                            />
                        </div>
                    </div>
                    <div class="cosd-music-player-content">
                        <div class="cosd-music-player-content-title">
                            {{ title }}
                        </div>
                        <div
                            class="cosd-music-player-content-lyrics
                                {{_showTopMask && !_showBottomMask ? 'cosd-music-player-content-lyrics-mask-top' : '' }}
                                {{_showBottomMask && !_showTopMask ? 'cosd-music-player-content-lyrics-mask-bottom' : '' }}
                                {{_showTopMask && _showBottomMask ? 'cosd-music-player-content-lyrics-mask-all' : ''}}
                            "
                        >
                            <div
                                s-ref="lyricsWrapper"
                                class="cosd-music-player-content-lyrics-scroll"
                            >
                                <div
                                    s-for="item,index in lyrics"
                                    class="cosd-music-player-content-lyric {{
                                        _currentLyricIndex === index
                                            ? 'cosd-music-player-content-lyric-active'
                                            : 'cosd-music-player-content-lyric-inactive'
                                    }}"
                                    on-click="handleLyricClick(item)"
                                >
                                    {{ item.content }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cosd-music-player-progress">
                <div
                    s-ref="progressBar"
                    class="cosd-music-player-progress-bar {{status === 'finished' ? '' : 'cosd-music-player-progress-bar-loading'}}"
                    on-click="handleProgressClick"
                >
                    <div
                        s-ref="progressBarInner"
                        class="cosd-music-player-progress-inner {{status === 'finished' ? '' : 'cosd-music-player-progress-loading'}}"
                        style="left: calc(-100% + 7.5px + (100% - 14px) * {{_progress}} / 100);"
                    ></div>
                </div>
                <div
                    s-ref="progressThumb"
                    class="cosd-music-player-progress-thumb"
                    style="left: calc(5.5px + (100% - 14px) * {{_progress}} / 100);"
                    on-mousedown="handleMousedown"
                    on-mouseup="handleMouseup"
                ></div>
                <div class="cosd-music-player-progress-bar-time">
                    <div class="cosd-music-player-progress-bar-time-current">{{formatTimeDuration(currentTime)}}</div>
                    <span>/{{formatTimeDuration(duration)}}</span>
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
    private _onLyricsScroll: EventListener;
    private _rafId: number | null = null;
    private _progressBarInnerEl: HTMLElement | null = null;

    initData(): MusicPlayerProps {
        return {
            _playStatus: MusicPlayerStatus.PENDING,
            _currentLyricIndex: 0,
            _progress: 0,
            _isSeeking: false,
            _showTopMask: false,
            _showBottomMask: false,
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

        this.handleMousemove = this.handleMousemove.bind(this);
        this.handleMouseup = this.handleMouseup.bind(this);

        const lyricsWrapper = this.ref('lyricsWrapper') as unknown as HTMLElement;
        if (lyricsWrapper) {
            this._onLyricsScroll = this.updateMaskState.bind(this);
            lyricsWrapper.addEventListener('scroll', this._onLyricsScroll);
        }

        this.nextTick(() => {
            this.updateMaskState();
            this.updateLyricsOpacity(0);
        });
    }

    detached() {
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        if (audio) {
            audio.removeEventListener('timeupdate', this._onTimeUpdate);
            audio.removeEventListener('play', this._onPlay);
            audio.removeEventListener('pause', this._onPause);
        }

        const lyricsWrapper = this.ref('lyricsWrapper') as unknown as HTMLElement;
        if (lyricsWrapper && this._onLyricsScroll) {
            lyricsWrapper.removeEventListener('scroll', this._onLyricsScroll);
        }
    }

    // 时间戳更新 + 滚动歌词
    onTimeUpdate(event: any) {
        // 进度条拖拽中不更新
        if (this.data.get('_isSeeking')) {
            return;
        }

        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        const currentTime = event.currentTime || (audio.currentTime * 1000);
        const duration = event.duration || (audio.duration * 1000);

        // 更新进度条
        this.data.set('currentTime', currentTime);
        const progress = (currentTime / duration) * 100;
        this.data.set('_progress', progress);

        // 更新歌词
        const lyrics = this.data.get('lyrics') || [];

        let index = lyrics.findIndex(
            lyric => (lyric.startTime ?? 0) <= currentTime && currentTime < (lyric.endTime ?? Infinity)
        );

        // 边界处理
        if (index === -1 && lyrics.length) {
            if (currentTime < (lyrics[0].startTime ?? 0)) {
                index = 0;
            }
            else if (currentTime >= (lyrics[lyrics.length - 1].startTime ?? 0)) {
                index = lyrics.length - 1;
            }
        }

        requestAnimationFrame(() => {
            if (index !== -1 && this.data.get('_currentLyricIndex') !== index) {
                this.data.set('_currentLyricIndex', index);
                this.scrollLyrics(index);
            }
        });
    }

    // 滚动歌词，让当前高亮位于居中偏上的位置
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

        // 计算让高亮元素出现在容器中间的滚动距离
        const currentTop = relativePosition + lyrics.scrollTop - (containerHeight / 2) + (lineHeight / 2);
        const scrollTop = currentTop + (lineHeight / 2);

        lyrics.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }


    // 更新歌词透明度
    updateLyricsOpacity(index: number) {
        const lyrics = this.ref('lyricsWrapper') as unknown as HTMLElement;
        const lyricNodes = Array.from(lyrics.querySelectorAll('.cosd-music-player-content-lyric'));
        const len = lyricNodes.length;

        if (!lyrics || !len) {
            return;
        }

        lyricNodes.forEach((node, i) => {
            node?.classList.remove(
                '.cos-opacity-100()',
                '.cos-opacity-75()',
                '.cos-opacity-50()'
            );

            // 默认透明度 50
            let opacityClass = '.cos-opacity-50()';

            // 头部特殊处理
            if (index === 0) {
                if (i <= 1) {
                    opacityClass = '.cos-opacity-100()';
                }
                else if (i <= 3) {
                    opacityClass = '.cos-opacity-75()';
                }
            }
            // 尾部特殊处理
            else if (index === len - 1) {
                if (i >= len - 2) {
                    opacityClass = '.cos-opacity-100()';
                }
                else if (i >= len - 4) {
                    opacityClass = '.cos-opacity-75()';
                }
            }
            else {
                // 中间高亮行处理
                const distance = Math.abs(i - index);
                if (distance === 0) {
                    opacityClass = '.cos-opacity-100()';
                }
                else if (distance === 1) {
                    opacityClass = '.cos-opacity-75()';
                }
            }

            node?.classList.add(opacityClass);
        });
    }

    updateMaskState() {
        const lyricsWrapper = this.ref('lyricsWrapper') as unknown as HTMLElement;
        if (!lyricsWrapper) {
            return;
        }

        const {scrollTop, scrollHeight, clientHeight} = lyricsWrapper;

        if (scrollHeight <= clientHeight) {
            this.data.set('_showTopMask', false);
            this.data.set('_showBottomMask', false);
            return;
        }

        this.data.set('_showTopMask', scrollTop > 0);
        this.data.set('_showBottomMask', scrollTop + clientHeight < scrollHeight - 1);
    }

    handleLyricClick(item: lyricItem) {
        this.fire<MusicPlayerEvents['lyricsClick']>('lyricsClick', {item});
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        const _playStatus = this.data.get('_playStatus');

        audio.currentTime = (item.startTime ?? 0) / 1000;

        // 如果音频未播放，则播放
        _playStatus !== MusicPlayerStatus.PLAYING && this.play();

        this.onTimeUpdate({
            currentTime: item.startTime
        });
    }

    /**
     * 格式化时长
     */
    formatTimeDuration = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 1000 / 60).toString().padStart(2, '0');
        const seconds = Math.floor((timeInSeconds / 1000) % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // 进度条拖拽开始
    handleMousedown(event: MouseEvent) {
        this.fire<MusicPlayerEvents['seeking']>('seeking', {event});
        if (event?.defaultPrevented) {
            return;
        }
        this.data.set('_isSeeking', true);
        const progressThumb = this.ref('progressThumb') as unknown as HTMLElement;
        progressThumb?.classList.add('dragging');
        document.addEventListener('mousemove', this.handleMousemove);
        document.addEventListener('mouseup', this.handleMouseup);
        event.preventDefault();
    }

    // 拖拽中实时更新进度条宽度
    handleMousemove(event: MouseEvent) {
        if (!this.data.get('_isSeeking')) {
            return;
        }

        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
        }

        this._rafId = requestAnimationFrame(() => {
            const progressBarEl = this.ref('progressBar') as unknown as HTMLElement;
            if (!progressBarEl) {
                return;
            }

            const rect = progressBarEl.getBoundingClientRect();
            let offsetX = event.x - rect.left;
            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            const progress = (offsetX / rect.width) * 100;
            this.data.set('_progress', progress);
        });
    }

    // 进度条拖拽结束
    handleMouseup(event: MouseEvent) {
        this.fire<MusicPlayerEvents['seeked']>('seeked', {event});
        if (!this.data.get('_isSeeking') || event?.defaultPrevented) {
            return;
        }

        this.data.set('_isSeeking', false);

        const progressBarEl = this.ref('progressBar') as unknown as HTMLElement;
        const progressBarInnerEl = this.ref('progressBarInner') as unknown as HTMLElement;
        if (!progressBarEl) {
            return;
        }
        progressBarInnerEl?.classList.remove('dragging');

        const rect = progressBarEl.getBoundingClientRect();
        let offsetX = event.x - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));

        const progress = offsetX / rect.width;
        const duration = this.data.get('duration') ?? 0;
        const newTime = progress * duration;

        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        audio.currentTime = newTime / 1000;

        this.data.set('_progress', progress * 100);
        this.data.set('currentTime', newTime);

        if (this.data.get('_playStatus') !== MusicPlayerStatus.PLAYING) {
            this.play();
        }

        this.onTimeUpdate({currentTime: newTime});

        document.removeEventListener('mousemove', this.handleMousemove);
        document.removeEventListener('mouseup', this.handleMouseup);
        this._progressBarInnerEl = null;
        this._rafId && cancelAnimationFrame(this._rafId);
        this._rafId = null;
    }

    // 点击进度条跳转
    handleProgressClick(event: MouseEvent) {
        const progressBarEl = this.ref('progressBar') as unknown as HTMLElement;
        const progressBarInnerEl = this.ref('progressBarInner') as unknown as HTMLElement;
        if (!progressBarEl || !progressBarInnerEl) {
            return;
        }
        const rect = progressBarEl.getBoundingClientRect();
        let offsetX = event.x - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));

        const newTime = (offsetX / rect.width) * (this.data.get('duration') ?? 0);
        const audio = this.ref('audio') as unknown as HTMLAudioElement;
        audio.currentTime = (newTime ?? 0) / 1000;
        this.data.set('_progress', (offsetX / rect.width) * 100);
        this.data.set('currentTime', newTime);

        // 播放
        const _playStatus = this.data.get('_playStatus');
        _playStatus !== MusicPlayerStatus.PLAYING && this.play();

        this.onTimeUpdate({currentTime: newTime});
    }
}
