```san export=preview caption=基本用法
import {Component} from 'san';
import Slider from '@cosui/cosmic/slider';
import './basic.less';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-space-mb-lg cos-color-text-minor">基本滑动条。当 range 为 true 时，支持两侧滑动。当 disabled 为 true 时，滑块处于不可用状态。</p>
            <div class="basic-demo">
                <p class="cos-color-text-minor">Default：单游标滑块，不使用刻度</p>
                <cos-slider value="{{value}}" on-change="handleChange" on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">Range：双游标滑块</p>
                <cos-slider range value="{{valueRange}}"
                    on-change="handleChange" on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">Disable：禁用</p>
                <cos-slider disabled value="{{value}}" on-change="handleChange" on-change-complete="handleChangeComplete"/>
            </div>
        </div>`;

    static components = {
        'cos-slider': Slider,
    };

    initData() {
        return {
            value: 10,
            valueRange: [10, 80]
        };
    }

    handleChange(value) {
        console.log('=====change value', value);
    }

    handleChangeComplete(value) {
        console.log('=====change-complete value', value);
    }
}
```