```san export=preview caption=基本示例
import {Component} from 'san';
import OfficialCard from '@cosui/cosmic-dqa/official-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-official-card
            poster="{{poster}}"
            linkInfo="{{linkInfo}}"
            title="{{title}}"
            tag="{{tag}}"
            logo="{{logo}}"
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
                gradient: "linear-gradient(180deg, rgba(51, 96, 128, 0) 0%, rgba(51, 96, 128, 0) 50%, rgba(51, 96, 128, 0.65) 70%, rgba(51, 96, 128, 0.9) 100%)"
            },
            logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
            title: '网站标题',
            linkInfo: {
                href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
            },
            website: '展示的网站地址',
            tag: '标签信息',
            actionText: '进入'
        }
    }
}
```