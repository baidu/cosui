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
 * @file Pagination Catalog，依据 api/cosmic/pagination/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const PaginationProps = z.strictObject({
    total: z.number().default(0).describe('数据总数'),
    current: z.number().default(1).describe('当前页码'),
    'page-size': z.number().default(10).describe('每页条数'),
    'page-count': z.number().optional().describe('页数，优先级大于 total / page-size 计算'),
    appearance: z
        .literal('compact')
        .optional()
        .describe(
            "外观类型。不传为数字页码翻页器；'compact' 为左右箭头 + n / total 紧凑翻页器"
        )
});

export const components = {
    Pagination: {
        description: '分页器：通过页码切换提升页面导航效率、有效展示大量数据',
        props: PaginationProps,
        events: {
            change: z.strictObject({current: z.number(), prev: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
