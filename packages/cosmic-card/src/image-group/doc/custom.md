```san export=preview caption=固定栅格拼图
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';
import './custom.less';

export default class ImageGroupDemo extends Component {
    static template = `
        <div class="image-group-demo">
            <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-none" >{{isPc ? 'PC 栅格布局 9N: 3N' : 'Wise 栅格布局 8N: 4N'}}</p>
            <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">视频 + 图片。视频遵循视频槽位规范，图片为单图或图集</p>
            <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">1.视频 + 单图</p>
            <div class="cos-row cos-row-col-12 cos-gutter image-group-demo-item" style="--cos-grid-gutter: {{isPc ? '16px' : '8px'}}">
                <div class="{{isPc ? 'cos-col-9 ' : 'cos-col-8 '}} cos-color-text-inverse">
                    <cos-image src="{{image3_2}}" class="{{isPc ? 'image-ratio-3-1 ' : 'image-ratio-2-1 '}} cos-image-fit-cover">
                        <div
                            style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            "
                        >
                            <div class="video-icon"></div>
                        </div>
                    </cos-image>
                </div>
                <div class="{{isPc ? 'cos-col-3' : 'cos-col-4'}}">
                    <cos-image
                        src="{{image2_3}}"
                        class="cos-image-1-1 cos-image-fit-fill"
                    >
                    </cos-image>
                </div>
            </div>

            <p class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">2.视频 + 图集。图片仅可配置图集标签</p>
            <div class="cos-row cos-row-col-12 cos-gutter image-group-demo-item" style="--cos-grid-gutter: {{isPc ? '16px' : '8px'}}">
                <div class="{{isPc ? 'cos-col-9' : 'cos-col-8'}} cos-color-text-inverse">
                    <cos-image src="{{image3_2}}" class="{{isPc ? 'image-ratio-3-1' : 'image-ratio-2-1'}} cos-image-fit-cover">
                        <div
                            style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            "
                        >
                            <div class="video-icon"></div>
                        </div>
                    </cos-image>
                </div>
                <div class="{{isPc ? 'cos-col-3' : 'cos-col-4'}}">
                    <cos-image
                        src="{{image2_3}}"
                        class="cos-image-1-1 cos-image-fit-fill"
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

            <p  class="cos-color-text-minor cos-space-mb-lg cos-space-mt-lg">3.分图点击示例</p>
            <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: {{isPc ? '16px' : '8px'}}">
                <div class="{{isPc ? 'cos-col-9' : 'cos-col-8'}} cos-color-text-inverse">
                    <a
                        s-bind="{{linkInfo[0]}}"
                        class="cos-link jump-link"
                    >
                        <cos-image src="{{image3_2}}" class="{{isPc ? 'image-ratio-3-1' : 'image-ratio-2-1'}} cos-image-fit-cover ">
                        <div
                            style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            "
                        >
                            <div class="video-icon"></div>
                        </div>
                    </cos-image>
                    </a>
                </div>
                <div class="{{isPc ? 'cos-col-3' : 'cos-col-4'}}">
                    <a
                        s-bind="{{linkInfo[1]}}"
                        class="cos-link jump-link"
                    >
                        <cos-image
                            src="{{image2_3}}"
                            class="cos-image-1-1 cos-image-fit-fill"
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
                    </a>
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
            image2_3: 'https://gips1.baidu.com/it/u=2479417158,2594490198&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f186_248',
            image3_2: 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427',
            linkInfo: [
                {
                    href: 'https://www.baidu.com/s?wd=%E8%82%9D',
                },
                {
                    href: 'https://www.baidu.com/s?wd=%E7%8C%AB',
                }
            ],
        };
    }
}

```
