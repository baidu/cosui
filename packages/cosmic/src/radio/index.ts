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
 * @file
 */

import {Component} from 'san';
import {RadioData, RadioMessages} from './interface';

export default class Radio extends Component<RadioData> {
    static template = `
        <label
            class="cos-radio cos-radio-{{appearance}}{{
                disabled ? ' cos-radio-disabled' : ''}} {{
                checked ? ' cos-radio-checked' : ''
            }}"
            on-click="handleRadioClick">
            <span class="cos-radio-icon">
                <span class="cos-radio-icon-inner"></span>
            </span>
            <span class="cos-radio-label">
                <slot></slot>
            </span>
        </label>
    `;

    initData(): RadioData {
        return {
            appearance: 'tag',
            disabled: false,
            value: '',
            checked: false
        };
    }

    attached() {
        // 向 RadioGroup 派发 radio 已渲染消息
        this.dispatch('cos:radio-attached', null);
    }

    handleRadioClick(event: Event) {
        const checked = this.data.get('checked');
        const disabled = this.data.get('disabled');

        if (!disabled && !checked) {
            this.data.set('checked', true);
            // 向 RadioGroup 派发 radio:checkedChanged 的消息
            this.dispatch<RadioMessages['cos:radio-checked-changed']>('cos:radio-checked-changed', {
                value: this.data.get('value'),
                event
            });
        }
    }
}