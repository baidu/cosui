```san export=preview caption=无logo
import {Component} from 'san';
import OfficialCard from '@cosui/cosmic-dqa/official-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-official-card
            poster="{{poster}}"
            linkInfo="{{linkInfo}}"
            title="{{title}}"
            tag="{{tag}}"
            website="{{website}}"
            actionText="{{actionText}}"
        />
    `;

    static components = {
        'cosd-official-card': OfficialCard
    };

    initData() {
        return {
            poster: {
                src: 'https://gips0.baidu.com/it/u=3849595656,4146683246&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f656_438',
                gradient: "linear-gradient(rgba(128, 115, 51, 0) 0%, rgba(128, 115, 51, 0) 50%, rgba(128, 115, 51, 0.65) 70%, rgba(128, 115, 51, 0.9) 100%)"
            },
            title: '这是一个长标题这是一个长标题这是一个长标题这是一个长标题这是一个长标题这是一个长标题',
            linkInfo: {
                href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
            },
            tag: '标签信息',
            website: '展示的网站地址',
            actionText: '进入'
        }
    }
}
```