```san export=preview caption=日期选择器-rolling样式-范围选择

import {Component} from 'san';
import DatePicker from '@cosui/cosmic/date-picker';
import './basic.less';

export default class Demo extends Component {
    static template = `
        <div s-if="!isPc" class="cos-row cos-row-col-12 cos-flex-wrap cos-gutter">
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    value={{value}}
                    format="{{'YYYY-MM-DD'}}"
                    range="{{range}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'YYYY-MM'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">月日范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'MM-DD'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年季度范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'YYYY-QQ'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'YYYY'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">月范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'MM'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">日范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'DD'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">季度范围选择</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    type="{{type}}"
                    format="{{'QQ'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
        </div>
        <div s-else>PC无rolling-范围选择样式</div>
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
            type: 'range',
            value: [new Date(), new Date(new Date().setDate(day + 2))],
            disabled: true,
            placeholder: {
                start: '开始日期',
                end: '结束日期'
            },
            range: [new Date('2018'), new Date('2028')],
            disabledDate: date => date > new Date(year, month, day + 1),
            title: '日期选择器',
            appearance: 'rolling',
            format: 'YYYY-MM-DD',
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