```san export=preview caption=基础用法
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';

export default class ImageGroupDemo extends Component {
    static template = `
        <div data-testid="image-group-default">
            <cosc-image-group
                list="{{list}}"
                linkInfo="{{linkInfo}}"
                span="{{isPc ? 3 : 4}}"
            />
        </div>
    `;
    static components = {
        'cosc-image-group': ImageGroup
    };

    initData() {
        return {
            linkInfo: {
                href: 'https://www.baidu.com',
            },
            list: [
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
