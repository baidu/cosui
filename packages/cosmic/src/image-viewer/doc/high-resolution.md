```san export=preview caption=高分辨率图片 platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import ImageViewer from '@cosui/cosmic/image-viewer';

// 两张原图均远超 stage 视口，前者竖幅 4000 × 6000，后者横幅 3175 × 2125，
// 用于验证 contain 缩到视口内 + 缩放拖动交互
const highResPortrait = 'https://psstatic.cdn.bcebos.com/basics/pexels-memo-28663652_1786454346000.jpg';
const highResLandscape = 'https://psstatic.cdn.bcebos.com/basics/autumn-mountain-with-lake_1786454153000.jpg';

export default class ImageViewerHighResolutionDemo extends Component {
    static template = `
        <div data-testid="image-viewer-high-resolution">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                原图远大于视口，打开后按 contain 缩放到 stage 内，可用滚轮 / 双指手势放大查看细节
            </h4>
            <cos-button on-click="openViewer">打开高分辨率查看器</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    openViewer() {
        ImageViewer.open({
            items: [
                {
                    src: highResPortrait,
                    alt: '人物竖幅',
                    width: 4000,
                    height: 6000
                },
                {
                    src: highResLandscape,
                    alt: '秋日山湖',
                    width: 3175,
                    height: 2125
                }
            ]
        });
    }
}
```
