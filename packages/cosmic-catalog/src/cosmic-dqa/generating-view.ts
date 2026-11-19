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
 * @file GeneratingView Catalog，依据 api/cosmic-dqa/generating-view/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const GeneratingViewProps = z.strictObject({
    icon: z.string().default('').describe('图标，传 icon name 或图片 url'),
    title: z.string().default('').describe("'card' 样式的标题"),
    caption: z.string().default('').describe('说明文本'),
    gradient: z
        .string()
        .default('')
        .describe(
            "'card' 样式底部背景渐变色（需要考虑暗黑适配），默认背景色linear-gradient(#fff0, #ffffffb3)"
        ),
    appearance: z
        .union([z.literal('filled'), z.literal('card')])
        .default('filled')
        .describe('组件样式风格：  - filled: 中心有图标和说明文本；  - card: 底部展示 icon')
});

export const components = {
    GeneratingView: {
        description: '富媒体生成中',
        props: GeneratingViewProps.extend({slot: z.enum(['icon']).optional().describe('命名插槽：icon 为图标')}),
        children: true
    }
} satisfies CatalogDefinition['components'];
