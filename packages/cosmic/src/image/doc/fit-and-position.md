```san export=preview caption=填充模式和位置
import {Component} from 'san';
import Image from '@cosui/cosmic/image';

export default class ImageDemo extends Component {
    static template = `
        <div data-testid="image-fit-and-position">
            <p class="cos-space-mb-sm cos-space-mt-none ">提供3种填充类型。</p>
            <div class="cos-row cos-row-col-12 cos-gutter " style="--cos-grid-gutter: 16px">
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">fill</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-fill cos-image-16-9"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">contain</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-contain cos-image-16-9"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">cover</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-16-9"
                    />
                </div>
            </div>
            <br/>
            <p class="cos-space-mb-sm">提供5种对齐位置。</p>
            <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 16px">
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">center</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-position-center cos-image-16-9"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">top</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-position-top cos-image-16-9"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">right</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-position-right cos-image-16-9"
                    />
                </div>
            </div>
            <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 16px">
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-xs cos-space-mb-xs cos-font-regular">bottom</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-position-bottom cos-image-16-9"
                    />
                </div>
                <div class="cos-col-4">
                    <h4 class="cos-color-text-minor cos-space-mt-xs cos-space-mb-xs cos-font-regular">left</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-fit-cover cos-image-position-left cos-image-16-9"
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
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753'
        };
    }
}

```
