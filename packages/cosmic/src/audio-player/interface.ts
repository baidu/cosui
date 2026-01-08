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
 * @file 音频播放器接口
 */

export enum AudioStatus {
    /**
     * 待播放
     */
    PENDING = 0,
    /**
     * 正在播放
     */
    PLAYING = 1,
    /**
     * 暂停播放
     */
    PAUSED = 2,
}

/**
 * 音频资源的预加载选项
 */
export enum AudioPreload {
    /**
     * 不应该预加载视频
     */
    NONE = 'none',

    /**
     * 仅预先获取视频的元数据
     */
    META_DATA = 'metadata',

    /**
     * 可以下载整个视频文件
     */
    AUTO = 'auto',
}

export interface AudioPlayerProps {
    /**
     * 播报地址
     * @default '''
     */
    src: string;

    /**
     * 是否循环播报
     * @default false
     */
    loop?: boolean;

    /**
     * 资源的预加载选项
     * @default AudioPreload.NONE
     */
    preload?: AudioPreload;

    /**
     * 播放器状态
     * @default AudioStatus.PENDING
     */
    _playStatus: AudioStatus;
};

export interface EnhanceAudioPlayerProps extends AudioPlayerProps {
    /**
     * 目前可选 ‘enhance’ 类型
     * @default ''
     */
    appearance?: 'enhance' | '';

    /**
     * 标题，仅 appearance 为  enhance 时支持使用
     * @default ''
     */
    title?: string;

    /**
     * 专辑封面图，仅 apperance 为  enhance 时支持使用
     * @default 'https://now.bdstatic.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/answer_audio_album.png'
     */
    poster?: string;

    /**
     * 音频时长
     * @default 0
     */
    _duration: number;

    /**
     * 当前播放时长
     * @default 0
     */
    _currentTime: number;
}

export interface AudioPlayerEvents {
    play: {
        event: Event;
    };
    pause: {
        event: Event;
    };
    ended: {
        event: Event;
    };
    timeupdate: {
        event: Event;
    };
    canplay: {
        event: Event;
    };
    canplaythrough: {
        event: Event;
    };
    'user-activation': {
        event: Event;
        action: 'play' | 'pause';
    };
}

export interface AudioPlayerMethods {
    play: () => void;
    pause: () => void;
    isPlaying: () => boolean;
}

export type AudioPlayerData = Required<AudioPlayerProps>;
export type EnhanceAudioPlayerData = Required<EnhanceAudioPlayerProps>;