``` san export=preview caption=AvatarBadge-示例
import {Component} from 'san';
import AvatarBadge from '@cosui/cosmic-card/avatar-badge';
import Avatar from '@cosui/cosmic/avatar';
import Select from '@cosui/cosmic/select';
import './default.less';

export default class Default extends Component {
    static template = `
        <div class="default-demo">
            <div class="demo-controller">
                <div id="size-selector">
                    <label>size:</label>
                    <cos-select
                        style="width: 100px"
                        value="{=size=}"
                        options="{{options}}"
                    />
                </div>
            </div>
            <br/>
            <div>
                <h4>type: vip-1</h4>
                <cosc-avatar-badge
                    type="vip-1"
                    size="{{size}}"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="{{size}}"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>type: vip-2</h4>
                <cosc-avatar-badge
                    type="vip-2"
                    size="{{size}}"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="{{size}}"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>type: vip-3</h4>
                <cosc-avatar-badge
                    type="vip-3"
                    size="{{size}}"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="{{size}}"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>type: vip-4</h4>
                <cosc-avatar-badge
                    type="vip-4"
                    size="{{size}}"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="{{size}}"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>type: live  (size 小于 md 时， live 设置不保留直播态文字徽章)</h4>
                <cosc-avatar-badge
                    type="live"
                    size="{{size}}"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="{{size}}"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
        </div>
    `;

    static components = {
        'cosc-avatar-badge': AvatarBadge,
        'cos-avatar': Avatar,
        'cos-select': Select
    };

    initData() {
        return {
            src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            alt: 'alt message',
            size: 'md',
            options: [{
                label: 'xs',
                value: 'xs'
            }, {
                label: 'sm',
                value: 'sm'
            }, {
                label: 'md',
                value: 'md'
            }]
        };
    };
}

```