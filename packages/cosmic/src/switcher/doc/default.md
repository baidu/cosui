```san export=preview caption=Switcher-示例
import {Component} from 'san';
import Switcher from '@cosui/cosmic/switcher';
import './default.less';

export default class SwitcherDemo extends Component {
    static template = `
        <div>
            <div class="demo-md cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: md (默认size)</h4>
                <cos-switcher
                    checked="{=checked=}"
                    disabled="{{disabled}}"
                />
            </div>
            <div class="demo-sm cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: sm</h4>
                <cos-switcher
                    size="sm"
                    checked="{=checked=}"
                    disabled="{{disabled}}"
                />
            </div>
            <div class="demo-md-disabled cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: md (disabled)</h4>
                <cos-switcher
                    size="md"
                    checked="{=checked=}"
                    disabled
                />
            </div>
            <div class="demo-sm-disabled">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: sm (disabled)</h4>
                <cos-switcher
                    size="sm"
                    checked="{=checked=}"
                    disabled
                />
            </div>
        </div>
    `;

    static components = {
        'cos-switcher': Switcher
    };

    initData() {
        return {
            checked: false
        };
    };
}

```