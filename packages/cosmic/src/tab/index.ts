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
import {TabData, TabMessages} from './interface';

export default class Tab extends Component<TabData> {
    static template = `
        <div
            s-if="!disabled"
            class="cos-tab{{
                active ? ' cos-tab-active' : ''
            }}"
            on-click="handleClick"
        >
            <slot></slot>
        </div>
    `;

    /**
     * @description 初始化数据，返回对象包含 disabled 和 active 两个属性
     * @returns {Object} 返回一个对象，包含 disabled 和 active 两个属性
     */
    initData(): TabData {
        return {
            disabled: false,
            active: false
        };
    }

    /**
     * 当组件被初始化时触发
     */
    inited(): void {
        this.dispatch<TabMessages['cos:tab-attached']>('cos:tab-attached', this);
    }

    /**
     * 当组件从 DOM 卸载时触发
     */
    detached(): void {
        this.dispatch<TabMessages['cos:tab-detached']>('cos:tab-detached', this);
    }

    /**
     * @description 处理点击事件，如果未禁用则触发 tab:click 事件
     * @returns {void}
     */
    handleClick(): void {
        if (!this.data.get('disabled')) {
            this.dispatch<TabMessages['cos:tab-click']>('cos:tab-click', this);
        }
    }
}
