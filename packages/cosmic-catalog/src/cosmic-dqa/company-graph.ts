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
 * @file CompanyGraph Catalog，依据 api/cosmic-dqa/company-graph/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const graphNodeSchema: z.ZodType = z.strictObject({
    name: z.string().describe('图谱关系节点名称'),
    caption: z.string().optional().describe('图谱关系节点说明'),
    relation: z.string().optional().describe('图谱关系节点与中心节点关系')
});

export const CompanyGraphProps = z.strictObject({
    linkInfo: LinkInfo.optional().describe('跳转信息').default({}),
    size: z
        .union([z.literal('sm'), z.literal('md')])
        .optional()
        .describe('图谱子节点尺寸')
        .default('md'),
    name: z.string().describe('图谱中心节点名称'),
    inbound: z
        .array(z.lazy(() => graphNodeSchema))
        .optional()
        .describe('图谱上方关系节点')
        .default([]),
    outbound: z
        .array(z.lazy(() => graphNodeSchema))
        .optional()
        .describe('图谱下方关系节点')
        .default([])
});

export const components = {
    CompanyGraph: {
        description: '企业图谱类组件',
        props: CompanyGraphProps
    }
} satisfies CatalogDefinition['components'];
