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
 * @file CompanyCard Catalog，依据 api/cosmic-dqa/company-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const CompanyCardProps = z.strictObject({
    level: z
        .union([z.literal('normal'), z.literal('standard'), z.literal('intermediate'), z.literal('premium')])
        .optional()
        .describe('企业认证等级'),
    name: z.string().default('').describe('公司名称'),
    logo: z.string().default('').describe('名片logo，链接或文字'),
    'legal-person': z.string().default('').describe('法定代表人'),
    'registered-capital': z.string().default('').describe('注册资本'),
    tags: z.array(z.string()).optional().describe('标签信息'),
    'link-info': LinkInfo.optional().describe('跳转所需的参数')
});

export const components = {
    CompanyCard: {
        description: '用于展示企业名片',
        props: CompanyCardProps
    }
} satisfies CatalogDefinition['components'];
