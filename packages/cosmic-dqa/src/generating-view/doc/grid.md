```san export=preview caption=组合

import {Component} from 'san';
import GeneratingView from '@cosui/cosmic-dqa/generating-view';
import './grid.less';

export default class GridDemo extends Component {

    static template = `
        <div style="position: relative;">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                横向平铺
            </h4>
            <div class="cos-space-mb-xxl grid-demo-row">
                <div s-for="item in flatList" class="grid-demo-item">
                    <cosd-generating-view
                        icon="{{icon}}"
                        caption="{{progress}}"
                        class="cosd-generating-view-9-16"
                    />
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                四宫格
            </h4>
            <div class="cos-space-mb-xxl grid-demo-quad">
                <div s-for="item in quadList" class="grid-demo-item">
                    <cosd-generating-view
                        icon="{{icon}}"
                        caption="{{progress}}"
                        class="cosd-generating-view-16-9"
                    />
                </div>
            </div>
        </div>
    `;

    static components = {
        'cosd-generating-view': GeneratingView
    };

    initData() {
        return {
            icon: 'ai-music',
            progress: '说明文本',
            flatList: [1, 2, 3, 4],
            quadList: [1, 2, 3, 4]
        }
    }
}
```
