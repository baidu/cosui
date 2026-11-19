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
 * @file SearchingSteps Catalog，依据 api/cosmic-dqa/searching-steps/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const StepSchema: z.ZodType = z.strictObject({
    title: z.string().default('').describe('当前步骤'),
    description: z
        .string()
        .default('')
        .describe('思考中的关键词未能展现完成一轮，切换到下一个步骤时'),
    status: z
        .union([z.literal('wait'), z.literal('process'), z.literal('finish')])
        .default('wait')
        .describe('状态'),
    words: z.array(z.string()).default([]).describe('思考中展示的搜索关键词')
});

export const SearchingStepsProps = z.strictObject({
    'current-index': z.union([z.string(), z.number()]).default(0).describe('当前步骤'),
    appearance: z
        .union([z.literal('full'), z.literal('single')])
        .default('full')
        .describe('searchingSteps 组件仅展示选中的步骤'),
    steps: z
        .array(z.lazy(() => StepSchema))
        .default([])
        .describe('步骤列表')
});

export const components = {
    SearchingSteps: {
        description: '思考步骤：用于定义思考过程中的步骤数量，状态，内容等信息',
        props: SearchingStepsProps,
        events: {
            change: z.strictObject({index: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
