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
 * @file AvatarBadge Catalog，依据 api/cosmic-card/avatar-badge/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';

export const AvatarBadgeProps = z.strictObject({
    size: z
        .union([z.literal('xs'), z.literal('sm'), z.literal('md')])
        .default('md')
        .describe('徽章尺寸'),
    type: z
        .union([
            z.literal('vip-1'),
            z.literal('vip-2'),
            z.literal('vip-3'),
            z.literal('vip-4'),
            z.literal('live')
        ])
        .optional()
        .describe('徽章类型'),
    text: z
        .string()
        .optional()
        .describe("文字徽章，与 v 标互斥，且优先级比 v 标高，仅在 'md' 的 size 上生效")
});

export const components = {
    AvatarBadge: {
        description:
            '头像徽章组件',
        props: AvatarBadgeProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
