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
 * @file MicroContentScroll Catalog，依据 api/cosmic-dqa/micro-content-scroll/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const SourceSchema: z.ZodType = z.strictObject({
    name: z.string().optional().describe('来源名称'),
    tag: z.string().optional().describe('来源标签'),
    caption: z.string().default('').describe('来源说明')
});

export const MicroContentSchema: z.ZodType = z.strictObject({
    avatar: z.string().describe('作者头像'),
    author: z.string().describe('作者名称'),
    title: z.string().optional().describe('文本标题'),
    content: z.string().default('').describe('文本内容'),
    thumbnail: z.string().optional().describe('贴图内容'),
    tag: z.string().optional().describe('标签'),
    source: z
        .lazy(() => SourceSchema)
        .optional()
        .describe('来源信息'),
    linkInfo: LinkInfo.default({}).describe('跳转信息')
});

export const MicroContentScrollProps = z.strictObject({
    items: z
        .array(z.lazy(() => MicroContentSchema))
        .default([])
        .describe('微内容列表'),
    title: z.string().default('').describe('引导语'),
    appearance: z
        .union([z.literal('top'), z.literal('bottom')])
        .default('top')
        .describe('作者位置，可选顶部或底部'),
    span: z.number().default(12).describe('栅格数')
});

export const components = {
    MicroContentScroll: {
        description: '微内容横滑组件',
        props: MicroContentScrollProps,
        events: {
            'item-click': z.strictObject({item: z.lazy(() => MicroContentSchema)}),
            scrollend: z.strictObject({index: z.number(), prevIndex: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
