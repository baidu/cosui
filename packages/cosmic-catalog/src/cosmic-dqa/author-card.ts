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
 * @file AuthorCard Catalog，依据 api/cosmic-dqa/author-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const AuthorCardProps = z.strictObject({
    avatar: z.string().default('').describe('作者头像信息'),
    name: z.string().default('').describe('作者名称'),
    caption: z.array(z.string()).default([]).describe('作者名称下短文本集'),
    'link-info': LinkInfo.optional().describe('跳转所需的参数'),
    tag: z.string().default('').describe('标签信息')
});

export const components = {
    AuthorCard: {
        description: '作者简介：用于展示作者的头像、信息',
        props: AuthorCardProps
    }
} satisfies CatalogDefinition['components'];
