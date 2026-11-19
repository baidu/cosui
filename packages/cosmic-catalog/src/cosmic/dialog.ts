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
 * @file Dialog Catalog，依据 api/cosmic/dialog/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const DialogProps = z.strictObject({
    open: z.boolean().default(false).describe('弹窗是否打开'),
    title: z.string().default('标题').describe('标题文字'),
    headless: z
        .boolean()
        .default(false)
        .describe('是否不显示标题；当为 true 时，视为开启异形模式，内容区不再预留间距'),
    footless: z.boolean().default(false).describe('是否不显示底部操作区'),
    'ok-text': z.string().default('确定').describe('确定按钮文字，无内容时不显示'),
    'cancel-text': z.string().default('取消').describe('取消按钮文字，无内容时不显示'),
    'custom-behavior-text': z
        .string()
        .optional()
        .describe('customBehavior 按钮文字，无内容时不显示'),
    closable: z.boolean().default(false).describe('是否显示关闭按钮'),
    'outside-closable': z.boolean().default(false).describe('蒙层是否点击可关闭；仅支持 PC'),
    appearance: z
        .union([z.literal('info'), z.literal('success'), z.literal('warning'), z.literal('error')])
        .optional()
        .describe('弹窗类型；仅支持 PC')
});

export const components = {
    Dialog: {
        description: '模态对话框',
        props: DialogProps.extend({
            slot: z
                .enum(['title'])
                .optional()
                .describe('命名插槽：title 为标题，title 为空且 headless 为 false 时使用')
        }),
        children: true,
        events: {
            close: z.unknown(),
            cancel: z.unknown(),
            ok: z.unknown(),
            customBehavior: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
