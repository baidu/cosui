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
 * @file Rank Catalog，依据 api/cosmic/rank/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const RankProps = z.strictObject({
    size: z
        .union([z.literal('sm'), z.literal('md'), z.literal('lg')])
        .default('lg')
        .describe('排序标签的尺寸大小'),
    index: z.number().default(1).describe('序号，四位数及以上的序号将显示为 999+'),
    appearance: z
        .union([z.literal('filled-leaf'), z.literal('filled'), z.literal('subtle')])
        .default('filled-leaf')
        .describe(
            "排序标签的风格，'filled-leaf'为一级标签，'filled'为二级标签，'subtle'为三级标签"
        )
});

export const components = {
    Rank: {
        description: '用于展示排行榜序号',
        props: RankProps
    }
} satisfies CatalogDefinition['components'];
