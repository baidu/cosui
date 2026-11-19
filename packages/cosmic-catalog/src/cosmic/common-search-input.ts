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
 * @file SearchInput Catalog，依据 api/cosmic/common/search-input/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const SearchInputProps = z.strictObject({
    value: z.string().default('').describe('当前输入框值'),
    placeholder: z.string().default('搜索').describe('提示文案'),
    maxlength: z.number().default(20).describe('输入内容的最大长度'),
    active: z.boolean().default(false).describe('是否在搜索中')
});

export const components = {
    SearchInput: {
        description: '搜索输入框，支持取消、输入、聚焦与清空等交互',
        props: SearchInputProps,
        events: {
            cancel: z.unknown(),
            input: z.strictObject({value: z.string()}),
            focus: z.unknown(),
            clear: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
