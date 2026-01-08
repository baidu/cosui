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
import Button from '@cosui/cosmic/button';
import {DatePickerProps, DatePickerEvents} from '../interface';
import DatePickerBase from '../base';
import DatePickerInput from '../../common/date-picker-input';
import DatePickerPanel from '../../common/date-picker-panel';
import {daysBetween, isDateInMonths} from '../utils';
import {prevAction, nextAction, getNextDay, getPreviousDay} from '../../common/date-picker-input/util';
import {buildDateText} from '../../util/date-time';

export default class DatePicker extends DatePickerBase {
    static template = `
        <div class="cos-date-picker{{_open ? ' cos-date-picker-popover-open' : ''}}">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-date-picker-entry {{disabled ? ' cos-date-picker-entry-disabled' : ''}}">
                        <cos-date-picker-input
                            value="{{_entryText.start}}"
                            placeholder="{{_placeholder.start}}"
                            disabled="{{disabled}}"
                            active="{{_active.start}}"
                            allow-actions="{{_allowEntryAction.start}}"
                            on-click-action="handleClickEntryAction($event, 'start')"
                        ></cos-date-picker-input>
                        <fragment s-if="type === 'range'">
                            <cos-date-picker-input
                                value="{{_entryText.end}}"
                                placeholder="{{_placeholder.end}}"
                                disabled="{{disabled}}"
                                active="{{_active.end}}"
                                allow-actions="{{_allowEntryAction.end}}"
                                on-click-action="handleClickEntryAction($event, 'end')"
                            ></cos-date-picker-input>
                        </fragment>
                    </div>
                </slot>
            </div>
            <cos-popover
                class="cos-date-picker-panel"
                open="{=_open=}"
                title="{{title}}"
                on-close="closePanel"
            >
                <cos-date-picker-panel
                    type="{{type}}"
                    value="{{_selectedValue}}"
                    disabledDate="{{disabledDate}}"
                    range="{{range}}"
                    controlDate="{=_controlDate=}"
                    on-change="handleChange"
                />
                <slot name="footer">
                    <div
                        s-if="{{type === 'range'}}"
                        class="cos-date-picker-footer{{type === 'range' ? ' cos-date-picker-footer-range' : ''}}"
                    >
                        <div class="cos-date-picker-footer-range-info">
                            {{_rangeInfo}}
                        </div>
                        <div class="cos-date-picker-footer-range-action">
                            <cos-button
                                size="sm"
                                class="cos-date-picker-footer-btn"
                                appearance="secondary"
                                on-click="handleReset"
                            >重置</cos-button>
                            <cos-button
                                size="sm"
                                class="cos-date-picker-footer-btn"
                                disabled="{{_disabledButton}}"
                                appearance="primary"
                                on-click="handleConfirm"
                            >确定</cos-button>
                        </div>
                    </div>
                    <div
                        s-else
                        class="cos-date-picker-footer cos-date-picker-footer-today"
                        on-click="handleSelectToday"
                    >今天</div>
                </slot>
            </cos-popover>
        </div>
    `;

    static components = {
        'cos-popover': Popover,
        'cos-button': Button,
        'cos-date-picker-input': DatePickerInput,
        'cos-date-picker-panel': DatePickerPanel
    };

    static computed = {
        ...super.computed,
        /**
         * 入口回填文本
         */
        _entryText(this: DatePicker) {
            const selectedValue = this.data.get('_selectedValue');
            const type = this.data.get('type');

            const formatDate = (date: Date) => {
                let [year, month, day] = date.toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).split('/');
                return `${year}年${month}月${day}日`;
            };

            if (type === 'range' && Array.isArray(selectedValue)) {
                const [startDate, endDate] = selectedValue;
                const result = {start: '', end: ''};
                if (startDate) {
                    result.start = formatDate(startDate);
                };
                if (endDate) {
                    result.end = formatDate(endDate);
                }
                return result;
            }

            if (selectedValue) {
                const date = new Date((selectedValue as Date[])?.[0] || selectedValue);
                return {start: formatDate(date)};
            }

            return {start: '', end: ''};
        },
        // 时间范围描述文本
        _rangeInfo(this: DatePicker) {
            let result = '';
            const selectedValue = this.data.get('_selectedValue');
            const type = this.data.get('type');

            if (type === 'range' && Array.isArray(selectedValue)) {
                let startDateText = selectedValue[0] && buildDateText(selectedValue[0]);
                let endDateText = selectedValue[1] && buildDateText(selectedValue[1]);
                if (startDateText) {
                    result = `${startDateText} - `;
                }
                if (endDateText) {
                    result += `${endDateText}`;
                }
                if (startDateText && endDateText) {
                    result += `（${daysBetween(selectedValue[0], selectedValue[1])}晚）`;
                }
            }

            return result;
        },

        /**
         * input entry action是否允许点击
         * 当前entry value为空时，禁用prev和next按钮
         * 当entry value相邻值为disabledDate范围内时，禁用prev或next按钮
         * 当范围选择时，若start end值相邻，prev或next都需判断相邻禁用范围内
         */
        _allowEntryAction(this: DatePicker) {
            let value = this.data.get('_selectedValue');
            if (!value) {
                return {start: {prev: false, next: false}, end: {prev: false, next: false}};
            }
            const disabledDate = this.data.get('disabledDate');
            let range = this.data.get('range');
            let result = {start: {prev: true, next: true}, end: {prev: true, next: true}};
            if (!disabledDate && !range?.length) {
                return result;
            }

            let prevActionFn = (date: Date) => true;
            let nextActionFn = (date: Date) => true;
            if (range?.length) {
                const startYear = range[0].getFullYear();
                const endYear = range[1].getFullYear();
                const startMonth = range[0].getMonth() + 1;
                const endMonth = range[1].getMonth() + 1;

                prevActionFn = (date: Date) => prevAction(date, startYear, startMonth);
                nextActionFn = (date: Date) => nextAction(date, endYear, endMonth);
            }
            const previousDay = value?.length ? getPreviousDay(value[0]) : getPreviousDay(value);
            const nextDay = value?.length ? getNextDay(value[0]) : getNextDay(value);

            if (this.data.get('type') === 'range' && Array.isArray(value)) {
                result = {
                    start: {
                        prev: !disabledDate(previousDay) && prevActionFn(previousDay),
                        next: (value.length > 1
                            ? !disabledDate(getNextDay(value[0], 2)) : !disabledDate(nextDay))
                                && nextActionFn(getNextDay(value[0], 2))
                    },
                    end: {
                        prev: value.length > 1 ? (!disabledDate(getPreviousDay(value[0], 2))
                        && prevActionFn(getPreviousDay(value[0], 2))) : false,
                        next: value.length > 1 ? (!disabledDate(getNextDay(value[1]))
                        && nextActionFn(getNextDay(value[1]))) : false
                    }
                };
            }
            if (this.data.get('type') === 'single' && value && !Array.isArray(value)) {
                result.start = {
                    prev: !disabledDate(previousDay) && prevActionFn(previousDay),
                    next: !disabledDate(nextDay) && nextActionFn(nextDay)
                };
            }
            return result;
        }
    };

    initData(): DatePickerProps {
        return {
            type: 'single',
            value: undefined,
            placeholder: '请选择日期',
            disabledDate: () => false,
            range: [],
            format: 'YYYY-MM-DD',
            _open: false,
            _selectedValue: undefined,
            _controlDate: [],
            _active: {start: false, end: false}
        };
    }

    attached(): void {
        const value = this.data.get('value');
        this.initControlDate(value);

        this.watch('value', value => {
            this.initControlDate(value);
        });
    }

    /**
     * 设置选择框年月值
     *
     * @param value 日期时间
     */
    initControlDate(value?: Date | Date[]) {
        if (value) {
            // 保证传入为当天零点
            Array.isArray(value) ? value.forEach(item => item.setHours(0, 0, 0, 0)) : value.setHours(0, 0, 0, 0);
            this.data.set('_selectedValue', value);

            const values = Array.isArray(value) ? value : [value];

            values.forEach((item: Date, index: number) => {
                const previousItem = values[index - 1];

                const monthAdjustment = (index > 0
                    && item.getFullYear() === previousItem.getFullYear()
                    && item.getMonth() === previousItem.getMonth()
                ) ? 2 : 1;

                this.data.set(`_controlDate[${index}]`, {
                    year: item.getFullYear(),
                    month: item.getMonth() + monthAdjustment
                });
            });
        }
        else {
            this.data.set('_selectedValue', undefined);
            const currentDate = new Date();
            const controlDate = this.data.get('type') === 'range'
                ? [
                    {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1
                    },
                    {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 2
                    }
                ]
                : [
                    {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1
                    }
                ];

            this.data.set('_controlDate', controlDate);
        }
    }

    /**
     * 重置
     */
    handleReset() {
        this.data.set('_selectedValue', this.data.get('value'));
    }

    handleClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        if (this.data.get('disabled')) {
            return;
        }
        const _open = this.data.get('_open');

        !_open && this.initControlDate(this.data.get('value'));
        !_open && this.data.set('_active', {start: true, end: false});
        this.data.set('_open', true);
        this.fire('open');
    }

    /**
     * 处理点击日期选择器上的“上一天”或“下一天”按钮时的动作
     * 当切换日期跨月份时，需同步处理面板日期的展示
     *
     * @param action 动作类型，可选值为 'next'（下一天）或 'prev'（上一天）
     * @param entry 入口类型，可选值为 'start'（开始日期）或 'end'（结束日期）
     */
    handleClickEntryAction(action: 'next' | 'prev', entry: 'start' | 'end') {
        let _open = this.data.get('_open');
        let _selectedValue = this.data.get('_selectedValue');
        let newSelectedValue: Date | Date[] = [];
        let offset = action === 'next' ? 1 : -1;
        let index = entry === 'start' ? 0 : 1;
        if (this.data.get('disabled')) {
            return;
        }
        if (this.data.get('type') === 'range') {
            if (!Array.isArray(_selectedValue)) {
                return;
            }
            newSelectedValue = _selectedValue.map(item => new Date(item));
            newSelectedValue[index].setDate(newSelectedValue[index].getDate() + offset);
            if (newSelectedValue.length === 2 && newSelectedValue[1].getTime() <= newSelectedValue[0].getTime()) {
                let tempIndex = entry === 'start' ? 1 : 0;
                newSelectedValue[tempIndex].setDate(newSelectedValue[tempIndex].getDate() + offset);
            }
        }
        if (this.data.get('type') === 'single' && !Array.isArray(_selectedValue) && _selectedValue) {
            newSelectedValue = new Date(_selectedValue);
            newSelectedValue.setDate(_selectedValue.getDate() + offset);
        }
        this.data.set('_selectedValue', newSelectedValue);
        this.updateControlDate(newSelectedValue);
        this.fire<DatePickerEvents['change']>('change', {value: Array.isArray(newSelectedValue)
            ? newSelectedValue.map((item, index) => {
                return {
                    date: item,
                    selected: true,
                    start: index === 0,
                    end: index === newSelectedValue.length - 1
                };
            }) : {
                date: newSelectedValue,
                selected: true
            }});

        if (!_open) {
            this.data.set('value', newSelectedValue);
            this.fire('confirm', {value: newSelectedValue});
        }
        else {
            this.data.set('_active', {start: entry === 'start', end: entry === 'end'});
        }
    }

    updateControlDate(value: Date | Date[]) {
        let isRange = this.data.get('type') === 'range';
        let _controlDate = this.data.get('_controlDate');
        let newPanelArr = [..._controlDate];

        if (isRange && Array.isArray(value)) {
            if (value.length === 1) {
                let startDateInPanel = isDateInMonths(value[0], _controlDate);
                if (!startDateInPanel) {
                    newPanelArr = [
                        {year: value[0].getFullYear(), month: value[0].getMonth() + 1},
                        {year: value[0].getFullYear(), month: value[0].getMonth() + 2}
                    ];
                }
            }
            else {
                let startDateInPanel = isDateInMonths(value[0], _controlDate);
                let endDateInPanel = isDateInMonths(value[1], _controlDate);
                if (!startDateInPanel || !endDateInPanel) {
                    newPanelArr = [
                        {year: value[0].getFullYear(), month: value[0].getMonth() + 1},
                        {
                            year: value[1].getFullYear(),
                            month: isDateInMonths(value[0],
                                [{year: value[1].getFullYear(), month: value[1].getMonth() + 1}])
                                ? value[0].getMonth() + 2 : value[1].getMonth() + 1
                        }
                    ];
                }
            }
        }
        if (!isRange && value instanceof Date) {
            newPanelArr = [{year: value.getFullYear(), month: value.getMonth() + 1}];
        }
        this.data.set('_controlDate', newPanelArr);
    }

    /**
     * 关闭面板
     */
    closePanel() {
        if (this.data.get('type') === 'range') {
            const value = this.data.get('value');
            const _selectedValue = this.data.get('_selectedValue');
            if (Array.isArray(_selectedValue) && _selectedValue.length === 2 && value !== _selectedValue) {
                this.data.set('value', _selectedValue);
                this.fire<DatePickerEvents['confirm']>('confirm', {
                    value: _selectedValue,
                    lunarValue: this.data.get('_lunarValue')
                });
            }
            else {
                this.data.set('_selectedValue', this.data.get('value'));
            }
        }
        this.data.set('_open', false);
        this.data.set('_active', {start: false, end: false});
        this.fire('close');
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
        this.data.set('_active', {
            start: Array.isArray(selectedValue) ? selectedValue.length !== 1 : true,
            end: Array.isArray(selectedValue) ? selectedValue.length === 1 : false
        });
        this.data.get('type') !== 'range' && this.handleConfirm();
    }


    handleSelectToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.data.set('value', today);
        this.data.set('_selectedValue', today);
        this.handleChange({value: {date: today}});
        this.closePanel();
    }

    handlePanelChange(value: Array<{year: number, month: number}>) {
        this.data.set('_controlDate', value);
    }
}

