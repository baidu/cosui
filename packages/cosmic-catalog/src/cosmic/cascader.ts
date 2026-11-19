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
 * @file Cascader Catalog，依据 api/cosmic/cascader/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const CascaderOption: z.ZodType = z.strictObject({
    value: z.string().optional().describe('选项值'),
    label: z.string().optional().describe('选项文本'),
    disabled: z.boolean().default(false).describe('选项是否被禁用'),
    options: z
        .array(z.lazy(() => CascaderOption))
        .optional()
        .describe('选项的子选项数组，若无则认为是叶子节点')
});

export const CascaderProps = z.strictObject({
    value: z.string().optional().describe('已选值'),
    label: z.string().optional().describe('筛选标签'),
    placeholder: z.string().optional().describe('未选取前默认文案'),
    options: z
        .array(z.lazy(() => CascaderOption))
        .optional()
        .describe('选项列表'),
    title: z.string().optional().describe('选择面板标题；仅支持 Mobile'),
    direction: z
        .union([z.literal('vertical'), z.literal('horizontal')])
        .default('vertical')
        .describe('级联展开时，上一级导航展示位置；仅支持 Mobile'),
    multiple: z.boolean().default(false).describe('是否允许多选'),
    'max-options': z.number().optional().describe('多选时允许选择的项目上限'),
    searchable: z.boolean().default(false).describe('是否开启搜索功能；仅支持 Mobile')
});

export const components = {
    Cascader: {
        description: '对某多层级的数据集合进行选择，包含级联单选和级联多选',
        props: CascaderProps.extend({slot: z.enum(['entry']).optional().describe('命名插槽：entry 为筛选入口')}),
        children: true,
        events: {
            change: z.strictObject({
                value: z.union([z.string(), z.array(z.string())]),
                label: z.union([z.string(), z.array(z.string())])
            }),
            open: z.unknown(),
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
