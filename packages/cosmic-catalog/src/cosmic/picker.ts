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
 * @file Picker Catalog，依据 api/cosmic/picker/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue} from '../shared';

export const PickerProps = z.strictObject({
    columns: z
        .array(z.array(z.union([z.string(), z.number(), z.record(z.string(), JsonValue)])))
        .default([])
        .describe('多列数据'),
    'selected-index': z.array(z.number()).default([]).describe('选中索引')
});

export const components = {
    Picker: {
        description:
            '多列滚动选择器：本组件为多列滚动选择器，业务方需自定义数据源并实现外层弹层等相关功能',
        props: PickerProps,
        children: true,
        events: {
            change: z.strictObject({columnIndex: z.number(), index: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
