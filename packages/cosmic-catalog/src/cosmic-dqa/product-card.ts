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
 * @file ProductCard 组件 Catalog 定义
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo, Price} from '../shared';

export const ProductTag = z.strictObject({
    text: z.string().default('').describe('标签文本'),
    icon: z.string().optional().describe('标签内的 icon 名称'),
    color: z.string().optional().describe('标签文本颜色，默认 var(--cos-color-text-tiny-active)'),
    bgColor: z.string().optional().describe('标签背景颜色，默认 var(--cos-tag-color-bg)'),
    iconBgColor: z.string().optional().describe('标签内的 icon 背景颜色')
});

export const components = {
    ProductCard: {
        description: '产品信息卡，适用于展现汽车、手机等实体产品',
        props: z.strictObject({
            'link-info': LinkInfo.describe('跳转信息'),
            thumbnail: z.string().default('').describe('缩略图地址'),
            title: z.string().default('').describe('标题'),
            tags: z
                .array(z.union([ProductTag, z.string()]))
                .optional()
                .describe("标签列表，如果都是默认色，也可以简写，如 ['tag1', 'tag2']"),
            price: Price.optional().describe('价格信息'),
            sales: z.string().default('').describe('销售信息，如“月销 1.2 万”'),
            caption: z
                .union([z.string(), z.array(z.string())])
                .default('')
                .describe('产品描述，以数组形式传入时使用分割线切分展示'),
            source: z.string().default('').describe('来源')
        })
    }
} satisfies CatalogDefinition['components'];
