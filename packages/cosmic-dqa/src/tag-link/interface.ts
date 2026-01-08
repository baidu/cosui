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
 * @file tag-link
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface TagLinkProps {

    /**
     * logo 地址（优先级高于 icon）
     */
    logo?: string;

    /**
     * iconFont 名称
     */
    icon?: string;

    /**
     * 行为词（与 text 至少存在一个）
     */
    label?: string;

    /**
     * 引导词（与 label 至少存在一个）
     */
    text?: string;

    /**
     * 链接信息
     */
    linkInfo?: LinkInfo;
}

export type TagLinkData = Required<TagLinkProps>;

export interface TagLinkEvents {
    click: Event;
}