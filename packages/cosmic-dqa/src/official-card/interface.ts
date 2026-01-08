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

interface Setting {
    text: string;
    linkInfo?: LinkInfo;
}

export interface OfficialCardProps {
    /**
     * 官网卡片展现形态
     */
    appearance?: 'centered' | '';

    poster: {
        src: string | string[];
        gradient?: string;
        bgColor?: string;
    };

    /**
     * 标题
     */
    title: string;

    /**
     * APP或官网的logo
     */
    logo?: string;

    /**
     * 整个区域跳转链接
     */
    linkInfo?: LinkInfo | null;

    /**
     * 标签信息
     */
    tag?: string | string[];

    /**
     * 展示的链接信息
     */
    website?: string;

    /**
     * 评分
     */
    score?: string;

    /**
     * 第二行展示的介绍文本
     */
    introduction?: string;

    /**
     * 第三行展示的介绍文本
     */
    caption?: string;

    /**
     * 按钮下方展示的信息
     */
    settings?: Setting[];

    /**
     * 按钮文字
     */
    actionText?: string;

    /**
     * 配置按钮行为的对象
     */
    actionLinkInfo?: string | null;
}

export interface OfficialCardCenterProps {
    poster: {
        src: string | string[];
        gradient?: string;
        bgColor?: string;
    };
    tag?: string | string[];
    logo?: string;
    title: string;
    introduction?: string;
}

export type OfficialCardData = Required<OfficialCardProps>;

export type OfficialCardCenterData = Required<OfficialCardCenterProps>;

export interface OfficialCardEvents {
    'button-click': {
        event: Event;
    };
}