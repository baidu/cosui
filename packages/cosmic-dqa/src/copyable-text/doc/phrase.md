```san export=preview caption=简短文本

import {Component} from 'san';
import CopyableText from '@cosui/cosmic-dqa/copyable-text';

export default class DefaultDemo extends Component {

    static template = `
        <div class="cos-dqa">
            <cosd-copyable-text
                note="{{note}}"
                content="{{content}}"
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
            appearance: 'phrase',
            content: [
                '只许一生浮世清欢',
                '个性签名，就如同我的灵魂，独一无二，无法复制。',
                '愿我是阳光，明媚而不忧伤',
                '品味独特，不拘一格！',
                '浮生若梦，唯爱永恒。',
                '我不敢太勇敢太执着太骄傲，我怕失去',
                '愿清风能带走你的烦恼',
                '追逐自由，让梦飞翔。'
            ]
            
        };
    };
    handleChange(item) {
        console.log('change event', item);
    }
}

```
