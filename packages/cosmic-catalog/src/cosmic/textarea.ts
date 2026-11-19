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
 * @file Textarea Catalog，依据 api/cosmic/textarea/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const TextareaProps = z.strictObject({
    value: z.string().optional().describe('当前输入框值'),
    placeholder: z.string().optional().describe('提示文案'),
    rows: z.number().optional().describe('元素的输入文本的行数'),
    clear: z.boolean().default(false).describe('是否支持清空'),
    count: z.boolean().default(false).describe('是否支持字数统计'),
    appearance: z.enum(['outline', 'filled']).default('outline').describe('输入框风格'),
    height: z.number().optional().describe('高度'),
    'max-height': z.number().optional().describe('最大高度，未超出时根据输入内容自适应'),
    disabled: z.boolean().default(false).describe('禁用输入框'),
    maxlength: z.number().optional().describe('输入内容的最大长度'),
    minlength: z.number().optional().describe('输入内容的最小长度')
});

export const components = {
    Textarea: {
        description:
            '文本域：多行纯文本编辑控件，适用于评论或反馈表单中的一段意见',
        props: TextareaProps.extend({
            slot: z
                .enum(['title', 'bottomSuffix'])
                .optional()
                .describe('命名插槽：title 为输入框上方标题；bottomSuffix 为输入框下方内容，位于字数统计和清空功能之后')
        }),
        children: true,
        events: {
            change: z.strictObject({value: z.string()}),
            input: z.strictObject({value: z.string()}),
            blur: z.unknown(),
            focus: z.unknown(),
            clear: z.unknown(),
            keydown: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
