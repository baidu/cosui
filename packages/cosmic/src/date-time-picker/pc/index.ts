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
 */

import {Component} from 'san';
import {DateTimePickerData, DateTimePickerEvents, DateTimePickerProps} from '../interface';
import Popover from '@cosui/cosmic/popover';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import DatePickerInput from '../../common/date-picker-input';
import DatePickerPanel from '../../common/date-picker-panel';
import TimePickerPanel from '../../common/time-picker-panel';
import {RollingDate, buildDateText} from '../../util/date-time';
import {prevAction, nextAction, getNextDay, getPreviousDay} from '../../common/date-picker-input/util';


export default class DateTimePicker extends Component<DateTimePickerData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-date-time-picker">
            <div on-click="handleClickEntry">
                <slot name="entry">
                    <div class="cos-date-time-picker-entry{{disabled ? ' cos-date-time-picker-entry-disabled' : ''}}">
                        <cos-date-picker-input
                            value="{{_entryText}}"
                            placeholder="{{placeholder}}"
                            disabled="{{disabled}}"
                            allow-actions="{{_allowEntryAction}}"
                            on-click-action="handleClickEntryAction($event, 'start')"
                        />
                    </div>
                </slot>
            </div>
            <cos-popover
                class="cos-date-time-picker-panel"
                open="{=open=}"
                on-close="closePanel"
            >
                <div class="cos-date-time-picker-panel-content">
                    <cos-date-picker-panel
                        type="single"
                        value="{{_selectedValue}}"
                        controlDate="{=_controlDate=}"
                        range="{{range}}"
                        on-change="handleChangeDate"
                    />
                    <div class="cos-date-time-picker-panel-divider"/>
                    <cos-time-picker-panel
                        pickerData="{{_pickerData}}"
                        format="{{_timeFormat}}"
                        timeInfo="{{_dateTimeInfo}}"
                        on-change="handleChangeTime"
                    />
                </div>
                <slot name="footer">
                    <div class="cos-date-time-picker-footer">
                       <div class="cos-date-time-picker-footer-description">
                            {{_description}}
                        </div>
                        <div class="cos-date-time-picker-footer-action">
                            <cos-button
                                size="sm"
                                class="cos-date-time-picker-footer-confirm"
                                disabled="{{!_selectedValue}}"
                                appearance="primary"
                                on-click="handleConfirm"
                            >确定</cos-button>
                        </div>
                    </div>
                </slot>
            </cos-popover>
        </div>
    `;

    static components = {
        'cos-popover': Popover,
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-date-picker-input': DatePickerInput,
        'cos-date-picker-panel': DatePickerPanel,
        'cos-time-picker-panel': TimePickerPanel
    };

    static computed = {
        /**
         * input entry action是否允许点击
         * 当前entry value为空时，禁用prev和next按钮
         */
        _allowEntryAction(this: DateTimePicker) {
            const value = this.data.get('value');
            if (!value) {
                return {prev: false, next: false};
            }
            const range = this.data.get('range');
            if (!range?.length) {
                return {prev: true, next: true};
            }

            const startYear = range[0].getFullYear();
            const endYear = range[1].getFullYear();
            const startMonth = range[0].getMonth() + 1;
            const endMonth = range[1].getMonth() + 1;
            const prevActionFn = (date: Date) => {
                return prevAction(date, startYear, startMonth);
            };

            const nextActionFn = (date: Date) => {
                return nextAction(date, endYear, endMonth);
            };

            const previousDay = getPreviousDay(value);
            const nextDay = getNextDay(value);


            return {prev: prevActionFn(previousDay), next: nextActionFn(nextDay)};
        },

        /**
         * 获取时分秒的格式
         */
        _timeFormat(this: DateTimePicker) {
            const _format = this.data.get('_format');
            if (!_format?.length) {
                return [];
            }
            return _format.slice(3);
        },

        /**
         * 处理 picker 的显示数据
         */
        _pickerData(this: DateTimePicker) {
            const _dateTimeInfo = this.data.get('_dateTimeInfo') || {};
            const _format = this.data.get('_timeFormat');

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
        },

        /**
         * change 时间的描述文本
         */
        _description(this: DateTimePicker) {
            const selectedValue = this.data.get('_selectedValue');
            const format = this.data.get('_format');
            if (!selectedValue) {
                return '';
            }
            const date = buildDateText(selectedValue);
            const formatTwoDigits = (num: number) => (num < 10 ? '0' + num : '' + num);
            const timeSegments: string[] = [];

            format.includes('HH') ? timeSegments.push(formatTwoDigits(selectedValue.getHours()))
                : timeSegments.push('00');
            format.includes('mm') ? timeSegments.push(formatTwoDigits(selectedValue.getMinutes()))
                : timeSegments.push('00');
            format.includes('ss') ? timeSegments.push(formatTwoDigits(selectedValue.getSeconds()))
                : timeSegments.push('00');

            const time = timeSegments.join(':');
            return `${date}${time}`;
        }
    };

    rollingDate: RollingDate;
    selectedText: string;

    inited(): void {
        const {value, range, format = 'YYYY-MM-DD-HH-mm-ss'} = this.data.get();
        const _format = format.split('-');

        this.data.set('_format', _format);

        this.rollingDate = new RollingDate(format, [], false, false);

        const newValue = value ? new Date(value) : new Date(new Date().setHours(0, 0, 0, 0));

        // 构造滚动时间数据
        const result = this.rollingDate.generateRollingDate(newValue, _format);
        this.data.set('_dateTimeInfo', result);
        this.initSelectedValue(value);
        if (range?.length) {
            this.data.set('range', [new Date(range[0].getFullYear(), 0, 1), new Date(range[1].getFullYear(), 11, 1)]);
        }
    }

    attached() {
        this.watch('open', (open: boolean) => {
            if (open) {
                this.initSelectedValue(this.data.get('value'));
                this.fire('open');
            }
            else {
                this.fire('close');
            }
        });
    }

    initData(): DateTimePickerProps {
        return {
            placeholder: '请选择日期',
            format: 'YYYY-MM-DD-HH-mm-ss',
            value: undefined,
            disabled: false,
            open: false,
            range: [],
            _format: [],
            _selectedValue: undefined,
            _dateTimeInfo: {},
            _entryText: '',
            _controlDate: []
        };
    }

    /**
     * 初始化各项值
     * @param value 日期时间
     */
    initSelectedValue(value: Date) {
        let controlDate = [];
        if (value) {
            controlDate = [{
                year: value.getFullYear(),
                month: value.getMonth() + 1
            }];
            this.updateDateTimeInfo(value, this.data.get('_format'));
            const {rangeText} = this.rollingDate.getValueAndRangeText(this.data.get('_dateTimeInfo'), 'single');
            this.data.set('_entryText', rangeText.start);
            this.data.set('_selectedValue', value);
        }
        else {
            const currentDate = new Date();
            controlDate = [
                {
                    year: currentDate.getFullYear(),
                    month: currentDate.getMonth() + 1
                }
            ];
            this.updateDateTimeInfo(new Date(currentDate.setHours(0, 0, 0, 0)), this.data.get('_format'));
            this.data.set('_selectedValue', new Date(new Date().setHours(0, 0, 0, 0)));
        }
        this.selectedText = this.data.get('_entryText') as string;
        this.data.set('_controlDate', controlDate);
    }

    /**
     * 更新 selectedValue 和输入框显示值
     */
    updateSelectedValue() {
        const _dateTimeInfo = this.data.get('_dateTimeInfo');
        const {value,
            rangeText
        } = this.rollingDate.getValueAndRangeText(_dateTimeInfo, 'single');
        this.data.set('_selectedValue', value);
        this.selectedText = rangeText.start;
        this.fire<DateTimePickerEvents['change']>('change', {value});
    }


    updateDateTimeInfo(value: Date, format: string[]) {
        const _dateTimeInfo = this.data.get('_dateTimeInfo');
        Object.keys(_dateTimeInfo).forEach(key => {
            if (format.includes(key) && _dateTimeInfo[key]) {
                _dateTimeInfo[key].selectedIndex = this.rollingDate.dateTimeUnits[key].getSelectedIndex(value);
                _dateTimeInfo[key].startSelectedIndex = this.rollingDate.dateTimeUnits[key].getSelectedIndex(value);
            }
        });
        this.data.set('_dateTimeInfo', {..._dateTimeInfo});
    }
    /**
     * 处理点击输入框上的“上一天”或“下一天”按钮时的动作
     * 当切换日期跨月份时，需同步处理面板日期的展示
     *
     * @param action 动作类型，可选值为 'next'（下一天）或 'prev'（上一天）
     */
    handleClickEntryAction(action: 'next' | 'prev') {
        const value = this.data.get('value');
        if (this.data.get('disabled') || !value) {
            return;
        }
        const offset = action === 'next' ? 1 : -1;
        const newSelectedValue = new Date(value);
        newSelectedValue.setDate(value.getDate() + offset);
        this.data.set('_selectedValue', newSelectedValue);

        // 打开状态，前后切换日期不能关闭面板
        this.handleChangeDate({value: {date: newSelectedValue}});
        this.handleConfirm(!this.data.get('open'));
    }

    /**
     * 点击输入框入口
     */
    handleClickEntry(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('open', true);
    }

    /**
     * 日历选择日期的 change 事件
     */
    handleChangeDate(e: {value: {date: Date}}) {
        let selectedValue = e?.value?.date;

        this.data.set('_selectedValue', selectedValue);
        this.updateDateTimeInfo(selectedValue, ['YYYY', 'MM', 'DD']);
        this.updateSelectedValue();
    }

    /**
     * 处理时间选择器的 change 事件
     */
    handleChangeTime(data: {columnIndex: number, index: number}) {
        const {columnIndex, index} = data;
        const changeListType = this.data.get('_timeFormat')[columnIndex];
        this.data.set('_dateTimeInfo.' + changeListType + '.selectedIndex', index);
        this.data.set('_dateTimeInfo.' + changeListType + '.startSelectedIndex', index);
        this.updateSelectedValue();
    }

    /**
     * 关闭面板
     */
    closePanel() {
        this.data.set('open', false);
    }

    /**
     * 确认选择回调，关闭抽屉
     */
    handleConfirm(close = true) {
        const selectedValue = this.data.get('_selectedValue');
        if (!selectedValue) {
            return;
        }

        this.fire<DateTimePickerEvents['confirm']>('confirm', {
            value: selectedValue
        });
        this.data.set('value', selectedValue);
        if (!this.selectedText) {
            const {rangeText} = this.rollingDate.getValueAndRangeText(this.data.get('_dateTimeInfo'), 'single');
            this.data.set('_entryText', rangeText.start);
        }
        else {
            this.data.set('_entryText', this.selectedText);
        }
        close && this.closePanel();
    }
}
