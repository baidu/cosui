``` san export=preview caption=生命周期
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Checkbox from '@cosui/cosmic/checkbox';
import CheckboxGroup from '@cosui/cosmic/checkbox-group';

export default class Lifecycle extends Component {
    static template = `
        <div>
            <cos-checkbox-group s-if="show" value="{=value=}">
                <cos-checkbox value="value1">选项 1</cos-checkbox>
                <cos-checkbox value="value2">选项 2</cos-checkbox>
                <cos-checkbox value="value3">选项 3</cos-checkbox>
            </cos-checkbox-group>
            <cos-button on-click="remove">移除按钮</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button,
        'cos-checkbox': Checkbox,
        'cos-checkbox-group': CheckboxGroup,
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
