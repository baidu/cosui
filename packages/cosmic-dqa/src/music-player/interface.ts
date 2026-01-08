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
export interface MusicPlayerProps {
    // 左上角图片
    icon?: string;
    // 左上角文字
    name?: string;
    // 右上角图标
    tag?: string;
    // 标题
    title?: string;
    // 标题说明
    caption?: string;
    // 封面
    poster?: string;
    // 视频时长，单位 ms
    duration?: number;
    // 是否循环播放
    loop?: boolean;
    // 是否自动播放
    autoplay?: boolean;
    // 数组，支持时间轴同步
    lyrics?: lyricItem[];
    // 播放地址
    src?: string;
    // 下载地址
    download?: string;
    // 数据是否生成完成
    status?: Status;
    // 当前进度
    currentTime?: number;
    // 黑胶图片背景图
    _vinyl?: string;
    // 播放状态
    _playStatus?: MusicPlayerStatus;
    // 当前播放歌词索引
    _currentLyricIndex?: number;
    // 播放进度百分比
    _progress?: number;
    // 是否正在拖拽进度条
    _isSeeking?: boolean;
    // 顶部遮罩层是否显示
    _showTopMask?: boolean;
    // 底部遮罩层是否显示
    _showBottomMask?: boolean;
}

export interface lyricItem {
    content?: string;
    startTime?: number;
    endTime?: number;
}

export enum MusicPlayerStatus {
    /**
     * 待播放
     */
    PENDING = '0',
    /**
     * 正在播放
     */
    PLAYING = '1',
    /**
     * 暂停播放
     */
    PAUSED = '2',
}

export enum Status {
    /**
     * 数据生成中
     */
    PROGRESS = 'progress',
    /**
     * 数据生成完成
     */
    FINISHED = 'finished',
}

export interface MusicPlayerEvents {
    'play': {
        event: Event;
        currentTime?: number;
    };

    'pause': {
        event: Event;
        currentTime?: number;
    };

    'download': {
        event: Event;
    };

    'lyricsClick': {
        item: lyricItem;
    };

    'seeking': {
        event: Event;
    };

    'seeked': {
        event: Event;
    };
}