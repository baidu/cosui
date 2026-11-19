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
 * @file TagLink Catalog，依据 api/cosmic-dqa/tag-link/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const TagLinkProps = z.strictObject({
    logo: z.string().default('').describe('图片地址（优先级高于 icon）'),
    icon: z.string().default('').describe('图标名称'),
    label: z.string().default('').describe('行为词'),
    text: z.string().default('').describe('引导词'),
    'link-info': LinkInfo.default({}).describe('跳转信息')
});

export const components = {
    TagLink: {
        description: '文本标签链接',
        props: TagLinkProps,
        events: {
            click: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
