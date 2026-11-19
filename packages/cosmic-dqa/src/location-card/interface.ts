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
import type {ScoreProps} from '@cosui/cosmic/score/interface';
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
    score?: number | ScoreProps;
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
     * 推荐游玩时长
     */
    recommendedDuration?: string;
    /**
     * 营业时间，如“08:00-12:00,13:00-17:00”
     */
    openingHours?: string;
    /**
     * 地点说明
     */
    caption?: string;
    /**
     * 卡片外观
     */
    appearance?: 'card' | 'filled';
    /**
     * 标签列表
     */
    tags?: TagItem[] | string[];
    /**
     * 来源，如“携程旅行”
     */
    source?: string;
}

export interface TagItem {

    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签图标
     */
    icon?: string;
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

export type LocationCardData = Required<LocationCardProps>;
