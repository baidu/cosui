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

            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">选中态(Checked): </label>
                <cos-switcher checked="{=checked=}" size="sm"/>
            </div>


            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Tag</h4>
                <cos-radio appearance="tag" checked="{=checked=}" disabled="{{disabled}}">单选框</cos-radio>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Mark</h4>
                <cos-radio appearance="mark" checked="{=checked=}" disabled="{{disabled}}">单选框</cos-radio>
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
            checked: false,
            appearance: 'tag',
        }
    }

}
```
