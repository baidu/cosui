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
 * @file Score Catalog，依据 api/cosmic/score/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const ScoreProps = z.strictObject({
    value: z
        .union([z.number(), z.string()])
        .default(0)
        .describe('当前评分值，不支持负分，传入负分将重置为 0'),
    max: z.number().default(5).describe('最大评分值'),
    score: z.boolean().default(false).describe('是否显示分数'),
    unit: z.string().default('分').describe('设置分数的单位，仅在 type 为 text 时生效'),
    type: z
        .enum(['multiple', 'single', 'text'])
        .default('multiple')
        .describe('评分样式：multiple 五星，single 单星，text 只展示单位'),
    size: z.enum(['sm', 'md', 'lg']).default('md').describe('评分大小'),
    controlled: z.boolean().default(false).describe('是否可控，可控时可以点击选择评分'),
    clearable: z.boolean().default(false).describe('是否可清除评分'),
    labels: z.array(z.string()).default([]).describe('选项评分说明文案')
});

export const components = {
    Score: {
        description: '利用星星被涂色的比例展示评分',
        props: ScoreProps,
        children: true,
        events: {
            change: z.strictObject({value: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
