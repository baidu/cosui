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
 * @file Radio Catalog，依据 api/cosmic/radio/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const RadioProps = z.strictObject({
    appearance: z
        .union([z.literal('tag'), z.literal('mark')])
        .default('tag')
        .describe('视觉风格'),
    value: z.union([z.string(), z.number()]).default('').describe('值'),
    checked: z.boolean().default(false).describe('是否选中'),
    disabled: z.boolean().default(false).describe('是否禁用')
});

export const components = {
    Radio: {
        description: '单选框：用于单项选择',
        props: RadioProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
