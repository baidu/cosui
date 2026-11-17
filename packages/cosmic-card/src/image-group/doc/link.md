```san export=preview caption=图片跳转
import {Component} from 'san';
import ImageGroup from '@cosui/cosmic-card/image-group';

const ImageSrc = 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248';

export default class ImageGroupDemo extends Component {
    static template = `
        <div data-testid="image-group-link">
            <cosc-image-group
                list="{{list}}"
                linkInfo="{{linkInfo}}"
            />
        </div>
    `;

    static components = {
        'cosc-image-group': ImageGroup
    };

    initData() {
        return {
            linkInfo: {
                href: 'https://www.baidu.com/s?wd=image-group'
            },
            list: [
                {
                    src: ImageSrc,
                    linkInfo: {
                        href: 'https://www.baidu.com/s?wd=image-group-item-1'
                    }
                },
                {
                    src: ImageSrc
                },
                {
                    src: ImageSrc,
                    linkInfo: {
                        href: 'https://www.baidu.com/s?wd=image-group-item-3'
                    }
                }
            ]
        };
    }
}
```
