```san export=preview caption=语音播报

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
            text: ':ml-tts[展示的内容]{text="播报文本" lan=zh src="https://hanyu-word-pinyin-short.cdn.bcebos.com/bing4.mp3"}'
        };
    }

    handleClick(e) {
        console.log('click',e);
    }
}
```
