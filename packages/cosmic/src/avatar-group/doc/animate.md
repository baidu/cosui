```san export=preview caption=动效示例
import {Component} from 'san';
import AvatarGroup from '@cosui/cosmic/avatar-group';
import Avatar from '@cosui/cosmic/avatar';
import Switcher from '@cosui/cosmic/switcher';
import avatarImg from './avatar.jpg'
import './animate.less';

export default class Demo extends Component {
    static template = `
        <div class="avatar-group-demo">
            <div class="demo-controller">
                <div class="cos-flex cos-items-center cos-space-mt-xs">
                    <label class="cos-space-mr-lg">是否开启动画: </label>
                    <cos-switcher checked="{=animate=}" size="sm"/>
                </div>
            </div>

            <div class="demo-animation">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">头像超过三个后，支持轮播动效</h4>
                <cos-avatar-group size="md" animate="{{animate}}">
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
        'cos-switcher': Switcher
    };

    initData() {
        return {
            src: avatarImg,
            alt: 'alt message',
            animate: true,
            count: [0, 1, 2, 3, 4],
        };
    }
}
```