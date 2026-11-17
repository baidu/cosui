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
 * @file hotel-card 组件接口
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';
import type {ScoreProps} from '@cosui/cosmic/score/interface';
import type {PriceProps} from '@cosui/cosmic/price/interface';

export interface HotelCardProps {
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
     * 标签列表
     */
    tags?: TagItem[] | string[];
    /**
     * 评分信息
     */
    score?: number | ScoreProps;
    /**
     * 距离参照物的半径范围信息，如“距离市中心 1.7km”
     */
    distance?: string;
    /**
     * 片区信息，如“xxx 商圈”
     */
    district?: string;
    /**
     * 价格信息
     */
    price?: PriceProps;
    /**
     * 来源
     */
    source?: string;
}

export interface TagItem {

    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签文本颜色，应传具体的颜色样式 css
     */
    color?: string;
    /**
     * 标签背景颜色
     */
    bgColor?: string;
    /**
     * 标签内的 icon 的背景颜色
     */
    iconBgColor?: string;
}

export type HotelCardData = Required<HotelCardProps>;
