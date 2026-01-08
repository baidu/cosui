```san export=preview caption=设置输入行数为2行
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            rows="2"
            appearance="filled"
            placeholder="占位文案"
        />
    `;
    static components = {
        'cos-textarea': Textarea
    };
}

```
