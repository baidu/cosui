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
 * @file Calendar Catalog，依据 api/cosmic/calendar/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const CalendarProps = z.strictObject({
    type: z
        .union([z.literal('single'), z.literal('range')])
        .default('single')
        .describe('选择类型，包括单选 & 范围选择两种'),
    'control-date': z
        .strictObject({year: z.number(), month: z.number()})
        .optional()
        .describe('指定年月用于重新构建月份矩阵')
});

export const components = {
    Calendar: {
        description: '日历组件',
        props: CalendarProps.extend({
            slot: z
                .enum(['date', 'header'])
                .optional()
                .describe('命名插槽：date 为筛选入口；header 为自定义头部内容')
        }),
        children: true
    }
} satisfies CatalogDefinition['components'];
