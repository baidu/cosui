```san export=preview caption=组件开发使用a标签跳转
import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <div
            s-is="{{jumpUrl ? 'a' : 'div'}}"
            href="{{jumpUrl}}"
            class="cos-link cos-block"
            s-bind="linkInfo"
        >
            <div>{{text}}</div>
            <slot/>
        </div>
    `;

    initData() {
        return {
            text: '组件开发示例',
            jumpUrl: 'https://baidu.com',
            linkInfo: {}
        }
    };
}

```