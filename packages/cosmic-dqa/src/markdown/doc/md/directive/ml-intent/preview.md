```san export=preview caption=意图

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
            text: '猜你可能想了解:ml-intent[xx和xx的关系如何]{text="xx和xx的关系" index="1"} 或者:ml-intent[xxxx如何]{text="xxxx"}'
        };
    }

    handleClick(e) {
        console.log('click', e);
    }
}
```
