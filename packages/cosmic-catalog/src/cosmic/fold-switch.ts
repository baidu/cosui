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
 * @file FoldSwitch Catalog，依据 api/cosmic/fold-switch/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const FoldSwitchProps = z.strictObject({
    folded: z.boolean().default(true).describe('是否处于折叠状态'),
    mask: z.boolean().default(false).describe('是否展示渐变背景遮罩'),
    'unfold-text': z.string().default('展开').describe('展开文本'),
    'fold-text': z.string().default('收起').describe('收起文本')
});

export const components = {
    FoldSwitch: {
        description: '展开收起切换：用于 Fold 不适用的场景，例如高度不固定的折叠，业务可使用展开收起切换组件',
        props: FoldSwitchProps,
        events: {
            toggle: z.strictObject({status: z.union([z.literal('folded'), z.literal('unfolded')])})
        }
    }
} satisfies CatalogDefinition['components'];
