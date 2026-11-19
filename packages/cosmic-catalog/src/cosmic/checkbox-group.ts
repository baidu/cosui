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
 * @file CheckboxGroup 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const scalar = z.union([z.string(), z.number()]);

export const components = {
    CheckboxGroup: {
        description: '复选框集：用于列表中有多个选项可供选择，且选项之间不互斥的情况',
        props: z.strictObject({
            value: scalar.default('').describe('值'),
            disabled: z.boolean().default(false).describe('禁选所有子复选框')
        }),
        children: ['Checkbox'],
        events: {
            change: z.union([z.array(z.string()), z.array(z.number())])
        }
    }
} satisfies CatalogDefinition['components'];
