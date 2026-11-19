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
 * @file CitySelector Catalog，依据 api/cosmic/city-selector/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const CitySchema: z.ZodType = z.strictObject({
    city: z.string().describe('城市名'),
    code: z.union([z.string(), z.number()]).optional().describe('城市 Id（国内城市必传）'),
    country: z.string().optional().describe('国家（国际城市必传）'),
    continent: z.string().optional().describe('大洲（国际城市必传）'),
    province: z.string().optional().describe('省/州'),
    county: z.string().optional().describe('区/县'),
    pinyin: z.string().optional().describe('拼音'),
    english: z.string().optional().describe('英文（仅国际城市需要）'),
    level: z
        .union([z.literal('1'), z.literal('2')])
        .optional()
        .describe('城市展现层级;1展现到 city，如"北京市";2展现到 county，如 "海淀区"'),
    hot: z.boolean().optional().describe('是否是热门城市'),
    same: z.boolean().optional().describe('是否存在同名城市')
});

export const CitySelectorProps = z.strictObject({
    open: z.boolean().default(false).describe('弹窗是否可见'),
    title: z.string().default('城市选择').describe('弹窗标题'),
    placeholder: z.string().default('搜索国内外城市/区域名称').describe('输入框 placeholder'),
    'active-tab': z.number().default(0).describe('当前选中的 tab；仅有多个 tab 时生效'),
    tabs: z.array(z.string()).default(['国内', '国际/中国港澳台']).describe('tab 头部名字'),
    'locate-fail-hint': z.string().optional().describe('定位失败toast文案'),
    'hot-title': z.string().default('热门城市').describe('热门城市对应的标题'),
    location: z
        .union([z.lazy(() => CitySchema), z.boolean()])
        .default({city: '北京', code: 131, level: '1'})
        .describe(
            '当前IP定位到的城市；传 true 时选择进入时自动定位；传 false 时不展示定位栏；定位栏的城市城市展现层级根据location 的 '
                + 'level 来决定'
        ),
    'native-cities': z
        .array(z.lazy(() => CitySchema))
        .default([])
        .describe('国内城市列表，为空时不展示'),
    'foreign-cities': z
        .array(z.lazy(() => CitySchema))
        .default([])
        .describe('国际城市列表，为空时不展示'),
    'selected-cities': z
        .array(z.lazy(() => CitySchema))
        .default([])
        .describe('已选中的城市'),
    anchor: z.boolean().default(false).describe('是否自动滚动到已选中城市')
});

export const components = {
    CitySelector: {
        description: '城市选择器',
        props: CitySelectorProps,
        events: {
            close: z.unknown(),
            change: z.strictObject({
                city: z.lazy(() => CitySchema),
                from: z.enum(['location', 'hot', 'letter', 'search', 'menu'])
            }),
            relocate: z.strictObject({
                city: z.string(),
                county: z.string(),
                level: z.string(),
                code: z.union([z.string(), z.number()])}
            )
        }
    }
} satisfies CatalogDefinition['components'];
