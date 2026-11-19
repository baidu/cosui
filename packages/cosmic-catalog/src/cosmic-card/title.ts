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
 * @file Title Catalog，依据 api/cosmic-card/title/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const TitleProps = z.strictObject({
    size: z
        .enum(['xs', 'sm', 'md', 'lg'])
        .default('md')
        .describe('字体大小'),
    icon: z.string().default('').describe('icon 组件的 name 或前置图标的 url'),
    tag: z.string().default('').describe('表示 tag 的文本，样式是蓝底填充'),
    url: z.string().default('').describe('跳转链接'),
    'link-info': LinkInfo.default({}).describe('跳转信息')
});

export const components = {
    Title: {
        description:
            '用作卡片或内容的标题',
        props: TitleProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
