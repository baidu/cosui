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
 * @file EntityCard Catalog，依据 api/cosmic-dqa/entity-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

/** 图片配置，属性同 Image 组件 */
export const EntityCardThumbnail: z.ZodType = z.strictObject({
    src: z.string().describe('图片地址'),
    alt: z.string().optional().describe('图片描述'),
    radius: z.string().optional().describe('圆角'),
    fit: z.string().optional().describe('图片填充方式，同 CSS object-fit'),
    class: z.string().optional().describe('自定义 class'),
    style: z.string().optional().describe('自定义 style')
});

export const EntityCardProps = z.strictObject({
    thumbnail: z.lazy(() => EntityCardThumbnail).describe('图片配置，属性同 Image 组件'),
    title: z.string().describe('标题，支持普通文本和蓝链，单行截断'),
    content: z.string().describe('描述，支持普通文本和蓝链，三行截断')
});

export const components = {
    EntityCard: {
        description: '实体卡片：左图右文结构，标题与描述支持蓝链，点击蓝链或图片时抛出点击事件',
        props: EntityCardProps,
        events: {
            click: z.strictObject({
                area: z.enum(['thumbnail', 'title', 'content']),
                from: z.enum(['link', 'search']).optional(),
                thumbnail: z.lazy(() => EntityCardThumbnail).optional()
            })
        }
    }
} satisfies CatalogDefinition['components'];
