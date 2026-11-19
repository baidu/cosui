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
 * @file Button 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const components = {
    Button: {
        description: '用于开始一个即时操作，或者触发某个业务逻辑',
        props: z.strictObject({
            size: z.enum(['md', 'sm']).default('md').describe('按钮大小'),
            disabled: z
                .boolean()
                .default(false)
                .describe('禁用按钮, 禁用按钮同样可以透传点击事件'),
            appearance: z
                .enum(['primary', 'secondary', 'text', 'text-primary', 'icon', 'plain'])
                .default('primary')
                .describe('按钮风格')
        }),
        children: true,
        events: {
            click: z.strictObject({disabled: z.boolean()})
        }
    }
} satisfies CatalogDefinition['components'];
