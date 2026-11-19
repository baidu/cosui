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
 * @file Switcher Catalog，依据 api/cosmic/switcher/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const SwitcherProps = z.strictObject({
    checked: z.boolean().default(false).describe('是否选中'),
    disabled: z.boolean().default(false).describe('是否禁用'),
    size: z
        .union([z.literal('md'), z.literal('sm')])
        .default('md')
        .describe('开关大小')
});

export const components = {
    Switcher: {
        description: '开关: 用于两个互斥状态间的切换和选择',
        props: SwitcherProps,
        events: {
            change: z.strictObject({checked: z.boolean()})
        }
    }
} satisfies CatalogDefinition['components'];
