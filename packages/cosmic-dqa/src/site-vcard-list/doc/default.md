```san export=preview caption=基本示例
import {Component} from 'san';
import SiteVcardList from '@cosui/cosmic-dqa/site-vcard-list';

export default class DefaultDemo extends Component {
    static template = `
        <div>
            <cosd-site-vcard-list 
                items="{{items}}" 
                folded="{{folded}}"
            />
        </div>
    `;

    static components = {
        'cosd-site-vcard-list': SiteVcardList
    };

    initData() {
        return {
            items: [
                {
                    title: 'xxx',
                    caption: '免费咨询 方便快捷',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com', target: "_blank"},
                    appearance: 'filled',
                    actionText: '咨询',
                },
                {
                    title: 'xxx',
                    caption: '北京大学第三医院',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com'},
                    appearance: 'filled',
                    actionText: '去咨询',
                    tags: [{appearance: 'text', text: '主任医师'}, {appearance: 'text', text: '外科门诊'}]
                },
                {
                    title: 'xxx',
                    caption: '北京大学第三医院',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com'},
                    appearance: 'filled',
                    actionText: '去咨询',
                    tags: [{appearance: 'text', text: '副主任医师'}, {appearance: 'text', text: '脊柱外二科'}]
                },
                {
                    title: '小说推荐智能体',
                    caption: '深度解析 专业权威',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com'},
                    appearance: 'bar',
                    actionText: '聊一聊',
                    visits: '122.5万',
                    tags: [
                        {appearance: 'filled', text: '官方'},
                        {image: 'https://gips3.baidu.com/it/u=3835163905,2922310531&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f564_566', appearance: 'subtle'}
                    ]
                },
                {
                    title: '旅游攻略助手',
                    caption: '免费咨询 方便快捷 高效精准',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com'},
                    appearance: 'bar',
                    actionText: '咨询',
                    tags: ['https://vercel-static.bj.bcebos.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/ai_application.png']
                },
                {
                    title: '美食探店达人',
                    caption: '深度解析 专业权威 免费咨询',
                    logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                    linkInfo: {href: 'https://www.baidu.com'},
                    appearance: 'filled',
                    actionText: '聊一聊',
                    visits: '对话11.4万',
                    isAgent: true,
                    tags: [{appearance: 'filled', text: '官方'}],
                    badgeText: '海外官网'
                }
            ],
            folded: {
                initialCount: 2,
                nextCount: 2
            }
        };
    }

}
```
