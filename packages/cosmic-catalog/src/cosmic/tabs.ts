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
 * @file Tabs、Tab、TabPane 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const components = {
    Tabs: {
        description:
            '选项卡切换组件，提供平级的区域将大块内容进行收纳和展现',
        props: z.strictObject({
            'active-index': z.number().default(0).describe('当前选中的 Tab 下标索引'),
            appearance: z
                .enum(['bar', 'pill', 'pill-filled', 'line', 'card', 'outline'])
                .default('bar')
                .describe('Tabs 风格'),
            arrow: z
                .union([z.boolean(), z.literal('right')])
                .default(false)
                .describe('是否显示翻页箭头，line 主题下 arrow="right" 使翻页箭头位置置右')
        }).extend({slot: z.enum(['tab']).optional().describe('命名插槽：tab 为头部区域，接收 Tab')}),
        children: ['Tab', 'TabPane'],
        events: {change: z.strictObject({index: z.number()})}
    },
    Tab: {
        description: '选项卡头部项',
        props: z.strictObject({
            disabled: z.boolean().default(false).describe('是否禁用当前 Tab')
        }),
        children: true
    },
    TabPane: {
        description: '选项卡内容区域项',
        children: true
    }
} satisfies CatalogDefinition['components'];
