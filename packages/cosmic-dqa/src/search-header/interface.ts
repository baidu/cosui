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

export interface SearchHeaderProps {
    /**
     * 品牌logo
     */
    logo?: string;

    /**
     * 品牌夜间logo
     */
    logoDark?: string;

    /**
     * 联名品牌logo
     */
    brandLogo?: string;

    /**
     * 联名品牌夜间logo
     */
    brandLogoDark?: string;

    /**
     * 概述总结
     */
    overview?: string;

    /**
     * 溯源数量
     */
    citationCount?: number;

    /**
     * 搜索内容主观性
     */
    subjective?: boolean;

    /**
     * 多个logo中间的间隔符样式
     */
    appearance?: 'primary' | 'enhance' | 'secondary';

    /**
     * 溯源文案后展开指示
     */
    expanded: boolean | undefined;
}

export type SearchHeaderData = Required<SearchHeaderProps>;

export interface SearchHeaderEvents {
    'citation-click': {
        event: Event;
        expanded?: boolean;
    };
    'overview-click': {
        event: Event;
    };
}