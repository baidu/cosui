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
 * @file SiteVcard Catalog，依据 api/cosmic-dqa/site-vcard/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const ActionSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('按钮文案，优先级低于 action-text'),
    linkInfo: LinkInfo.default({}).describe('按钮点击跳转信息，如果不传则取外层 linkInfo')
});

const TagItemSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('标签文本，text image 必须二选一'),
    image: z.string().default('').describe('标签图片链接，text image 必须二选一'),
    color: z.string().default('#4e6ef2').describe('标签颜色，仅在text标签时生效'),
    appearance: z
        .enum(['filled', 'subtle'])
        .default('filled')
        .describe('标签外观：filled 位于标题前方，subtle 位于标题后方')
});

const IntroductionSchema: z.ZodType = z.strictObject({
    value: z.string().default('').describe('引导语字符串'),
    position: z
        .union([z.literal('top'), z.literal('bottom')])
        .default('bottom')
        .describe('引导语位置')
});

const ShortcutSchema: z.ZodType = z.strictObject({
    logo: z.string().default('').describe('资源头像'),
    name: z.string().default('').describe('资源标题'),
    caption: z.string().default('').describe('资源说明文本'),
    linkInfo: LinkInfo.default({}).describe('资源区点击跳转信息')
});

export const SiteVcardProps = z.strictObject({
    'link-info': LinkInfo.describe('跳转信息').default({}),
    logo: z
        .string()
        .optional()
        .describe('头像logo链接（如果存在缩略图，则头像logo在上方展示）')
        .default(''),
    title: z.string().describe('标题').default(''),
    caption: z.string().optional().describe('说明文本').default(''),
    'action-text': z.string().optional().describe('按钮文本（默认无按钮）').default(''),
    action: z
        .lazy(() => ActionSchema)
        .optional()
        .describe('按钮信息')
        .default({text: '', linkInfo: {}}),
    tags: z
        .array(z.union([z.lazy(() => TagItemSchema), z.string()]))
        .optional()
        .describe(
            '标签列表。支持 string 类型的简写形式，格式为 http://xxx 展示图片；为文本内容则展示 filled 类型的 tag'
        )
        .default([]),
    visits: z.string().optional().describe('访问次数（默认无）').default(''),
    appearance: z
        .union([z.literal('filled'), z.literal('card'), z.literal('bar')])
        .optional()
        .describe("组件外观，'card' 为整卡外观, 'bar' 为方图外观")
        .default('filled'),
    'is-agent': z.boolean().optional().describe('agent下不展现对话icon').default(false),
    introduction: z
        .union([z.string(), z.lazy(() => IntroductionSchema)])
        .optional()
        .describe(
            '在上方或下方展示的卡片介绍，默认展示2行截断（当标题下方的说明文本和访问量都不展示时，卡片介绍将展示在标题下方）'
        )
        .optional(),
    thumbnail: z
        .string()
        .optional()
        .describe('缩略图链接（优先级高于头像logo，如果不存在时，则在左侧渲染 logo 资源）')
        .default(''),
    score: z.union([z.string(), z.number()]).optional().describe('评分').default(''),
    shortcut: z
        .lazy(() => ShortcutSchema)
        .optional()
        .describe('资源区')
        .default({logo: '', name: '', caption: '', linkInfo: {}}),
    'badge-text': z.string().optional().describe('文字标签').default('')
});

export const components = {
    SiteVcard: {
        description: '用于一段话下服务挂载，链接跳转等',
        props: SiteVcardProps,
        events: {
            'button-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
