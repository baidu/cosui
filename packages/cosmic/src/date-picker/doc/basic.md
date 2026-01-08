```san export=preview caption=日期选择器-单选

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
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
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
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">限定有效日期</h4>
                <cos-date-picker
                    type="{{type}}"
                    range="{{range}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
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
                        }}"
                    >
                        <div s-if="!isPc && dayItem.selected" class="cos-text-caption-sm">
                            入住
                        </div>
                        <div>{{dayItem | filterDay}}</div>
                        <div
                            s-if="dayItem.date"
                            class="cos-text-caption-sm cos-color-text-minor {{dayItem.selected ? ' cos-color-text-inverse' : ''}}"
                            style="font-family: 'PingFang SC';"
                        >
                            304
                        </div>
                    </div>
                </cos-date-picker>
            </div>
            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">自定义头部 & 年月部分</h4>
                <cos-date-picker
                    value="{{value}}"
                    disabledDate="{{disabledDate}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                    <div slot="header" class="cos-flex cos-text-body cos-space-p-xs" style="overflow: scroll;">
                        <div
                            s-for="item in shortcuts"
                            on-click="handleClick(item)"
                            class="custom-shortcut-item cos-color-bg-dent cos-rounded-sm cos-space-pl-sm cos-space-pr-sm cos-space-pt-xs cos-space-pb-xs cos-space-mr-xxs"
                        >
                            {{item.label}}
                        </div>
                    </div>
                    <div slot="month-header" class="cos-flex cos-items-center cos-space-p-xs cos-text-headline-sm">
                        {{year}}年{{month}}月
                        <span
                            class="cos-color-bg-warning-light cos-color-text-warning cos-space-ml-3xs cos-space-pl-3xs cos-space-pr-3xs cos-rounded-xxs"
                            style="font-weight: 500; font-size: 11px;"
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
        let day = today.getDate();
        return {
            type: 'single',
            value: today,
            disabled: true,
            disabledDate: date => date > new Date(year, month, day + 1),
            title: '选择日期',
            placeholder: '请选择日期',
            range: [today, new Date(new Date().setMonth(month + 6))],
            shortcuts: [
                {
                    label: '今天',
                    value: today
                },
                {
                    label: '明天',
                    value: new Date(year, month, day + 1)
                },
                {
                    label: '下个月明天',
                    value: new Date(year, month + 1, day + 1)
                },
                {
                    label: '下个月今天',
                    value: new Date(year, month + 1, day)
                },
                {
                    label: '后天',
                    value: new Date(year, month, day + 2)
                },
            ]
        };
    }

    handleClick(item) {
        const {value} = item;
        this.data.set('value', value);
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