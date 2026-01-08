```san export=preview caption=代码块

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <cosd-markdown content="{{text}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            text: '```javascript\n// Using ES6 import syntax\nimport pandas as pd\n// load the library and ALL languages\nconst hljs = require("highlight.js");\nenum TYPE = 1;\nvar reg = /^http:/g;\nconsole.log(hljs, reg);\n```\n\n'
        };
    }
}
```
