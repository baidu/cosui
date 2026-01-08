``` san export=preview caption=click事件
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title on-click="native:clickHandler">{{text}}</cosc-title>
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

    clickHandler(e) {
        console.log('You clicked the title!');
    }
}
```
