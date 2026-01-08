```san export=preview caption=基本用法

import {Component} from 'san';
import DateTimePicker from '@cosui/cosmic/date-time-picker';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {
    static template = `
        <div class="cos-row cos-row-col-12 cos-flex-wrap cos-gutter">
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分秒</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm-ss'}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-time-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm'}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-time-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH'}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-time-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分秒</p>
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
                </cos-date-time-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">限定有效日期</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm-ss'}}"
                    title="{{title}}"
                    value="{{value}}"
                    range="{{range}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                >
                </cos-date-time-picker>
            </div>
            <div class="cos-col-12">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分秒-受控打开面板</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm-ss'}}"
                    title="{{title}}"
                    value="{{value}}"
                    open="{=open=}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                    on-open="handleOpen"
                    on-close="handleClose"
                />
                <cos-button class="cos-space-mt-sm" on-click="openClick">打开面板</cos-button>
            </div>
            <div class="cos-col-12" s-if="!isPc">
                <p class="cos-text-subtitle-sm cos-color-text-minor">年月日时分(农历）</p>
                <cos-date-time-picker
                    format="{{'YYYY-MM-DD-HH-mm'}}"
                    value="{{value}}"
                    title="{{title}}"
                    lunar="{{true}}"
                    placeholder="{{placeholder}}"
                    on-change="handleChange"
                    on-confirm="handleConfirm"
                >
                </cos-date-time-picker>
            </div>
        </div>
    `;

    static components = {
        'cos-date-time-picker': DateTimePicker,
        'cos-button': Button
    };

    initData() {
        return {
            value: new Date(),
            title: '日期选择器',
            format: 'YYYY-MM-DD-HH-mm-ss',
            placeholder: '请选择日期时间',
            range: [new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1))],
        };
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

    openClick(){
        this.data.set('open', true);
    }

    handleClose(event) {
        console.log('close');
    }
}

```