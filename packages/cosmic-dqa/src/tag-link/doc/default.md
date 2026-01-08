```san export=preview caption=基础用法

import {Component} from 'san';
import TagLink from '@cosui/cosmic-dqa/tag-link';

export default class DefaultDemo extends Component {

    static template = `
        <div style="position: relative;">
            <p>这是一个段落文本</p>
            <p>内联一个标签链接<cosd-tag-link s-bind="normalTagLink" /></p>
            <p>下面是一个单独段落的标签链接</p>
            <p>
                <cosd-tag-link
                    s-bind="normalTagLink"
                />
            </p>
            <p>下面是几个超长的标签链接</p>
            <p>
                <cosd-tag-link
                    s-bind="textTagLink"
                />
            </p>
            <p>
                <cosd-tag-link
                    s-bind="labelTagLink"
                />
            </p>
            <p>这是一个段落文本这是段落文本段落文本这是段落文本段落文本</p>
        </div>
    `;

    static components = {
        'cosd-tag-link': TagLink
    };

    initData() {
        return {
            labelTagLink: {
                logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360',
                label: '查询',
                text: '公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金',
                linkInfo: {}
            },
            normalTagLink: {
                icon: 'navigation',
                text: '比较简短的文本描述',
                linkInfo: {}
            },
            textTagLink: {
                text: '北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫',
                linkInfo: {}
            }
        }
    }
}
```
