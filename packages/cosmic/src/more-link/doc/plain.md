```san export=preview platform=pc caption=飘蓝链接样式（仅PC支持）

import {Component} from 'san';
import MoreLink from '@cosui/cosmic/more-link';
import Icon from '@cosui/cosmic/icon';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Avatar from '@cosui/cosmic/avatar';
import './plain.less';

export default class MoreLinkDemo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                链接风格用于 PC 为不包卡样式，查看更多跟随在内容底部左对齐，为链接字风格
            </h4>
            <div>
                <div>
                    <div class="cos-space-mt-md content-rectangle"></div>
                    <div class="cos-space-mt-md content-rectangle"></div>
                    <div class="cos-space-mt-md content-rectangle content-end"></div>
                </div>
            </div>
            <cos-more-link
                class="cos-space-mt-md"
                appearance="plain"
                url="/"
            />
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
            url: `https://www.baidu.com/?t=${(new Date()).getTime()}`
        };
    };
}

```