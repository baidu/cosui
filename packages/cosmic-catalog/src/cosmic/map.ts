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
 * @file Map Catalog，依据 api/cosmic/map/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue} from '../shared';

const RouteSchema: z.ZodType = z.strictObject({
    points: z
        .array(z.tuple([z.number(), z.number()]))
        .describe('起点、终点以及途经点经纬度；仅驾车方式支持途经点'),
    travelType: z
        .enum(['transit', 'driving', 'walking', 'riding'])
        .default('transit')
        .describe('出行方式：transit 公共交通，driving 驾车，walking 步行，riding 骑行'),
    drivingPolicy: z
        .union([z.literal(0), z.literal(3), z.literal(4), z.literal(5)])
        .default(0)
        .describe('驾车策略：0 默认，3 避免高速，4 首选高速，5 避免拥堵'),
    transitPolicy: z
        .union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
        .default(0)
        .describe('市内公交换乘策略：0 推荐，1 最少换乘，2 最少步行，3 不乘地铁，4 最少时间，5 首选地铁')
});

const LabelSchema: z.ZodType = z.strictObject({
    text: z.string().optional().describe('文本标注内容'),
    style: z.record(z.string(), JsonValue).optional().describe('文本标注样式')
});

const MarkerSchema: z.ZodType = z.strictObject({
    lat: z.number().describe('标记纬度'),
    lng: z.number().describe('标记经度'),
    icon: z.string().optional().describe('标记图标 url'),
    label: z
        .lazy(() => LabelSchema)
        .optional()
        .describe('标记点自定义文本标注')
});

export const MapDistrict: z.ZodType = z.strictObject({
    lat: z.number().describe('行政区域纬度'),
    lng: z.number().describe('行政区域经度'),
    level: z.number().describe('行政区域级别（0：全国，1：省份，2：市，3：区/县，4：镇/乡/街道）'),
    name: z.string().describe('行政区域名称'),
    code: z.number().describe('行政区域邮编'),
    districts: z
        .array(z.lazy(() => MapDistrict))
        .optional()
        .describe('行政区子区域'),
    highLight: z
        .array(z.lazy(() => MapDistrict))
        .optional()
        .describe('高亮区域')
});

export const MapProps = z.strictObject({
    'api-key': z.string().describe('百度地图 ak'),
    lat: z.number().default(39.915).describe('地图中心经度'),
    lng: z.number().default(116.404).describe('地图中心纬度'),
    zoom: z.number().default(15).describe('地图缩放级别'),
    route: z
        .array(z.lazy(() => RouteSchema))
        .optional()
        .describe('地图路线'),
    marker: z
        .array(z.lazy(() => MarkerSchema))
        .optional()
        .describe('地图标记'),
    district: z
        .array(z.lazy(() => MapDistrict))
        .optional()
        .describe('地图区域')
});

export const components = {
    Map: {
        description: '地图：用于展示地图以及地图上的基本操作',
        props: MapProps,
        events: {
            'map-ready': z.unknown(),
            'map-click': z.unknown(),
            fullscreen: z.unknown(),
            'zoom-in': z.unknown(),
            'zoom-out': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
