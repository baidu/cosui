```san export=preview caption=基础用法 platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import ImageViewer from '@cosui/cosmic/image-viewer';

const horizontalImage = 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427';
const verticalImage = 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753';
const wideImage = 'https://t15.baidu.com/it/u=3316478311,1741256587&fm=220&app=103&size=w931&q=75&n=0&g=12n&f=JPEG&fmt=auto&maxorilen2heic=2000000';

export default class ImageViewerBasicDemo extends Component {
    static template = `
        <div data-testid="image-viewer-basic">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                点击下方按钮打开大图查看器
            </h4>
            <div class="cos-flex" style="gap: 6px;">
                <cos-button on-click="openViewer(1)">单图</cos-button>
                <cos-button on-click="openViewer(6)">多图</cos-button>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    openViewer(num) {
        const images = [
            {src: verticalImage, alt: '旅行图片 1'},
            {src: horizontalImage, alt: '旅行图片 2'},
            {src: wideImage, alt: '旅行图片 3'},
            {src: verticalImage, alt: '旅行图片 4'},
            {src: horizontalImage, alt: '旅行图片 5'},
            {src: wideImage, alt: '旅行图片 6'}
        ];
        ImageViewer.open({
            items: images.splice(0, num),
            activeIndex: 0,
            onChange(detail) {
                console.log('切换到第', detail.index + 1, '张图片');
            },
            onClose(detail) {
                console.log('查看器已关闭, 停留在第', detail.index + 1, '张');
            }
        });
    }
}
```
