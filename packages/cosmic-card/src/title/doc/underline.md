``` san export=preview caption=设置默认状态无下划线
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';
import './underline.less'

export default class Demo extends Component {
    static trimWhitespace = 'all';

    static template = `
        <div>
            <cosc-title url="{{url}}" class="custom-underline">{{text | raw}}</cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`,
            text: '单卡标题带<em>飘红query</em>'
        };
    }
}
```
