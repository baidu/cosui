```san export=preview caption=不同外观
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <h4 class="cos-color-text-minor cos-font-regular">线性外观</h4>
            <cos-input placeholder="占位文案"/>
            <h4 class="cos-color-text-minor cos-font-regular">面性外观</h4>
            <cos-input appearance="filled" placeholder="占位文案"/>
        </template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
