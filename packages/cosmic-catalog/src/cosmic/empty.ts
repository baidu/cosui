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
 * @file Empty Catalog，依据 api/cosmic/empty/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const EmptyProps = z.strictObject({
    title: z.string().default('').describe('标题内容'),
    description: z.string().default('').describe('辅助描述信息'),
    size: z
        .union([z.literal('sm'), z.literal('md')])
        .default('sm')
        .describe('组件尺寸，对应卡内空状态、空页面两种类型'),
    icon: z.string().optional().describe('图标信息，判断是否为 url，否则作为 icon 名称')
});

export const components = {
    Empty: {
        description: '空状态',
        props: EmptyProps
    }
} satisfies CatalogDefinition['components'];
