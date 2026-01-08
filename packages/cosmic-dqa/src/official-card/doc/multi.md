```san export=preview caption=竖图示例
import {Component} from 'san';
import OfficialCard from '@cosui/cosmic-dqa/official-card';

export default class DefaultDemo extends Component {
    static template = `
        <div>
            <cosd-official-card
                poster="{{poster}}"
                linkInfo="{{linkInfo}}"
                title="{{title}}"
                tag="{{tag}}"
                logo="{{logo}}"
                website="{{website}}"
                score="{{score}}"
                introduction="{{introduction}}"
                caption="{{caption}}"
                settings="{{settings}}"
                actionText="{{actionText}}"
            />
        </div>
    `;

    static components = {
        'cosd-official-card': OfficialCard
    };

    initData() {
        return {
            poster: {
                src: [
                    "https://t15.baidu.com/it/u=1897712247,2637911107&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000",
                    "https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9",
                    "https://gips0.baidu.com/it/u=3849595656,4146683246&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f656_438",
                    "https://t15.baidu.com/it/u=1897712247,2637911107&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000",
                    "https://t15.baidu.com/it/u=1897712247,2637911107&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000"
                ],
                gradient: "linear-gradient(180deg, rgba(128, 51, 57, 0) 0%, rgba(128, 51, 57, 0) 50%, rgba(128, 51, 57, 0.65) 70%, rgba(128, 51, 57, 0.9) 100%)",
                bgColor: "#ffd9dc"
            },
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