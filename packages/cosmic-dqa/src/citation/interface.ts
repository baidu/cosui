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

export interface Source {
    name: string;
    logo?: string;
    /**
     * 可信溯源兜底图标
     */
    icon?: string;
    /**
     * 可信溯源站点类型
     */
    type?: string;

    /**
     * 可信溯源标签
     * 文本或带颜色的标签配置
     * @mock '官网' | {text: '官网', color: '--cos-tan-2', bgColor: '--cos-tan--5'}
     */
    tag?: string | Partial<{
        /**
         * 标签文案
         */
        text: string;
        /**
         * 标签文字颜色
         */
        color: string;
        /**
         * 标签背景色
         */
        bgColor: string;
    }>;
}
export interface CitationProps {
    appearance?: '' | 'link' | 'tag';
    citationId: string;
    title: string;
    source?: Source;
    abstract?: string;
    isVideo?: boolean;
    disabled?: boolean;
    thumbnail?: string;
    hidden?: boolean;
    getPopupContainer?: () => HTMLElement;
    linkInfo?: LinkInfo;
    tooltipPanelClickable?: boolean;
}

export interface CitationEvents {
    toggle: {
        open: boolean;
    };
    click: {
        event: Event;
        from: string;
    };
}

export interface CitationMethods {
    hideTooltip: () => void;
}

export type CitationData = Required<CitationProps>;