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
 * @file DocumentScroll Catalog，依据 api/cosmic-dqa/document-scroll/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const DocumentSchema: z.ZodType = z.strictObject({
    logo: z.string().default('').describe('文档logo图地址'),
    actionText: z.string().default('').describe('按钮文字'),
    type: z.string().default('').describe('文档类型'),
    title: z.string().default('').describe('文档标题'),
    size: z.string().default('').describe('文档大小')
});

export const DocumentScrollProps = z.strictObject({
    items: z.array(z.lazy(() => DocumentSchema)).describe('文档列表'),
    span: z.number().default(12).describe('栅格数')
});

export const components = {
    DocumentScroll: {
        description: '文档横滑组件',
        props: DocumentScrollProps,
        events: {
            'item-click': z.strictObject({item: z.lazy(() => DocumentSchema)}),
            scrollend: z.strictObject({index: z.number(), prevIndex: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
