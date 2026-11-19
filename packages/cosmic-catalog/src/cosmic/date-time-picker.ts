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
 * @file DateTimePicker Catalog，依据 api/cosmic/date-time-picker/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const DateTimePickerProps = z.strictObject({
    open: z.boolean().default(false).describe('面板显示或隐藏的受控属性'),
    disabled: z.boolean().default(false).describe('是否禁用入口'),
    title: z.string().default('选择日期').describe('日历选择器标题，mobile drawer 弹层使用；仅支持 Mobile'),
    placeholder: z.string().optional().describe('未选择的占位内容'),
    format: z
        .union([
            z.literal('YYYY-MM-DD-HH-mm-ss'),
            z.literal('YYYY-MM-DD-HH-mm'),
            z.literal('YYYY-MM-HH-mm'),
            z.literal('YYYY-MM-DD-HH')
        ])
        .default('YYYY-MM-DD-HH-mm-ss')
        .describe('选择日期组合格式'),
    lunar: z.boolean().default(false).describe('是否展示农历开关；仅支持 Mobile'),
    'drawer-class': z
        .literal('')
        .optional()
        .describe('传入 drawer 的 class 类名，用于覆盖特定 drawer 样式；仅支持 Mobile')
});

export const components = {
    DateTimePicker: {
        description: '日期时间选择器组件',
        props: DateTimePickerProps.extend({
            slot: z
                .enum(['entry', 'footer'])
                .optional()
                .describe('命名插槽：entry 为选择器入口；footer 为底部区域')
        }),
        children: true,
        events: {
            open: z.unknown(),
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
