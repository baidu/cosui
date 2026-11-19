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
 * @file ImageWithTags Catalog，依据 api/cosmic-card/image-with-tags/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

import {ImageProps as ImageReferencedProps} from '../cosmic/image';
import {TagProps as TagReferencedProps} from '../cosmic/tag';

const OverlayItemSchema: z.ZodType = z.strictObject({
    position: z
        .union([
            z.literal('left-top'),
            z.literal('left-bottom'),
            z.literal('right-bottom'),
            z.literal('right-top')
        ])
        .default('right-top')
        .describe('展现方位'),
    tag: z
        .lazy(() => TagReferencedProps)
        .optional()
        .describe('tag 组件参数，使用时把配置的icon、text 都传入 tag 内部显示'),
    text: z.string().optional().describe('文字'),
    icon: z.string().optional().describe('图标名称')
});

export const ImageWithTagsProps = z.strictObject({
    image: z
        .lazy(() => ImageReferencedProps)
        .optional()
        .describe('image 组件参数'),
    overlays: z
        .array(z.lazy(() => OverlayItemSchema))
        .optional()
        .describe('覆盖在图片上方的内容')
});

export const components = {
    ImageWithTags: {
        description:
            '带标签图片',
        props: ImageWithTagsProps,
        children: true,
        events: {
            load: z.unknown(),
            error: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
