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
import {checkboxContainerIcon, checkboxCheckedIcon, checkboxIndeterminateIcon} from './svg';
import {CheckboxData, CheckboxEvents, CheckboxDataMessages} from './interface';

export default class Checkbox extends Component<CheckboxData> {
    static template = `
        <label
            class="cos-checkbox cos-checkbox-{{appearance}}{{
                checked ? ' cos-checkbox-checked' : '' }}{{
                disabled ? ' cos-checkbox-disabled' : '' }}{{
                indeterminate ? ' cos-checkbox-indeterminate' : ''}}"
            disabled="{{disabled}}"
            checked="{{checked}}"
            indeterminate="{{indeterminate}}"
            value="{{value}}"
            on-click="handleClick"
        >
            <span class="cos-checkbox-icon">
                <template s-if="appearance === 'mark'">
                    <template s-if="indeterminate">
                        ${checkboxIndeterminateIcon}
                    </template>
                    <template s-else>
                        <template s-if="!checked">
                            ${checkboxContainerIcon}
                        </template>
                        <template s-else>
                            ${checkboxCheckedIcon}
                        </template>
                    </template>
                </template>
            </span>
            <span class="cos-checkbox-label">
                <slot></slot>
            </span>
        </label>
    `;


    initData(): CheckboxData {
        return {
            appearance: 'tag',
            disabled: false,
            value: '',
            checked: false,
            indeterminate: false
        };
    }

    attached(): void {
        this.dispatch('cos:checkbox-attached', {
            checked: this.data.get('checked'),
            value: this.data.get('value')
        });
    }

    handleClick(event: Event): void {
        if (this.data.get('disabled')) {
            return;
        }

        const currentChecked = !this.data.get('checked');
        const currentValue = this.data.get('value');

        this.fire<CheckboxEvents['change']>('change', {
            checked: currentChecked,
            event
        });
        this.data.set('checked', currentChecked);
        // 通知 group，checkbox 发生了变化
        this.dispatch<CheckboxDataMessages['cos:checkbox-checked-changed']>('cos:checkbox-checked-changed', {
            checked: currentChecked,
            value: currentValue
        });
    }
}