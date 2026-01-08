``` san export=preview caption=标题后跟随图标/文本
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';
import Icon from '@cosui/cosmic/icon';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title url="{{url}}" clamp="2">
                {{text | raw}}
                <cos-icon name="copy"></cos-icon>
            </cosc-title>

            <cosc-title url="{{url}}" clamp="2">
                {{text | raw}}
                <span class="cos-color-text-primary cos-space-ml-xxs cos-space-mr-xxs">#早餐</span>
                <span class="cos-color-text-primary cos-space-mr-xxs">#打工人</span>
                <span class="cos-color-text-primary">#前端</span>
            </cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title,
        'cos-icon': Icon
    };

    initData() {
        return {
            text: '单卡标题带<em>飘红query</em>',
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`
        };
    }
}
```
