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
 * @file Button
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import type {ButtonData, ButtonEvents} from './interface';


export default class Button extends Component<ButtonData> {

    /* eslint-disable max-len */
    static template = `
        <button
            class="cos-button{{
                _active ? ' cos-active' : ''}}{{
                disabled ? ' cos-disabled' : ''}}{{
                size ? ' cos-' + size : ''}}{{
                appearance ? ' cos-button-' + appearance : ''}}"
            on-click="click"
            on-touchstart="onTouchStart"
            on-touchend="setActive(false)"
            on-mousedown="setActive(true)"
            on-mouseup="setActive(false)"
        >
            <div class="cos-button-content">
                <slot></slot>
            </div>
        </button>
    `;
    /* eslint-enable max-len */

    static components = {
        'cos-icon': Icon
    };

    timer: null | ReturnType<typeof setTimeout>;

    initData(): ButtonData {
        return {
            disabled: false,
            size: 'md',
            appearance: 'primary',
            _active: false
        };
    }

    click(event: Event) {
        this.fire<ButtonEvents['click']>('click', {
            event: event,
            disabled: this.data.get('disabled')
        });
    }

    onTouchStart() {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('_active', true);

        // 为了解决 ios 下长按按钮触发系统弹窗后 active 状态无法恢复的问题
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.timer = setTimeout(() => {
            this.data.set('_active', false);
        }, 500);
    }

    setActive(active: boolean) {
        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('_active', active);
    }

    detached() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }
}
