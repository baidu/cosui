```san export=preview caption=链接扩展语法

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
            text: '[带图片的agent链接](https://m.baidu.com){type="agent" src="https://lingjing-online.cdn.bcebos.com/v1/lingjing-online/appavatar/2024-04-03/6eb730a3-ae47-4034-85de-dcab0a695187.png?x-bce-process=image/resize,m_fill,w_360,h_360"}\n[带文本icon的链接](http://www.baidu.com){type="text"} [带视频icon的链接](http://www.baidu.com){type="video"} [带笔记icon的链接](http://www.baidu.com){type="note"}'
        };
    }
    attached() {
        const markdown = this.ref('markdown');
        console.log(markdown.getDirectives());
    }
}
```
