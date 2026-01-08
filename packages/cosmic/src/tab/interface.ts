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

import Tab from './index';

export interface TabProps {
    /**
     * 是否激活状态
     */
    active?: boolean;
    /**
     * 是否禁用状态
     */
    disabled?: boolean;
}

export interface TabMessages {
    /**
     * tab挂载事件
     */
    'cos:tab-attached': Tab;
    /**
     * tab卸载事件
     */
    'cos:tab-detached': Tab;
    /**
     * tab点击事件
     */
    'cos:tab-click': Tab;
}

export type TabData = Required<TabProps>;
