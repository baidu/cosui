``` san export=preview caption=多行截断
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title class="cos-line-clamp-1 cos-space-mb-xxs" url="{{url}}">1行截断：{{text | raw}}</cosc-title>
            <br/>
            <cosc-title class="cos-line-clamp-2" url="{{url}}">2行截断：{{text | raw}}</cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`,
            text: '单卡标题带<em>飘红query</em>单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带单卡标题带'
        };
    }
}
```