```san export=preview caption=基础样式

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';
import Icon from '@cosui/cosmic/icon';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Avatar from '@cosui/cosmic/avatar';
import './basic.less';

export default class MoreLinkDemo extends Component {

    static template = `
        <div>
            <div data-testid="default">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">默认</h4>
                <cos-more-link url="/" />
            </div>

            <div data-testid="custom-text">
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">查看更多文案允许自定义，但不建议超过 8 个字</h4>
                <cos-more-link>查看详情</cos-more-link>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">通过linkInfo自由添加挂载属性</h4>
                <cos-more-link url="/" link-info="{{link}}">
                    查看更多
                </cos-more-link>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">配置头部槽位</h4>
                <cos-more-link url="/">
                    <cos-icon name="heart-fill1" class="cos-space-mr-xxs" />查看更多
                </cos-more-link>

                <cos-more-link class="cos-space-mt-lg custom-slot" url="/">
                    <cos-avatar-group size="xs" class="cos-space-mr-3xs">
                        <cos-avatar
                            s-for="item in count"
                            src="{{src}}"
                            alt="{{alt}}"
                            size="xs"
                        />
                    </cos-avatar-group>
                    查看详情
                </cos-more-link>

                <cos-more-link class="cos-space-mt-lg custom-slot square-avatar" url="/">
                    <cos-avatar-group size="xs" class="cos-space-mr-3xs">
                        <cos-avatar
                            s-for="item in count"
                            src="{{src}}"
                            alt="{{alt}}"
                            size="xs"
                        />
                    </cos-avatar-group>
                    查看详情
                </cos-more-link>
            </div>
        </div>
    `;

    static components = {
        'cos-more-link': MoreLink,
        'cos-icon': Icon,
        'cos-avatar-group': AvatarGroup,
        'cos-avatar': Avatar
    };

    initData() {
        return {
            url: '/',
            link: {
                target: '_blank'
            },
            alt: 'alt message',
            src: 'https://psstatic.cdn.bcebos.com/basics/cosmic/avatar_1756191606000.jpg',
            count: [0, 1, 2]
        };
    };
}

```