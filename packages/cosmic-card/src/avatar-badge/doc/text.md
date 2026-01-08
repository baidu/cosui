``` san export=preview caption=text使用示例
import {Component} from 'san';
import AvatarBadge from '@cosui/cosmic-card/avatar-badge';
import Avatar from '@cosui/cosmic/avatar';
import './text.less';

export default class Default extends Component {
    static template = `
        <div class="text-demo">
            <div>
                <h4>text 仅在 size 为 md 时生效</h4>
                <div class="demo-flex">
                <cosc-avatar-badge
                    size="md"
                    text="示例"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="md"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
                <cosc-avatar-badge
                    size="sm"
                    text="示例"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="sm"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
                </div>
            </div>
            <br/>
            <div>
                <h4>支持修改 text 背景颜色</h4>
                <cosc-avatar-badge
                    size="md"
                    text="在线"
                    class="custom-text-bg"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="md"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>text 的优先级高于 v 标 同时设置 type:'vip-1'， text:'示例', 仅 text 生效</h4>
                <cosc-avatar-badge
                    size="md"
                    text="示例"
                    type="vip-1"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="md"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
            <br/>
            <div>
                <h4>live 也可传入 text</h4>
                <cosc-avatar-badge
                    size="md"
                    text="示例"
                    type="live"
                >
                    <cos-avatar
                        src="{{src}}"
                        size="md"
                        alt="{{alt}}"
                    />
                </cosc-avatar-badge>
            </div>
        </div>
    `;

    static components = {
        'cosc-avatar-badge': AvatarBadge,
        'cos-avatar': Avatar
    };

    initData() {
        return {
            src: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            alt: 'alt message',
            size: 'md',
            type: '',
            text: '',
        };
    };
}

```