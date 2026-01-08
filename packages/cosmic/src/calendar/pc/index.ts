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
 * @file Calendar PC 实现
 */

import CalendarBase from '../base';
import {DayItem} from '../interface';
import {isBetweenDate} from '../utils';

export default class Calendar extends CalendarBase {
    static template = `
        <div class="cos-calendar">
            <div s-for="calendar, calendarIndex in _calendarMap" class="cos-calendar-month">
                <div class="cos-calendar-header">
                    <div class="cos-calendar-header-day" s-for="text in _weekText">{{text}}</div>
                </div>
                <div class="cos-calendar-content">
                    <div s-for="week, weekIndex in calendar.monthMatrix" class="cos-calendar-content-week">
                        <div
                            s-for="dayItem, index in week"
                            on-click="handleSelectDate(dayItem)"
                            on-mouseenter="handleDayItemEntry(dayItem)"
                            on-mouseleave="handleDayItemLeave(dayItem)"
                        >
                            <slot name="date" var-dayItem="dayItem">
                                <div class="{{dayItem | getDayItemClasses}}">
                                    <div class="cos-calendar-content-day-item">{{dayItem | filterDay}}</div>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    attached(): void {
        this.watch('value', val => {
            this.updateSelectedDate(val);
        });

        this.watch('controlDate', val => {
            val && this.setControlDate(val);
        });
    }

    /**
     * 设置年月用于重新构建月份矩阵
     */
    setControlDate(controlDate: Array<{year: number, month: number}>) {
        const calendarMap = this.data.get('_calendarMap');

        const newCalendarMap = calendarMap.map((item: any, index: number) => {
            const {year, month} = controlDate[index];

            return {
                ...item,
                year,
                month,
                monthMatrix: this.buildMonthMatrix(year, month, true)
            };
        });

        this.data.set('_calendarMap', newCalendarMap);

        const selectedDate = this.data.get('_selectedDate');

        if (!selectedDate) {
            return;
        }

        if (this.data.get('type') === 'range' && selectedDate.length === 2) {
            const middleDayItems = this.getMiddleDayItems(selectedDate[0].date, selectedDate[1].date);
            this.updateCalendarMap([selectedDate[0], ...middleDayItems, selectedDate[1]], true);
            return;
        }

        this.updateCalendarMap(selectedDate, true);
    }

    /**
     * 构建日历列表
     */
    buildCalendarMap(value?: Date | Date[]) {
        let calendarMap = [];
        let values = [new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 1)];

        if (value) {
            values = Array.isArray(value) ? value : [value];
        }

        // pc 默认多选展示两个月份矩阵，单选展示一个月份矩阵
        let calendarCnt = 1;

        if (this.data.get('type') === 'range') {
            calendarCnt = 2;
        }

        for (let i = 0; i < calendarCnt; i++) {
            let currentDate = values[i];

            let year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;

            if (i > 0 && values[i - 1].getMonth() === currentDate.getMonth()) {
                month += 1;
            }

            calendarMap.push({
                year,
                month,
                monthMatrix: this.buildMonthMatrix(year, month, true)
            });
        }

        this.data.set('_calendarMap', calendarMap);

        // 以下是初始化选中值
        this.initSelectedValue(value);
    }

    updateSelectedDate(value?: Date | Date[]) {
        this.resetCalendarMap();
        if (!value) {
            return;
        }

        if (this.data.get('type') === 'range') {

            if (!Array.isArray(value)) {
                return;
            }

            const [startDate, endDate] = value;

            if (endDate) {
                const middleDayItems = this.getMiddleDayItems(startDate, endDate);

                const startDayItem = {
                    date: startDate,
                    start: true
                };

                const endDayItem = {
                    date: endDate,
                    end: true
                };

                this.updateCalendarMap([
                    startDayItem,
                    ...middleDayItems,
                    endDayItem
                ], true);
                this.data.set('_selectedDate', [startDayItem, endDayItem]);

            }
            else {
                const startDayItem = {
                    date: startDate,
                    start: true
                };

                this.updateCalendarMap([
                    startDayItem
                ], true);
                this.data.set('_selectedDate', [startDayItem]);

            }

            return;
        }

        let selectedDate = new Date(value as Date);

        let selectedData = {
            date: selectedDate,
            selected: true
        };

        this.data.set('_selectedDate', [selectedData]);

        this.updateCalendarMap([selectedData], true);
    }

    handleDayItemEntry(dayItem: DayItem) {
        let isRange = this.data.get('type') === 'range';
        let _selectedValue = this.data.get('_selectedValue');

        if (!isRange || (Array.isArray(_selectedValue) && _selectedValue.length !== 1)) {
            return;
        }
        if (dayItem.disabled) {
            this.data.set('_currentHoverDate', null);
            return;
        }
        this.data.set('_currentHoverDate', dayItem.date);
        this.updateCalendarHoverStatus();
    }

    handleDayItemLeave() {
        let isRange = this.data.get('type') === 'range';
        if (!isRange) {
            return;
        }
        let _currentHoverDate = this.data.get('_currentHoverDate');
        _currentHoverDate && this.data.set('_currentHoverDate', null);
        this.updateCalendarHoverStatus();
    }

    /**
     * 更新日历日期的悬停状态
     */
    updateCalendarHoverStatus() {
        let _currentHoverDate = this.data.get('_currentHoverDate');
        let currentCalendarMap = this.data.get('_calendarMap');
        let isRange = this.data.get('type') === 'range';
        let _selectedDate = this.data.get('_selectedDate');
        if (!_currentHoverDate || !isRange || !Array.isArray(_selectedDate) || _selectedDate.length !== 1) {
            return;
        }
        const calendarMap = currentCalendarMap.map((item: {monthMatrix: DayItem[][]}) => {
            return {
                ...item,
                monthMatrix: [...item?.monthMatrix.map((row: DayItem[]) => {
                    return row.map((item: DayItem) => {

                        return {
                            ...item,
                            hoverInRange: isBetweenDate(_selectedDate[0].date, _currentHoverDate, item.date),
                            hoverEnd: _currentHoverDate.getTime() === item.date.getTime()
                        };
                    });
                })]
            };
        });

        this.data.set('_calendarMap', calendarMap);

    }
}