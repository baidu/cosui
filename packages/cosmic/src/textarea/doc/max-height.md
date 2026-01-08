```san export=preview caption=设置输入框最大高度为150px，自适应高度，超出150px则滚动
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            max-height="{{150}}"
            appearance="filled"
            placeholder="占位文案"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
