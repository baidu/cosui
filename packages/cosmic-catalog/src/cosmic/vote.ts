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
 * @file Vote Catalog，依据 api/cosmic/vote/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

const TargetSchema: z.ZodType = z.strictObject({
    name: z.string().describe('选项显示的文本内容'),
    image: z.string().optional().describe('选项显示的图片资源地址，若有则会渲染图片')
});

const OptionSchema: z.ZodType = z.strictObject({
    target: z.lazy(() => TargetSchema).describe('选项的具体内容'),
    value: z.number().min(0).max(1).default(0).describe('用于显示选项结果的占比，如 0.25'),
    text: z
        .string()
        .default('')
        .describe('选项结果显示的文本内容，若为空则默认使用 value 计算并显示百分比')
});

export const VoteProps = z.strictObject({
    appearance: z
        .union([z.literal('1v1'), z.literal('horizontal'), z.literal('vertical')])
        .default('1v1')
        .describe('控制投票组件展示的样式，需要注意不同样式下选项数目要对应'),
    options: z
        .array(z.lazy(() => OptionSchema))
        .default([])
        .describe('所有选项及结果展示项数据'),
    'target-name': z.string().default('name').describe('用于区分可选项的唯一标识的键名称'),
    target: z
        .union([z.string(), z.number()])
        .nullable()
        .default(null)
        .describe(
            '用户的投票选择，null 表示用户尚未投票。非 null 将显示投票结果，并通过其值确定用户选项'
        )
});

export const components = {
    Vote: {
        description: '提供多选一的投票和结果展示的功能',
        props: VoteProps,
        events: {
            'option-click': z.union([z.string(), z.number()])
        }
    }
} satisfies CatalogDefinition['components'];
