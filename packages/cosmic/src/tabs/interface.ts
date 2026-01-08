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

export interface TabsEvents {
    /**
     * tab切换事件
     * @param index - 当前激活的tab索引
     */
    change: {index: number};
}

export interface TabsProps {
    activeIndex: number;
    appearance?: 'bar' | 'pill' | 'pill-filled' | 'line' | 'card' | 'outline';
    arrow?: boolean | 'right';
    _showLeftArrowAndMargin: boolean;
    _showRightArrowAndMargin: boolean;
}

export interface TabsMethods {
    updatedWidth?(): void;
};

export type TabsData = Required<TabsProps>;