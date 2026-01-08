```san export=preview caption=划词

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown s-ref="markdown" content="{{text}}" on-click="handleClick"/>
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: ':ml-search-more[划词文本] 或者 :ml-search-more[划词文本]{text="真实使用文本" url="https://m.baidu.com/s?sa=sa&word=文本" icon="research"}'
        };
    }

    handleClick(e) {
        console.log('click',e);
    }
}
```
