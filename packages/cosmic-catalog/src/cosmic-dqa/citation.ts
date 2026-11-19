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
 * @file Citation Catalog，依据 api/cosmic-dqa/citation/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo, JsonValue} from '../shared';

const TagSchema: z.ZodType = z.strictObject({
    text: z.string().optional().describe('可信溯源标签展示文本'),
    colorVars: z.string().optional().describe('可信溯源标签文字和背景色自定义颜色变量')
});

const AggregatedItemSchema: z.ZodType = z.strictObject({
    title: z.string().describe('溯源标题；仅支持 PC'),
    source: z.record(z.string(), JsonValue).optional().describe('来源；仅支持 PC'),
    linkInfo: LinkInfo.default({}).describe('跳转信息；仅支持 PC')
});

export const CitationProps = z.strictObject({
    appearance: z
        .union([z.literal(''), z.literal('link'), z.literal('tag'), z.literal('aggregated')])
        .default('')
        .describe('溯源展现类型'),
    'citation-id': z.string().describe('溯源角标ID'),
    disabled: z.boolean().default(false).describe('是否禁止弹窗'),
    title: z.string().describe('核心文本/标题'),
    abstract: z.string().optional().describe('摘要；仅支持 PC'),
    thumbnail: z.string().optional().describe('图片；仅支持 PC'),
    'is-video': z.boolean().default(false).describe('是否是视频类型'),
    source: z
        .strictObject({
            logo: z
                .union([z.string(), z.array(z.string())])
                .optional()
                .describe('来源图标，说明：当前数组类型仅在有 aggregated-text 值下生效'),
            name: z.string().optional().describe('来源名称'),
            icon: z.string().optional().describe('可信溯源兜底图标'),
            type: z.string().optional().describe('可信溯源类型'),
            tag: z
                .lazy(() => TagSchema)
                .optional()
                .describe('可信溯源标签')
        })
        .optional()
        .describe('来源'),
    'link-info': LinkInfo.default({}).describe('跳转信息'),
    'tooltip-panel-clickable': z.boolean().default(false).describe('是否允许点击弹窗整体跳转；仅支持 PC'),
    'aggregated-list': z
        .array(z.lazy(() => AggregatedItemSchema))
        .optional()
        .describe('聚合溯源面板数据列表；仅支持 PC'),
    'aggregated-text': z.string().optional().describe('聚合溯源展示文案；仅支持 Mobile')
});

export const components = {
    Citation: {
        description: '溯源：溯源角标 + 溯源弹窗',
        props: CitationProps,
        events: {
            toggle: z.strictObject({open: z.boolean()}),
            click: z.strictObject({from: z.string(), index: z.number().optional()})
        }
    }
} satisfies CatalogDefinition['components'];
