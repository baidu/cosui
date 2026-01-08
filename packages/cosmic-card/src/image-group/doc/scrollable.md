```san export=preview platform=mobile caption=以横滑方式展示图片
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';
import './scrollable.less';

export default class ImageGroupDemo extends Component {
    static template = `
        <div data-testid="image-group-scrollable">
            <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">指定整体比例19:9,8N+4N横滑</p>
            <cosc-image-group
                span="{{span}}"
                scrollable="{{true}}"
                list="{{list}}"
                space-between="{{8}}"
                class="image-group-scrollable-mix image-group-demo"
            />
        </div>
    `;
    static components = {
        'cosc-image-group': ImageGroup
    };

    initData() {
        return {
            span: 4,
            list:
                [
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
                        span: 8
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
                    },
                    {
                        src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
                        span: 8
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
