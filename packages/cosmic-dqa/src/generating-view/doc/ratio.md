```san export=preview caption=不同宽高比

import {Component} from 'san';
import GeneratingView from '@cosui/cosmic-dqa/generating-view';
import './ratio.less';

export default class RatioDemo extends Component {

    static template = `
        <div style="position: relative;">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                支持不同宽高比，通过 token 设置：16-9（默认），4-3，1-1，3-4，9-16
            </h4>
            <div class="ratio-demo-grid">
                <div s-for="ratio in ratios">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                        {{ratio}}: cosd-generating-view-{{ratio}}
                    </h4>
                    <div class="cos-space-mb-xxl">
                        <cosd-generating-view
                            icon="{{icon}}"
                            caption="{{caption}}"
                            class="cosd-generating-view-{{ratio}}"
                        />
                    </div>
                </div>
            </div>

        </div>
    `;

    static components = {
        'cosd-generating-view': GeneratingView
    };

    initData() {
        return {
            ratios: ['16-9', '4-3', '1-1', '3-4', '9-16'],
            icon: "ai-music",
            caption: '说明文本'
        }
    }
}
```
