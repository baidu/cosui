```san export=preview caption=段落文本

import {Component} from 'san';
import CopyableText from '@cosui/cosmic-dqa/copyable-text';

export default class DefaultDemo extends Component {

    static template = `
        <div class="cos-dqa">
            <cosd-copyable-text
                note="{{note}}"
                content="{{content}}"
                typing="{{typing}}"
                appearance="{{appearance}}"
                on-copy-click="handleChange"
            />
        </div>
    `;

    static components = {
        'cosd-copyable-text': CopyableText
    };

    initData() {
        return {
            appearance: 'paragraph',
            note: '刚刚浏览',
            content: ['个性签名，就如同我的灵魂，独一无二，无法复制。'],
            typing: {
                speed: 30,
                mode: 'word',
                cursor: true
            }
        };
    };
    handleChange(item) {
        console.log('change event', item);
    }
}

```
