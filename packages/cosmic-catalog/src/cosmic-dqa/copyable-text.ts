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
 * @file CopyableText Catalog，依据 api/cosmic-dqa/copyable-text/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue} from '../shared';

export const CopyableTextProps = z.strictObject({
    appearance: z
        .union([z.literal('paragraph'), z.literal('phrase')])
        .default('paragraph')
        .describe('变体标识'),
    content: z.array(JsonValue).default([]).describe('文本列表'),
    note: z.string().default('').describe('左下角标签'),
    typing: z.record(z.string(), JsonValue).nullable().default(null).describe('文本')
});

export const components = {
    CopyableText: {
        description: '可复制文本组件',
        props: CopyableTextProps,
        events: {
            'copy-click': z.strictObject({content: z.string()}),
            'typing-finished': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
