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
 * @file TransportTicket Catalog，依据 api/cosmic-dqa/transport-ticket/doc/api.md
 */

import {z} from 'zod';
import type {CatalogDefinition} from '@cosui/cosmic-dynamic-ui';
import {LinkInfo} from '../shared';

const SeatSchema: z.ZodType = z.strictObject({
    type: z.string().describe('座位等次'),
    remaining: z.string().describe('剩余车票')
});

const SegmentSchema: z.ZodType = z.strictObject({
    number: z.string().describe('班次号，如 "MF4714"、"G419"'),
    operator: z.string().optional().describe('运营商，如 "厦门航空"'),
    seats: z
        .array(z.lazy(() => SeatSchema))
        .optional()
        .describe('可选座位')
});

const TransferSchema: z.ZodType = z.strictObject({
    station: z.string().describe('中转站'),
    waitTime: z.string().describe('换乘等待时间，如 "换乘3小时23分"'),
    segments: z.array(z.lazy(() => SegmentSchema)).describe('中转车次/航次数组')
});

export const TransportTicketProps = z.strictObject({
    type: z
        .enum(['train', 'flight'])
        .default('train')
        .describe('车票类型：train 火车票，flight 机票'),
    from: z.string().default('').describe('行程起点'),
    to: z.string().default('').describe('行程终点'),
    departTime: z.string().default('').describe('出发时间'),
    arriveTime: z.string().default('').describe('结束时间'),
    duration: z.string().default('').describe('行程总时间'),
    price: z.number().default(0).describe('价格'),
    operator: z.string().default('').describe('运营商，如 "厦门航空"'),
    number: z.string().default('').describe('班次号，如 "MF4714"、"G419"'),
    level: z.string().default('').describe('舱位等级'),
    discount: z.string().default('').describe('舱位折扣，比如 "4.9折"'),
    model: z.string().default('').describe('机型，比如 "波音737(中)"'),
    seats: z
        .array(z.lazy(() => SeatSchema))
        .default([])
        .describe('可选座位'),
    linkInfo: LinkInfo.optional().describe('跳转链接'),
    service: z.string().optional().describe('服务平台'),
    transfer: z
        .lazy(() => TransferSchema)
        .optional()
        .describe('中转信息'),
    crossDays: z.number().default(0).describe('行程跨越天数')
});

export const components = {
    TransportTicket: {
        description: '三票组件：用于展示机票、火车票、公交车票信息',
        props: TransportTicketProps
    }
} satisfies CatalogDefinition['components'];
