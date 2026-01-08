``` san export=preview caption=使用icon组件
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';
import './icon.less';

export default class Demo extends Component {
    static trimWhitespace = 'all';

    static template = `
        <div>
            <cosc-title
                class="cosc-title-icon-size-18"
                icon="{{icon}}"
                url="{{url}}"
            >
                {{text | raw}}
            </cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            icon: 'heart1',
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`,
            text: '单卡标题带<em>飘红query</em>'
        };
    }
}
```
