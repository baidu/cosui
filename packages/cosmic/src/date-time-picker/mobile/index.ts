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
 * @file DateTimePicker 组件
 */

import {Component} from 'san';
import Drawer from '@cosui/cosmic/drawer';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import Picker from '@cosui/cosmic/picker';
import Switcher from '@cosui/cosmic/switcher';
import {RollingDate} from '../../util/date-time';
import {
    solorToLunar,
    lunarToSolor,
    adjustNextDateLunar
} from '../../util/lunar';
import {DateTimePickerData, DateTimePickerEvents, DateTimePickerProps} from '../interface';

export default class DateTimePicker extends Component<DateTimePickerData> {
    static template = `
        <div class="cos-date-time-picker">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-date-time-picker-entry">
                        <span class="{{_entryText ? 'cos-date-time-picker-entry-text' : ''}}">
                            {{_entryText || placeholder}}
                        </span>
                        <cos-icon name="calendar" />
                    </div>
                </slot>
            </div>
            <cos-drawer
                class="cos-date-time-picker-panel{{
                    drawerClass ? ' ' + drawerClass : ''}}"
                open="{=open=}"
                title="{{title}}"
                getPopupContainer="{{getPopupContainer}}"
                on-close="closePanel"
            >
                <div slot="title" class="cos-date-time-picker-panel-title">
                    <div s-if="{{_showLunarSwitch}}" class="cos-flex cos-date-time-picker-panel-title-lunar">
                        <cos-switcher checked="{=_lunar=}" size="sm"/>
                        <span class="cos-space-ml-sm">农历</span>
                    </div>
                    <div
                        class="cos-date-time-picker-panel-title-text
                            cos-text-headline-sm cos-space-mt-lg cos-space-mb-lg"
                    >{{ title }}</div>
                </div>
                <div class="cos-date-time-picker-panel-content">
                    <cos-picker
                        columns="{{_pickerData.columns}}"
                        selected-index="{{_pickerData.selectedIndex}}"
                        on-change="onPickerViewChange"
                    />
                    <div class="cos-date-time-picker-panel-content-selected"></div>
                </div>
                <slot name="footer">
                    <div class="cos-date-time-picker-panel-footer">
                        <cos-button
                            class="cos-col"
                            on-click="handleConfirm"
                        >确定</cos-button>
                    </div>
                </slot>
            </cos-drawer>
        </div>
    `;

    static components = {
        'cos-drawer': Drawer,
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-picker': Picker,
        'cos-switcher': Switcher
    };

    static computed = {
        _selectedYear(this: DateTimePicker) {
            const yearInfo = this.data.get('_dateTimeInfo')?.YYYY;
            if (yearInfo) {
                return parseInt(yearInfo.list[yearInfo.selectedIndex], 10);
            }
            return new Date().getFullYear();
        },
        _selectedMonth(this: DateTimePicker) {
            return this.data.get('_dateTimeInfo')?.MM?.selectedIndex;
        },
        _selectedDate(this: DateTimePicker) {
            return this.data.get('_dateTimeInfo')?.DD?.selectedIndex;
        },
        _pickerData(this: DateTimePicker) {
            const _dateTimeInfo = this.data.get('_dateTimeInfo') || {};
            const _format = this.data.get('_format');
            let _pickerViewData = [];
            const _selectedIndex = [];
            _format?.forEach(format => {
                if (!_dateTimeInfo[format]) {
                    return;
                }
                _pickerViewData.push(_dateTimeInfo[format].list);
                _selectedIndex.push(_dateTimeInfo[format].selectedIndex);
            });
            return {
                columns: _pickerViewData,
                selectedIndex: _selectedIndex
            };
        }
    };

    rollingDate: RollingDate;

    inited(): void {
        let value = this.data.get('value');
        value = value ? new Date(value) : new Date();
        this.data.set('_selectedValue', value);

        const {range, format = 'YYYY-MM-DD-HH-mm-ss'} = this.data.get();
        const _format = format.split('-');
        this.data.set('_format', _format);

        this.rollingDate = new RollingDate(format, range, false, true);
        const result = this.rollingDate.generateRollingDate(value, _format);

        this.data.set('_dateTimeInfo', result);
        this.updateSelectedValue();

        const lunar = this.data.get('lunar');
        this.data.set('_showLunarSwitch', lunar && format.includes('YYYY-MM-DD'));
    }


    initData(): DateTimePickerProps {
        return {
            title: '选择日期',
            placeholder: '请选择日期',
            value: undefined,
            format: 'YYYY-MM-DD-HH-mm-ss',
            range: [],
            getPopupContainer: undefined,
            drawerClass: undefined,
            lunar: false,
            open: false,
            _format: [],
            _selectedValue: undefined,
            _dateTimeInfo: {},
            _rangeText: undefined,
            _entryText: '',
            _showLunarSwitch: false,
            _lunar: false
        };
    }
    attached() {
        this.watch('_lunar', (value: boolean) => {
            this.changeLunar(value);
        });

        this.watch('open', (open: boolean) => {
            open ? this.fire('open') : this.fire('close');
        });
    }
    /**
     * 农历开关切块
     */
    changeLunar(lunar: boolean) {
        const {_selectedYear, _selectedMonth, _selectedDate, _dateTimeInfo} = this.data.get();

        const date = lunar
            ? solorToLunar(_selectedYear, _selectedMonth + 1, _selectedDate + 1, _dateTimeInfo)
            : lunarToSolor(_selectedYear, _selectedMonth + 1, _selectedDate + 1, _dateTimeInfo);
        this.data.assign({
            _dateTimeInfo: date
        });
        this.updateSelectedValue();
    }

    handleClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('open', true);
        this.fire('open');
    }

    /**
     * 关闭面板
     */
    closePanel() {
        this.data.set('open', false);
    }

    /**
     * 处理滚轮滚动引起的选中值变更
     * @param data changeListType 类型 index 下标
     */
    onPickerViewChange(data: {columnIndex: number, index: number}) {
        const {index, columnIndex} = data;
        const changeListType = this.data.get('_format')[columnIndex];
        this.data.set(`_dateTimeInfo.${changeListType}.selectedIndex`, index);
        this.data.set(`_dateTimeInfo.${changeListType}.startSelectedIndex`, index);

        const format = this.data.get('format');
        const _selectedYear = this.data.get('_selectedYear');
        const _selectedMonth = this.data.get('_selectedMonth');
        const _dateTimeInfo = this.data.get('_dateTimeInfo');
        let result = null;
        // 农历
        if (this.data.get('_lunar') && ['MM', 'YYYY'].includes(changeListType)) {
            result = adjustNextDateLunar(_selectedYear, _selectedMonth + 1, changeListType, _dateTimeInfo);
        }
        else if (format.includes('DD') && 'MM' === changeListType) {
            result = this.rollingDate.adjustNextDateSolor(
                _selectedYear,
                _selectedMonth,
                changeListType,
                _dateTimeInfo);
        }

        result && this.data.assign({
            _dateTimeInfo: result
        });

        this.updateSelectedValue();

        this.fire<DateTimePickerEvents['change']>('change', {
            value: this.data.get('_selectedValue'),
            lunarValue: this.data.get('_lunarValue')
        });
    }

    /**
     * 更新selectedValue的值
     */
    updateSelectedValue() {
        const _dateTimeInfo = this.data.get('_dateTimeInfo');
        const _lunar = this.data.get('_lunar');
        const {value,
            rangeText,
            lunarValue
        } = this.rollingDate.getValueAndRangeText(_dateTimeInfo, 'single', _lunar);
        this.data.set('_selectedValue', value);
        this.data.set('_rangeText', rangeText);
        this.data.set('_lunarValue', lunarValue);
    }

    /**
     * 确认选择回调，关闭抽屉
     */
    handleConfirm() {
        const selectedValue = this.data.get('_selectedValue');

        this.fire<DateTimePickerEvents['confirm']>('confirm', {
            value: selectedValue,
            lunarValue: this.data.get('_lunarValue')
        });
        this.data.set('_entryText', this.data.get('_rangeText')?.start);
        this.data.set('value', selectedValue);
        this.data.set('open', false);
    }
}
