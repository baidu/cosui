```san export=preview caption=设置初始高度130px，最大高度200px，自适应高度超出则滚动（存在清空按钮）
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';

export default class TextareaDemo extends Component {
    static template = `
        <cos-textarea
            clear
            height="{{130}}"
            max-height="{{200}}"
            appearance="filled"
            placeholder="占位文案"
        />
    `;

    static components = {
        'cos-textarea': Textarea
    };
}

```
