```san export=preview caption=图集槽位说明
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import './label.less';
import Icon from '@cosui/cosmic/icon';

export default class ImageGroupDemo extends Component {
    static template = `
        <div class="image-group-demo">
            <div s-if="isPc">
                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">目前图集暂不支持通过图片列表项配置槽位，可自行使用 Image 组件添加槽位。</p>

                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">1. pc 端横图拼图最多显示 4 张，超过需使用图集标识</p>
                <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 2px">
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 left-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 right-image"
                        >
                        </cos-image>
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">2.pc 端横图拼图超过 4 张需使用图集标识</p>
                <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 2px">
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 left-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-3">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 right-image"
                        >
                            <div
                                style="
                                    position: absolute;
                                    right: 9px;
                                    bottom: 9px;
                                    color: var(--cos-color-text-inverse);
                                "
                            >
                                <cos-icon
                                    name="imagegroup"
                                    class="font-size-inherit"
                                />
                                5
                            </div>
                        </cos-image>
                    </div>
                </div>
            </div>
            <div s-else>
                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">目前图集暂不支持通过图片列表项配置槽位，可自行使用 Image 组件添加槽位。</p>

                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">1. wise 端横图拼图最多显示 3 张，超过需使用图集标识</p>
                <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 2px">
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 left-image"
                        />
                    </div>
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 right-image"
                        >
                        </cos-image>
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">2. wise 端超过 3 张需使用图集标识</p>
                <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 2px">
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 left-image"
                        />
                    </div>
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 middle-image"
                        />
                    </div>
                    <div class="cos-col-4">
                        <cos-image
                            src="{{src}}"
                            class="cos-image-1-1 right-image"
                        >
                            <div
                                style="
                                    position: absolute;
                                    right: 9px;
                                    bottom: 9px;
                                    color: var(--cos-color-text-inverse);
                                "
                            >
                                <cos-icon
                                    name="imagegroup"
                                    class="font-size-inherit"
                                />
                                4
                            </div>
                        </cos-image>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon
    };

    initData() {
        return {
            src: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248'
        };
    }
}

```
