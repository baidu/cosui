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
 * @file Select Option
 */

import {Component} from 'san';
import Radio from '@cosui/cosmic/radio';
import Avatar from '@cosui/cosmic/avatar';
import Icon from '@cosui/cosmic/icon';
import Checkbox from '@cosui/cosmic/checkbox';

export default class Option extends Component {
    static template = `
        <div class="cos-select-option cos-select-option-{{appearance}}">
            <template s-if="multiple">
                <cos-avatar
                    s-if="{{option.icon && appearance === 'mark'}}"
                    class="cos-select-option-icon"
                    src="{{option.icon}}"
                    size="xs" />
                <cos-checkbox
                    value="{{option.value}}"
                    checked="{{option.checked}}"
                    appearance="{{appearance}}"
                    disabled="{{option.disabled}}"
                >
                    {{_label | raw}}
                </cos-checkbox>
            </template>
            <template s-else>
                <template s-if="appearance === 'mark'">
                    <cos-avatar
                        s-if="option.icon"
                        class="cos-select-option-icon"
                        src="{{option.icon}}"
                        size="xs" />
                    <div
                        class="cos-select-option-text{{
                            option.checked ? ' cos-color-text-primary cos-font-medium' : ''
                        }}{{
                            option.disabled ? ' cos-color-text-disabled' : ''
                        }}"
                    >
                        {{_label | raw}}
                    </div>
                    <cos-icon s-if="{{option.checked}}" name="check" class="cos-select-option-check" />
                </template>
                <template s-else>
                    <cos-radio
                        appearance="{{appearance}}"
                        checked="{{option.checked}}"
                        disabled="{{option.disabled}}">{{option.label}}</cos-radio>
                </template>
            </template>
        </div>
    `;

    static components = {
        'cos-avatar': Avatar,
        'cos-radio': Radio,
        'cos-icon': Icon,
        'cos-checkbox': Checkbox
    };

    static computed = {
        _label(this: Option) {
            const highlightText = this.data.get('highlightText');
            const option = this.data.get('option');
            let _showLabel = option.label || option.value;

            if (highlightText && !option.disabled) {
                _showLabel = _showLabel.replace(
                    new RegExp(highlightText, 'ig'),
                    '<em class="cos-color-text-primary">$&</em>'
                );
            }
            return _showLabel;
        }
    };

    initData() {
        return {
            multiple: false,
            checked: false,
            appearance: 'mark',
            option: [],
            highlightText: ''
        };
    }
}
