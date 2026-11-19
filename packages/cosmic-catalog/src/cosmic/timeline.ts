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
 * @file Timeline Catalog，依据 api/cosmic/timeline/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const TimelineProps = z.strictObject({
    size: z.enum(['md', 'lg']).default('md').describe('文本区域的文字大小')
});

export const TimelineItemProps = z.strictObject({
    title: z.string().optional().describe('标题'),
    appearance: z.string().default('').describe("标题的样式, 枚举值'' | 'strong'")
});

export const components = {
    Timeline: {
        description:
            '时间轴：用于连接带有时间属性的事件信息',
        props: TimelineProps,
        children: ['TimelineItem']
    },
    TimelineItem: {
        description: '',
        props: TimelineItemProps.extend({slot: z.enum(['content']).optional().describe('命名插槽：content 为子项内容区域')}),
        children: true
    }
} satisfies CatalogDefinition['components'];
