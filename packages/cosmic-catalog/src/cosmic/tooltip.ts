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
 * @file Tooltip Catalog，依据 api/cosmic/tooltip/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const TooltipProps = z.strictObject({
    content: z.string().optional().describe('气泡内容'),
    disabled: z.boolean().default(false).describe('是否禁用弹出提示'),
    'open-delay': z.number().default(0).describe('延迟出现的时间'),
    'close-delay': z.number().default(0).describe('延迟消失的时间'),
    position: z
        .union([
            z.literal('top'),
            z.literal('top-start'),
            z.literal('top-end'),
            z.literal('bottom'),
            z.literal('bottom-start'),
            z.literal('bottom-end'),
            z.literal('left'),
            z.literal('left-start'),
            z.literal('left-end'),
            z.literal('right'),
            z.literal('right-start'),
            z.literal('right-end')
        ])
        .default('top')
        .describe('气泡展示位置'),
    trigger: z
        .union([z.literal('hover'), z.literal('click'), z.literal('custom')])
        .optional()
        .describe('触发展示的时机'),
    open: z
        .boolean()
        .default(false)
        .describe("是否展示气泡，仅在 trigger 为 'custom' 时生效"),
    'bubble-class': z
        .string()
        .default('')
        .describe('气泡类名;使用场景：业务想要自定义挂载在 body 上气泡的气泡样式'),
    'auto-adjust-overflow': z.boolean().default(true).describe('气泡被遮挡时自动调整位置')
});

export const components = {
    Tooltip: {
        description:
            '用于对元素提供辅助提示，例如向用户解释图标的含义',
        props: TooltipProps.extend({slot: z.enum(['content']).optional().describe('命名插槽：content 为自定义气泡内容')}),
        children: true,
        events: {
            toggle: z.strictObject({open: z.boolean()})
        }
    }
} satisfies CatalogDefinition['components'];
