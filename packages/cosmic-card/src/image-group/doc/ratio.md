```san export=preview caption=设置图片比例
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';

export default class ImageGroupDemo extends Component {
    static template = `
        <div data-testid="image-group-ratio">
            <p class="cos-space-mt-none">提供常见图片比例: 1:1、4:3、3:4</p>
            <cosc-image-group
                list="{{list}}"
                maxRow="{{2}}"
                span="{{isPc ? 3 : 4}}"
                class="cosc-image-group-1-1"
            />
        </div>
    `;
    static components = {
        'cosc-image-group': ImageGroup
    };

    initData() {
        return {
            list:
                [
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    }
                ]
        };
    }
}

```
