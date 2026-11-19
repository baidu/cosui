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
 * @file Input Catalog，依据 api/cosmic/input/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const InputProps = z.strictObject({
    type: z
        .union([z.literal('text'), z.literal('password')])
        .default('text')
        .describe('输入框类型'),
    value: z.string().optional().describe('当前输入框值'),
    placeholder: z.string().optional().describe('提示文案'),
    size: z
        .union([z.literal('sm'), z.literal('md'), z.literal('lg')])
        .default('lg')
        .describe('sm:30px, md:36px, lg:40px'),
    appearance: z.enum(['outline', 'filled']).default('outline').describe('输入框风格'),
    disabled: z.boolean().default(false).describe('禁用输入框'),
    clear: z.boolean().default(false).describe('是否显示清空图标'),
    count: z
        .boolean()
        .default(false)
        .describe('是否显示输入字数统计，需要配合maxlength使用'),
    maxlength: z.number().optional().describe('输入内容的最大长度'),
    minlength: z.number().optional().describe('输入内容的最小长度'),
    enterkeyhint: z
        .string()
        .optional()
        .describe('移动设备虚拟键盘上回车键的显示方式，与原生 enterkeyhint 一致')
});

export const components = {
    Input: {
        description: '单行输入框：用于输入内容',
        props: InputProps.extend({
            slot: z
                .enum(['title', 'button', 'prefix'])
                .optional()
                .describe('命名插槽：title 为输入框前的标题；button 为输入框后的按钮；prefix 为输入框前置内容')
        }),
        children: true,
        events: {
            change: z.strictObject({value: z.string()}),
            input: z.strictObject({value: z.string()}),
            blur: z.unknown(),
            focus: z.unknown(),
            clear: z.unknown(),
            keyup: z.unknown(),
            keydown: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
