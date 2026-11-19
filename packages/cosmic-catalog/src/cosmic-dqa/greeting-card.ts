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
 * @file GreetingCard Catalog，依据 api/cosmic-dqa/greeting-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const ButtonItemSchema: z.ZodType = z.strictObject({
    icon: z.string().default('').describe('按钮icon，传 icon name 或图片 url'),
    text: z.string().default('').describe('按钮文本'),
    linkInfo: LinkInfo.nullable()
        .default(null)
        .describe('自定义挂载属性集(支持JS未ready前跳转点击)')
});

export const GreetingCardProps = z.strictObject({
    avatar: z.string().default('').describe('头像图片url'),
    title: z.string().default('').describe('打招呼标题'),
    content: z.string().default('').describe('打招呼内容'),
    appearance: z
        .union([z.literal('card'), z.literal('filled')])
        .default('card')
        .describe('卡片样式'),
    voice: z
        .lazy(() => ButtonItemSchema)
        .nullable()
        .default(null)
        .describe('语音按钮数据'),
    video: z
        .lazy(() => ButtonItemSchema)
        .nullable()
        .default(null)
        .describe('视频按钮数据')
});

export const components = {
    GreetingCard: {
        description: '助手卡打招呼组件',
        props: GreetingCardProps,
        children: true,
        events: {
            'voice-click': z.unknown(),
            'video-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
