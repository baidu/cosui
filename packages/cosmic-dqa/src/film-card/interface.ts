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
 * @file film-card 组件接口
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface ScoreInfo {
    /**
     * 评分来源，如「豆瓣」
     */
    source?: string;

    /**
     * 评分文案，含单位，如「8.6分」
     */
    value: string;
}

export interface CreditItem {
    /**
     * 主创标签，如「导演」「主演」
     */
    label: string;

    /**
     * 主创内容，多个值用「、」连接
     */
    value: string;
}

export interface Action {
    /**
     * 按钮文案，如「播放」「VIP」
     */
    text: string;

    /**
     * 按钮跳转信息。cosmic-agent-ui 接入层不传，跳转走 getLinkApis
     */
    linkInfo?: LinkInfo;
}

export interface FilmCardProps {
    /**
     * 整卡跳转信息。不得与根元素的 native:click 跳转同时使用，否则会跳转两次
     */
    linkInfo: LinkInfo;

    /**
     * 竖版封面地址
     */
    thumbnail: string;

    /**
     * 作品名
     */
    title: string;

    /**
     * 评分
     */
    score?: ScoreInfo;

    /**
     * 主创列表
     */
    credit?: CreditItem[];

    /**
     * 年份，如「2013年」
     */
    year?: string;

    /**
     * 类型，最多 2 个
     */
    categories?: string[];

    /**
     * 片长或集数，如「86分钟」「全24集」
     */
    duration?: string;

    /**
     * 来源，如「爱奇艺」
     */
    source?: string;

    /**
     * 播放按钮，无 text 则不展示
     */
    action?: Action;
}

export type FilmCardData = Required<FilmCardProps>;

export interface FilmCardEvents {
    /** 播放按钮点击 */
    'button-click': {
        event: Event;
    };
}
