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
 * @file MoreLink Catalog，依据 api/cosmic/more-link/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const MoreLinkProps = z.strictObject({
    appearance: z
        .union([
            z.literal('subtle'),
            z.literal('outline'),
            z.literal('filled'),
            z.literal('plain'),
            z.literal('line')
        ])
        .default('subtle')
        .describe('样式风格'),
    url: z.string().optional().describe('跳转链接地址'),
    target: z
        .union([z.literal('_blank'), z.literal('_self')])
        .optional()
        .describe('跳转打开方式'),
    'link-info': LinkInfo.default({}).describe('链接属性')
});

export const components = {
    MoreLink: {
        description: '查看更多链接：用于引导用户跳转独立页继续阅读浏览',
        props: MoreLinkProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
