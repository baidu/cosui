```san export=preview caption=展示图片来源与跳转 platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import ImageViewer from '@cosui/cosmic/image-viewer';

const horizontalImage = 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427';
const verticalImage = 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753';

export default class ImageViewerSourceDemo extends Component {
    static template = `
        <div data-testid="image-viewer-source">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                source.title 可省略，仅传 linkInfo 时左上角只展示跳转按钮
            </h4>
            <cos-button on-click="openViewer">带来源信息的查看器</cos-button>
        </div>
    `;

    static components = {
        'cos-button': Button
    };

    openViewer() {
        ImageViewer.open({
            items: [
                {
                    src: verticalImage,
                    alt: '旅行图片 1',
                    source: {
                        title: '法国西班牙意大利9日游:美食与历史全攻略',
                        actionText: '查看原网页',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                            target: '_blank'
                        }
                    }
                },
                {
                    src: horizontalImage,
                    alt: '旅行图片 2',
                    source: {
                        // 省略 title，仅展示跳转按钮
                        linkInfo: {
                            href: 'https://www.baidu.com'
                        }
                    }
                },
                {
                    src: verticalImage,
                    alt: '旅行图片 3',
                    source: {
                        title: '巴黎自由行:塞纳河游船与卢浮宫深度游',
                        // 自定义跳转按钮文字，替换默认的「查看原网页」
                        actionText: '前往攻略详情',
                        linkInfo: {
                            href: 'https://www.baidu.com',
                            target: '_blank'
                        }
                    }
                }
            ],
            activeIndex: 0,
            onSourceClick(detail) {
                console.log('点击来源, 图片下标:', detail.index);
            },
            onDownload(detail) {
                console.log('点击下载, 图片下标:', detail.index);
            }
        });
    }
}
```
