```san export=preview caption=常用样式
import {Component} from 'san';
import Avatar from '@cosui/cosmic/avatar';
import './default.less';
import img from './avatar.jpg';

export default class Demo extends Component {
    static template = `
        <div class="avatar-demo">
            <div>
                <h4>16px</h4>
                <cos-avatar
                    src="{{src}}"
                    alt="{{alt}}"
                    size="xs"
                />
            </div>
            <div>
                <h4>24px</h4>
                <cos-avatar
                    src="{{src}}"
                    alt="{{alt}}"
                    placeholder="{{placeholder}}"
                    size="sm"
                />
            </div>
            <div>
                <h4>40px</h4>
                <cos-avatar
                    src="{{src}}"
                    alt="{{alt}}"
                    size="md"
                />
            </div>
            <div>
                <h4>默认头像</h4>
                <cos-avatar
                    alt="{{alt}}"
                    size="md"
                />
            </div>
            <div>
                <h4>设置兜底头像</h4>
                <cos-avatar
                    alt="{{alt}}"
                    size="md"
                    fallback="{{placeholder}}"
                />
            </div>
        </div>`;

    static components = {
        'cos-avatar': Avatar
    };

    initData() {
        return {
            src: img,
            placeholder: 'https://gips2.baidu.com/it/u=182824533,4089501659&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40',
            alt: 'alt message',
        };
    }
}
```