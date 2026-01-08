```san export=preview caption=特殊文本样式

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown s-ref="markdown" content="{{text}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '普通文本颜色 <br> :ml-text[灰色标签样式]{type="label"} <br> :ml-text[红色高亮文本样式]{type="highlight"}'
        };
    }
}
```
