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
 * @file DatePicker-input 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Input from '@cosui/cosmic/input';

export default class DatePickerInput extends Component {
    static template = `
        <div
            class="cos-date-picker-input{{
                active ? ' cos-date-picker-input-active' : ''}}{{
                disabled ? ' cos-date-picker-input-disabled' : ''}}"
            on-click="handleInputClick"
        >
            <cos-input
                size="md"
                value="{{value}}"
                placeholder="{{placeholder}}"
                disabled="{{disabled}}"
                on-input="handleInputChange"
            ></cos-input>
            <span
                class="cos-date-picker-input-icon cos-space-mr-3xs{{allowActions.prev ?
                    '' : ' cos-date-picker-input-icon-disabled'}}"
                on-click="handleClickAction($event, 'prev')"
            >
                <cos-icon name="left"></cos-icon>
            </span>
            <span
                class="cos-date-picker-input-icon{{allowActions.next ? '' : ' cos-date-picker-input-icon-disabled'}}"
                on-click="handleClickAction($event, 'next')"
            >
                <cos-icon name="right"></cos-icon>
            </span>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-input': Input
    };

    initData() {
        return {
            value: '',
            placeholder: '请选择日期',
            disabled: false,
            active: false,
            allowActions: {prev: true, next: true}
        };
    }

    handleInputChange(data) {
        this.fire('input', data);
    }

    handleInputClick() {
        if (this.data.get('disabled')) {
            return;
        }
        this.fire('click');
    }

    handleClickAction(event: Event, action: 'next' | 'prev') {
        event?.stopPropagation();
        if (this.data.get('disabled')) {
            return;
        }
        if ((action === 'prev' && this.data.get('allowActions').prev)
            || (action === 'next' && this.data.get('allowActions').next)) {
            this.fire('click-action', action);
        }
    }
}