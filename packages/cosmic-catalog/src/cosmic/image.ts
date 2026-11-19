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
 * @file Image Catalog，依据 api/cosmic/image/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const ImageProps = z.strictObject({
    src: z.string().optional().describe('图片链接'),
    alt: z.string().optional().describe('图片替代文本'),
    hover: z.boolean().default(false).describe('在图片上悬浮呈现放大效果；仅支持 PC'),
    lazy: z.boolean().default(false).describe('是否开启懒加载，懒加载功能依赖 data-lazy-src；仅支持 Mobile')
});

export const components = {
    Image: {
        description: '用于单个图片的展示',
        props: ImageProps.extend({slot: z.enum(['placeholder']).optional().describe('命名插槽：placeholder 为图片加载完成前的占位内容')}),
        children: true,
        events: {
            load: z.unknown(),
            error: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
