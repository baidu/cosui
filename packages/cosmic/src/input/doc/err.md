```san export=preview caption=错误信息提示（错误提示样式已提供，可直接使用）
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <div>
                <cos-input
                    placeholder="请输入数字"
                    on-input="validateValue"
                />
                <span s-if="errMsg" class="cos-input-err cos-block">{{errMsg}}</span>
            </div>
            <div class="cos-space-mt-md">
                <cos-input
                    placeholder="请输入数字"
                    appearance="filled"
                    on-input="validateValue1"
                />
                <span s-if="errMsg1" class="cos-input-err cos-block">{{errMsg1}}</span>
            </div>
        </template>
    `;

    static components = {
        'cos-input': Input
    };

    initData() {
        return {
            errMsg: '',
            errMsg1: ''
        }
    }

    validateValue(obj) {
        const {value} = obj;
        if (!/^\d+$/.test(value)) {
            this.data.set('errMsg', value ? '请输入数字！' : '');
        }
    }

    validateValue1(obj) {
        const {value} = obj;
        if (!/^\d+$/.test(value)) {
            this.data.set('errMsg1', value ? '请输入数字！' : '');
        }
    }
}

```
