```san export=preview caption=不同外观
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <template>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">线性外观</h4>
            <cos-textarea placeholder="占位文案"/>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">面性外观</h4>
            <cos-textarea
                appearance="filled"
                placeholder="占位文案"
            />
        </template>
    `;
    static components = {
        'cos-textarea': Textarea
    };
}

```
