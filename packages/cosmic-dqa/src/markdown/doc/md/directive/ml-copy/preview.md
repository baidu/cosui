```san export=preview caption=复制文本

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
            text: ':ml-copy[‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本，‌这是一段可以复制的长文本]'
        };
    }
}
```
