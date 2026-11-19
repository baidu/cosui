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
 * @file CarScroll Catalog，依据 api/cosmic-dqa/car-scroll/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const CarItemSchema: z.ZodType = z.strictObject({
    image: z.string().describe('汽车图片'),
    objectFit: z.enum(['cover', 'contain']).default('cover').describe('平铺方式'),
    title: z.string().describe('汽车名称'),
    price: z.string().describe('价格'),
    tags: z.array(z.string()).optional().describe('标签列表'),
    linkInfo: LinkInfo.optional().describe('链接信息')
});

export const CarScrollProps = z.strictObject({
    items: z
        .array(z.lazy(() => CarItemSchema))
        .default([])
        .describe('汽车信息列表'),
    'line-clamp': z.number().default(1).describe('标题行数')
});

export const components = {
    CarScroll: {
        description: '汽车信息横滑组件：用于展示多个汽车信息卡片横滑',
        props: CarScrollProps,
        events: {
            'item-click': z.strictObject({index: z.number(), item: z.lazy(() => CarItemSchema)})
        }
    }
} satisfies CatalogDefinition['components'];
