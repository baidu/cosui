```san export=preview caption=配置config选项

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown s-ref="markdown" content="{{text}}" config="{{config}}" on-click="handleClick"/>
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: ':ml-search[回搜getLinkInfo链接]{text="1"}',
            config: {
                'ml-search': {
                    getLinkInfo: (text) => {
                        text = text + text;
                        return {
                            href: 'https://www.baidu.com/s?word=' + encodeURIComponent(text),
                            target: '_blank'
                        };
                    }
                }
            }
        };
    }
}
```
