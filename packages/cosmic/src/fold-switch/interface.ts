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
 * @file FoldSwitch 组件 Interface
 */

export interface FoldSwitchProps {

    /**
     * 是否处于折叠状态
     *
     * @default true
     * @platform PC/Mobile
     */
    folded?: boolean;

    /**
     * 展开文本
     *
     * @default '展开'
     * @platform PC/Mobile
     */
    unfoldText?: string;

    /**
     * 收起文本
     *
     * @default '收起'
     * @platform PC/Mobile
     */
    foldText?: string;

    /**
     * 是否展示渐变背景遮罩
     *
     * @default false
     * @platform PC/Mobile
     */
    mask?: boolean;
}

export interface FoldSwitchEvents {
    toggle: {
        status: 'folded' | 'unfolded';
        event: Event;
    };
}

export type FoldSwitchData = Required<FoldSwitchProps>;