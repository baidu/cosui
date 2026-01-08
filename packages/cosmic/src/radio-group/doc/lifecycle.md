``` san export=preview caption=生命周期
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';

export default class Lifecycle extends Component {
    static template = `
        <div>
            <cos-radio-group s-if="show" value="{=value=}">
                <cos-radio value="value1">选项 1</cos-radio>
                <cos-radio value="value2">选项 2</cos-radio>
                <cos-radio value="value3">选项 3</cos-radio>
            </cos-radio-group>
            <cos-button on-click="remove">移除按钮</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup,
    };

    initData() {
        return {
            show: true
        };
    }

    remove() {
        this.data.set('show', false)
    }
}

```
