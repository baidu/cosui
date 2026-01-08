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
import Icon from '@cosui/cosmic/icon';
import Checkbox from '@cosui/cosmic/checkbox';

export default class CascaderOption extends Component {
    static template = `
        <div
            s-if="option"
            class="cos-cascader-option cos-cascader-option-mark{{
                hideOperation ? ' cos-cascader-option-hide' : ''
            }}{{
                option.checked ? ' cos-cascader-option-checked' : ''
            }}{{
                option.preChecked ? ' cos-cascader-option-pre' : ''
            }}{{
                option.disabled ? ' cos-cascader-option-disabled' : ''
            }}{{
                option.allChecked ? ' cos-cascader-option-allChecked' : ''
            }}"
            on-click="capture:handleSelect"
        >
            <div s-if="multiple" class="cos-cascader-option-multi">
                <div
                    class="cos-cascader-option-text"
                >
                    {{_label | raw}}
                </div>
                <cos-checkbox
                    value="{{option.value}}"
                    checked="{{_checked}}"
                    indeterminate="{{_indeterminate}}"
                    on-click="native:capture:handleMultiSelectAllClicked"
                    on-change="handleMultiSelectAllChanged"
                    disabled="{{option.disabled}}"
                    appearance="mark"
                >
                </cos-checkbox>
            </div>
            <div
                s-else
                class="cos-cascader-option-text"
            >
                {{_label | raw}}
            </div>
            <div
                s-if="option.checked && option.options && direction === 'vertical'"
                class="cos-cascader-option-line"
            ></div>
            <div
                s-if="showCircle"
                class="cos-cascader-option-circle"
            ></div>
            <cos-icon
                s-if="showCheck"
                name="check"
                class="cos-cascader-option-check"
            />
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-checkbox': Checkbox
    };

    static computed = {
        _label(this: CascaderOption) {
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
        },
        _checked(this: CascaderOption) {
            const option = this.data.get('option');
            return option.options && option.options.length > 0
                ? option.allChecked
                : option.checked;
        },
        _indeterminate(this: CascaderOption) {
            const option = this.data.get('option');
            return option.options && option.options.length > 0
                    && option.preChecked && !option.allChecked;
        }
    };

    initData() {
        return {
            option: {},
            multiple: false,
            direction: 'vertical',
            highlightText: '',
            showCircle: false,
            showCheck: false,
            hideOperation: false
        };
    }

    handleSelect(event: Event) {
        this.fire('select', event);
    }
    handleMultiSelectAllClicked(event: Event) {
        this.fire('select-all-click', event);
    }
    handleMultiSelectAllChanged(event: Event) {
        this.fire('select-all-changed', event);
    }
}