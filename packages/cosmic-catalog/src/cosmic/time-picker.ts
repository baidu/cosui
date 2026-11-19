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
 * @file TimePicker Catalog，依据 api/cosmic/time-picker/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const TimePickerProps = z.strictObject({
    title: z.string().default('时间选择器').describe('日历选择器标题，mobile drawer 弹层使用；仅支持 Mobile'),
    format: z
        .union([z.literal('HH-mm-ss'), z.literal('HH-mm'), z.literal('HH')])
        .default('HH-mm-ss')
        .describe('选择日期组合格式')
});

export const components = {
    TimePicker: {
        description:
            '时间选择器：选择时间',
        props: TimePickerProps.extend({
            slot: z
                .enum(['entry', 'header', 'footer'])
                .optional()
                .describe('命名插槽：entry 为选择器入口；header 为顶部区域，仅支持 Mobile；footer 为底部区域')
        }),
        children: true,
        events: {
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
