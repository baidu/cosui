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
 * @file RadioGroup Catalog，依据 api/cosmic/radio-group/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const RadioGroupProps = z.strictObject({
    value: z.union([z.string(), z.number()]).default('').describe('值'),
    disabled: z.boolean().default(false).describe('禁选所有子单选框')
});

export const components = {
    RadioGroup: {
        description: '单选框集：从一组互斥的选项中选择一个选项',
        props: RadioGroupProps,
        children: ['Radio'],
        events: {
            change: z.strictObject({value: z.union([z.string(), z.number()])})
        }
    }
} satisfies CatalogDefinition['components'];
