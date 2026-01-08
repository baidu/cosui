```san export=preview caption=基础样式

import {Component} from 'san';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Switcher from '@cosui/cosmic/switcher';

export default class BasicDemo extends Component {
    static template = `
        <div>

            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">禁用态(Disabled): </label>
                <cos-switcher checked="{=disabled=}" size="sm"/>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Tag</h4>
                <cos-radio-group on-change="changeValue" value="{=value=}" disabled="{=disabled=}">
                    <cos-radio value="value1" appearance="tag">选项 1</cos-radio>
                    <cos-radio value="value2" appearance="tag">选项 2</cos-radio>
                    <cos-radio value="value3" appearance="tag">选项 3</cos-radio>
                </cos-radio-group>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Mark</h4>
                <cos-radio-group on-change="changeValue" value="{=value=}" disabled="{=disabled=}">
                    <cos-radio value="value1" appearance="mark">选项 1</cos-radio>
                    <cos-radio value="value2" appearance="mark">选项 2</cos-radio>
                    <cos-radio value="value3" appearance="mark">选项 3</cos-radio>
                </cos-radio-group>
            </div>
        </div>
    `;

    static components = {
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup,
        'cos-switcher': Switcher,
    };

    initData() {
        return {
            disabled: false,
            checked: false
        }
    }

    changeValue(event) {
        console.log('[radio-group] trigger change event', event);
    }

}
```
