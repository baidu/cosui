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

            <!-- 16号字加粗,pc不展示这个示例 -->
            <cosc-title s-if="!isPc" size="sm" url="{{url}}">{{text}}</cosc-title>
            <br/>

            <!-- 默认加粗：18号字 -->
            <cosc-title url="{{url}}" >{{text}}</cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            text: '标题 - 用作卡片或内容的标题',
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`
        };
    }
}
```
