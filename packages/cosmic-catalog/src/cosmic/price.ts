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
 * @file Price Catalog，依据 api/cosmic/price/doc/api.md
 */

import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {Price} from '../shared';

export const PriceProps = Price;

export const components = {
    Price: {
        description: '用于商品、服务、资产等货币数值的展示',
        props: PriceProps
    }
} satisfies CatalogDefinition['components'];
