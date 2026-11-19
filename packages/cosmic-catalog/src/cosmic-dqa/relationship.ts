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
 * @file Relationship Catalog，依据 api/cosmic-dqa/relationship/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const MemberSchema: z.ZodType = z.strictObject({
    avatar: z.string().describe('人物头像'),
    avatarShape: z
        .union([z.literal(''), z.literal('circle')])
        .optional()
        .describe("人物头像形状，'circle'时为圆角头像，不传时为方形头像"),
    relation: z.string().describe('词条关系名，如：”队友“，"妻子"'),
    name: z.string().describe('人物名字'),
    linkInfo: LinkInfo.optional().describe('人物跳转信息')
});

export const RelationshipProps = z.strictObject({
    members: z
        .array(z.lazy(() => MemberSchema))
        .describe('人物信息')
        .default([]),
    'overscroll-link-info': LinkInfo.optional().describe('查看更多的跳转信息')
});

export const components = {
    Relationship: {
        description: '人物关系列表',
        props: RelationshipProps,
        events: {
            click: z.strictObject({from: z.literal('more/member')}),
            scrollend: z.strictObject({index: z.number(), prevIndex: z.number()})
        }
    }
} satisfies CatalogDefinition['components'];
