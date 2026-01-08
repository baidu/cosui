```san export=preview caption=字数统计
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            clear
            count
            maxlength="{{100}}"
            appearance="filled"
            placeholder="占位文案"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
