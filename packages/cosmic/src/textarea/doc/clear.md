```san export=preview caption=支持清空
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            clear
            appearance="filled"
            placeholder="占位文案"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
