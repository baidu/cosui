```san export=preview platform=mobile caption=多图自由组合（wise）
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';
import './label.less';
import './custom-combination.less';

export default class ImageGroupDemo extends Component {
    static template = `
        <div class="image-group-demo">
            <div>
                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">
                    以下为 wise 端样式使用规范
                </p>
                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none">目前图集暂不支持通过图片列表项配置槽位，可自行使用 Image 组件添加槽位。</p>

                <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">1. 2图8N 单图比例 1:1</p>
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
                            class="cos-image-1-1 right-image"
                        />
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg">2.整体比例 3:1</p>
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
                                99
                            </div>
                        </cos-image>
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg">3.整体比例 19:9</p>
                <div class="image-group-ratio-19-9">
                    <div
                        class="cos-row cos-row-col-12 cos-gutter image-group"
                        style="--cos-grid-gutter: 2px"
                    >
                        <div class="cos-col-6">
                            <cos-image
                                src="{{src}}"
                                class="left-image cos-image-fit-cover"
                            />
                        </div>
                        <div class="cos-col-6">
                            <cos-image
                                src="{{src}}"
                                class="right-image cos-image-fit-cover"
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
                                    99
                                </div>
                            </cos-image>
                        </div>
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg">4.整体比例 19:9</p>
                <div class="image-group-ratio-19-9">
                    <div
                        class="cos-row cos-row-col-12 cos-gutter image-group"
                        style="--cos-grid-gutter: 2px"
                    >
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="left-image cos-image-fit-cover"
                            />
                        </div>
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="middle-image cos-image-fit-cover"
                            />
                        </div>
                        <div class="cos-col-4">
                            <cos-image
                                src="{{src}}"
                                class="right-image cos-image-fit-cover"
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
                                    99
                                </div>
                            </cos-image>
                        </div>
                    </div>
                </div>

                <p class="cos-color-text-minor cos-space-mb-lg">5.整体比例 19:9 </p>
                <div class="image-group-ratio-19-9">
                    <div class="cos-row cos-row-col-12 cos-gutter image-group" style="--cos-grid-gutter: 2px">
                        <div class="cos-col-8">
                            <cos-image
                                src="{{src}}"
                                class="left-image cos-image-fit-cover"
                            />
                        </div>
                        <div class="cos-col-4 cos-flex cos-flex-col">
                            <cos-image
                                src="{{src}}"
                                class="cos-flex-1 cos-row-image-item right-top-image cos-image-fit-cover"
                            />
                            <cos-image
                                src="{{src}}"
                                class="cos-flex-1 right-bottom-image cos-image-fit-cover"
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
                                    99
                                </div>
                            </cos-image>
                        </div>
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
