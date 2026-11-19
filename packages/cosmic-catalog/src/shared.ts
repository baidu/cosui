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
 * @file Catalog 公共类型定义
 */

import {z} from 'zod';

// LinkInfo 只对外暴露 href（可选）：空对象表示无跳转，与 HTML 链接的必填 href 不同。
// target、data-* 等为宿主侧内部参数，不让模型写，出现即报错。
export const LinkInfo = z.strictObject({
    href: z.string().optional().describe('跳转链接；缺省表示无跳转')
}).describe('链接属性；href 为跳转地址，可为空对象（无跳转）');
const scalar = z.union([z.string(), z.number()]);
const size = z.enum(['xxs', 'xs', 'sm', 'md', 'lg', 'xl']);
const optionalSize = z.union([size, z.literal('')]).optional();
export const Price = z.strictObject({
    format: z.boolean().default(true),
    sign: z.string().default(''),
    range: z.boolean().default(false),
    value: scalar.default(0),
    min: scalar.default(0),
    max: scalar.default(0),
    'origin-value': scalar.default(0),
    'origin-text': scalar.default(0),
    size: z
        .union([
            size,
            z.strictObject({
                sign: optionalSize,
                num: z
                    .union([
                        size,
                        z.strictObject({
                            integer: optionalSize,
                            decimal: optionalSize,
                            quantityUnit: optionalSize
                        })
                    ])
                    .optional(),
                unit: optionalSize,
                originValue: optionalSize,
                originText: optionalSize
            })
        ])
        .default('xs'),
    ellipsis: z.boolean().default(false)
});

// z.json() refers to itself; register metadata on that same instance (describe() would clone it) so the
// recursion resolves to $defs.JsonValue. Reuse this schema instead of calling z.json() again.
export const JsonValue = z.json().register(z.globalRegistry, {
    description: '任意 JSON 值，不含函数、undefined 或原生 DOM 对象'
});
export const RecordValue = z.record(z.string(), JsonValue);
export const Binding = z.string().regex(/^\{\{[\s\S]+\}\}$/);
export const Extensions = z.strictObject({}).describe('基础 Catalog 不开放扩展命名空间');
export const Component = z
    .strictObject({
        id: z.string().min(1),
        type: z.string().min(1),
        if: z.union([z.boolean(), z.string().min(1)]).optional()
            .describe('显示条件：布尔值或 San 表达式字符串'),
        for: z.string().min(1).optional(),
        extensions: Extensions.optional()
    })
    .describe('仅包含公共字段；与各组件的 props、children、events 组合后校验');
export const PropsCommon = z
    .strictObject({
        class: z.string().optional().describe('HTML 原生 class，作用于组件根节点'),
        style: z
            .union([z.string(), z.record(z.string(), z.union([z.string(), z.number()]))])
            .optional()
            .describe('HTML 原生 style，支持字符串或样式对象（对象键用 CSS 短横线命名如 font-size）；作用于组件根节点')
    })
    .describe('所有组件 props 通用的属性，各组件无需重复声明');
