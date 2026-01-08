```san export=preview caption=文本标签链接展示

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
            tagLink: {
                logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360',
                label: '查询',
                text: '公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取',
                linkInfo: {}
            },
            text: ':ml-tag-link{data="tagLink"}'
        };
    }

    attached() {
        const markdown = this.ref('markdown');
        const tagLink = this.data.get('tagLink');
        const sourcetagLink = marklang.dataToSource('tagLink', tagLink);
        console.log('tagLink', tagLink)
        markdown.appendContent(sourcetagLink);
    }
}
```
