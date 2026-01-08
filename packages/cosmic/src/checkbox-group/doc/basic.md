```san export=preview caption=基础样式

import {Component} from 'san';
import Checkbox from '@cosui/cosmic/checkbox';
import CheckboxGroup from '@cosui/cosmic/checkbox-group';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Switcher from '@cosui/cosmic/switcher';

export default class BasicDemo extends Component {
    static template = `
        <div>
            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">禁用态(Disabled): </label>
                <cos-switcher checked="{=disabled=}" size="sm" />
            </div>

            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">选中态(Checked): </label>
                <cos-switcher checked="{=checked=}" size="sm" />
            </div>

            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">半选态(Indeterminate): </label>
                <cos-switcher checked="{=indeterminate=}" size="sm" />
            </div>


            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Tag</h4>
            <cos-checkbox-group on-change="changeGroup">
                <cos-checkbox
                    value="value1"
                    appearance="tag"
                    checked="{{checked}}"
                    disabled="{{disabled}}"
                    indeterminate="{{indeterminate}}"
                    on-change="changeCheckbox"
                >复选框 1</cos-checkbox>
                <cos-checkbox value="value2" appearance="tag">复选框 2</cos-checkbox>
                <cos-checkbox value="value3" appearance="tag">复选框 3</cos-checkbox>
                <cos-checkbox value="value4" appearance="tag">复选框 4</cos-checkbox>
            </cos-checkbox-group>


            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标签外观(Appearance): Mark</h4>
            <cos-checkbox-group on-change="changeGroup">
                <cos-checkbox
                    value="value1"
                    appearance="mark"
                    checked="{{checked}}"
                    disabled="{{disabled}}"
                    indeterminate="{{indeterminate}}"
                    on-change="changeCheckbox"
                >复选框 1</cos-checkbox>
                <cos-checkbox value="value2" appearance="mark">复选框 2</cos-checkbox>
                <cos-checkbox value="value3" appearance="mark">复选框 3</cos-checkbox>
                <cos-checkbox value="value4" appearance="mark">复选框 4</cos-checkbox>
            </cos-checkbox-group>
        </div>
    `;

    static components = {
        'cos-checkbox': Checkbox,
        'cos-checkbox-group': CheckboxGroup,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup,
        'cos-switcher': Switcher,
    };

    initData() {
        return {
            disabled: false,
            checked: false,
            indeterminate: false,
        }
    }

    changeGroup(event) {
        console.log('[checkbox] trigger change event', event)
    }

    changeCheckbox(event) {
        console.log('[checkbox-group] trigger change event', event)
    }

}
```