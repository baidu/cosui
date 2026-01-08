```san export=preview caption=基础样式

import {Component} from 'san';
import Checkbox from '@cosui/cosmic/checkbox';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Switcher from '@cosui/cosmic/switcher';

export default class BasicDemo extends Component {
    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签外观(Appearance): Tag</h4>
            <div s-for="checkbox in tagCheckboxes" class="cos-flex cos-items-center cos-space-mt-xs cos-space-mb-x">
                <label class="cos-space-mr-lg">{{checkbox.label}}: </label>
                <cos-checkbox
                    appearance="tag"
                    checked="{{checkbox.checked}}"
                    disabled="{{checkbox.disabled}}"
                    indeterminate="{{checkbox.indeterminate}}"
                    on-change="change(checkbox)"
                >复选框</cos-checkbox>
            </div>

            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标记外观(Appearance): Mark</h4>
            <div s-for="checkbox in markCheckboxes" class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-space-mr-lg">{{checkbox.label}}: </label>
                <cos-checkbox
                    appearance="mark"
                    checked="{{checkbox.checked}}"
                    disabled="{{checkbox.disabled}}"
                    indeterminate="{{checkbox.indeterminate}}"
                    on-change="change(checkbox)"
                >复选框</cos-checkbox>
            </div>
        </div>
    `;

    static components = {
        'cos-checkbox': Checkbox,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup,
        'cos-switcher': Switcher,
    };

    initData() {
        return {
            disabled: false,
            checked: false,
            indeterminate: false,
            tagCheckboxes: [
                { label: '默认态', checked: false, disabled: false, indeterminate: false },
                { label: '选中态(Checked)', checked: true, disabled: false, indeterminate: false },
                { label: '禁用态(Disabled)', checked: false, disabled: true, indeterminate: false },
            ],
            markCheckboxes: [
                { label: '默认态', checked: false, disabled: false, indeterminate: false },
                { label: '选中态(Checked)', checked: true, disabled: false, indeterminate: false },
                { label: '禁用态(Disabled)', checked: false, disabled: true, indeterminate: false },
                { label: '半选态(Indeterminate)', checked: false, disabled: false, indeterminate: true },
            ],
        };
    }

    change(checkbox) {
        console.log('[checkbox] trigger change event', checkbox);
    }

    changeAppearance(event) {
        this.data.set('appearance', event.value);
    }
}

```
