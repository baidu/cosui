```san export=preview caption=日期选择-范围选择

import {Component} from 'san';
import DatePicker from '@cosui/cosmic/date-picker';
import './basic.less';

export default class Demo extends Component {
    static template = `
        <div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本用法</h4>
                <cos-date-picker
                    type="{{type}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    range="{{range}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">传入预选择值</h4>
                <cos-date-picker
                    type="{{type}}"
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    range="{{range}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">禁用入口 disabled</h4>
                <cos-date-picker
                    type="{{type}}"
                    value="{{value}}"
                    disabled="{{disabled}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    range="{{range}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义单元格</h4>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    range="{{range}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                    <div
                        slot="date"
                        class="custom-day{{
                            dayItem.currentMonth ? '' : ' custom-day-other'
                        }}{{
                            dayItem.selected ? ' custom-day-selected' : ''
                        }}{{
                            dayItem.disabled ? ' custom-day-disabled' : ''
                        }}{{
                            dayItem.start ? ' custom-day-start' : ''
                        }}{{
                            dayItem.middle ? ' custom-day-middle' : ''
                        }}{{
                            dayItem.end ? ' custom-day-end' : ''
                        }}"
                    >
                        <div s-if="!isPc">
                            <div s-if="dayItem.start" class="cos-text-caption-sm">入住</div>
                            <div s-if="dayItem.end" class="cos-text-caption-sm">离店</div>
                        </div>
                        <div>{{dayItem | filterDay}}</div>
                        <div s-if="dayItem.date" class="cos-text-caption-sm">304</div>
                    </div>
                </cos-date-picker>
            </div>
            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义头部 & 年月部分</h4>
                <cos-date-picker
                    type="{{type}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    range="{{range}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                    <div slot="header" class="cos-text-body cos-color-text-primary cos-space-p-xs">
                        * 所选日期均为出发地日期，价格频繁变动以实际价格为准
                    </div>
                    <div slot="month-header" class="cos-flex cos-items-center cos-space-p-xs cos-text-headline-sm">
                        {{year}}年{{month}}月
                        <span
                            class="cos-color-bg-warning-light cos-color-text-warning cos-space-ml-3xs cos-space-pl-3xs cos-space-pr-3xs cos-rounded-xxs"
                            style="font-weight: var(--cos-font-medium); font-size: 11px;"
                        >
                            中秋请3休8
                        </span>
                    </div>
                </cos-date-picker>
            </div>
        </div>
    `;

    static components = {
        'cos-date-picker': DatePicker
    };

    static filters = {
        filterDay(dayItem) {
            const {date} = dayItem;
            return (date && date.getDate()) || '';
        }
    };

    initData() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let date = today.getDate();
        return {
            type: 'range',
            value: [new Date(), new Date(new Date().setDate(date + 2))],
            disabled: true,
            disabledDate: date => date > new Date(year, month, date + 3),
            title: '选择日期',
            placeholder: ['开始日期', '结束日期'],
            range: [new Date(), new Date(new Date().setMonth(month + 6))]
        };
    }

    handleChange(event) {
        console.log('change value', event.value);
    }

    handleConfirm(event) {
        console.log('confirm value', event.value);
    }

    handleOpen(event) {
        console.log('open');
    }

    handleClose(event) {
        console.log('close');
    }
}

```