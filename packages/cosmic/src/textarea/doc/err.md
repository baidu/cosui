```san export=preview caption=错误信息提示（错误信息提示样式已提供，可直接使用）
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <template>
            <cos-textarea
                placeholder="请输入数字"
                appearance="filled"
                on-input="validateValue"
            />
            <span s-if="errMsg" class="cos-textarea-err cos-block">{{errMsg}}</span>
        </template>
    `;
    static components = {
        'cos-textarea': Textarea
    };

    initData() {
        return {
            errMsg: ''
        }
    }

    validateValue(obj) {
        const {value} = obj;
        if (!/^\d+$/.test(value)) {
            this.data.set('errMsg', value ? '请输入数字！' : '');
        }
    }
}

```
