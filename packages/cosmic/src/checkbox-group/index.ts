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
 * @file checkbox group
 */

import {Component} from 'san';
import type Checkbox from '@cosui/cosmic/checkbox';
import type {CheckboxGroupData, CheckboxMessage, CheckboxEvents} from './interface';

export default class CheckboxGroup extends Component<CheckboxGroupData> {

    static template = `
        <div class="cos-checkbox-group">
            <slot></slot>
        </div>
    `;

    static messages = {
        'cos:checkbox-attached'(this: CheckboxGroup, event: {value: CheckboxMessage, target: Checkbox}) {
            this.checkboxChildList.push(event.target);
        },

        'cos:checkbox-checked-changed'(this: CheckboxGroup, event: {value: CheckboxMessage}) {
            const {checked, value} = event.value;
            const index = this.data.get('value').indexOf(value);
            if (checked && index === -1) {
                this.data.push('value', value);
            }
            else {
                this.data.removeAt('value', index);
            }
            this.fire<CheckboxEvents['change']>('change', this.data.get('value'));
        }
    };

    private checkboxChildList: Checkbox[];

    initData(): CheckboxGroupData {
        return {
            disabled: false,
            value: []
        };
    }

    inited(): void {
        this.checkboxChildList = [];
    }

    created(): void {
        this.data.set('value', this.data.get('value'));
    }

    attached(): void {
        this.updateChildCheckbox();
    }

    updated(): void {
        this.updateChildCheckbox();
    }

    updateChildCheckbox(): void {
        const currentValue = this.data.get('value');
        this.checkboxChildList?.forEach(checkboxItem => {
            checkboxItem.data.set('checked', currentValue?.indexOf(checkboxItem.data.get('value')) !== -1);
            checkboxItem.data.set('disabled', checkboxItem.data.get('disabled') || this.data.get('disabled'));
        });
    }

    disposed() {
        this.checkboxChildList = [];
    }
}
