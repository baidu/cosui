``` san export=preview caption=标题前文本
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title>
                <span class="cos-color-text-primary">abandon - </span>
                <span class="cos-color-text-em">百度翻译</span>
            </cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };
}
```
