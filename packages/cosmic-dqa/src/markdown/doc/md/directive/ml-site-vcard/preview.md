```san export=preview caption=资源展示

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown s-ref="markdown" content="{{text}}" on-click="handleClick" on-show="handleShow"/>
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '**网盘资源组件**\n::ml-site-vcard{url="https://www.baidu.com/" title="雅思考试资料" caption="16万人阅读 16个文件" logo="https://gips3.baidu.com/it/u=3313605961,495093800&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f171_171"}\n'
        };
    }

    handleClick(e){
        console.log('click',e);
    }

    handleShow(e){
        console.log('show',e);
    }
}
```
