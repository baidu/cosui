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

export interface TitleProps {
    /**
     * 标题大小
     */
    size?: 'md' | 'lg' | 'xs' | 'sm';

    /**
     * 标题链接
     */
    url?: string;

    /**
     * icon 组件的 name 或 自定义 icon 的 url
     */
    icon?: string;

    /**
     * tag 组件的文本内容
     */
    tag?: string;

    /**
     * 跳转链接日志属性
     *
     * @default {}
     * @platform PC/Mobile
     */
    linkInfo?: LinkInfo;
};
export type TitleData = Required<TitleProps>;