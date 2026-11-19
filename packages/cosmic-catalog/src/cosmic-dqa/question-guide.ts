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
 * @file QuestionGuide Catalog，依据 api/cosmic-dqa/question-guide/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const OptionSchema: z.ZodType = z.strictObject({
    value: z.string().default('').describe('选项文本'),
    icon: z.string().default('').describe('选项前图标'),
    linkInfo: LinkInfo.default({}).describe('自定义挂载属性集(支持JS未ready前跳转点击)'),
    caption: z.string().default('').describe('选项文本后的字幕'),
    selected: z.boolean().default(false).describe('是否选中')
});

const ItemSchema: z.ZodType = z.strictObject({
    label: z.string().default('').describe('问题组标签'),
    type: z
        .union([z.literal('question'), z.literal('radio'), z.literal('checkbox')])
        .optional()
        .describe('提问类型'),
    options: z
        .array(z.lazy(() => OptionSchema))
        .default([])
        .describe('提问选项')
});

export const QuestionGuideProps = z.strictObject({
    title: z.string().default('').describe('引导语'),
    scrollable: z.boolean().default(false).describe('是否支持横滑'),
    items: z
        .array(z.lazy(() => ItemSchema))
        .default([])
        .describe('问题组列表'),
    icon: z.string().default('').describe('引导语前icon图标 / image图片')
});

export const components = {
    QuestionGuide: {
        description: '引导(追问/反问)组件',
        props: QuestionGuideProps,
        events: {
            change: z.strictObject({
                label: z.string(),
                type: z.union([z.literal('question'), z.literal('radio'), z.literal('checkbox')]),
                checked: z.boolean(),
                option: z.lazy(() => OptionSchema),
                optionIndex: z.number(),
                index: z.number()
            }),
            scroll: z.strictObject({action: z.string()})
        }
    }
} satisfies CatalogDefinition['components'];
