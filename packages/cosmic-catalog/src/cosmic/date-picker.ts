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
 * @file DatePicker Catalog，依据 api/cosmic/date-picker/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const DatePickerProps = z.strictObject({
    type: z
        .union([z.literal('single'), z.literal('range')])
        .default('single')
        .describe('选择类型，包括单选 & 范围选择两种'),
    disabled: z.boolean().default(false).describe('是否禁用入口'),
    title: z.string().default('选择日期').describe('日历选择器标题，mobile drawer 弹层使用；仅支持 Mobile'),
    placeholder: z
        .string()
        .optional()
        .describe("未选择的占位内容，范围选择支持传入{start: 'xxx', end: 'xxx'}对象"),
    format: z
        .union([
            z.literal('YYYY-MM-DD'),
            z.literal('YYYY-MM-DD-WW'),
            z.literal('YYYY'),
            z.literal('YYYY-MM'),
            z.literal('YYYY-QQ')
        ])
        .default('YYYY-MM-DD')
        .describe('选择日期组合格式'),
    appearance: z
        .union([z.literal('panel'), z.literal('rolling')])
        .default('panel')
        .describe('样式变体；仅支持 Mobile')
});

export const components = {
    DatePicker: {
        description: '日期选择器组件',
        props: DatePickerProps.extend({
            slot: z
                .enum(['date', 'entry', 'header', 'month-header', 'footer'])
                .optional()
                .describe(
                    '命名插槽：date 为自定义单元格；entry 为选择器入口；header 为顶部区域，仅支持 Mobile；month-header 为顶部年月标识区域，仅支持 Mobile；'
                        + 'footer 为底部区域'
                )
        }),
        children: true,
        events: {
            open: z.unknown(),
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
