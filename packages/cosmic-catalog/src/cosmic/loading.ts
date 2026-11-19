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
 * @file Loading Catalog，依据 api/cosmic/loading/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const LoadingProps = z.strictObject({
    text: z.string().default('加载中...').describe('加载提示文案'),
    position: z
        .union([z.literal('right'), z.literal('bottom')])
        .default('bottom')
        .describe('加载文案展示方向'),
    appearance: z
        .union([z.literal('reverse'), z.literal('')])
        .default('')
        .describe("加载icon风格'inverse'")
});

export const components = {
    Loading: {
        description: '加载中：加载中状态展示',
        props: LoadingProps.extend({slot: z.enum(['icon']).optional().describe('命名插槽：icon 为加载图标')}),
        children: true
    }
} satisfies CatalogDefinition['components'];
