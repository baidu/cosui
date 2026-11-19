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
 * @file Icon Catalog，依据 api/cosmic/icon/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const IconProps = z.strictObject({
    name: z.string().describe('图标名称')
});

export const components = {
    Icon: {
        description:
            '图标：图标是图形化的直观的语意表达, 能够降低用户的理解成本，'
                + '提升界面的美观度，建议按场景优化选用合适的通用图标样式',
        props: IconProps
    }
} satisfies CatalogDefinition['components'];
