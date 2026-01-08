```san export=preview caption=地图强弱样式

import {Component} from 'san';
import Markdown from '@cosui/cosmic-dqa/markdown';
import marklang from 'marklang';

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
            poi: {
                mapImage: 'https://img1.baidu.com/it/u=1180593395,734189004&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=512',
                linkInfo: {
                    href: 'https://m.baidu.com/s?word=测试linkInfo'
                },
                marker: true,
                area: '河北省',
                address: '石家庄市长安区南高营立交桥',
                folded: true
            },
            text: ':ml-poi{data="poi"}'
        };
    }

    attached() {
        const markdown = this.ref('markdown');
        const poi = this.data.get('poi');
        const sourcepoi= marklang.dataToSource('poi', poi);
        markdown.appendContent(sourcepoi);
    }
}
```
