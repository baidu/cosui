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
 * @file LocationCard Catalog，依据 api/cosmic-dqa/location-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';
import {ScoreProps as ScoreReferencedProps} from '../cosmic/score';

const TagItemSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('标签文本'),
    icon: z.string().default('').describe('图标名称,详见Icon'),
    color: z
        .string()
        .optional()
        .describe('标签文本颜色,默认 var(--cos-color-text-tiny-active)'),
    bgColor: z.string().optional().describe('标签背景颜色，默认 var(--cos-tag-color-bg)'),
    iconBgColor: z.string().optional().describe('标签内的 icon 背景颜色')
});

export const LocationCardProps = z.strictObject({
    'link-info': LinkInfo.describe('跳转信息'),
    thumbnail: z.string().default('').describe('缩略图地址'),
    title: z.string().default('').describe('标题'),
    score: z
        .union([z.number(), z.lazy(() => ScoreReferencedProps)])
        .optional()
        .describe('评分信息'),
    address: z.string().optional().describe('地址'),
    category: z.string().optional().describe('品类，如“美食”'),
    'average-cost': z.string().optional().describe('人均消费'),
    recommendedDuration: z.string().optional().describe('推荐游玩时长'),
    'opening-hours': z.string().optional().describe('营业时间，如“08:00-12:00,13:00-17:00”'),
    caption: z.string().optional().describe('地点说明'),
    tags: z
        .array(z.union([z.lazy(() => TagItemSchema), z.string()]))
        .default([])
        .describe(
            '标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签'
        ),
    appearance: z
        .union([z.literal('filled'), z.literal('card')])
        .default('card')
        .describe('组件外观，传入 filled 时为包卡带背景色样式')
});

export const components = {
    LocationCard: {
        description: '地点卡片，适用于景点、店铺等场景展示',
        props: LocationCardProps
    }
} satisfies CatalogDefinition['components'];
