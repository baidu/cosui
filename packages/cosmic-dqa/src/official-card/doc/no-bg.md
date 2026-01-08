```san export=preview caption=无背景图
import {Component} from 'san';
import OfficialCard from '@cosui/cosmic-dqa/official-card';

export default class DefaultDemo extends Component {
    static template = `
        <cosd-official-card
            linkInfo="{{linkInfo}}"
            title="{{title}}"
            tag="{{tag}}"
            logo="{{logo}}"
            score="{{score}}"
            introduction="{{introduction}}"
            caption="{{caption}}"
            settings="{{settings}}"
            actionText="{{actionText}}"
        />
    `;

    static components = {
        'cosd-official-card': OfficialCard
    };

    initData() {
        return {
            logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
            title: '网站标题',
            linkInfo: {
                href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
            },
            score: "4.5分",
            introduction: "第二行展示的介绍文本",
            caption: "第三行展示的介绍文本",
            tag: '标签信息',
            actionText: '下载',
            settings: [
                {
                    text: "隐私",
                    linkInfo: {
                        href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
                    },
                },
                {
                    text: "权限",
                    linkInfo: {
                        href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
                    },
                },
                {
                    text: "功能",
                    linkInfo: {
                        href: 'https://www.baidu.comhttps://www.baidu.comhttps://www.baidu.comhttps://www.baidu.com'
                    },
                }
            ]
        }
    }
}
```