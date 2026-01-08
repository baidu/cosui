```san export=preview caption=多个标签

import {Component} from 'san';
import TagLink from '@cosui/cosmic-dqa/tag-link';

export default class DefaultDemo extends Component {

    static template = `
        <div style="position: relative;">
            <p>这是一个段落文本</p>
            <p>下面是两个标签</p>
            <p>
                <span class="cos-row cos-gutter">
                    <cosd-tag-link
                        s-for="tagLink in doubleTagLinks"
                        s-bind="tagLink"
                        class="cos-col"
                    />
                </span>
            </p>
            <p>下面是三个标签</p>
            <p>
                <span class="cos-row cos-gutter">
                    <cosd-tag-link
                        s-for="tagLink in tagLinks"
                        s-bind="tagLink"
                        class="cos-col"
                    />
                </span>
            </p>
            <p>这是一个段落文本这是段落文本段落文本这是段落文本段落文本这是段落文本</p>
        </div>
    `;

    static components = {
        'cosd-tag-link': TagLink
    };

    static computed = {
        doubleTagLinks() {
            return this.data.get('tagLinks').slice(0, 2);
        }
    };

    initData() {
        return {
            tagLinks: [
                {
                    logo: 'https://gips0.baidu.com/it/u=376766202,4218554536&fm=3012&app=3012&autime=1717572309&size=b360,360',
                    label: '查询',
                    text: '公积金购房提取公积金购房提取公积金购房提取公积金购房提取公积金购房提取',
                    linkInfo: {}
                },
                {
                    icon: 'navigation',
                    text: '北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫',
                    linkInfo: {}
                },
                {
                    text: '北京站到故宫北京站到故宫北京站到故宫北京站到故宫北京站到故宫',
                    linkInfo: {}
                }
            ],
        }
    }
}
```
