```san export=preview caption=基本示例
import {Component} from 'san';
import AuthorCard from '@cosui/cosmic-dqa/author-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-author-card
            avatar="{{avatar}}"
            linkInfo="{{linkInfo}}"
            name="{{name}}"
            caption="{{caption}}"
            tag="{{tag}}"
        />
    `;

    static components = {
        'cosd-author-card': AuthorCard
    };

    initData() {
        return {
            avatar: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            name: '人名',
            caption: ['国家食品安全评估中心研究员', '技术总顾问'],
            linkInfo: {
                href: 'https://www.baidu.com'
            },
            tag: '中国科学院大学核科学与技术学院教授'
        }
    }
}
```