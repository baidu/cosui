```san export=preview caption=左图右文

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
            text: '**左图右文**\n:::ml-brief\n![](https://ms.bdimg.com/pacific/0/pic/-1058337847_1192477061.jpg?x=0&y=0&h=300&w=300&vh=300.00&vw=300.00&oh=300.00&ow=300.00&x-bce-process=image%2Fresize%2Cm_lfit%2Cw_364%2Ch_364%2Fquality%2Cq_75%2Fformat%2Cf_auto)这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本。这是一长串文本这是一长串文本这是一长串文本这是一长串文本这是一长串文本。这是一长串文本这是一长串文本这是一长串文本这是一长串文本\n:::\n'
        };
    }
}
```
