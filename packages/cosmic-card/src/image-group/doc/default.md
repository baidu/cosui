```san export=preview caption=常用样式
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';
import Image from '@cosui/cosmic/image';
import './default.less';

const ImageSrc = 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248';

export default class ImageGroupDemo extends Component {
    static template = `
        <div class="image-group-demo">
            <h4 class="cos-space-mt-none">2 图</h4>
            <cosc-image-group
                list="{{list2}}"
                linkInfo="{{linkInfo[0]}}"/>
            <h4>3 图</h4>
            <cosc-image-group
                list="{{list3}}"
                linkInfo="{{linkInfo[0]}}"/>
            <h4>4 图</h4>
            <cosc-image-group
                list="{{list4}}"
                linkInfo="{{linkInfo[0]}}"
                />
            <h4>5 图</h4>
            <cosc-image-group
                list="{{list5}}"
                linkInfo="{{linkInfo[0]}}"/>
        </div>
    `;
    static components = {
        'cosc-image-group': ImageGroup,
        'cos-image': Image
    };

    initData() {
        return {
            linkInfo: {
                href: 'https://www.baidu.com',
            },
            list2: [
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                }
            ],
            list3: [
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                }
            ],
            list4: [
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                }
            ],
            list5: [
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc
                }
            ]
        };
    }
}

```
