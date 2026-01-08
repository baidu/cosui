```san export=preview caption=基础markdown语法

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';
import marklang from 'marklang';

export default class BaseDemo extends Component {

    static template = `
        <div style="position: relative;">
            <cosd-markdown s-ref="markdown" content="{{text}}" config="{{config}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '## ==**短答案**==\n'
                + '==**核心答案**==\n'
                + '### 段落标题\n段落文本**强调文本**段落文本段落文 `code` 本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本\n'
                + '下面是个分割线。\n\n---\n'
                + '段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本\n\n'
                + '**引用**\n> 引用内容\n\n'
                + '**无序列表**\n- 一级列表\n    - 二级列表\n    - 二级列表\n\n- 一级列表\n- 一级列表\n'
                + '**有序列表**\n1. 一级列表\n    1. 二级列表\n    2. 二级列表\n\n2. 一级列表\n3. 一级列表\n\n'
        };
    }
    attached() {
        const markdown = this.ref('markdown');
        console.log(markdown.getDirectives());
    }
}
```
