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
 * @file Fold Catalog，依据 api/cosmic/fold/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const FoldProps = z.strictObject({
    action: z
        .union([z.literal('foldable'), z.literal('unfold-only'), z.literal('more')])
        .default('foldable')
        .describe(
            '展开行为后的交互行为 * foldable：可以反复操作展开收起 * unfold-only：展开后不可以收起 * more：展开后展示查看更多'
        ),
    'fold-height': z.number().default(24).describe('折叠时展示的高度，单位 px'),
    mask: z.boolean().default(false).describe('是否展示渐变背景遮罩'),
    'unfold-text': z.string().default('展开').describe('展开文本，折叠状态下显示的操作文案'),
    'fold-text': z.string().default('收起').describe('收起文本，展开状态下显示的操作文案'),
    'more-text': z.string().default('查看更多').describe('查看更多文本'),
    'more-url': z.string().optional().describe('查看更多跳转 url'),
    'more-target': z
        .union([z.literal('_blank'), z.literal('_self')])
        .optional()
        .describe('查看更多跳转打开方式'),
    'more-link-info': LinkInfo.default({}).describe('查看更多的链接属性'),
    'async-loading': z
        .boolean()
        .default(false)
        .describe(
            '是否正在异步加载数据中，通常情况下，展开时有异步更新数据情况，应在 on-toggle 中将其设为 true，待数据更新后设为 false'
        )
});

export const components = {
    Fold: {
        description: '展开收起：用于未展示全的信息内容，点击展开继续阅读浏览',
        props: FoldProps,
        children: true,
        events: {
            toggle: z.strictObject({status: z.union([z.literal('folded'), z.literal('unfolded')])})
        }
    }
} satisfies CatalogDefinition['components'];
