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
 * @file Select Catalog，依据 api/cosmic/select/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const SelectOption: z.ZodType = z.strictObject({
    value: z.string().optional().describe('选项值'),
    label: z.string().optional().describe('选项文本'),
    disabled: z.boolean().default(false).describe('选项是否被禁用'),
    icon: z.string().optional().describe('选项头部图标'),
    options: z
        .array(z.lazy(() => SelectOption))
        .optional()
        .describe('分组选项')
});

export const SelectProps = z.strictObject({
    value: z.string().optional().describe('默认选项'),
    label: z.string().optional().describe('筛选标签'),
    title: z.string().optional().describe('标题'),
    placeholder: z.string().optional().describe('未选取前默认文案'),
    appearance: z
        .union([z.literal('mark'), z.literal('tag')])
        .default('mark')
        .describe('选项样式'),
    options: z
        .array(z.lazy(() => SelectOption))
        .optional()
        .describe('选项列表'),
    multiple: z.boolean().default(false).describe('是否允许多选'),
    'max-options': z.number().optional().describe('多选时允许选择的项目上限'),
    'show-selected': z.boolean().default(false).describe('多选时是否在筛选面板中展示已选项'),
    searchable: z.boolean().default(false).describe('是否开启搜索功能；仅支持 Mobile')
});

export const components = {
    Select: {
        description: '选择器：用于对某一数据集合进行单选或多选',
        props: SelectProps.extend({slot: z.enum(['entry']).optional().describe('命名插槽：entry 为筛选入口')}),
        children: true,
        events: {
            change: z.strictObject({value: z.union([z.string(), z.array(z.string())])}),
            'toggle-panel': z.strictObject({open: z.boolean()})
        }
    }
} satisfies CatalogDefinition['components'];
