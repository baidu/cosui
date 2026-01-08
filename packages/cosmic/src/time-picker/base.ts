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

import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import Picker from '@cosui/cosmic/picker';
import {RollingDate} from '../util/date-time';
import type {TimePickerData, TimePickerEvents} from './interface';

export default class TimePicker extends Component<TimePickerData> {
    static trimWhitespace = 'all';
    static components = {
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-picker': Picker
    };

    static computed = {
        _pickerData(this: TimePicker) {
            const _timeInfo = this.data.get('_timeInfo') || {};
            const _format = this.data.get('_format');

            let _pickerViewData = [];
            const _selectedIndex = [];
            _format?.forEach(format => {
                if (!_timeInfo[format]) {
                    return;
                }
                _pickerViewData.push(_timeInfo[format].list);
                _selectedIndex.push(_timeInfo[format].selectedIndex);
            });
            return {
                columns: _pickerViewData,
                selectedIndex: _selectedIndex
            };
        }
    };

    rollingDate: RollingDate;
    inited() {
        const value = this.data.get('value');
        value && this.data.set('_selectedValue', new Date(value));

        const format = this.data.get('format') || 'HH-mm-ss';
        const _format = format.split('-');
        this.data.set('_format', _format);

        this.rollingDate = new RollingDate(format, this.data.get('range'), false, true);
        this.data.set('_timeInfo', this.rollingDate.generateRollingDate(value || new Date(), _format));
    }

    handleClick() {
        this.data.set('_open', !this.data.get('_open'));
    }
    closePanel() {
        this.fire('close');
    }

    onPickerViewChange(data: {columnIndex: number, index: number}) {
        const {columnIndex, index} = data;
        const changeListType = this.data.get('_format')[columnIndex];
        this.data.set('_timeInfo.' + changeListType + '.selectedIndex', index);
        this.data.set('_timeInfo.' + changeListType + '.startSelectedIndex', index);
        const {value} = this.rollingDate.getValueAndRangeText(this.data.get('_timeInfo'));

        this.data.set('_selectedValue', value);
        this.fire<TimePickerEvents['change']>('change', {
            value
        });
    }
    handleConfirm() {
        this.data.set('_open', false);
        const _selectedValue = this.data.get('_selectedValue') || new Date();
        this.data.set('value', _selectedValue);
        const {rangeText} = this.rollingDate.getValueAndRangeText(this.data.get('_timeInfo'));

        this.data.set('_entryText', rangeText.start);
        this.fire<TimePickerEvents['confirm']>('confirm', {
            value: _selectedValue
        });
    }
}
