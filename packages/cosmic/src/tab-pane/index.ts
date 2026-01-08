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

import {Component} from 'san';
import {TabPaneData, TabPaneMessages} from './interface';

export default class TabPane extends Component<TabPaneData> {
    static template = `
        <div
            s-if="active"
            class="cos-tab-pane"
        >
            <slot></slot>
        </div>
    `;

    /**
     * @description 初始化数据，返回一个包含 active 属性为 false 的 TabPaneProps 对象
     * @returns {TabPaneData} 返回一个 TabPaneProps 对象，其中 active 属性为 false
     */
    initData(): TabPaneData {
        return {
            active: false
        };
    }

    /**
     * 当组件被初始化时触发
     */
    inited(): void {
        this.dispatch<TabPaneMessages['cos:tab-pane-attached']>('cos:tab-pane-attached', {target: this});
    }

    /**
     * 当组件从 DOM 卸载时触发
     */
    detached(): void {
        this.dispatch<TabPaneMessages['cos:tab-pane-detached']>('cos:tab-pane-detached', {target: this});
    }
}
