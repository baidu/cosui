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
 * @file Calender Base
 */

import {Component} from 'san';
import {compareDay} from './utils';
import type {CalendarProps, CalendarData, DayItem, CalendarEvents} from './interface';

export default class Calendar extends Component<CalendarData> {

    static filters = {
        filterDay(dayItem: DayItem) {
            const {date} = dayItem;
            return (date && date.getDate()) || '';
        },

        getDayItemClasses(dayItem: DayItem) {
            const baseClass = 'cos-calendar-content-day';
            const conditionalClasses = {
                'selected': dayItem.selected,
                'start': dayItem.start,
                'middle': dayItem.middle,
                'end': dayItem.end,
                'first': dayItem.first,
                'last': dayItem.last,
                'other': !dayItem.currentMonth,
                'disabled': dayItem.disabled,
                'today': dayItem.today,
                'hover-in-range': dayItem.hoverInRange,
                'hover-end': dayItem.hoverEnd
            };

            return Object.entries(conditionalClasses).reduce((classes, [className, condition]) => {
                return condition ? [...classes, `${baseClass}-${className}`] : classes;
            }, [baseClass]).join(' ');
        }
    };

    initData(): CalendarProps {
        return {
            type: 'single',
            disabledDate: () => false,
            validRange: [new Date(), new Date(new Date().getFullYear(), new Date().getMonth() + 6, 0)],
            _selectedDate: undefined,
            _calendarMap: undefined,
            _weekText: ['日', '一', '二', '三', '四', '五', '六'],
            _currentHoverDate: undefined
        };
    }

    inited(): void {
        const value = this.data.get('value');
        this.buildCalendarMap(value);
    }

    attached(): void {

        this.watch('value', val => {
            val && this.buildCalendarMap(val);
        });
    }

    detached(): void {
        this.data.set('_calendarMap', []);
    }

    /**
     * 日历构建基类方法
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buildCalendarMap(_value?: Date | Date[]) {}

    /**
     * 更新日历列表
     *
     * @param selectedDayItems
     */
    updateCalendarMap(selectedDayItems: DayItem[], disableBeforeStart: boolean = false) {
        const currentCalendarMap = this.data.get('_calendarMap');
        const disabledDate = this.data.get('disabledDate');
        const isRange = this.data.get('type') === 'range';

        const calendarMap = currentCalendarMap.map(item => {
            return {
                ...item,
                monthMatrix: [...item?.monthMatrix.map(row => {
                    return row.map((item: DayItem) => {
                        for (let selectedDayItem of selectedDayItems) {
                            if (compareDay(selectedDayItem.date, item.date) === 0) {
                                return {
                                    ...item,
                                    ...selectedDayItem,
                                    currentMonth: item.currentMonth
                                };
                            }
                        }
                        let disable = disabledDate(item.date);
                        let compareResult = compareDay(item.date, selectedDayItems[0].date);

                        if (isRange && selectedDayItems.length === 1 && disableBeforeStart && compareResult) {
                            disable = disable || compareResult > 0;
                        }

                        return {
                            ...item,
                            selected: false,
                            start: false,
                            middle: false,
                            end: false,
                            disabled: disable,
                            hoverInRange: false,
                            hoverEnd: false
                        };
                    });
                })]
            };
        });

        this.data.set('_calendarMap', calendarMap);
    }

    /**
     * 重置日历列表状态
     */
    resetCalendarMap() {
        const currentCalendarMap = this.data.get('_calendarMap');

        const calendarMap = currentCalendarMap.map(item => {
            return {
                ...item,
                monthMatrix: [...item?.monthMatrix.map(row => {
                    return row.map((item: DayItem) => {
                        return {
                            ...item,
                            selected: false,
                            start: false,
                            middle: false,
                            end: false,
                            hoverInRange: false,
                            hoverEnd: false
                        };
                    });
                })]
            };
        });

        this.data.set('_calendarMap', calendarMap);
    }

    /**
     * 选择日期
     *
     * @param dayItem 当前日期
     */
    handleSelectDate(dayItem: DayItem) {
        if (dayItem.disabled || !dayItem.currentMonth) {
            return;
        }

        if (dayItem.selected) {
            return;
        }

        // 范围选择
        if (this.data.get('type') === 'range') {
            this.handleSelectRange(dayItem);
            return;
        }

        // 单选
        const newDayItem = {
            ...dayItem,
            selected: true
        };

        this.updateCalendarMap([newDayItem]);

        this.fire<CalendarEvents['change']>('change', {
            value: newDayItem
        });
    }

    /**
     * 选择范围日期
     *
     * @param dayItem 当前日期
     */
    handleSelectRange(dayItem: DayItem) {
        let selectedDate = this.data.get('_selectedDate') || [];

        // 选择开始日期
        if (selectedDate.length === 0 || selectedDate.length === 2) {
            const newDayItem = {
                ...dayItem,
                start: true,
                middle: false,
                end: false
            };

            selectedDate = [newDayItem];
            this.updateCalendarMap([newDayItem]);
            this.data.set('_selectedDate', selectedDate);
            this.fire<CalendarEvents['change']>('change', {value: selectedDate});
            return;
        }

        // 选择结束日期
        if (selectedDate.length === 1) {
            let startDayItem = selectedDate[0];
            const startDate = new Date(startDayItem.date);
            const currentDate = new Date(dayItem.date);

            if (startDate > currentDate) {
                const temp = {...startDayItem};

                startDayItem = {
                    ...dayItem,
                    start: true,
                    middle: false,
                    end: false
                };

                dayItem = {
                    ...temp,
                    start: false,
                    middle: false,
                    end: true
                };

                selectedDate.unshift(startDayItem);
            }
            else {
                dayItem = {
                    ...dayItem,
                    start: false,
                    middle: false,
                    end: true
                };

                selectedDate.push(dayItem);
            }

            const middleDayItems = this.getMiddleDayItems(startDayItem.date, dayItem.date);

            this.data.set('_selectedDate', selectedDate);
            this.updateCalendarMap([startDayItem, ...middleDayItems, dayItem]);

            this.fire<CalendarEvents['change']>('change', {value: selectedDate});
        }
    }

    /**
     * 获取中间日期项
     *
     * @param startDate 开始日期
     * @param endDate 结束日期
     */
    getMiddleDayItems(startDate: Date, endDate: Date) {
        const middleDayItems: DayItem[] = [];
        const date = new Date(startDate);
        date.setDate(date.getDate() + 1);

        while (compareDay(date, endDate) === 1) {
            let middleItem = {
                date: new Date(date),
                middle: true
            };

            middleDayItems.push(middleItem);
            date.setDate(date.getDate() + 1);
        }

        return middleDayItems;
    }

    /**
     * 获取本月 & 相邻月份的天数
     *
     * @param year 年份
     * @param month 月份
     */
    getMonthDays(year: number, month: number) {
        // 确保月份在1-12范围内
        month = ((month - 1) % 12 + 12) % 12 + 1;

        // 辅助函数：获取指定年月的天数
        const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

        // 计算上个月、当前月和下个月的年份和月份
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;

        return {
            prevMonthDays: getDaysInMonth(prevYear, prevMonth),
            currentMonthDays: getDaysInMonth(year, month),
            nextMonthDays: getDaysInMonth(nextYear, nextMonth)
        };
    }

    /**
     * 构建月份日期矩阵
     *
     * @param year 年份
     * @param month 月份
     * @param fillMonth 是否填充(前后)月份日期
     */
    buildMonthMatrix(year: number, month: number, fillMonth: boolean = false) {
        const {
            prevMonthDays,
            currentMonthDays,
            nextMonthDays
        } = this.getMonthDays(year, month);

        const disabledDate = this.data.get('disabledDate');

        let matrixRow = 5;
        let matrixCol = 7;

        // 获取本月第一天是星期几，对应的位置
        const startDay = new Date(year, month - 1, 1).getDay();

        // 计算月份矩阵行数为 5 或 6
        if ((currentMonthDays === 30 && startDay === 6) || (currentMonthDays === 31 && startDay >= 5) || fillMonth) {
            matrixRow = 6;
        }

        const matrix = Array(matrixRow).fill('').map(() => Array(matrixCol).fill(null));

        let date = 1;
        let nextMonthDate = 1;

        for (let i = 0; i < matrixRow; i++) {
            for (let j = 0; j < matrixCol; j++) {
                // 填充上个月的日期
                if (i === 0 && j < startDay) {
                    matrix[i][j] = {
                        date: fillMonth && new Date(
                            month === 1 ? year - 1 : year,
                            month === 1 ? 12 : month - 2,
                            prevMonthDays - startDay + j + 1
                        ),
                        currentMonth: false
                    };
                }
                // 填充下个月的日期
                else if (date > currentMonthDays) {
                    matrix[i][j] = {
                        date: fillMonth && new Date(
                            month === 12 ? year + 1 : year,
                            month === 12 ? 1 : month,
                            nextMonthDate
                        ),
                        currentMonth: false
                    };
                    nextMonthDate++;
                    // 确保不超过下个月天数
                    if (nextMonthDate > nextMonthDays) {
                        nextMonthDate = 1;
                    }
                }
                // 填充当月的日期
                else {
                    const currentDate = new Date(year, month - 1, date);

                    matrix[i][j] = {
                        date: currentDate,
                        currentMonth: true,
                        today: compareDay(new Date(), currentDate) === 0,
                        first: date === 1,
                        last: date === currentMonthDays,
                        disabled: disabledDate(currentDate)
                    };
                    date++;
                }
            }
        }

        return matrix;
    }

    /**
     * 初始化选中值
     */
    initSelectedValue(value?: Date | Date[]) {
        if (!value) {
            return;
        }

        if (this.data.get('type') === 'range') {

            if (!Array.isArray(value) || value.length !== 2) {
                return;
            }

            const [startDate, endDate] = value;

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
            ]);

            this.data.set('_selectedDate', [startDayItem, endDayItem]);

            return;
        }

        let selectedDate = new Date(value as Date);

        let selectedData = {
            date: selectedDate,
            selected: true
        };

        this.data.set('_selectedDate', [selectedData]);

        this.updateCalendarMap([selectedData]);
    }
}
