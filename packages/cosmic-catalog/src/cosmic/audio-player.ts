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
 * @file AudioPlayer Catalog，依据 api/cosmic/audio-player/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const AudioPlayerProps = z.strictObject({
    src: z.string().describe('播报地址'),
    loop: z.boolean().default(false).describe('是否循环播报，仅默认态支持使用'),
    preload: z
        .string()
        .default('none')
        .describe('资源的预加载选项，参考：preload，仅默认态支持使用'),
    apperance: z
        .union([z.literal('enhance'), z.literal('')])
        .default('')
        .describe("设置 apperance 为 'enhance' 时使用增强样式"),
    title: z.string().default('').describe('标题，仅 apperance 为  enhance 时支持使用'),
    poster: z.string().optional().describe('专辑封面图，仅 apperance 为 enhance 时支持使用')
});

export const components = {
    AudioPlayer: {
        description: '播报：用于声音媒体的播放',
        props: AudioPlayerProps,
        children: true,
        events: {
            play: z.unknown(),
            pause: z.unknown(),
            ended: z.unknown(),
            timeupdate: z.unknown(),
            canplay: z.unknown(),
            canplaythrough: z.unknown(),
            'user-activation': z.strictObject({action: z.union([z.literal('play'), z.literal('pause')])})
        }
    }
} satisfies CatalogDefinition['components'];
