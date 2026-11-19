```san export=preview caption=代码块

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';

export default class CSRDemo extends Component {

    static template = `
        <div>
            <h3>全局 code prop 配置</h3>
            <p>普通代码块</p>
            <cosd-markdown content="{{text1}}" code="{{code1}}" />
            <br />
            <p>原文引用，可折叠</p>
            <cosd-markdown content="{{text2}}" code="{{code2}}" />
            <br />
            <p>原文引用，可滚动</p>
            <cosd-markdown content="{{text2}}" code="{{code3}}" />
            <br />
            <h3>语法配置（单块精细控制）</h3>
            <p>优先级：语法配置 &gt; 全局 code prop &gt; 默认值。下例无需 code prop，直接在 language 后写 {lineNumbers=false fullscreen=false foldable=true}。</p>
            <cosd-markdown content="{{text3}}" />
        </div>
    `;

    static components = {
        'cosd-markdown': Markdown
    };

    initData() {
        return {
            code1: {
                fullscreen: true
            },
            text1: '```javascript\n// Using ES6 import syntax\nimport pandas as pd\n// load the library and ALL languages\nconst hljs = require("highlight.js");\nenum TYPE = 1;\nvar reg = /^http:/g;\nconsole.log(hljs, reg);\n```\n\n',
            code2: {
                lineNumbers: false,
                foldable: true
            },
            text2: '```原文\n绝学无忧。\n唯之与阿，相去几何？\n美之与恶，相去若何？\n人之所畏，不可不畏。\n荒兮，其未央哉！\n众人熙熙，如享太牢，如春登台。\n我独泊兮，其未兆；\n沌沌兮，如婴儿之未孩；\n飂兮，若无所归。\n众人皆有余，而我独若遗。\n我愚人之心也哉！沌沌兮！\n俗人昭昭，我独昏昏。\n俗人察察，我独闷闷。\n澹兮，其若海；飂兮，若无止。\n众人皆有以，而我独顽且鄙。\n我独异于人，而贵食母。\n绝学无忧。\n唯之与阿，相去几何？\n美之与恶，相去若何？\n人之所畏，不可不畏。\n荒兮，其未央哉！\n众人熙熙，如享太牢，如春登台。\n我独泊兮，其未兆；\n沌沌兮，如婴儿之未孩；\n飂兮，若无所归。\n众人皆有余，而我独若遗。\n我愚人之心也哉！沌沌兮！\n俗人昭昭，我独昏昏。\n俗人察察，我独闷闷。\n澹兮，其若海；飂兮，若无止。\n众人皆有以，而我独顽且鄙。\n我独异于人，而贵食母。\n```\n\n',
            code3: {
                lineNumbers: false,
                scrollable: true
            },
            text3: '```原文 {lineNumbers=false fullscreen=false foldable=true}\n绝学无忧。\n唯之与阿，相去几何？\n美之与恶，相去若何？\n人之所畏，不可不畏。\n荒兮，其未央哉！\n众人熙熙，如享太牢，如春登台。\n我独泊兮，其未兆；\n沌沌兮，如婴儿之未孩；\n飂兮，若无所归。\n众人皆有余，而我独若遗。\n我愚人之心也哉！沌沌兮！\n俗人昭昭，我独昏昏。\n俗人察察，我独闷闷。\n澹兮，其若海；飂兮，若无止。\n众人皆有以，而我独顽且鄙。\n我独异于人，而贵食母。\n```\n\n'
        };
    }
}
```
