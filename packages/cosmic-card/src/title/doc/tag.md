``` san export=preview caption=标题前加标签
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {
    static trimWhitespace = 'all';

    static template = `
        <div>
            <cosc-title tag="官方" url="{{url}}">{{text | raw}}</cosc-title>
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
