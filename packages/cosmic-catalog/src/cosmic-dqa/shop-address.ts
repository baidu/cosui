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
 * @file ShopAddress Catalog，依据 api/cosmic-dqa/shop-address/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const TagSchema: z.ZodType = z.strictObject({
    text: z.string().describe('文本').default('')
});

const PoiSchema: z.ZodType = z.strictObject({
    name: z.string().optional().describe('店铺名'),
    area: z.string().optional().describe('店铺所属市区'),
    address: z.string().describe('店铺地址')
});

const ParamsSchema: z.ZodType = z.strictObject({
    origin: z.string().describe('固定值 表示起点'),
    destination: z
        .string()
        .describe(
            '值为name:destination|latlng:latlngdestination 是目标地坐标名称, latlng 是用户位置坐标'
        ),
    coord_type: z.literal('bd09mc').describe('固定值,表示坐标系'),
    src: z.string().describe('调起地图打点参数(与地图pm shanshan约定)'),
    navInit: z.literal('yes').describe('固定值')
});

const InvokeInfoSchema: z.ZodType = z.strictObject({
    params: z.lazy(() => ParamsSchema).describe('调起的 schema 所需参数'),
    defaultUrl: z.string().describe('调起兜底 url 链接')
});

const InvokeParamsSchema: z.ZodType = z.strictObject({
    params: z.lazy(() => ParamsSchema).describe('调起的 schema 所需参数'),
    posName: z.string().describe('固定为 pos_invoke_bdmap_direction'),
    defaultUrl: z.string().describe('调起兜底 url 链接')
});

export const ShopAddressProps = z.strictObject({
    thumbnail: z.string().describe('店铺图片').default(''),
    title: z.string().describe('店铺标题').default(''),
    distance: z.string().describe('距离').default(''),
    tags: z
        .array(z.lazy(() => TagSchema))
        .describe('标签')
        .default([]),
    'link-info': LinkInfo.describe('店铺跳转信息'),
    'navigation-info': LinkInfo.describe('导航跳转信息'),
    poi: z.lazy(() => PoiSchema).describe('与 poi 相关的信息'),
    folded: z.boolean().optional().describe('是否收起态').default(false),
    'invoke-info': z
        .lazy(() => InvokeInfoSchema)
        .optional()
        .describe('接入 mcpsdk 时的调起参数')
        .optional()
});

export const components = {
    ShopAddress: {
        description: '单个店铺组件',
        props: ShopAddressProps,
        events: {
            'poi-ready': z.strictObject({invokeParams: z.lazy(() => InvokeParamsSchema)}),
            click: z.strictObject({from: z.literal('navigation').optional()})
        }
    }
} satisfies CatalogDefinition['components'];
