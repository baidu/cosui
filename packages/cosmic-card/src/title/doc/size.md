``` san export=preview caption=不同大小
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title size="lg" url="{{url}}">{{text | raw}}</cosc-title>
            <br/>

            <!-- size 默认 md -->
            <cosc-title url="{{url}}">{{text | raw}}</cosc-title>
            <br/>

            <cosc-title size="sm" url="{{url}}">{{text | raw}}</cosc-title>
            <br/>
            <cosc-title size="xs" url="{{url}}">{{text | raw}}</cosc-title>
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
