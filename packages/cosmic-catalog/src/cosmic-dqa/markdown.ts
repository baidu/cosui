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
 * @file Markdown Catalog，依据 api/cosmic-dqa/markdown/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {JsonValue} from '../shared';

const TypingSchema: z.ZodType = z.strictObject({
    speed: z.number().default(30).describe('打字速度'),
    cursor: z.boolean().default(false).describe('是否展示光标'),
    mode: z
        .union([z.literal('word'), z.literal('all'), z.literal('sentence')])
        .default('sentence')
        .describe('逐字打印/逐包打印/逐句打印'),
    hideMask: z.boolean().default(false).describe("mode === 'all' 的时候生效")
});

export const MarkdownProps = z.strictObject({
    content: z.string().default('').describe('Markdown 语法文本'),
    config: z
        .record(z.string(), JsonValue)
        .nullable()
        .default(null)
        .describe('自定义指令对应的配置项'),
    table: z
        .strictObject({
            copy: z.boolean().optional(),
            fullscreen: z.boolean().optional(),
            download: z.boolean().optional()
        })
        .nullable()
        .default(null)
        .describe('表格表头的配置项'),
    code: z
        .strictObject({
            fullscreen: z.boolean().optional(),
            lineNumbers: z.boolean().optional(),
            foldable: z.boolean().optional(),
            scrollable: z.boolean().optional()
        })
        .nullable()
        .default(null)
        .describe(
            '代码块全局配置项。lineNumbers：是否显示行号，默认 true；foldable：超过展示高度显示展开/收起，默认 false；'
                + 'scrollable：固定容器滚动展示，默认 false。单个代码块可用语法配置 覆盖，见code示例'
        ),
    diagram: z
        .union([
            z.strictObject({
                mode: z.boolean().optional().describe('图 / 源码 切换按钮'),
                copy: z.boolean().optional().describe('复制按钮'),
                download: z.boolean().optional().describe('下载按钮'),
                fullscreen: z.boolean().optional().describe('全屏按钮'),
                landscape: z.boolean().optional().describe('横竖屏切换按钮（移动端）'),
                'zoom-in': z.boolean().optional().describe('放大按钮'),
                'zoom-out': z.boolean().optional().describe('缩小按钮'),
                reset: z.boolean().optional().describe('复位 / 自适应按钮')
            }),
            z.boolean()
        ])
        .nullable()
        .optional()
        .describe(
            '图表渲染配置。传入配置对象即开启（命中 mermaid / markmap / mindmap 代码块，或中文别名 流程图 / 时序图 / '
                + '甘特图 / 思维导图 代码块时渲染为可交互图表）；不传 / null / false 则关闭，初始视图固定为图表'
        ),
    typing: z
        .lazy(() => TypingSchema)
        .nullable()
        .default(null)
        .describe('是否展示打字机效果'),
    autolink: z.boolean().optional().describe('是否将文本中的链接文本渲染为可跳转的链接')
});

export const components = {
    Markdown: {
        description:
            'Markdown 渲染组件，支持打字机效果、表格、代码块、图表，'
            + '以及溯源、音视频、回搜等自定义指令',
        props: MarkdownProps,
        events: {
            'poi-ready': z.strictObject({
                invokeParams: z.strictObject({
                    params: z.union([
                        z.strictObject({show_type: z.string(), uid: z.string(), src: z.string()}),
                        z.strictObject({
                            origin: z.string(),
                            destination: z.string(),
                            coord_type: z.literal('bd09mc'),
                            src: z.string(),
                            navInit: z.literal('yes')
                        })
                    ]),
                    posName: z.string(),
                    defaultUrl: z.string()
                })
            }),
            click: z.strictObject({
                directive: z.string(),
                from: z.union([
                    z.literal('link'),
                    z.literal('table'),
                    z.literal('code'),
                    z.literal('img'),
                    z.literal('diagram')
                ]),
                action: z.enum([
                    'pause',
                    'play',
                    'muted',
                    'volume',
                    'seeked',
                    'preview',
                    'copy',
                    'fullscreen',
                    'download',
                    'fold',
                    'unfold',
                    'mode-change',
                    'landscape',
                    'zoom',
                    'reset'
                ]),
                data: JsonValue
            }),
            toggle: z.strictObject({status: z.union([z.literal('folded'), z.literal('unfoled')])}),
            'typing-start': z.strictObject({height: z.number()}),
            show: z.strictObject({
                directive: z.string().describe('音视频指令名'),
                target: z.unknown().describe('音视频组件实例')
            }),
            'typing-finished': z.unknown(),
            'render-complete': z.unknown()
        }
    }
} satisfies CatalogDefinition['components'];
