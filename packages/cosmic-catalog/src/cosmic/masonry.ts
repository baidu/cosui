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
 * @file Masonry Catalog，依据 api/cosmic/masonry/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const MasonryItemSchema: z.ZodType = z.strictObject({
    columnIndex: z.number().optional().describe('自定义所在列'),
    width: z.number().default(0).describe('元素宽度'),
    height: z.number().default(0).describe('元素高度')
});

export const MasonryProps = z.strictObject({
    items: z
        .array(z.lazy(() => MasonryItemSchema))
        .default([])
        .describe('资源列表数据'),
    'column-count': z.number().default(2).describe('瀑布流列数'),
    gutter: z
        .union([z.number(), z.tuple([z.number(), z.number()])])
        .default(2)
        .describe('间距，可以是固定值或水平垂直间距配置'),
    'container-width': z.number().default(0).describe('图片容器宽度'),
    'row-align': z
        .union([z.literal('start'), z.literal('justify')])
        .default('start')
        .describe(
            "列内元素的对齐方式。'start'：各列元素保持自然高度、列底部参差不齐；'justify'：将各列剩余空间平摊给该列每张图片，使所有列顶部"
                + '对齐，且底部对齐到最高列'
        )
});

export const components = {
    Masonry: {
        description: '瀑布流：瀑布流布局组件，用于展示不同高度的内容',
        props: MasonryProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
