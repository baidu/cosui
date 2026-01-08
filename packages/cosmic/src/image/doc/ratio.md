```san export=preview caption=图片尺寸
import {Component} from 'san';
import Image from '@cosui/cosmic/image';

export default class ImageDemo extends Component {
    static template = `
        <div data-testid="image-ratio">
            <p class="cos-space-mt-none cos-space-mb-sm">提供比例 1:1、3:1、3:4、4:3、5:1、16:9</p>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div class="cos-col-2">
                    <p class="cos-color-text-minor cos-space-mt-none">2N 1:1</p>
                    <cos-image
                        src="{{src}}"
                        mask="linear"
                        class="cos-image-1-1"
                    />
                </div>
                <div class="cos-col-2">
                    <p class="cos-color-text-minor cos-space-mt-none">2N 3:4</p>
                    <cos-image
                        src="{{src}}"
                        mask="around"
                        class="cos-image-3-4"
                    />
                </div>
            </div>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <p class="cos-color-text-minor">4N 4:3</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-4-3"
                    />
                </div>
                <div class="cos-col">
                    <p class="cos-color-text-minor">4N 1:1</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-1-1"
                    />
                </div>
                <div class="cos-col">
                    <p class="cos-color-text-minor">4N 3:4</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-3-4"
                    />
                </div>
            </div>
            <div class="cos-row cos-gutter" >
                <div class="cos-col">
                    <p class="cos-color-text-minor">12N 5:1</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-5-1"
                    />
                </div>
            </div>
            <div class="cos-row cos-gutter" >
                <div class="cos-col">
                    <p class="cos-color-text-minor">12N 3:1</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-3-1"
                    />
                </div>
            </div>
            <div class="cos-row cos-gutter" >
                <div class="cos-col">
                    <p class="cos-color-text-minor">12N 16:9</p>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-16-9"
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
            src: 'https://gips0.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248'
        };
    }
}

```
