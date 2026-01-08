```san export=preview caption=音频协议

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
            text: '**音频组件**\n::ml-audio{title="测试文本测试测试" src="https://sensearch.baidu.com/gettts?lan=en&text=Rotation%20of%20one%20person%20in%20front%20and%20one%20person%20in%20back&source=alading"}\n'
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
