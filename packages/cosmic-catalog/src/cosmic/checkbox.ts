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
 * @file Checkbox 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const scalar = z.union([z.string(), z.number()]);

export const components = {
    Checkbox: {
        description: '复选框：用于多项选择',
        props: z.strictObject({
            appearance: z.enum(['tag', 'mark']).default('tag').describe('视觉风格'),
            value: scalar.default('').describe('值'),
            checked: z.boolean().default(false).describe('是否选中'),
            disabled: z.boolean().default(false).describe('是否禁用'),
            indeterminate: z.boolean().default(false).describe('是否半选')
        }),
        children: true,
        events: {
            change: z.strictObject({value: scalar})
        }
    }
} satisfies CatalogDefinition['components'];
