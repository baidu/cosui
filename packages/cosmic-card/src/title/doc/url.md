``` san export=preview caption=不传url仅展示用
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {
    static trimWhitespace = 'all';

    static template = `
        <div>
            <cosc-title>{{text}}</cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            text: '标题 - 用作卡片或内容的标题'
        };
    }
}
```
