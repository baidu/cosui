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
 * @file outline 组件接口
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface SearchingOutlinesProps {

    /**
     * 大纲标题
     */
    title: SearchingOutlinesTitle;

    /**
     * 大纲列表
     */
    outlines: SearchingOutlinesItemData[];

    /**
     * 大纲外观
     */
    appearance?: 'regular' | 'dashed';
}

export type SearchingOutlinesData = Required<SearchingOutlinesProps>;

export interface SearchingOutlinesEvents {
    click: {
        event: Event;
        title: string;
        index: number;
        subIndex: number;
    };
}

interface SearchingOutlinesTitle {

    /**
    * 大纲图标(icon or image)
    */
    icon?: string;

    /**
     * 大纲图标(emoji)
     */
    emoji: string;

    /**
     * 大纲标题
     */
    text: string;

}

interface SearchingOutlinesItemData {

    /**
     * 使用回搜词拼接的实际回搜信息，包含跳转链接，打点参数等
     */
    linkInfo?: LinkInfo;

    /**
     * 回搜信息
     */
    title: string;

    /**
     * 子列表内容
     */
    outlines?: SearchingOutlinesItemData[];

}

