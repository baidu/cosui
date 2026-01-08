import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <component
            s-is="{{url ? 'a' : 'div'}}"
            class="cos-link"
            href="{{url}}"
            s-bind="linkInfo"
        >
            <div>{{text}}</div>
            <slot/>
        </component>
    `;

    initData() {
        return {
            text: '组件开发示例',
            url: 'https://baidu.com',
            linkInfo: {}
        };
    };
}