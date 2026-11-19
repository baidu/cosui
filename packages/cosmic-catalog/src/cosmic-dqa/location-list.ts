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
 * @file LocationList Catalog，依据 api/cosmic-dqa/location-list/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const TagItemSchema: z.ZodType = z.strictObject({
    text: z.string().default('').describe('标签文本'),
    color: z
        .string()
        .optional()
        .describe("标签颜色，目前仅支持灰色和蓝色。默认为灰色，'blue' 则为蓝色")
});

export const LocationListItem: z.ZodType = z.strictObject({
    linkInfo: LinkInfo.describe('跳转信息'),
    thumbnail: z.string().default('').describe('缩略图地址'),
    title: z.string().default('').describe('标题'),
    score: z.number().optional().describe('评分'),
    address: z.string().optional().describe('地址'),
    category: z.string().optional().describe('品类，如“美食”'),
    averageCost: z.string().optional().describe('人均消费'),
    openingHours: z.string().optional().describe('营业时间，如“08:00-12:00,13:00-17:00”'),
    tags: z
        .array(z.union([z.lazy(() => TagItemSchema), z.string()]))
        .default([])
        .describe(
            '标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签'
        )
});

export const LocationListProps = z.strictObject({
    items: z
        .array(z.lazy(() => LocationListItem))
        .default([])
        .describe('地点信息列表')
});

export const components = {
    LocationList: {
        description: '地点列表，适用于景点、店铺等场景展示',
        props: LocationListProps,
        events: {
            click: z.strictObject({index: z.number(), item: z.lazy(() => LocationListItem)})
        }
    }
} satisfies CatalogDefinition['components'];
