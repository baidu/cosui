```san export=preview caption=图片扩展语法

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
            text: '**小图片**\n![](https://gips1.baidu.com/it/u=1726338917,3904303031&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f54_54){width=16 height=16 style="margin:0;vertical-align: text-bottom;"}\n'
            + '**普通图片**\n![](https://t8.baidu.com/it/u=2752392932,3688927421&fm=3031&app=3031&size=r3,4&q=100&n=0&g=11n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=0028DD1259DFD5EB404580C8030050B2)'
        };
    }
}
```
