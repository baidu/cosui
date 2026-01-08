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
 * @file DatePicker Base
 */

import {Component} from 'san';
import type {DatePickerEvents, DatePickerData} from './interface';

export default class DatePicker extends Component<DatePickerData> {

    static computed = {
        /**
         * 占位符文本
         */
        _placeholder(this: DatePicker) {
            const placeholder = this.data.get('placeholder');
            const defaultText = '请选择日期';

            if (typeof placeholder === 'object') {
                return {
                    start: placeholder.start || defaultText,
                    end: placeholder.end || defaultText
                };
            }

            return {start: placeholder || defaultText, end: placeholder || defaultText};
        },

        /**
         * 禁用确认按钮
         */
        _disabledButton(this: DatePicker) {
            const isRange = this.data.get('type') === 'range';
            const _selectedValue = this.data.get('_selectedValue');
            return !isRange
                ? !_selectedValue
                : !_selectedValue?.[0] || !_selectedValue?.[1];
        }
    };

    /**
     * 确认选择回调，关闭抽屉
     */
    handleConfirm() {
        if (this.data.get('_disabledButton')) {
            return;
        }
        const _rangeText = this.data.get('_rangeText');
        const selectedValue = this.data.get('_selectedValue');

        this.fire<DatePickerEvents['confirm']>('confirm', {
            value: selectedValue,
            lunarValue: this.data.get('_lunarValue')
        });

        this.data.set('value', selectedValue);
        this.data.set('_formatText', _rangeText?.start ? _rangeText : undefined);
        this.closePanel();
    }

    /**
     * 关闭面板
     */
    closePanel() {
        this.data.set('_open', false);
        this.fire('close');
    }
}

