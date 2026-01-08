```san export=preview caption=人物关系

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
            relationship: {
                members: [
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    },
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    },
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    },
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    },
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    },
                    {
                        name: '人物姓名',
                        relation: '关系',
                        avatar: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                        }
                    }
                ],
            },
            text: ':ml-relationship{data="relationship"}'
        };
    }

    attached() {
        const markdown = this.ref('markdown');
        const relationship = this.data.get('relationship');
        const sourcerelationship= marklang.dataToSource('relationship', relationship);
        console.log('relationship', relationship)
        markdown.appendContent(sourcerelationship);
    }

    handleClick(e) {
        console.log('click', e);
    }
}
```
