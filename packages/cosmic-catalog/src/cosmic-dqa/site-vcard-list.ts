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
 * @file SiteVcardList Catalog，依据 api/cosmic-dqa/site-vcard-list/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

import {SiteVcardProps as SiteVcardReferencedProps} from './site-vcard';

const FoldedOptionsSchema: z.ZodType = z.strictObject({
    initialCount: z.number().default(2).describe('默认展示条数'),
    nextCount: z.number().default(4).describe('每次点击新增展示条数')
});

export const SiteVcardListProps = z.strictObject({
    items: z
        .array(z.lazy(() => SiteVcardReferencedProps))
        .default([])
        .describe('服务挂载卡片列表'),
    folded: z
        .union([z.lazy(() => FoldedOptionsSchema), z.literal(false)])
        .default(false)
        .describe(
            '列表展开收起配置，默认为 false 不支持展开收起；传入 FoldedOptions 支持展开收起'
        )
});

export const components = {
    SiteVcardList: {
        description:
            '站点挂载卡片列表：用于一段话下展开服务挂载组件列表，如服务挂载，链接跳转等',
        props: SiteVcardListProps,
        events: {
            'more-click': z.unknown(),
            click: z.strictObject({index: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
