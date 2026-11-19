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
 * @file Tag Catalog，依据 api/cosmic/tag/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const TagProps = z.strictObject({
    size: z
        .union([z.literal('sm'), z.literal('md')])
        .default('sm')
        .describe('标签尺寸：sm 高 16px，md 高 18px'),
    appearance: z
        .union([z.literal('filled'), z.literal('outline')])
        .default('filled')
        .describe('标签风格：filled 填充型，outline 线型')
});

export const components = {
    Tag: {
        description:
            '用于标记一段文字、视频、图片等资源的属性，仅做展示不可点击',
        props: TagProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
