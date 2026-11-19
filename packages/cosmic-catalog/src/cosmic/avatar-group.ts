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
 * @file AvatarGroup Catalog，依据 api/cosmic/avatar-group/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const AvatarGroupProps = z.strictObject({
    size: z
        .union([z.literal('xs'), z.literal('sm'), z.literal('md')])
        .default('md')
        .describe('头像组的大小，建议头像组 size 和头像 size 一致'),
    animate: z
        .boolean()
        .default(false)
        .describe('是否开启头像组动效，最多同时可显示 3 个轮换')
});

export const components = {
    AvatarGroup: {
        description: '头像集组件',
        props: AvatarGroupProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
