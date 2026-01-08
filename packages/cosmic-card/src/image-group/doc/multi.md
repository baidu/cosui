```san export=preview caption=多行图集
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';

export default class ImageGroupDemo extends Component {
    static template = `
        <div data-testid="image-group-multi">
            <cosc-image-group
                list="{{list}}"
                maxRow="{{3}}"
                span="{{isPc ? 3 : 4}}"
                on-click="handelClick"
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
    };

    handelClick(e) {
        console.log('handelClick');
        console.log(e.image.src);
    }
}

```
