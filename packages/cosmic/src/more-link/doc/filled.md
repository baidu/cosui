```san export=preview caption=填充样式

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';
import Icon from '@cosui/cosmic/icon';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Avatar from '@cosui/cosmic/avatar';
import './basic.less';

export default class MoreLinkDemo extends Component {

    static template = `
        <div>
            <div data-testid="filled">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">默认</h4>
                <cos-more-link appearance="filled" url="/" />
            </div>

            <div data-testid="filled-custom-bg">
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">修改背景色</h4>
                <cos-more-link
                    class="custom-bg"
                    appearance="filled"
                    url="/"
                />
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">配置头部槽位</h4>
                <cos-more-link
                    class="custom-slot"
                    appearance="filled"
                    url="/"
                >
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

                <cos-more-link
                    class="cos-space-mt-lg custom-slot square-avatar"
                    appearance="filled"
                    url="/"
                >
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
            alt: 'alt message',
            src: 'https://psstatic.cdn.bcebos.com/basics/cosmic/avatar_1756191606000.jpg',
            count: [0, 1, 2]
        };
    };
}

```