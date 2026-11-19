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
 * @file Accordion Catalog，依据 api/cosmic/accordion/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const AccordionProps = z.strictObject({
    multiple: z.boolean().default(true).describe('是否允许同时存在多个展开的面板'),
    value: z
        .union([z.string(), z.array(z.string())])
        .default('')
        .describe(
            '展开的列表项。取值为某一子列表项的标识符或标识符的集合。multiple=false 时为 string，multiple=true 时为 '
                + 'string[]'
        )
});

export const AccordionPanelProps = z.strictObject({
    value: z.string().describe('每一个折叠项的唯一标识符'),
    title: z.string().optional().describe('标题栏文本')
});

export const components = {
    Accordion: {
        description: '折叠面板：可以折叠/展开的内容区域',
        props: AccordionProps,
        children: ['AccordionPanel'],
        events: {
            change: z.strictObject({value: z.string(), expanded: z.boolean()})
        }
    },
    AccordionPanel: {
        description: '折叠面板：可以折叠/展开的内容区域',
        props: AccordionPanelProps.extend({slot: z.enum(['header']).optional().describe('命名插槽：header 为标题文字区域，不含右侧图标')}),
        children: true
    }
} satisfies CatalogDefinition['components'];
