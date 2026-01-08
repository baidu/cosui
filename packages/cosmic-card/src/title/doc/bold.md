``` san export=preview caption=加粗
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';
import './bold.less';

export default class Demo extends Component {

    static template = `
        <div>
            <!-- 14号字加粗 -->
            <cosc-title size="xs">{{text}}</cosc-title>
            <br/>

            <!-- 16号字加粗 -->
            <cosc-title size="sm">{{text}}</cosc-title>
            <br/>

            <!-- 默认加粗：18号字 -->
            <cosc-title>{{text}}</cosc-title>
            <br/>

            <!-- 20号字加粗 -->
            <cosc-title size="lg">{{text}}</cosc-title>
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
