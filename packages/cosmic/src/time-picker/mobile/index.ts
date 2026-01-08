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
 * @file TimePicker 时间选择器
 */

import Drawer from '@cosui/cosmic/drawer';
import TimePickerBase from '../base';
import {TimePickerProps} from '../interface';

export default class TimePicker extends TimePickerBase {
    static trimWhitespace = 'all';
    static template = `
        <div class="cos-time-picker">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-time-picker-entry">
                        <span class="{{_entryText ? 'cos-date-picker-entry-text' : ''}}">
                            <span>{{_entryText || placeholder}}</span>
                        </span>
                        <cos-icon name="calendar" />
                    </div>
                </slot>
            </div>
            <cos-drawer
                class="cos-time-picker-panel"
                open="{{_open}}"
                on-close="closePanel"
            >
                <slot name="header">
                    <div class="cos-date-picker-header"></div>
                </slot>
                <div slot="title">
                    <div
                        class="cos-time-picker-panel-title cos-text-headline-sm cos-space-mt-lg cos-space-mb-lg"
                    >{{ title }}</div>
                </div>
                <div class="cos-time-picker-panel-content">
                    <cos-picker
                        columns="{{_pickerData.columns}}"
                        selected-index="{{_pickerData.selectedIndex}}"
                        on-change="onPickerViewChange"
                    />
                    <div class="cos-time-picker-panel-content-selected"></div>
                </div>
                <slot name="footer">
                    <div class="cos-time-picker-panel-footer">
                        <cos-button on-click="handleConfirm">确定</cos-button>
                    </div>
                </slot>
            </cos-drawer>
        </div>
    `;

    static components = {
        ...TimePickerBase.components,
        'cos-drawer': Drawer
    };

    initData(): TimePickerProps {
        return {
            format: 'HH-mm-ss',
            title: '时间选择器',
            value: undefined,
            range: [],
            placeholder: '请选择时间',
            _format: [],
            _selectedValue: null,
            _timeInfo: {},
            _open: false,
            _entryText: ''
        };
    }
}
