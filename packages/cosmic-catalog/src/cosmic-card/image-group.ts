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
 * @file ImageGroup 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const ImageGroupItem = z.strictObject({
    src: z.string().optional(),
    alt: z.string().optional(),
    hover: z.boolean().default(false),
    lazy: z.boolean().default(false),
    linkInfo: LinkInfo.optional().describe(
        '单张图片跳转参数，优先级高于组件整体 link-info'
    ),
    span: z
        .number()
        .default(12)
        .describe('横滑样式下当前图片所占栅格数，可结合span参数使用，优先级list[index].span>span>12')
});

export const components = {
    ImageGroup: {
        description: '用于展示多图',
        props: z.strictObject({
            list: z.array(ImageGroupItem).describe('图片参数列表，单个图片参数参考 Image 组件'),
            'link-info': LinkInfo.optional().describe('组件整体跳转参数'),
            ratio: z.string().optional().describe('子项图片比例'),
            span: z.number().optional().describe('子项跨度，所占栅格列数'),
            'max-row': z.number().int().min(1).max(3).default(1).describe('最大行数，不超过3行'),
            scrollable: z.boolean().default(false).describe('是否以横滑样式展示图片')
        }),
        events: {
            click: z.strictObject({image: ImageGroupItem, index: z.number()}),
            scroll: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
