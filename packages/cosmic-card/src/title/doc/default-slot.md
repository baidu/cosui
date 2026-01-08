``` san export=preview caption=默认样式
import {Component} from 'san';
import Title from '@cosui/cosmic-card/title';

export default class Demo extends Component {

    static template = `
        <div>
            <cosc-title url="{{url}}">{{text | raw}}</cosc-title>
            <cosc-title link-info="{{linkinfo}}">{{text1 | raw}}</cosc-title>
        </div>
    `;

    static components = {
        'cosc-title': Title
    };

    initData() {
        return {
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`,
            text: '单卡标题带<em>飘红query</em>',
            text1: '单卡标题带<em>飘红query</em>使用linkinfo跳转',
            linkinfo: {
                href: 'https://www.baidu.com/s?wd=%E5%BC%80%E5%AD%A6%E5%86%99%E4%BD%9C%E6%96%87'
            }
        };
    }
}
```
