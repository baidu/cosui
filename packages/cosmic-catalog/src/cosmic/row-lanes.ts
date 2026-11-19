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
 * @file RowLanes Catalog，依据 api/cosmic/row-lanes/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const RowLanesItemSchema: z.ZodType = z.strictObject({
    width: z.number().describe('元素宽度'),
    height: z.number().describe('元素高度'),
    allowAdaptive: z
        .boolean()
        .default(true)
        .describe('是否参与自适应宽度调整。设为 false 时，元素不参与行宽分配')
});

export const RowLanesProps = z.strictObject({
    items: z
        .array(z.lazy(() => RowLanesItemSchema))
        .default([])
        .describe('资源列表，每项需包含 width/height'),
    'container-width': z.number().default(0).describe('容器宽度，用于计算布局'),
    gutter: z
        .union([z.number(), z.tuple([z.number(), z.number()])])
        .default(0)
        .describe('间距，数字类型表示水平垂直间距，数组类型表示 [水平间距, 垂直间距]'),
    'row-height': z.number().default(180).describe('横向布局的基准高度'),
    'min-cols': z
        .number()
        .default(2)
        .describe('一行最少排列的元素数量，低于此列数不触发换行'),
    'max-cols': z.number().default(8).describe('一行最多排列的元素数量，达到此列数强制换行'),
    'last-row-align': z
        .union([z.literal('start'), z.literal('justify')])
        .default('start')
        .describe(
            "最后一行的对齐方式。'start'：最后一行保持自然尺寸、靠左排列，仅在溢出时等比缩放收缩；'justify'：最后一行拉伸铺满容器宽度"
        )
});

export const components = {
    RowLanes: {
        description:
            '横向布局：元素横向布局组件，支持设置基准行高、按元素比例计算宽度、自动换行和行宽调整',
        props: RowLanesProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
