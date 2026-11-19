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
 * @file SearchHeader Catalog，依据 api/cosmic-dqa/search-header/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const SearchHeaderProps = z.strictObject({
    logo: z
        .string()
        .default(
            'https://gips2.baidu.com/it/u=1009531835,1711006677&fm=3028&app=3028&f='
                + 'PNG&fmt=auto&q=90&size=f187_48'
        )
        .describe('品牌日间logo'),
    logoDark: z
        .string()
        .default(
            'https://gips3.baidu.com/it/u=397455163,2412254865&fm=3028&app=3028&f=P'
                + 'NG&fmt=auto&q=90&size=f187_48'
        )
        .describe('品牌夜间logo'),
    brandLogo: z.string().default('').describe('联名品牌日间logo'),
    brandLogoDark: z.string().default('').describe('联名品牌夜间logo'),
    appearance: z
        .union([z.literal('primary'), z.literal('enhance'), z.literal('secondary')])
        .default('primary')
        .describe(
            '- primary: 多个logo之间的间隔符为圆点以及文案字重加粗 - enhance: 多个logo之间的间隔符为竖线 - second'
                + 'ary: 品牌logo后的文案不加粗'
        ),
    overview: z.string().default('').describe('概述总结'),
    subjective: z
        .boolean()
        .default(false)
        .describe(
            'q检索内容的主观性，- true: 总结全网xx篇真实经验 - false: 总结全网xx篇结果'
        ),
    citationCount: z.number().default(0).describe('溯源数量'),
    expanded: z
        .boolean()
        .optional()
        .describe('溯源总结文案后的小箭头，用于指示是否展开列表, 不传则没有展开收起')
});

export const components = {
    SearchHeader: {
        description: '搜索头部：用于展示百看化卡片的头部',
        props: SearchHeaderProps,
        children: true,
        events: {
            'citation-click': z.unknown(),
            'overview-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
