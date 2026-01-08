```san export=preview caption=日历-范围选择

import {Component} from 'san';
import Calendar from '@cosui/cosmic/calendar';

export default class Demo extends Component {
    static template = `
        <div style="height: 500px; overflow: scroll;">
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本用法</h4>
                <cos-calendar
                    type="{{type}}"
                    disabledDate="{{disabledDate}}"
                    on-change="handleChange"
                >
                </cos-calendar>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">传入预选择值</h4>
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    on-change="handleChange"
                >
                </cos-calendar>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义单元格</h4>
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    on-change="handleChange"
                >
                    <div
                        slot="date"
                        class="cos-calendar-content-day{{
                            dayItem.currentMonth ? '' : ' cos-calendar-content-day-other'
                        }}{{
                            dayItem.disabled ? ' cos-calendar-content-day-disabled' : ''
                        }}{{
                            dayItem.start ? ' cos-calendar-content-day-start' : ''
                        }}{{
                            dayItem.middle ? ' cos-calendar-content-day-middle' : ''
                        }}{{
                            dayItem.end ? ' cos-calendar-content-day-end' : ''
                        }}"
                    >
                        <div class="cos-calendar-content-day-item">
                            <div s-if="!isPc">
                                <div s-if="dayItem.start" class="cos-text-caption-sm">入住</div>
                                <div s-if="dayItem.end" class="cos-text-caption-sm">离店</div>
                            </div>
                            <div>{{dayItem | filterDay}}</div>
                            <div s-if="dayItem.date" class="cos-text-caption-sm">30</div>
                        </div>
                    </div>
                </cos-calendar>
            </div>
            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">指定年月</h4>
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    controlDate="{{controlDate}}"
                    disabledDate="{{disabledDate}}"
                    on-change="handleChange"
                >
                </cos-calendar>
            </div>
        </div>
    `;

    static components = {
        'cos-calendar': Calendar
    };

    static filters = {
        filterDay(dayItem) {
            const {date} = dayItem;
            return (date && date.getDate()) || '';
        }
    };

    initData() {
        return {
            type: 'range',
            value: ''
        };
    }

    inited() {
        this.data.set('value', [new Date(), new Date(new Date().setDate(new Date().getDate() + 2))]);
    }

    handleChange(event) {
        console.log('value', event.value);
    }
}

```