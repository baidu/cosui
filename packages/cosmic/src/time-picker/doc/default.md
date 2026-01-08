``` san export=preview caption=TimerPicker-示例
import {Component} from 'san';
import TimePicker from '@cosui/cosmic/time-picker';

export default class Default extends Component {

    static template = `
    <div>
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">时分秒</h4>
            <cos-time-picker
                type="{{type}}"
                format="{{'HH-mm-ss'}}"
                on-close="handleClose"
                on-change="handleChange"
                on-confirm="handleConfirm"
            >
            </cos-time-picker>
        </div>
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">时分</h4>
            <cos-time-picker
                type="{{type}}"
                format="{{'HH-mm'}}"
                on-close="handleClose"
                on-change="handleChange"
                on-confirm="handleConfirm"
            >
            </cos-time-picker>
        </div>
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">时</h4>
            <cos-time-picker
                type="{{type}}"
                format="{{'HH'}}"
                on-close="handleClose"
                on-change="handleChange"
                on-confirm="handleConfirm"
            >
            </cos-time-picker>
        </div>
    </div>
    `;

    static components = {
        'cos-time-picker': TimePicker
    };

    initData() {
        return {
            type:'single',
            format: 'HH-mm',
        };
    }
    handleChange(date) {
        console.log('handleChange', date);
    }
    handleClose() {
        this.data.set('open', false);
    }
    handleConfirm(data) {
        console.log('handleConfirm', data);
        this.data.set('open', false);
    }
}

```