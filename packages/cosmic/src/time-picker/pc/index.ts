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
 * @file DatePicker 组件
 */

import Popover from '@cosui/cosmic/popover';
import TimePickerBase from '../base';
import {RollingDate} from '../../util/date-time';
import type {TimePickerProps} from '../interface';
import TimePickerPanel from '../../common/time-picker-panel';

export default class TimePicker extends TimePickerBase {
    static template = `
        <div class="cos-time-picker">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-time-picker-entry">
                        <span class="{{_entryText ? 'cos-date-picker-entry-text' : ''}}">
                            {{_entryText || placeholder }}
                        </span>
                        <cos-icon name="calendar" />
                    </div>
                </slot>
            </div>
            <cos-popover
                class="cos-time-picker-panel"
                open="{=_open=}"
                title="{{title}}"
                on-close="closePanel"
            >
                <cos-time-picker-panel
                    pickerData="{{_pickerData}}"
                    format="{{_format}}"
                    timeInfo="{{_timeInfo}}"
                    on-change="onPickerViewChange"
                />
                <slot name="footer">
                    <div class="cos-time-picker-panel-footer">
                        <cos-button
                            class="cos-time-picker-panel-footer-now"
                            appearance="plain"
                            on-click="handleNow"
                        >
                            此刻
                        </cos-button>
                        <cos-button
                            class="cos-time-picker-panel-footer-confirm"
                            appearance="primary"
                            on-click="handleConfirm"
                        >
                            确定
                        </cos-button>
                    </div>
                </slot>
            </cos-popover>
        </div>
    `;

    static components = {
        ...TimePickerBase.components,
        'cos-popover': Popover,
        'cos-time-picker-panel': TimePickerPanel
    };
    inited() {
        const value = this.data.get('value');
        value && this.data.set('_selectedValue', new Date(value));

        const format = this.data.get('format') || 'HH-mm-ss';
        const _format = format.split('-');
        this.data.set('_format', _format);

        this.rollingDate = new RollingDate(format, this.data.get('range'));
        this.data.set('_timeInfo', this.rollingDate.generateRollingDate(value || new Date(), _format));
    }

    initData(): TimePickerProps {
        return {
            value: undefined,
            placeholder: '请选择日期',
            range: [],
            format: 'HH-mm-ss',
            _open: false,
            _selectedValue: null,
            _entryText: '',
            _format: []
        };
    }

    /**
     * 点击此刻按钮，设置当前时间
     */
    handleNow() {
        const timeNow = new Date();
        const _format = this.data.get('_format');
        this.data.set('_timeInfo', this.rollingDate.generateRollingDate(timeNow, _format));
        this.data.set('_selectedValue', timeNow);
    }
}

