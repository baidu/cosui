```san export=preview caption=设定输入框高度为108px
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            height="{{108}}"
            appearance="filled"
            placeholder="占位文案"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
