```san export=preview caption=与大按钮组合使用
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';
import Button from '@cosui/cosmic/button';

export default class TextareaDemo extends Component {
    static template = `
        <template>
            <cos-textarea
                height="{{108}}"
                appearance="filled"
                placeholder="占位文案"
            />
            <cos-button appearance="secondary" class="cos-space-mt-xs">按钮</cos-button>
        </template>
    `;

    static components = {
        'cos-button': Button,
        'cos-textarea': Textarea
    };
}

```
