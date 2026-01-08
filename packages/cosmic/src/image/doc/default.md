```san export=preview caption=基础用法
import {Component} from 'san';
import Image from '@cosui/cosmic/image';

export default class ImageDemo extends Component {
    static template = `
        <div data-testid="image-default">
            <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 16px">
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本样式</h4>
                    <cos-image
                        src="{{src}}"
                        alt="基本样式"
                        class="cos-image-3-2"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">鼠标悬停放大(仅PC)</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-3-2 cos-image-hover"
                    />
                </div>
                <div class="cos-col-4" data-testid="error-image">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击切换图片</h4>
                    <cos-image
                        src="{{picSrc}}"
                        class="cos-image-3-2"
                        on-click="native:changePicSrc"
                        on-error="handleError"
                        on-load="handleLoad"
                    />
                </div>
            </div>

        </div>
    `;
    static components = {
        'cos-image': Image
    };

    initData() {
        return {
            src: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
            picSrc: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
            count: 0
        };
    }

    changePicSrc() {
        console.log('click image');

        const imgs = [
                'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
                'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248'
        ];
        const count = this.data.get('count') + 1;
        this.data.set('picSrc', imgs[count % 2]);
        this.data.set('count', count);
    }

    handleLoad(e) {
        console.log('load image');
    }

    handleError(e) {
        console.log('error image');
    }
}

```
