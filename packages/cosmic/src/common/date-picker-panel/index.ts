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
 * @file DatePicker 组件面板
 */
import {Component} from 'san';
import Calendar from '@cosui/cosmic/calendar';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import {DatePickerPanelProps, DatePickerPanelEvents, DayItem} from './interface';

export default class DatePickerPanel extends Component<DatePickerPanelProps> {
    static template = `
        <template>
            <div class="cos-date-picker-header">
                <fragment s-for="item, index in controlDate">
                    <div class="cos-date-picker-header-item">
                        <div
                            on-click="jumpToYear(index, 'prev')"
                            class="cos-date-picker-header-item-icon{{
                                headerAction[index].prevYear ? '' : ' cos-date-picker-header-item-icon-disabled'}}"
                        >
                            <cos-icon name="chevron-left" />
                        </div>
                        <div
                            on-click="jumpToMonth(index, 'prev')"
                            class="cos-date-picker-header-item-icon{{
                                headerAction[index].prevMonth ? '' : ' cos-date-picker-header-item-icon-disabled'}}"
                        >
                            <cos-icon name="left" />
                        </div>
                        <div class="cos-date-picker-header-item-text">
                            {{item.year}} - {{item.month}}
                        </div>
                        <div
                            on-click="jumpToMonth(index, 'next')"
                            class="cos-date-picker-header-item-icon{{
                                headerAction[index].nextMonth ? '' : ' cos-date-picker-header-item-icon-disabled'}}"
                        >
                            <cos-icon name="right" />
                        </div>
                        <div
                            on-click="jumpToYear(index, 'next')"
                            class="cos-date-picker-header-item-icon{{
                                headerAction[index].nextYear ? '' : ' cos-date-picker-header-item-icon-disabled'}}"
                        >
                            <cos-icon name="chevron-right" />
                        </div>
                    </div>
                </fragment>
            </div>
            <div class="cos-date-picker-content">
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    controlDate="{{controlDate}}"
                    on-change="handleChange"
                >
                    <div slot="date">
                        <slot name="date" var-dayItem="dayItem">
                            <div class="{{dayItem | getDayItemClasses}}">
                                <div class="cos-calendar-content-day-item">
                                    {{dayItem | filterDay}}
                                </div>
                            </div>
                        </slot>
                    </div>
                </cos-calendar>
            </div>
        </template>
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

    static components = {
        'cos-calendar': Calendar,
        'cos-button': Button,
        'cos-icon': Icon
    };

    static computed = {
        /**
         * 处理 header action 是否可点
         */
        headerAction(this: DatePickerPanel) {
            const range = this.data.get('range');
            const controlDate = this.data.get('controlDate');
            if (!controlDate?.length) {
                return;
            }

            if (!range?.length) {
                return [
                    {prevYear: true, nextYear: true, prevMonth: true, nextMonth: true},
                    {prevYear: true, nextYear: true, prevMonth: true, nextMonth: true}
                ];
            }
            const startYear = range[0].getFullYear();
            const endYear = range[1].getFullYear();
            const startMonth = range[0].getMonth() + 1;
            const endMonth = range[1].getMonth() + 1;
            const action = [];
            for (let i = 0; i < controlDate.length; i++) {
                const item = controlDate[i];
                action.push({
                    prevYear: item.year - 1 > startYear || (item.year - 1 === startYear && item.month >= startMonth),
                    nextYear: item.year + 1 < endYear || (item.year + 1 === endYear && item.month <= endMonth),
                    prevMonth: item.year > startYear || (item.year === startYear && item.month > startMonth + i),
                    nextMonth: item.year < endYear || (item.year === endYear
                        // type 为 range，即 controlDate.length 为 2 时，左边面板要多预留 1 个月以供右边面板展示，避免右边面板超出有效日期范围
                        && item.month < endMonth - controlDate.length + i + 1)
                });
            }
            return action;
        }
    };

    initData(): DatePickerPanelProps {
        return {
            type: 'single',
            value: undefined,
            disabledDate: () => false,
            range: [],
            controlDate: []
        };
    }

    /**
     * 跳转到相邻月份
     *
     * @param index 指定面板的索引，type = range时，index=0表示开始日期面板，index=1表示结束日期面板
     * @param direction 跳转方向（'prev'表示向前跳转，'next'表示向后跳转）
     */
    jumpToMonth(index: number, direction: 'prev' | 'next') {
        const headerAction = this.data.get('headerAction');
        if (!headerAction?.[index]?.[`${direction}Month`]) {
            return;
        }
        const controlDate = this.data.get('controlDate');
        let newControlDate = [];
        let step = direction === 'next' ? 1 : -1;

        if (this.data.get('type') === 'range') {
            if (!Array.isArray(controlDate) || controlDate.length !== 2) {
                return;
            }
            const startDate = new Date(controlDate[0].year, controlDate[0].month - 1);
            const endDate = new Date(controlDate[1].year, controlDate[1].month - 1);
            if (direction === 'next' && index === 1) {
                endDate.setMonth(endDate.getMonth() + step);
            }
            if (direction === 'prev' && index === 0) {
                startDate.setMonth(startDate.getMonth() + step);
            }
            if (direction === 'next' && index === 0) {
                startDate.setMonth(startDate.getMonth() + step);
                startDate >= endDate && endDate.setMonth(endDate.getMonth() + step);
            }
            if (direction === 'prev' && index === 1) {
                endDate.setMonth(endDate.getMonth() + step);
                startDate >= endDate && startDate.setMonth(startDate.getMonth() + step);
            }
            newControlDate = [
                {year: startDate.getFullYear(), month: startDate.getMonth() + 1},
                {year: endDate.getFullYear(), month: endDate.getMonth() + 1}
            ];
        }
        else {
            if (!Array.isArray(controlDate) || controlDate.length !== 1) {
                return;
            }
            let newDate = new Date(controlDate[0].year, controlDate[0].month - 1);
            newDate.setMonth(newDate.getMonth() + step);
            newControlDate = [{year: newDate.getFullYear(), month: newDate.getMonth() + 1}];
        }

        this.data.set('controlDate', newControlDate);
    }

    /**
     * 跳转到相邻年份
     *
     * @param index 指定面板的索引，type = range时，index=0表示开始日期面板，index=1表示结束日期面板
     * @param direction 跳转方向（'prev'表示向前跳转，'next'表示向后跳转）
     */
    jumpToYear(index: number, direction: 'prev' | 'next') {
        const headerAction = this.data.get('headerAction');
        if (!headerAction?.[index]?.[`${direction}Year`]) {
            return;
        }
        const controlDate = this.data.get('controlDate');
        let newControlDate = [];
        let step = direction === 'next' ? 1 : -1;

        if (this.data.get('type') === 'range') {
            if (!Array.isArray(controlDate) || controlDate.length !== 2) {
                return;
            }
            let startDate = new Date(controlDate[0].year, controlDate[0].month - 1);
            let endDate = new Date(controlDate[1].year, controlDate[1].month - 1);
            if (direction === 'next' && index === 1) {
                endDate.setFullYear(endDate.getFullYear() + step);
            }
            if (direction === 'prev' && index === 0) {
                startDate.setFullYear(startDate.getFullYear() + step);
            }
            if (direction === 'next' && index === 0) {
                startDate.setFullYear(startDate.getFullYear() + step);
                if (startDate >= endDate) {
                    endDate = new Date(startDate);
                    endDate.setMonth(endDate.getMonth() + step);
                }
            }
            if (direction === 'prev' && index === 1) {
                endDate.setFullYear(endDate.getFullYear() + step);
                if (startDate >= endDate) {
                    startDate = new Date(endDate);
                    startDate.setMonth(startDate.getMonth() + step);
                }
            }
            newControlDate = [
                {year: startDate.getFullYear(), month: startDate.getMonth() + 1},
                {year: endDate.getFullYear(), month: endDate.getMonth() + 1}
            ];
        }
        else {
            if (!Array.isArray(controlDate) || controlDate.length !== 1) {
                return;
            }
            let newDate = new Date(controlDate[0].year, controlDate[0].month - 1);
            newDate.setFullYear(newDate.getFullYear() + step);
            newControlDate = [{year: newDate.getFullYear(), month: newDate.getMonth() + 1}];
        }

        this.data.set('controlDate', newControlDate);
    }

    /**
     * 日期选择回调
     */
    handleChange(e: {value: {date: Date | Date[]}}) {
        this.fire<DatePickerPanelEvents['change']>('change', e);
    }
}

