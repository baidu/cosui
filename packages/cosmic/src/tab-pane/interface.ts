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

import type TabPane from './index'; // 新增类型导入

export interface TabPaneMessages {
    'cos:tab-pane-attached': {target: TabPane};
    'cos:tab-pane-detached': {target: TabPane};
}

export interface TabPaneProps {
    /**
     * 当前tab-pane是否激活
     * @default false
     */
    active?: boolean;
}

export type TabPaneData = Required<TabPaneProps>;
