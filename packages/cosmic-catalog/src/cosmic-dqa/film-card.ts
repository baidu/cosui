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
 * @file FilmCard Catalog，依据 api/cosmic-dqa/film-card/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const ScoreInfoSchema = z.strictObject({
    source: z.string().default('').describe('评分来源，如「豆瓣」；无则只渲染 value'),
    value: z.string().describe('评分值，后端下发完整展示文案（含单位），如「8.6分」')
});

const CreditItemSchema = z.strictObject({
    label: z.string().describe('主创标签（如导演/主演/配音），由后端下发，前端不内置文案'),
    value: z.string().describe('内容，多个值由后端用「、」连接后下发，前端不拼接')
});

const ActionSchema = z.strictObject({
    text: z
        .string()
        .default('')
        .describe(
            '按钮文案，由后端下发。免费与会员两态样式一致，靠文案区分（如「播放」「VIP」「会员播放」）'
        ),
    linkInfo: LinkInfo.default({}).describe('按钮跳转信息，传入 `href` 时按钮渲染为 `a`')
});

export const FilmCardProps = z.strictObject({
    'link-info': LinkInfo.default({}).describe(
        '整卡跳转信息（作品播放页），传入 `href` 时渲染铺满卡片的链接层，组件只做 `s-bind` 透传'
    ),
    thumbnail: z
        .string()
        .default('')
        .describe('竖版封面地址（左图），按 `object-fit: cover` 裁切填满封面区'),
    title: z.string().default('').describe('作品名（Row1）'),
    score: ScoreInfoSchema.optional().describe(
        '评分（Row2），source 与 value 均由后端下发完整文案，前端直接渲染；无 value 则整行不展示'
    ),
    credit: z
        .array(CreditItemSchema)
        .default([])
        .describe(
            '主创列表（Row3），label 与 value 均由后端下发，前端按序渲染；最后一项占用剩余宽度并单行省略'
        ),
    year: z.string().default('').describe('年份（Row4），如「2013年」'),
    categories: z
        .array(z.string())
        .default([])
        .describe('类型（Row4），上限 2 个，由后端截断，两个值共占一格'),
    duration: z
        .string()
        .default('')
        .describe(
            '片长或集数（Row4），完整展示文案，如「86分钟」「全24集」，具体取值由使用方传入'
        ),
    source: z.string().default('').describe('来源（Row5），纯文本，如「爱奇艺」'),
    action: ActionSchema.optional().describe(
        '播放按钮（定位在卡片右下角，Row4、Row5 为其预留两个字的按钮宽度加 9px 的横向安全距离）；无 text 则不展示'
    )
});

export const components = {
    FilmCard: {
        description: '影视信息卡，展示电影、电视剧、综艺等影视实体资源',
        props: FilmCardProps,
        events: {
            'button-click': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
