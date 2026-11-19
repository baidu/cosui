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
 * @file Comment Catalog，依据 api/cosmic/comment/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const TagItemSchema: z.ZodType = z.strictObject({
    text: z.string().describe('标签文本'),
    appearance: z
        .union([z.literal('filled'), z.literal('outline')])
        .default('filled')
        .describe("'filled' 表示填充型，'outline' 表示为线型"),
    class: z
        .string()
        .default('cos-color-text-tiny cos-tag-color-bg')
        .describe('tag 样式，默认灰底黑字')
});

const AuthorSchema: z.ZodType = z.strictObject({
    name: z.string().describe('评论者名称'),
    captions: z
        .array(z.string())
        .default([])
        .describe('评论者描述（最多三个，和评论者标签叠加计算，超出时优先显示描述）'),
    tags: z
        .array(z.lazy(() => TagItemSchema))
        .default([])
        .describe('评论者标签')
});

const LikeSchema: z.ZodType = z.strictObject({
    active: z.boolean().optional().describe('是否激活态'),
    text: z.string().optional().describe('点赞文本')
});

export const CommentProps = z.strictObject({
    avatar: z.string().describe('评论人头像'),
    author: z.lazy(() => AuthorSchema).describe('评论人信息'),
    label: z.string().optional().describe('图片标签 URL'),
    reply: z.boolean().default(false).describe('是否可回复，为 true 时展示回复按钮'),
    like: z
        .lazy(() => LikeSchema)
        .optional()
        .describe('点赞信息'),
    source: z.string().optional().describe('内容来源'),
    'link-info': LinkInfo.optional().describe('来源链接'),
    time: z.string().optional().describe('评论时间'),
    location: z.string().optional().describe('评论地区')
});

export const components = {
    Comment: {
        description: '评论：用于对搜索结果页内容流中的用户评论信息做展示',
        props: CommentProps,
        children: true,
        events: {
            reply: z.unknown(),
            like: z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
