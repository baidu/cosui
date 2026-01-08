```san export=preview caption=基础用法

import {Component} from 'san';
import GeneratingView from '@cosui/cosmic-dqa/generating-view';
import './default.less';

export default class DefaultDemo extends Component {

    static template = `
        <div style="position: relative;">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                通用类型（视频、音乐、图片、播客）
            </h4>
            <div class="cos-space-mb-xxl">
                <cosd-generating-view
                    icon="{{icon}}"
                    caption="{{caption}}"
                />
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                浅色文件类型（文创、代码、深入研究）
            </h4>
            <div class="cos-space-mb-xxl">
                <cosd-generating-view
                    icon="{{docImageIcon}}"
                    title="{{title}}"
                    caption="{{caption}}"
                    appearance="card"
                />
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                深色文件类型（PPT）
            </h4>
            <div class="cos-space-mb-xxl">
                <cosd-generating-view
                    icon="{{pptImageIcon}}"
                    title="{{title}}"
                    caption="{{caption}}"
                    appearance="card"
                    gradient="linear-gradient(#0000, #0006)"
                    class="cosd-generating-view-dark"
                />
            </div>
        </div>
    `;

    static components = {
        'cosd-generating-view': GeneratingView
    };

    initData() {
        return {
            icon: "ai-music",
            pptImageIcon: 'https://now.bdstatic.com/stash/v1/5a29e11/chat-search/fce5765/pptx.png',
            docImageIcon: 'https://psstatic.cdn.bcebos.com/aife/deepReseach_1761557671000.png',
            title: '标题',
            caption: '说明文本'
        }
    }
}
```
