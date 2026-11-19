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
 * @file Swiper Catalog，依据 api/cosmic/swiper/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

export const SwiperProps = z.strictObject({
    arrow: z.enum(['sides', 'bottom']).default('sides').describe('箭头位置；仅支持 PC'),
    autoplay: z
        .union([z.boolean(), z.literal('visible')])
        .default(false)
        .describe("是否自动切换，为 'visible' 时，元素出现在视口内自动播放"),
    interval: z.number().default(3000).describe('自动切换的时间间隔，单位为毫秒'),
    loop: z.boolean().default(false).describe('是否循环展示'),
    indicator: z
        .enum(['', 'left', 'center', 'right', 'outer', 'number'])
        .optional()
        .describe('指示器位置与类型，为空表示不展示指示器；number 仅支持 PC'),
    'active-index': z.number().default(0).describe('当前活动的位置'),
    'space-between': z.number().default(9).describe('内容之间间距'),
    scrollbar: z.boolean().default(false).describe('是否带有横向滚动条；仅支持 Mobile'),
    'overscroll-url': z.string().optional().describe('查看更多跳转链接；仅支持 Mobile'),
    'overscroll-link-info': LinkInfo.optional().describe('查看更多跳转链接属性集；仅支持 Mobile'),
    'overscroll-text': z.string().default('左滑更多').describe('查看更多文案；仅支持 Mobile'),
    'overscroll-move-text': z.string().default('松手查看').describe('查看更多文案；仅支持 Mobile'),
    'snap-align': z
        .union([z.literal('none'), z.literal('start'), z.literal('center'), z.literal('end')])
        .default('none')
        .describe('滚动结束时子元素的吸附位置：none 不吸附，start 开始，center 中心，end 结束'),
    'snap-stop': z
        .union([z.literal('normal'), z.literal('always')])
        .default('normal')
        .describe('滚动时是否强制停在每个吸附位置：normal 否，always 是'),
    'scroll-behavior': z
        .union([z.literal('auto'), z.literal('smooth')])
        .default('smooth')
        .describe('滚动行为：smooth 平滑滚动，auto 立即滚动'),
    'align-type': z
        .union([z.literal('left'), z.literal('center')])
        .default('left')
        .describe('手动点击锚定到某一项时对齐方式'),
    'auto-height': z.boolean().default(false).describe('是否高度自适应。建议在翻页场景使用'),
    scrollable: z.boolean().default(false).describe('是否开启横向滚动；仅支持 PC')
});

export const SwiperItemProps = z.strictObject({
    width: z.string().default('auto').describe('内容宽度')
});

export const components = {
    Swiper: {
        description:
            '翻页：翻页主要运用在一屏内展示多屏内容的场景需求，通过横滑的交互方式将纵向隐藏的内容展示出来',
        props: SwiperProps,
        children: ['SwiperItem'],
        events: {
            change: z.strictObject({index: z.number(), prevIndex: z.number(), autoplay: z.boolean()}),
            scrollend: z.strictObject({index: z.number(), prevIndex: z.number()}),
            scroll: z.unknown()
        }
    },
    SwiperItem: {
        description: '',
        props: SwiperItemProps,
        children: true
    }
} satisfies CatalogDefinition['components'];
