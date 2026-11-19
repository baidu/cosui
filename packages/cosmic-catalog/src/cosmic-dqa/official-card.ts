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
 * @file OfficialCard Catalog，依据 api/cosmic-dqa/official-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const SettingSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('展示的文本'),
    linkInfo: LinkInfo.optional().describe('跳转所需的参数')
});

export const OfficialCardProps = z.strictObject({
    appearance: z.enum(['centered', '']).optional().describe('卡片展现形态'),
    poster: z
        .strictObject({
            src: z.string().default('').describe('背景图'),
            gradient: z.string().default('').describe('封面图渐变颜色'),
            bgColor: z.string().default('').describe('封面图背景颜色')
        })
        .optional()
        .describe('背景图'),
    logo: z.string().default('').describe('logo图地址'),
    'action-text': z.string().default('').describe('按钮文字'),
    title: z.string().default('').describe('标题'),
    website: z.string().default('').describe('展示的网站地址'),
    'link-info': LinkInfo.optional().describe('跳转所需的参数'),
    tag: z
        .union([z.string(), z.array(z.string())])
        .default('')
        .describe('标签信息'),
    score: z.string().default('').describe('评分'),
    introduction: z.string().default('').describe('第二行展示的介绍文本'),
    caption: z.string().default('').describe('第三行展示的介绍文本'),
    settings: z
        .array(z.lazy(() => SettingSchema))
        .optional()
        .describe('按钮下方展示的信息')
});

export const components = {
    OfficialCard: {
        description: '官网信息：承载官网信息展示',
        props: OfficialCardProps,
        events: {
            'button-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
