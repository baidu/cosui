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
 * @file RoutePlanner 组件 Catalog 定义
 */

/* eslint-disable max-len */
import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const LocationItem = z.strictObject({
    id: z.string().describe('地点 id'),
    linkInfo: LinkInfo.describe('跳转信息'),
    thumbnail: z.string().describe('缩略图地址'),
    title: z.string().describe('标题'),
    score: z.number().optional().describe('评分'),
    address: z.string().optional().describe('地址'),
    category: z.string().optional().describe('品类，如“美食”'),
    averageCost: z.string().optional().describe('人均消费'),
    openingHours: z.string().optional().describe('营业时间，如“08:00-12:00,13:00-17:00”'),
    tags: z
        .array(z.union([
            z.string(),
            z.strictObject({
                text: z.string().describe('标签文本'),
                color: z.string().optional().describe('标签颜色，目前仅支持灰色和蓝色。默认为灰色，‘blue’ 则为蓝色')
            })
        ]))
        .default([])
        .describe('标签列表，支持对象类型和string类型。string为简写形式，展示为灰色、边框型标签')
});
export const TransportOption = z.strictObject({
    type: z.enum(['car', 'publicTransport', 'walk']).describe('交通类型'),
    duration: z.string().describe('时长，例如：12分钟')
});
export const RouteItem = z.strictObject({
    startLocationId: z.string().describe('起点地点id'),
    endLocationId: z.string().describe('终点地点id'),
    distance: z.string().describe('距离描述信息，例如：距离1.6km'),
    linkInfo: LinkInfo.default({}).describe('地图跳转信息'),
    transportOptions: z.array(TransportOption).default([]).describe('交通方式信息')
});

export const components = {
    RoutePlanner: {
        description:
            '路线规划组件，可用于旅行计划等场景。'
            + '区别于 LocationList 组件，有地点间距离、交通等信息',
        props: z.strictObject({
            'location-list': z.array(LocationItem).describe('地点信息列表'),
            'route-list': z.array(RouteItem).default([]).describe('地点关系列表'),
            folded: z.boolean().default(true).describe('地点列表是否处于折叠状态')
        }),
        events: {
            'location-click': z.strictObject({index: z.number(), item: LocationItem}),
            'route-click': z.strictObject({
                index: z.number(),
                item: RouteItem.extend({
                    transportOptions: z
                        .array(TransportOption.extend({icon: z.string().optional()}))
                        .default([])
                })
            })
        }
    }
} satisfies CatalogDefinition['components'];
