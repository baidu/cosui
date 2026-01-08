```san export=preview caption=服务卡片挂载

import {Component} from 'san';
import SiteVcard from '@cosui/cosmic-dqa/site-vcard';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>不带按钮和标签</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                appearance="{{appearance1}}"
            />
            <h3>带文字标签</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags2}}"
                appearance="{{appearance1}}"
            />
            <h3>带权威标签</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags3}}"
                appearance="{{appearance1}}"
            />
            <h3>带图片标签</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags4}}"
                appearance="{{appearance1}}"
            />
            <h3>带按钮</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags1}}"
                appearance="{{appearance1}}"
                badge-text="{{badgeText}}"
                on-button-click="handleButtonClick"
            />
            <h3>按钮独立跳转</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags1}}"
                appearance="{{appearance1}}"
                action="{{action}}"
                on-button-click="handleButtonClick"
            />
            <h3>带访问量</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags1}}"
                visits="{{visits}}"
                appearance="{{appearance1}}"
                on-button-click="handleButtonClick"
            />
            <h3>整卡外观</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tags1}}"
                visits="{{visits}}"
                appearance="{{appearance2}}"
                on-button-click="handleButtonClick"
            />
            <h3>整卡外观 带agent简介</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo1}}"
                tags="{{tagsNew}}"
                visits="{{visitsWithPrefix}}"
                appearance="{{appearance2}}"
                is-agent="{{true}}"
                introduction="{{introduction}}"
                on-button-click="handleButtonClick"
            />
            <h3>方形logo外观</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo2}}"
                tags="{{tags1}}"
                visits="{{visits}}"
                appearance="{{appearance3}}"
                on-button-click="handleButtonClick"
            />
            <h3>方形logo外观，无说明文本和访问量，带简介</h3>
            <cosd-site-vcard
                title="{{title}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo2}}"
                tags="{{tags1}}"
                appearance="{{appearance3}}"
                introduction="{{introduction}}"
                on-button-click="handleButtonClick"
            />
            <h3>方形logo外观，带缩略图和logo</h3>
            <cosd-site-vcard
                title="{{title}}"
                thumbnail="{{thumbnail4}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo4}}"
                tags="{{tags1}}"
                appearance="{{appearance3}}"
                introduction="{{introduction}}"
                on-button-click="handleButtonClick"
            />
            <h3>方形logo外观，有说明文本和访问量，带简介</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                visits="{{visits}}"
                thumbnail="{{thumbnail4}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                tags="{{tags1}}"
                appearance="{{appearance3}}"
                introduction="{{introduction}}"
            />
            <h3>方形logo外观，无说明文本和访问量，带简介, 简介在上方</h3>
            <cosd-site-vcard
                title="{{title}}"
                caption="{{caption}}"
                visits="{{visits}}"
                thumbnail="{{thumbnail4}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                tags="{{tags1}}"
                appearance="{{appearance3}}"
                introduction="{{introduction1}}"
            />
            <h3>带评分</h3>
            <cosd-site-vcard
                is-agent="{{true}}"
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo2}}"
                tags="{{tags5}}"
                visits="{{visitsWithPrefix}}"
                appearance="{{appearance3}}"
                score="{{score}}"
                badge-text="{{badgeText}}"
                on-button-click="handleButtonClick"
            />
            <h3>带资源区</h3>
            <cosd-site-vcard
                is-agent="{{true}}"
                title="{{title}}"
                caption="{{caption}}"
                action-text="{{actionText}}"
                link-info="{{linkInfo}}"
                logo="{{logo2}}"
                visits="{{visitsWithPrefix}}"
                appearance="{{appearance3}}"
                shortcut="{{shortcut}}"
                badge-text="{{badgeText}}"
                on-button-click="handleButtonClick"
            />
        </div>
    `;

    static components = {
        'cosd-site-vcard': SiteVcard
    };

    initData() {
        return {
            linkInfo: {
                href: 'https://www.baidu.com',
                'data-click-info': '{"type": "b", "clickData": {"url": "https://www.baidu.com"} }'
            },
            actionText: '聊一聊',
            title: '三花猫布偶猫',
            caption: '深度解析 专业权威 免费咨询 方便快捷 高效精准',
            logo1: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
            logo2: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
            tags1: [
                // 'https://vercel-static.bj.bcebos.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/ai_application.png',
                {
                    "appearance": "filled",
                    "text": "文本"
                }
            ],
            tags2: [
                {
                    "appearance": "text",
                    "text": "百度认证律师"
                }
            ],
            tags3: [
                {
                    "appearance": "filled",
                    "text": "官方"
                }
            ],
            tags4: [
                'https://vercel-static.bj.bcebos.com/stash/v1/6f672d5/lingjing-fe/07ccbd4/lingjing-sdk/ai_application.png'
            ],
            tags5: [
                {
                    "appearance": "filled",
                    "text": "官方",
                    "position": "left | right"
                },
                {
                    "image": 'https://gips3.baidu.com/it/u=3835163905,2922310531&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f564_566',
                    "appearance": "subtle"
                }
            ],
            tagsNew: ['https://gips1.baidu.com/it/u=3199912713,1941888093&fm=3028&app=3028&f=PNG&fmt=auto&q=80&size=f117_49'],
            visits: '122.5万',
            visitsWithPrefix: '对话11.4万',
            appearance1: 'filled',
            appearance2: 'card',
            appearance3: 'bar',
            introduction: '您好，我是智能体XXX，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行',
            introduction1: {
                value: '您好，我是智能体XXX，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行，引导语最多展示两行',
                position: 'top'
            },
            action: {
                linkInfo: {
                    href: 'https://chat.baidu.com/'
                },
                class: 'extra-class'
            },
            thumbnail4: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
            logo4: 'https://psstatic.cdn.bcebos.com/baikan/images/baike-logo_1754911935000.png',
            score: 4.5,
            shortcut: {
                logo: 'https://t14.baidu.com/it/u=444424296,2253052747&fm=225&app=113&size=w931&q=75&n=0&g=10n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=1625FD04C8134FC66036B9100300D0C9',
                name: '小说推荐',
                caption: '小说推荐小助手',
                linkInfo: {
                    href: 'https://www.baidu.com',
                    'data-click-info': '{"type": "b", "clickData": {"url": "https://www.baidu.com"} }'
                }
            },
            badgeText: '海外官网'
        };
    };

    handleButtonClick(event) {
        console.log('button click');
    };
}
```
