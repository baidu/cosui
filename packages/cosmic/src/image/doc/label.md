```san export=preview caption=图片插槽
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';
import Tag from '@cosui/cosmic/tag';
import './label.less'

export default class Demo extends Component {

    static template = `
        <div data-testid="image-label" class="image-label">
            <p class="cos-color-text cos-space-mb-sm cos-space-mt-none">提供插槽自定义图片上方的内容，样式代码可参考如下示例。位于四个角的槽位与图片边缘间距为 8 px。</p>
            <p class="cos-color-text-minor cos-space-mb-xs">中间槽位</p>
            <div class="cos-row cos-row-col-12">
                <div class="cos-col-6 cos-color-text-inverse">
                    <cos-image src="{{src}}">
                        <div
                            style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            "
                        >
                            <div class="image-icon"></div>
                        </div>
                    </cos-image>
                </div>
            </div>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div class="cos-col-4 cos-color-text-inverse">
                    <p class="cos-color-text-minor cos-space-mb-xs">左上槽位</p>
                    <cos-image class="cos-image-3-4 cos-image-fit-cover" src="{{src}}">
                        <div
                            style="
                                position:absolute;
                                top: 8px;
                                left: 8px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                padding: var(--cos-space-3xs);
                                font-size: var(--cos-text-caption-sm);
                                background: var(--cos-brand-search-0);
                                border-radius: var(--cos-rounded-xxs);
                            "
                        >
                            正版
                        </div>
                    </cos-image>
                </div>
                <div class="cos-col-4 cos-color-text-inverse">
                    <p class="cos-color-text-minor cos-space-mb-xs">右上槽位</p>
                    <cos-image class="cos-image-3-4 cos-image-fit-cover" src="{{src}}">
                        <div
                            style="
                                position: absolute;
                                right: 0px;
                                top: 0px;
                                width: 30px;
                                height: 30px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                border-radius: var(--cos-rounded-none) var(--cos-rounded-sm) var(--cos-rounded-none) var(--cos-rounded-sm);
                                font-size: var(--cos-text-subtitle);
                                background: var(--cos-color-bg-inverse);
                            "
                        >
                            <cos-icon
                                name="star1"
                                class="font-size-inherit"
                            />
                        </div>
                    </cos-image>
                </div>
            </div>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div class="cos-col-6 cos-color-text-inverse">
                    <p class="cos-color-text-minor cos-space-mb-xs">左下槽位</p>
                    <cos-image src="{{src}}">
                        <div
                            style="
                                position: absolute;
                                left: 8px;
                                bottom: 8px;
                                display: flex;
                                background: var(--cos-color-bg-inverse);
                                justify-content: center;
                                align-items: center;
                                padding: var(--cos-space-3xs);
                                font-size: var(--cos-text-caption-sm);
                                border-radius: var(--cos-rounded-xxs);
                            "
                        >
                            2024发布
                        </div>
                    </cos-image>
                </div>
                <div class="cos-col-4 cos-color-text-inverse">
                    <p class="cos-color-text-minor cos-space-mb-xs">右下槽位</p>
                    <cos-image class="cos-image-3-4 cos-image-fit-cover" src="{{src}}">
                        <div
                            style="
                                position: absolute;
                                right: 8px;
                                bottom: 8px;
                            "
                        >
                            <div class="image-douban-icon"></div>
                        </div>
                    </cos-image>
                </div>
            </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon,
        'cos-tag': Tag
    };

    initData() {
        return {
            src: 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427'
        };
    }
}
```
