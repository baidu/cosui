```san export=preview caption=溯源文字角标
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
            text: '**文本溯源**\n在点击时，把发送event并将数据透传:ml-citation-text[法规]{}\n'
        };
    }
}
```
