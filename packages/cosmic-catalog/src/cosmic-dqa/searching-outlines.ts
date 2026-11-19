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
 * @file SearchingOutlines Catalog，依据 api/cosmic-dqa/searching-outlines/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const SearchingOutlinesItem: z.ZodType = z.strictObject({
    title: z.string().default('').describe('大纲子列表标题'),
    query: z.string().default('').describe('大纲子列表点击后的回搜 query'),
    linkInfo: LinkInfo.default({}).describe('跳转信息'),
    outlines: z
        .array(z.lazy(() => SearchingOutlinesItem))
        .default([])
        .describe('大纲子列表'),
    appearance: z.string().default('dashed').describe('大纲外观')
});

export const SearchingOutlinesProps = z.strictObject({
    outlines: z
        .array(z.lazy(() => SearchingOutlinesItem))
        .default([])
        .describe('回搜大纲内容')
});

export const components = {
    SearchingOutlines: {
        description: '大纲列表：适用于拓展用户回搜内容的场景',
        props: SearchingOutlinesProps,
        events: {
            click: z.strictObject({
                title: z.string(),
                index: z.number(),
                query: z.string().optional(),
                subIndex: z.number().optional()
            })
        }
    }
} satisfies CatalogDefinition['components'];
