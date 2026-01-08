```san export=preview caption=禁用
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            disabled
            placeholder="已禁止输入"
            appearance="filled"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
