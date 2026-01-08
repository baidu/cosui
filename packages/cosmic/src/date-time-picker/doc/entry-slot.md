```san export=preview caption=自定义入口

import {Component} from 'san';
import DateTimePicker from '@cosui/cosmic/date-time-picker';
import Input from '@cosui/cosmic/input';

export default class SlotDemo extends Component {
    static template = `
        <div class="cos-row cos-row-col-12 cos-flex-wrap cos-gutter">
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分秒-使用 entry slot</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm-ss'}}"
                    title="{{title}}"
                    value="{{value}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                    <cos-input slot="entry" value="{{entryValue}}"/>
                </cos-date-time-picker>
            </div>
        </div>
    `;

    static components = {
        'cos-date-time-picker': DateTimePicker,
        'cos-input': Input
    };

    initData() {
        return {
            value: new Date(),
            entryValue: '',
            title: '日期选择器',
            format: 'YYYY-MM-DD-HH-mm-ss',
            placeholder: '请选择日期时间'
        };
    }

    handleChange(event) {
        console.log('change value', event.value);
    }

    handleConfirm({value}) {
        console.log('confirm value', value);
        const pad = (n) => (n < 10 ? '0' + n : n);
        const time = [];
        const date = [];
        date.push(value.getFullYear());
        date.push(pad(value.getMonth() + 1));
        date.push(pad(value.getDate()));
        time.push(pad(value.getHours()));
        time.push(pad(value.getMinutes()));
        time.push(pad(value.getSeconds()));
        this.data.set('entryValue', date.join('/') + ' ' + time.join(':'));
    }

    handleOpen(event) {
        console.log('open');
    }
    handleClose(event) {
        console.log('close');
    }

}

```