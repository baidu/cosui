```san export=preview caption=日期选择器-rolling样式单选

import {Component} from 'san';
import DatePicker from '@cosui/cosmic/date-picker';
import './basic.less';

export default class Demo extends Component {
    static template = `
        <div s-if="!isPc" class="cos-row cos-row-col-12 cos-flex-wrap cos-gutter">
            <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日</p>
                <cos-date-picker
                    type="{{type}}"
                    format="{{'YYYY-MM-DD'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日周</p>
                <cos-date-picker
                    type="{{type}}"
                    format="{{'YYYY-MM-DD-WW'}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月</p>
                <cos-date-picker
                    type="{{type}}"
                    format="{{'YYYY-MM'}}"
                    value="{{value}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
            <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年</p>
                <cos-date-picker
                    type="{{type}}"
                    format="{{'YYYY'}}"
                    value="{{value}}"
                    appearance="{{appearance}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
           <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年季度</p>
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
            <div class="cos-col-6">
                <p class="cos-text-subtitle-sm cos-color-text-minor">农历(仅年月日）</p>
                <cos-date-picker
                    class="{{isPc ? '' : ' custom-mobile'}}"
                    appearance="{{appearance}}"
                    lunar="{{true}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-picker>
            </div>
        </div>
        <div s-else>PC无rolling样式</div>
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
            typeRange: 'range',
            value: today,
            disabled: true,
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
        console.log('confirm value', event);
    }

    handleOpen(event) {
        console.log('open');
    }

    handleClose(event) {
        console.log('close');
    }
}

```