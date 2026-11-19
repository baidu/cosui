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
 * @file MusicPlayer Catalog，依据 api/cosmic-dqa/music-player/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const lyricItemSchema: z.ZodType = z.strictObject({
    content: z.string().default('').describe('文本'),
    startTime: z.number().default(0).describe('开始时间'),
    endTime: z.number().default(0).describe('结束时间')
});

export const MusicPlayerProps = z.strictObject({
    icon: z.string().default('').describe('右上角图片，支持icon和image'),
    name: z.string().default('').describe('右上角文字'),
    tag: z.string().default('').describe('水印区域图片'),
    title: z.string().default('').describe('标题'),
    caption: z.string().default('').describe('标题说明'),
    poster: z.string().default('').describe('封面图 URL'),
    duration: z.number().default(0).describe('时长（ms）'),
    loop: z.boolean().default(false).describe('是否循环播放'),
    autoplay: z.boolean().default(false).describe('是否自动播放'),
    lyrics: z
        .array(z.lazy(() => lyricItemSchema))
        .default([])
        .describe('数组，支持时间轴同步'),
    src: z.string().default('').describe('播放的url'),
    download: z.string().default('').describe('下载的url'),
    status: z
        .union([z.literal('progress'), z.literal('finished')])
        .default('finished')
        .describe('数据生成完成/数据生成中'),
    'current-time': z.number().default(0).describe('当前播放时间（ms）')
});

export const components = {
    MusicPlayer: {
        description: '多媒体播放器组件',
        props: MusicPlayerProps,
        events: {
            play: z.strictObject({currentTime: z.number()}),
            pause: z.strictObject({currentTime: z.number()}),
            download: z.unknown(),
            seeking: z.unknown(),
            seeked: z.strictObject({currentTime: z.number()}),
            lyricsClick: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
