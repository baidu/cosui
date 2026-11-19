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
 * @file Chart Catalog，依据 api/cosmic-dqa/chart/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue} from '../shared';

export const ChartProps = z.strictObject({
    type: z
        .union([z.literal('line'), z.literal('pie'), z.literal('bar'), z.literal('map'), z.literal('radar')])
        .describe('图表类型：line 折线图，pie 饼图，bar 柱状图，map 地图，radar 雷达图')
        .default('bar'),
    option: z
        .record(z.string(), JsonValue)
        .describe(
            '图表的初始配置，同 ECharts option；不支持函数类型配置项（如 formatter）、跳转，'
                + '以及 series 中混用不同 type（如 line 与 bar）'
        )
        .default({}),
    async: z
        .boolean()
        .optional()
        .describe(
            '与默认同步渲染互斥，开启后默认渲染会loading（此时不会触发图表rendered），须搭配updateChart（地图须改为调用regi'
                + 'sterMap）异步完成渲染（此时才会触发图表rendered）'
        )
        .default(false)
});

export const components = {
    Chart: {
        description: '基于ECharts的图表组件，支持折线图、饼图、柱状图等多种图表类型',
        props: ChartProps,
        events: {
            'render-finished': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
