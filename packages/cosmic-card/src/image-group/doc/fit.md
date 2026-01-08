```san export=preview caption=图片填充模式
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';

export default class ImageGroupDemo extends Component {
    static template = `
        <div>
            <p class="cos-space-mt-none">提供常见图片填充方式: fit-fill、fit-contain、fit-cover</p>
            <cosc-image-group
                list="{{list}}"
                maxRow="{{2}}"
                span="{{isPc ? 3 : 4}}"
                class="cosc-image-group-fit-cover"
            />
        </div>
    `;
    static components = {
        'cosc-image-group': ImageGroup
    };

    initData() {
        return {
            list: new Array(9).fill({src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'})
        };
    }
}

```
