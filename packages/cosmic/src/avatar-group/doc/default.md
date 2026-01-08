```san export=preview caption=AvatarGroup-示例
import {Component} from 'san';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Avatar from '@cosui/cosmic/avatar';
import Button from '@cosui/cosmic/button';
import avatarImg from './avatar.jpg'
import './default.less';

export default class Demo extends Component {
    static template = `
        <div class="avatar-group-demo">
            <div class="demo-controller">
                <div class="cos-row cos-row-col-12 cos-gutter">
                    <div class="cos-col-2">
                        <cos-button on-click="add" size="sm">Add</cos-button>
                    </div>
                    <div class="cos-col-2">
                        <cos-button on-click="remove" size="sm">Remove</cos-button>
                    </div>
                </div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击添加/删除头像，默认槽位内传入元素超过三个，截断显示</h4>
            </div>

            <div class="demo-xs">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: xs (16px) 头像遮挡 7 px</h4>
                <cos-avatar-group size="xs">
                    <cos-avatar
                        s-for="item in count"
                        src="{{src}}"
                        alt="{{alt}}"
                        size="xs"
                    />
                </cos-avatar-group>
            </div>
            <div class="demo-sm">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: sm (24px) 头像遮挡 12 px</h4>
                <cos-avatar-group size="sm">
                    <cos-avatar
                        s-for="item in count"
                        src="{{src}}"
                        alt="{{alt}}"
                        size="sm"
                    />
                </cos-avatar-group>
            </div>
            <div class="demo-md">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">size: md (40px) 头像遮挡 22 px</h4>
                <cos-avatar-group size="md">
                    <cos-avatar
                        s-for="item in count"
                        src="{{src}}"
                        alt="{{alt}}"
                        size="md"
                    />
                </cos-avatar-group>
            </div>
        </div>`;

    static components = {
        'cos-avatar-group': AvatarGroup,
        'cos-avatar': Avatar,
        'cos-button': Button
    };

    initData() {
        return {
            src: avatarImg,
            alt: 'alt message',
            count: [0, 1, 2]
        };
    }

    add() {
        if (this.data.get('count').length <= 3) {
            this.data.push('count', this.data.get('count').length)
        }
    }
    remove() {
        this.data.pop('count')
    }
}
```