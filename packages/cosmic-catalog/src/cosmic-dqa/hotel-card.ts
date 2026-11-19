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
 * @file HotelCard Catalog，依据 api/cosmic-dqa/hotel-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';
import {ScoreProps as ScoreReferencedProps} from '../cosmic/score';
import {PriceProps as PriceReferencedProps} from '../cosmic/price';

const TagItemSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('标签文本'),
    color: z
        .string()
        .optional()
        .describe('标签文本颜色,默认 var(--cos-color-text-tiny-active)'),
    bgColor: z.string().optional().describe('标签背景颜色，默认 var(--cos-tag-color-bg)'),
    iconBgColor: z.string().optional().describe('标签内的 icon 背景颜色')
});

export const HotelCardProps = z.strictObject({
    'link-info': LinkInfo.describe('跳转信息'),
    thumbnail: z.string().default('').describe('缩略图地址'),
    title: z.string().default('').describe('标题'),
    tags: z
        .array(z.union([z.lazy(() => TagItemSchema), z.string()]))
        .optional()
        .describe("标签列表，如果都是默认色，也可以简写，如 ['tag1', 'tag2']"),
    score: z
        .lazy(() => ScoreReferencedProps)
        .optional()
        .describe('评分信息'),
    distance: z
        .string()
        .default('')
        .describe('距离参照物的半径范围信息，如“距离市中心 1.7km”'),
    district: z.string().default('').describe('片区信息，如“xxx 商圈”'),
    price: z
        .lazy(() => PriceReferencedProps)
        .optional()
        .describe('价格信息'),
    source: z.string().default('').describe('来源')
});

export const components = {
    HotelCard: {
        description: '酒店信息卡',
        props: HotelCardProps
    }
} satisfies CatalogDefinition['components'];
