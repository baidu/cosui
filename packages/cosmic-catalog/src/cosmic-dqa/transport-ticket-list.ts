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
 * @file TransportTicketList Catalog，依据 api/cosmic-dqa/transport-ticket-list/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

import {TransportTicketProps as TransportTicketReferencedProps} from './transport-ticket';

export const TransportTicketListProps = z.strictObject({
    items: z.array(z.lazy(() => TransportTicketReferencedProps)).describe('三票组件列表')
});

export const components = {
    TransportTicketList: {
        description: '三票列表组件：用于多个三票组件的列表展示',
        props: TransportTicketListProps,
        events: {
            click: z.strictObject({index: z.number()}),
            'more-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
