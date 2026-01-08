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
 * @file location-list 组件接口
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface LocationCardProps {
    /**
     * 跳转信息
     */
    linkInfo: LinkInfo;
    /**
     * 缩略图地址
     */
    thumbnail: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 评分
     */
    score?: number;
    /**
     * 地址
     */
    address?: string;
    /**
     * 品类，如“美食”
     */
    category?: string;
    /**
     * 人均消费
     */
    averageCost?: string;
    /**
     * 营业时间，如“08:00-12:00,13:00-17:00”
     */
    openingHours?: string;
    /**
     * 标签列表
     */
    tags?: TagItem[] | string[];
}

interface TagItem {

    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签颜色，目前仅支持蓝色和灰色，默认为灰色
     */
    color?: string;
}

export type LocationCardData = Required<LocationCardProps>;