```san export=preview caption=缩略图按图片宽高比自适应 platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import ImageViewer from '@cosui/cosmic/image-viewer';

const horizontalImage = 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427';
const verticalImage = 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753';
const wideImage = 'https://t15.baidu.com/it/u=3316478311,1741256587&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000';

// 传入 width / height 后，缩略图会按最接近的 1:1 / 4:3 / 3:4 三档展示；缺数据时默认 1:1
const items = [
    {src: horizontalImage, alt: '横图 4:3', width: 640, height: 427},
    {src: verticalImage, alt: '竖图 3:4', width: 500, height: 753},
    {src: wideImage, alt: '宽图（按最接近的 4:3 归档）', width: 931, height: 400},
    {src: horizontalImage, alt: '正方形（近似 1:1）', width: 480, height: 500},
    {src: verticalImage, alt: '未提供尺寸，默认 1:1'}
];

export default class ImageViewerRatioDemo extends Component {
    static template = `
        <div data-testid="image-viewer-ratio">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                传入 width / height 后，缩略图会按最接近的 1:1 / 4:3 / 3:4 三档展示；缺数据时默认 1:1
            </h4>
            <cos-button on-click="openViewer">打开混合比例查看器</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    openViewer() {
        ImageViewer.open({items});
    }
}
```
