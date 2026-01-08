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
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

interface TransportTicketProps {
    /**
     * 车票类型
     */
    type: 'train' | 'flight';

    /**
     * 行程起点
     */
    from: string;

    /**
     * 行程终点
     */
    to: string;

    /**
     * 出发时间
     */
    departTime: string;

    /**
     * 到达时间
     */
    arriveTime: string;

    /**
     * 行程总时间
     */
    duration?: string;

    /**
     * 价格
     */
    price: number;

    /**
     * 运营商，如 "厦门航空“
     */
    operator?: string;

    /**
     * 班次号，如 "MF4714"、"G419"
     */
    number?: string;

    /**
     * 舱位等级
     */
    level?: string;

    /**
     * 折扣，比如 "4.9折"
     */
    discount?: string;

    /**
     * 机型，比如 "波音737(中)"
     */
    model?: string;

    /**
     * 可选座位
     */
    seats?: Seat[];
    /**
     * 整个区域跳转链接
     */
    linkInfo?: LinkInfo | null;
}

interface Seat {
    /**
     * 座位等次
     */
    type: string;

    /**
     * 剩余车票
     */
    remaining: string;
}

export type TransportTicketData = Required<TransportTicketProps>;