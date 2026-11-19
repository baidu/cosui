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
 * @file Slider Catalog，依据 api/cosmic/slider/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const SliderProps = z.strictObject({
    value: z
        .union([z.number(), z.tuple([z.number(), z.number()])])
        .default(0)
        .describe('当前进度百分比'),
    disabled: z.boolean().default(false).describe('是否禁用'),
    max: z.number().default(100).describe('滑块范围最大值'),
    min: z.number().default(0).describe('滑块范围最小值'),
    step: z.number().default(1).describe('步长'),
    marks: z
        .union([z.record(z.string(), z.string()), z.boolean()])
        .default(false)
        .describe(
            '刻度标记, key 的类型必须为 number 且取值在闭区间 [min, max] 内, value 值为刻度说明；为 true 时根据step平均展现刻度'
        ),
    range: z.boolean().default(false).describe('是否开启双滑块模式'),
    tooltip: z.boolean().default(true).describe('是否显示 tooltip')
});

export const components = {
    Slider: {
        description: '滑块（滑动型输入器），是帮助用户在连续或间断的区间内，'
            + '通过滑动来选择合适数值（一个数值或范围数值）的控件',
        props: SliderProps,
        events: {
            onChange: z.strictObject({value: z.union([z.number(), z.tuple([z.number(), z.number()])])}),
            onChangeComplete: z.strictObject({value: z.union([z.number(), z.tuple([z.number(), z.number()])])})
        }
    }
} satisfies CatalogDefinition['components'];
