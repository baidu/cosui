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

import Drawer from '@cosui/cosmic/drawer';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import Calendar from '@cosui/cosmic/calendar';
import Switcher from '@cosui/cosmic/switcher';
import DatePickerBase from '../base';
import Picker from '@cosui/cosmic/picker';
import {
    adjustNextDateLunar,
    solorToLunar,
    lunarToSolor
} from '../../util/lunar';
import {RollingDate} from '../../util/date-time';
import {DatePickerProps, DatePickerEvents} from '../interface';
import {DayItem} from '../../common/date-picker-panel/interface';

export default class DatePicker extends DatePickerBase {
    static template = `
        <div class="cos-date-picker cos-date-picker-{{appearance}}">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-date-picker-entry {{disabled ? ' cos-date-picker-entry-disabled' : ''}}">
                        <span s-if="_entryText" class="cos-date-picker-entry-text">
                            <span s-if="type === 'range'">
                                {{_entryText.start + ' - ' + _entryText.end}}
                            </span>
                            <span s-else>{{_entryText.start}}</span>
                        </span>
                        <span s-else class="cos-date-picker-entry-placeholder">
                            <span s-if="type === 'range'">
                                {{_placeholder.start + ' - ' + _placeholder.end}}
                            </span>
                            <span s-else>{{_placeholder && _placeholder.start || placeholder}}</span>
                        </span>
                        <cos-icon name="calendar" />
                    </div>
                </slot>
            </div>
            <cos-drawer
                class="cos-date-picker-panel"
                open="{=_open=}"
                title="{{title}}"
                on-close="closePanel"
            >
                <slot name="header">
                    <div class="cos-date-picker-header"></div>
                </slot>
                <div slot="title" class="cos-date-picker-title">
                    <div s-if="{{lunar && format === 'YYYY-MM-DD'}}" class="cos-flex cos-date-picker-lunar-switcher">
                        <cos-switcher checked="{=_lunar=}" size="sm"/>
                        <span class="cos-space-ml-sm">农历</span>
                    </div>
                    <div
                        class="cos-date-picker-drawer-title cos-text-headline-sm cos-space-mt-lg cos-space-mb-lg"
                        on-touchmove="handleTouchmove"
                    >{{ title }}</div>
                </div>
                <div class="cos-date-picker-content">
                    <cos-calendar
                        s-if="appearance === 'panel'"
                        type="{{type}}"
                        value="{{value}}"
                        disabledDate="{{disabledDate}}"
                        validRange="{{range}}"
                        on-change="handleChange"
                    >
                        <div slot="month-header">
                            <slot name="month-header" var-year="year" var-month="month">
                                <div class="cos-date-picker-month-header">
                                    {{year}} 年 {{month}} 月
                                </div>
                            </slot>
                        </div>
                        <div slot="date">
                            <slot name="date" var-dayItem="dayItem">
                                <div class="{{dayItem | getDayItemClasses}}">
                                    {{dayItem | filterDay}}
                                </div>
                            </slot>
                        </div>
                    </cos-calendar>
                    <div
                        s-elif="type === 'range' && _format.length > 1"
                        class="cos-date-picker-range cos-flex"
                    >
                        <span
                            class="cos-date-picker-range-start{{
                                _rangeText.start ? ' cos-date-picker-range-filled' : ''}}{{
                                _currentSelectTarget === 'start' ? ' cos-date-picker-range-active' : ''}}"
                            on-click="onDateTargetChange('start')"
                        >{{_rangeText.start || _placeholder.start}}</span>
                        <span class="cos-date-picker-range-split">至</span>
                        <span
                            class="cos-date-picker-range-end{{
                                _rangeText.end ? ' cos-date-picker-range-filled' : ''}}{{
                                _currentSelectTarget === 'end' ? ' cos-date-picker-range-active' : ''}}"
                            on-click="onDateTargetChange('end')"
                        >{{_rangeText.end || _placeholder.end}}</span>
                    </div>
                    <div
                        s-if="appearance === 'rolling'"
                        class="cos-date-picker-content-rolling{{type === 'range' && _format.length > 1
                            ? ' cos-date-picker-content-rolling-range' : ''}}"
                    >
                        <cos-picker
                            columns="{{_pickerData.columns}}"
                            selected-index="{{_pickerData.selectedIndex}}"
                            on-change="onPickerViewChange"
                        />
                        <div class="cos-date-picker-selected-box"></div>
                    </div>
                </div>
                <slot name="footer">
                    <div class="cos-date-picker-footer">
                        <cos-button
                            s-if="appearance === 'rolling' && type === 'range' && _format.length > 1"
                            appearance="secondary"
                            class="cos-date-picker-footer-reset"
                            on-click="handleReset"
                        >重置</cos-button>
                        <cos-button
                            disabled="{{_disabledButton}}"
                            class="cos-col"
                            on-click="handleConfirm"
                        >确定</cos-button>
                    </div>
                </slot>
            </cos-drawer>
        </div>
    `;

    static filters = {
        filterDay(dayItem: DayItem) {
            const {date} = dayItem;
            return (date && date.getDate()) || '';
        },

        getDayItemClasses(dayItem: DayItem) {
            const baseClass = 'cos-calendar-content-day';
            const conditionalClasses = {
                'selected': dayItem.selected,
                'disabled': dayItem.disabled,
                'start': dayItem.start,
                'middle': dayItem.middle,
                'end': dayItem.end,
                'first': dayItem.first,
                'last': dayItem.last,
                'other': !dayItem.currentMonth,
                'today': dayItem.today,
                'hover-in-range': dayItem.hoverInRange,
                'hover-end': dayItem.hoverEnd
            };

            return Object.entries(conditionalClasses).reduce((classes, [className, condition]) => {
                return condition ? [...classes, `${baseClass}-${className}`] : classes;
            }, [baseClass]).join(' ');
        }
    };

    static computed = {
        ...DatePickerBase.computed,

        /**
         * 入口回填文本
         */
        _entryText(this: DatePicker) {
            const selectedValue = this.data.get('value');
            const type = this.data.get('type');
            const _formatText = this.data.get('_formatText');

            const formatDate = (date: Date) => date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });

            if (type === 'range' && Array.isArray(selectedValue)) {
                const [startDate, endDate] = selectedValue;
                if (!startDate || !endDate) {
                    return {};
                };

                return startDate.getTime() < endDate.getTime()
                    ? _formatText || {
                        start: formatDate(startDate),
                        end: formatDate(endDate)
                    }
                    : {
                        start: _formatText?.end || formatDate(endDate),
                        end: _formatText?.start || formatDate(startDate)
                    };
            }

            if (selectedValue) {
                const date = new Date((selectedValue as Date[])?.[0] || selectedValue);
                return _formatText || {start: formatDate(date)};
            }

            return '';
        },

        _range(this: DatePicker) {
            const range = this.data.get('range') || [];
            return range.map((item: string | Date) => {
                return new Date(item);
            });
        },

        _showWeek(this: DatePicker) {
            return this.data.get('format').includes('WW');
        },
        /**
         * 日期组合格式
         */
        _format(this: DatePicker) {
            const format = this.data.get('format')?.replace(/-WW/, '') || 'YYYY';
            return format.split('-');
        },

        /**
         * 选中年份
         */
        _selectedYear(this: DatePicker) {
            const yearInfo = this.data.get('_dateInfo')?.YYYY;
            if (yearInfo) {
                return parseInt(yearInfo.list[yearInfo.selectedIndex], 10);
            }
            return new Date().getFullYear();
        },

        /**
         * 选中月
         */
        _selectedMonth(this: DatePicker) {
            return this.data.get('_dateInfo')?.MM?.selectedIndex + 1;
        },

        /**
         * 选中日
         */
        _selectedDate(this: DatePicker) {
            return this.data.get('_dateInfo')?.DD?.selectedIndex + 1;
        },

        _pickerData(this: DatePicker) {
            const _dateInfo = this.data.get('_dateInfo') || {};
            const _format = this.data.get('_format') || [];
            const type = this.data.get('type');
            const appearance = this.data.get('appearance');
            const _currentSelectTarget = this.data.get('_currentSelectTarget');
            const selectedIndex = _currentSelectTarget === 'start' ? 'startSelectedIndex' : 'endSelectedIndex';
            if (appearance !== 'rolling') {
                return [];
            }
            let _pickerViewData = [];
            let _selectedIndex = [];
            _format.forEach(format => {
                if (!_dateInfo[format]) {
                    return;
                }
                _pickerViewData.push(_dateInfo[format].list);
                _selectedIndex.push(_dateInfo[format][selectedIndex]);
            });

            if (type === 'range' && appearance === 'rolling' && _format.length === 1) {
                if (!_dateInfo[_format[0]]) {
                    return;
                }
                _pickerViewData.push(['至']);
                _pickerViewData.push(_dateInfo[_format[0]].list);
                _selectedIndex.push(0);
                _selectedIndex.push(_dateInfo[_format[0]].endSelectedIndex);
            }
            return {
                columns: _pickerViewData,
                selectedIndex: _selectedIndex
            };
        }
    };

    static components = {
        'cos-drawer': Drawer,
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-calendar': Calendar,
        'cos-picker': Picker,
        'cos-switcher': Switcher
    };

    rollingDate: RollingDate;
    created(): void {
        let value = this.data.get('value');

        // rolling 默认选中当前时间
        if (this.data.get('appearance') === 'rolling') {
            this.data.set('_selectedValue', new Date());
        }
        if (value) {
            value = Array.isArray(value) ? value.map(item => new Date(item)) : new Date(value);
            this.data.set('_selectedValue', value);
        }
        if (!value && this.data.get('type') === 'range') {
            this.data.set('_selectedValue', [new Date()]);
        }
    }

    attached(): void {
        if (this.data.get('appearance') === 'rolling') {
            const {_range, _showWeek, format, _selectedValue = new Date()} = this.data.get();

            this.rollingDate = new RollingDate(format, _range, _showWeek);
            const result = this.rollingDate.generateRollingDate(_selectedValue, ['YYYY', 'MM', 'DD', 'QQ']);

            this.data.set('_dateInfo', result);
            this.updateSelectedValue();
        }

        const _rangeText = this.data.get('_rangeText');
        const type = this.data.get('type');

        if (_rangeText.start) {
            type === 'single'
                ? this.data.set('_formatText', _rangeText)
                : _rangeText?.end && this.data.set('_formatText', _rangeText);
        }

        this.watch('_lunar', (value: boolean) => {
            this.changeLunar(value);
        });
    }


    initData(): DatePickerProps {
        return {
            title: '选择日期',
            placeholder: '请选择日期',
            value: undefined,
            disabledDate: () => false,
            appearance: 'panel',
            format: 'YYYY-MM-DD',
            range: [new Date(2004, 0), new Date(2044, 0)],
            lunar: false,
            _open: false,
            _selectedValue: undefined,
            _dateInfo: {},
            _currentSelectTarget: 'start',
            _lunar: false,
            _rangeText: {},
            _range: [],
            _formatText: undefined,
            _lunarValue: undefined
        };
    }

    /**
     * 重置时间
     */
    handleReset() {
        this.data.set('_selectedValue', []);
        this.data.set('_rangeText', {});
    }

    /**
     * 点击选择区域
     * @param area start | end 区域选择器
     */
    onDateTargetChange(area: string) {
        this.data.set('_currentSelectTarget', area);
        const _selectedValue = this.data.get('_selectedValue') as Date[];
        const activeIndex = area === 'start' ? 0 : 1;

        // 如果结束时间没有值 将当前选择时间赋值给结束时间
        if (!_selectedValue[activeIndex]) {

            // 更新_dateInfo的选中值
            const _format = this.data.get('_format');
            _format.forEach((item: string) => {
                this.data.set(`_dateInfo.${item}.${activeIndex ? 'endSelectedIndex' : 'startSelectedIndex'}`,
                    this.data.get(`_dateInfo.${item}.selectedIndex`));
            });
            this.updateSelectedValue(area);
        }
    }

    /**
     * 处理滚轮滚动引起的选中值变更
     * @param data type 类型 index 下标
     */
    onPickerViewChange(data: {columnIndex: number, index?: number}) {
        const {index, columnIndex} = data;
        let changeListType = this.data.get('_format')[columnIndex];
        const {appearance, type, _format, _currentSelectTarget} = this.data.get();
        if (appearance === 'rolling' && type === 'range' && _format?.length === 1) {
            changeListType = _format[0];
            if (columnIndex === 2) {
                this.handleEndChange({...data, changeListType});
                return;
            }
        }
        const isStart = this.data.get('_currentSelectTarget') === 'start';

        this.data.set(`_dateInfo.${changeListType}.${isStart ? 'startSelectedIndex' : 'endSelectedIndex'}`, index);
        this.data.set(`_dateInfo.${changeListType}.selectedIndex`, index);

        if (changeListType === 'QQ') {
            this.data.set('_dateInfo.MM.selectedIndex', index * 3);
            this.data.set(`_dateInfo.MM.${isStart ? 'startSelectedIndex' : 'endSelectedIndex'}`, index * 3);
            this.updateSelectedValue(_currentSelectTarget);
            return;
        }

        const {
            _selectedYear,
            _selectedMonth,
            _dateInfo,
            format,
            _lunar
        } = this.data.get();

        let result = null;
        // 农历
        if (_lunar) {
            result = adjustNextDateLunar(_selectedYear, _selectedMonth, changeListType, _dateInfo);
        }
        else if (format.includes('DD')) {
            result = this.rollingDate.adjustNextDateSolor(
                _selectedYear,
                _selectedMonth - 1,
                changeListType,
                _dateInfo,
                isStart);
        }

        result && this.data.assign({
            _dateInfo: result
        });

        this.updateSelectedValue(_currentSelectTarget);

        this.fire<DatePickerEvents['change']>('change', {
            value: this.data.get('_selectedValue'),
            lunarValue: this.data.get('_lunarValue')
        });
    }

    /**
     * 时间范围选择时，处理结束滚轮滚动引起的选中值变更
     * @param data type 类型 index 下标
     */
    handleEndChange(data: {changeListType: string, index?: number}) {
        const {index, changeListType} = data;
        this.data.set('_dateInfo.' + changeListType + '.endSelectedIndex', index);
        this.data.set('_dateInfo.' + changeListType + '.selectedIndex', index);

        // 季度变更时，需要更新月份的选择，默认为当前季度的第一个月
        const newSelectedMonth = changeListType === 'QQ' ? index * 3 : this.data.get('_selectedMonth') - 1;
        this.data.set('_dateInfo.MM.selectedIndex', newSelectedMonth);
        this.data.set('_dateInfo.MM.endSelectedIndex', newSelectedMonth);

        this.updateSelectedValue('end');

        this.fire<DatePickerEvents['change']>('change', {
            value: this.data.get('_selectedValue')
        });
    }

    /**
     * 更新selectedValue的值
     */
    updateSelectedValue(selectedTarget?: string) {
        const {
            _dateInfo,
            _lunar,
            type,
            _selectedValue
        } = this.data.get();

        const {value, rangeText, lunarValue} = this.rollingDate.getValueAndRangeText(_dateInfo, type, _lunar);
        if (Array.isArray(_selectedValue)) {
            if (!selectedTarget || selectedTarget === 'start') {
                this.data.set('_selectedValue[0]', value[0]);
                this.data.set('_rangeText.start', rangeText.start);
            }
            if (!selectedTarget || selectedTarget === 'end') {
                this.data.set('_selectedValue[1]', value[1]);
                this.data.set('_rangeText.end', rangeText.end);
            }
            return;
        }
        this.data.set('_selectedValue', value);
        this.data.set('_rangeText', rangeText);
        this.data.set('_lunarValue', lunarValue);
    }

    /**
     * 农历开关切块
     */
    changeLunar(lunar: boolean) {
        const {_selectedYear, _selectedMonth, _selectedDate, _dateInfo, _currentSelectTarget} = this.data.get();
        const date = lunar
            ? solorToLunar(_selectedYear, _selectedMonth, _selectedDate, _dateInfo)
            : lunarToSolor(_selectedYear, _selectedMonth, _selectedDate, _dateInfo);

        this.data.assign({
            _dateInfo: date
        });
        this.updateSelectedValue(_currentSelectTarget);
    }

    handleClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }

        this.data.set('_open', true);
        this.fire('open');
    }

    /**
     * 日期选择回调
     */
    handleChange(e: {value: {date: Date | Date[]}}) {
        this.fire<DatePickerEvents['change']>('change', e);

        const value = e.value;

        let selectedValue = value.date;

        if (value && Array.isArray(value)) {
            selectedValue = value.map((item: {date: Date}) => {
                return new Date(item.date);
            });
        }

        this.data.set('_selectedValue', selectedValue);
    }
}
