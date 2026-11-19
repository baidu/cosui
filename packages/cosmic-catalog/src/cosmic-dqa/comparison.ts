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
 * @file Comparison Catalog，依据 api/cosmic-dqa/comparison/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo, JsonValue} from '../shared';

const DelimiterSchema: z.ZodType = z.strictObject({
    icon: z.string().optional().describe('字体图标name')
});

const TargetSchema: z.ZodType = z.strictObject({
    name: z.string().describe('比对名称'),
    image: z.string().describe('比对图片'),
    text: z.string().optional().describe('比对文本')
});

const BarSchema: z.ZodType = z.strictObject({
    value: z.number().describe('占比'),
    color: z.string().optional().describe('背景颜色'),
    text: z.string().describe('比对描述')
});

const ItemSchema: z.ZodType = z.strictObject({
    name: z.string().describe('比对项的名称'),
    values: z.array(JsonValue).describe("比对项的详细描述，示例['2胜1平3负', '2胜1平3负']")
});

export const ComparisonProps = z.strictObject({
    'link-info': LinkInfo.default({}).describe('跳转信息'),
    delimiter: z
        .lazy(() => DelimiterSchema)
        .default({})
        .describe('分割描述'),
    targets: z
        .array(z.lazy(() => TargetSchema))
        .default([])
        .describe('比对对象'),
    bar: z
        .array(z.lazy(() => BarSchema))
        .default([])
        .describe('进度条，胜-平-胜'),
    items: z
        .array(z.lazy(() => ItemSchema))
        .default([])
        .describe('对比项的详细列表')
});

export const components = {
    Comparison: {
        description: '比对：用于 1v1 对比，赛事 pk',
        props: ComparisonProps,
        events: {
            'render-finished': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
