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
 * @file site-vcard/interface.ts
 * @description Site VCard Interface
 */

import type {ButtonEvents} from '@cosui/cosmic/button/interface';
import type {LinkInfo} from '@cosui/cosmic/util/interface';
import type {TagProps} from '@cosui/cosmic/tag/interface';

export interface TagItem {
    /**
     * 仅对 text 有效，filled 为填充性型，outline 为边框型
     */
    appearance?: TagProps['appearance'];
    /**
     * 标签文本，text image 必须二选一
     */
    text?: string;
    /**
     * 标签图片，text image 必须二选一
     */
    image?: string;

    /**
     * 文本标签颜色，默认为 '#4e6ef2'
     */
    color?: string;
}

interface ComponentData {

    // 按钮点击
    handleBtnClick?: () => void;
}

interface Action {
    /**
     * 按钮文案
     */
    text?: string;

    /**
     * 按钮跳转信息
     */
    linkInfo?: LinkInfo;

    /**
     * 按钮需要添加的 class
     */
    class?: string;
}

interface Shortcut {
    /**
     * 资源头像
     */
    logo?: string;

    /**
     * 资源名字
     */
    name?: string;

    /**
     * 资源说明文本
     */
    caption?: string;

    /**
     * 资源跳转链接
     */
    linkInfo?: LinkInfo;
}

export interface SiteVcardProps extends ComponentData {

    // 原始跳转链接
    url?: string;

    // 跳转信息
    linkInfo: LinkInfo;

    // 头像 logo
    logo: string;

    // 标题
    title: string;

    // 说明文本
    caption: string;

    // 操作按钮文本
    actionText?: string;

    // 标签列表。当 tags 是 string 时， 为 http://xxx 则展示为图片，为其他则等于单个 filled 类型的 tag
    tags?: Array<TagItem | string>;

    // 访问次数
    visits?: string;

    // 组件外观
    appearance?: 'filled' | 'card' | 'bar';

    // 是否增加 Ai Agent logo 角标
    isAgent?: boolean;

    // 在下方展示的 Agent 引导语，默认展示2行截断，仅整卡外观生效
    introduction?: string | Introduction;

    // 评分
    score?: string | number;

    // 按钮信息
    action: Action;

    // 缩略图
    thumbnail?: string;

    // 资源区
    shortcut?: Shortcut;

    // 说明文本文本后的文字标签
    badgeText?: string;

    // 判断introduction是否被截，确认双引号添加位置是在文本或省略号后
    _introductionTruncation?: boolean;
}

export type SiteVcardData = Required<SiteVcardProps>;

export interface SiteVcardEvents {
    buttonClick: ButtonEvents;
};

export interface Introduction {
    value?: string;
    position?: 'top' | 'bottom';
};