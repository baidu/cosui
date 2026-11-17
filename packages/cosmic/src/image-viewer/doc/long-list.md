```san export=preview caption=图片列表超过一屏 platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import ImageViewer from '@cosui/cosmic/image-viewer';

const horizontalImage = 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427';
const verticalImage = 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753';
const wideImage = 'https://t15.baidu.com/it/u=3316478311,1741256587&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000';

// 40 张图片，用于观察前 / 中 / 后半段的滚动定位规则
const items = Array(40).fill({
    src: horizontalImage,
    alt: 'horizontalImage',
    width: 640,
    height: 427
})

export default class ImageViewerLongListDemo extends Component {
    static template = `
        <div data-testid="image-viewer-long-list">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                切换图片时, 会尽量保持选中图片在列表中居中展示
            </h4>
            <cos-button on-click="openViewer">打开 40 张图查看器</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    openViewer() {
        ImageViewer.open({
            items,
            activeIndex: 0
        });
    }
}
```
