```san export=preview caption=日历-单选

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
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-calendar>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">传入预选择值</h4>
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-calendar>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义单元格</h4>
                <cos-calendar
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                    <div
                        slot="date"
                        class="cos-calendar-content-day{{
                            dayItem.currentMonth ? '' : ' cos-calendar-content-day-other'
                        }}{{
                            dayItem.selected ? ' cos-calendar-content-day-selected' : ''
                        }}{{
                            dayItem.disabled ? ' cos-calendar-content-day-disabled' : ''
                        }}"
                    >
                        <div class="cos-calendar-content-day-item">
                            <div s-if="!isPc && dayItem.selected" class="cos-text-caption-sm">
                                入住
                            </div>
                            <div>{{dayItem | filterDay}}</div>
                            <div s-if="dayItem.date" class="cos-text-caption-sm">304</div>
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
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
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
            type: 'single',
            value: '',
            disabledDate: date => date > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
            controlDate: undefined
        };
    }

    inited() {
        this.data.set('value', new Date());
    }

    attached() {
        setTimeout(() => {
            this.data.set('controlDate', [{year: 2024, month: 10}]);
        }, 1000);
    }

    handleChange(event) {
        console.log('value', event.value);
    }
}

```