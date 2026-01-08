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
 *
 * @file MoreLink 组件 Interface
 */

import type {LinkInfo} from '../util/interface';

export type Appearance = 'subtle' | 'filled' | 'plain' |'line';

export interface MoreLinkProps {
    /**
     * 强弱样式风格
     *
     * @default subtle
     * @platform PC/Mobile
     */
    appearance?: Appearance;
    /**
     * 跳转链接地址
     *
     * @default ''
     * @platform PC/Mobile
     */
    url: string;
    /**
     * 跳转打开方式
     *
     * @default ''
     * @platform PC/Mobile
     */
    target?: string;

    /**
     * 挂载在a标签上的属性集，可根据业务使用场景自行定义
     *
     * @default {}
     * @platform PC/Mobile
     */
    linkInfo?: LinkInfo;
}

export type MoreLinkData = Required<MoreLinkProps>;