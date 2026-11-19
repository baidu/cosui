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
 * @file Avatar Catalog，依据 api/cosmic/avatar/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const AvatarProps = z.strictObject({
    src: z.string().default('').describe('头像图像的地址'),
    alt: z.string().default('').describe('图像无法显示时的替代文本'),
    size: z
        .union([z.literal('xs'), z.literal('sm'), z.literal('md')])
        .default('md')
        .describe('头像尺寸'),
    placeholder: z.string().default('').describe('用于图像还没加载完成时展示'),
    fallback: z.string().optional().describe('用于图像加载失败时展示')
});

export const components = {
    Avatar: {
        description: '头像',
        props: AvatarProps
    }
} satisfies CatalogDefinition['components'];
