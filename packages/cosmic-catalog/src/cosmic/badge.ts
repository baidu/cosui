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
 * @file Badge Catalog，依据 api/cosmic/badge/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const BadgeProps = z.strictObject({
    dot: z.boolean().default(false).describe('小圆点'),
    value: z
        .string()
        .default('')
        .describe(
            '显示文字，dot 属性的优先级高于 value 属性，即如果同时传递了 dot 和 value 属性，显示小圆点'
        )
});

export const components = {
    Badge: {
        description: '徽章组件',
        props: BadgeProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
