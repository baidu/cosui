/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file tag-link
 */

export interface GeneratingViewProps {
    /**
     * icon 地址
     */
    icon?: string;

    /**
     * 标题
     */
    title?: string;

    /**
     * 说明文本
     */
    caption?: string;

    /**
     * 卡片样式的底部主题
     */
    gradient?: string;

    /**
     * 外观样式
     * @default 'filled'
     */
    appearance?: 'filled' | 'card';
}

export type GeneratingViewData = Required<GeneratingViewProps>;
