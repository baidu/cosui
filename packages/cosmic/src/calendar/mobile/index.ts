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
 * @file Calendar Mobile 实现
 */

import CalendarBase from '../base';

export default class Calendar extends CalendarBase {
    static template = `
        <div class="cos-calendar">
            <div class="cos-calendar-header">
                <div class="cos-calendar-header-day" s-for="text in _weekText">{{text}}</div>
            </div>
            <div s-for="calendar, calendarIndex in _calendarMap" class="cos-calendar-month">
                <slot name="month-header" var-year="calendar.year" var-month="calendar.month">
                    <div class="cos-calendar-month-header">
                        {{calendar.year}} 年 {{calendar.month}} 月
                    </div>
                </slot>
                <div class="cos-calendar-content">
                    <div s-for="week, weekIndex in calendar.monthMatrix" class="cos-calendar-content-week">
                        <div
                            s-for="dayItem, index in week"
                            on-click="handleSelectDate(dayItem)"
                        >
                            <slot name="date" var-dayItem="dayItem">
                                <div class="{{dayItem | getDayItemClasses}}">
                                    {{dayItem | filterDay}}
                                </div>
                            </slot>
                        </div>
                    </div>
                    <div class="cos-calendar-mark">{{calendar.month}}</div>
                </div>
            </div>
        </div>
    `;

    /**
     * 构建日历列表
     */
    buildCalendarMap(value?: Date | Date[]) {
        const validRange = this.data.get('validRange');

        if (!Array.isArray(validRange) || validRange.length !== 2) {
            return;
        }

        const [minDate, maxDate] = validRange;

        let calendarMap = [];
        let currentDate = new Date(minDate);

        while (currentDate <= maxDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;

            calendarMap.push({
                year,
                month,
                monthMatrix: this.buildMonthMatrix(year, month)
            });

            currentDate = new Date(year, month, 1);
        }

        this.data.set('_calendarMap', calendarMap);

        // 以下是初始化选中值
        this.initSelectedValue(value);
    }
}