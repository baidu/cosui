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
 * @file Popover Catalog，依据 api/cosmic/popover/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const PopoverProps = z.strictObject({
    open: z.boolean().default(false).describe('是否显示气泡；仅支持 PC')
});

export const components = {
    Popover: {
        description: '气泡：在当前页面视图上叠加的一块显示区域',
        props: PopoverProps,
        children: true,
        events: {
            close: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
