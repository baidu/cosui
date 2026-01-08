```san export=preview caption=动态图标

import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import GeneratingView from '@cosui/cosmic-dqa/generating-view';
import lottie from 'lottie-web';
import './dynamic.less';

export default class DynamicDemo extends Component {

    static template = `
        <div style="position: relative;">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                实现动态图标和进度更新
            </h4>
            <div class="cos-col-4">
                <cos-button
                    class="cos-dqa cos-button-secondary cos-space-mb-xs"
                    on-click="regenerate"
                >
                    重新生成
                </cos-button>
            </div>
            <div class="cos-space-mb-xxl">
                <cosd-generating-view
                    s-if="progress < 100"
                    caption="{{progress + '%'}}"
                >
                    <div slot="icon" s-ref="dynamicIcon" class="loading-icon">
                    </div>
                </cosd-generating-view>
                <cos-image
                    s-if="progress >= 100"
                    on-load="handleLoaded"
                    src="{{src}}"
                    class="cos-image-fit-fill cos-image-16-9 final-image {{imageLoaded ? 'image-visible' : 'image-loading'}}"
                />
            </div>
        </div>
    `;

    interval = null;

    static components = {
        'cos-button': Button,
        'cos-icon': Icon,
        'cos-image': Image,
        'cosd-generating-view': GeneratingView
    };

    initData() {
        return {
            progress: 0,
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
            imageLoaded: false
        }
    }

    attached() {
        this.regenerate();
    }

    detached() {
        clearInterval(this.interval);
    }

    regenerate() {
        this.data.set('progress', 0);
        this.data.set('imageLoaded', false);

        setTimeout(() => {
            lottie.loadAnimation({
                container: this.ref('dynamicIcon'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'https://psstatic.cdn.bcebos.com/basics/chat/brush_1741693509000.json'
            });
        }, 0);


        // 模拟进度更新，生成完后替换为图片
        this.interval = setInterval(() => {
            this.data.set('progress', this.data.get('progress') + 1);
            if (this.data.get('progress') > 100) {
                clearInterval(this.interval);
            }
        }, 40);
    }

    handleLoaded() {
        setTimeout(() => this.data.set('imageLoaded', true), 200);
    }
}
```
