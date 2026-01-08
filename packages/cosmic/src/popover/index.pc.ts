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
 * @file popover 组件
 */

import {Component} from 'san';
import {PopoverData} from './interface';
import {isInShadow} from '../util';
import {Animations} from '../util/animations';

export default class Popover extends Component<PopoverData> {

    static trimWhitespace = 'all';

    static template = `
        <div
            s-if="open"
            class="cos-popover"
            s-transition="transition"
        >
            <slot />
        </div>
    `;
    transition = Animations.panel;

    closePopupFn: (e: Event) => void;

    initData(): PopoverData {
        return {
            open: false
        };
    }

    attached() {
        this.closePopupFn = this.closePopup.bind(this);
        // 点击页面任意位置，关闭 popover
        document.addEventListener('click', this.closePopupFn);
    }

    detached() {
        document.removeEventListener('click', this.closePopupFn);
    }

    /**
     * 关闭 popover
     */
    closePopup(e: Event) {
        if (!this.data.get('open')) {
            return;
        }
        const root = this.el;
        if (!this.contains(e, root)) {
            this.data.set('open', false);
            this.fire('close');
        }
    }

    /**
     * 目标节点是否被根节点包含
     *
     * @param root 根节点
     * @param n 目标节点
     * @returns 对比结果
     */
    contains(e: Event, root?: Element) {
        let target = e.target;
        // 在 Shadow DOM 中，取出真正的 target
        if (isInShadow(root)) {
            const path = e.composedPath();
            target = path && path[0];
        }
        if (root?.contains && root?.contains((target as unknown) as Node)) {
            return true;
        }

        return false;
    }
}