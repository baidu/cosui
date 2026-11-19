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
 * @file Table 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue, RecordValue} from '../shared';
const scalar = z.union([z.string(), z.number()]);
const columnFields = {
    title: z.string().optional().describe('列头(表头)标题'),
    prop: z.string().optional().describe('对应列内容的字段名（key），用于确定此列的值'),
    align: z.enum(['left', 'center', 'right']).default('left').describe('列内的文本排列方式')
};
export const TableColumn = z.union([
    z.strictObject({
        ...columnFields,
        fixed: z
            .literal(true)
            .describe(
                '选择当列是否固定，当设置为 true，则向左或向右滚动到左边缘或右边缘时会贴边。'
                    + '如果设置的有多列的固定，那么会按序贴边'
            ),
        width: z
            .number()
            .describe('列宽，如需固定列则必须需要设置此项，并且需要为 number 类型(px)')
    }),
    z.strictObject({
        ...columnFields,
        fixed: z
            .literal(false)
            .default(false)
            .describe(
                '选择当列是否固定，当设置为 true，则向左或向右滚动到左边缘或右边缘时会贴边。'
                    + '如果设置的有多列的固定，那么会按序贴边'
            ),
        width: scalar
            .optional()
            .describe('列宽，如需固定列则必须需要设置此项，并且需要为 number 类型(px)')
    })
]);

export const components = {
    Table: {
        description:
            '表格组件：用于以行和列的形式展示和操作结构化数据',
        props: z.strictObject({
            data: z.array(JsonValue).default([]).describe('表格内容'),
            columns: z
                .array(TableColumn)
                .default([])
                .describe('表格列配置'),
            layout: z
                .enum(['fixed', 'auto'])
                .default('fixed')
                .describe('表格布局：fixed 按首行单元格宽度确定列宽，auto 按内容自动调整'),
            border: z
                .enum(['none', 'row', 'all'])
                .default('none')
                .describe('边框：none 无边框，row 行边框，all 行列边框及外边框'),
            striped: z.boolean().default(true).describe('是否展示斑马格样式')
        }),
        children: true,
        events: {
            'row-click': z.strictObject({row: RecordValue, index: z.number()}),
            'cell-click': z.strictObject({
                row: RecordValue,
                rowIndex: z.number(),
                column: RecordValue,
                columnIndex: z.number()
            })
        }
    }
} satisfies CatalogDefinition['components'];
