``` san export=preview caption=整页loading
import {Component} from 'san';
import Loading from '@cosui/cosmic/loading';
import lottie from 'lottie-web';
import './index.less';

export default class Default extends Component {

    static template = `
        <div class="page-loading">
            <p class="cos-text-subtitle-sm cos-color-text-minor">日间（无文案）</p>
            <cos-loading text="">
                <div slot="icon" s-ref="containerNoText" class="page-loading-icon">
                </div>
            </cos-loading>
            <p class="cos-text-subtitle-sm cos-color-text-minor">夜间/暗黑（无文案）</p>
            <cos-loading text="">
                <div slot="icon" s-ref="containerDarkNoText" class="page-loading-icon">
                </div>
            </cos-loading>
            <p class="cos-text-subtitle-sm cos-color-text-minor">日间</p>
            <cos-loading>
                <div slot="icon" s-ref="container" class="page-loading-icon">
                </div>
            </cos-loading>
            <p class="cos-text-subtitle-sm cos-color-text-minor">夜间/暗黑</p>
            <cos-loading>
                <div slot="icon" s-ref="containerDark" class="page-loading-icon">
                </div>
            </cos-loading>

        </div>
    `;

    static components = {
        'cos-loading': Loading
    };
    attached() {
        // 动画展现
        lottie.loadAnimation({
            container: this.ref('container'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoading_1740992931000.json',
            pathDark: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoadingDark_1740993980000.json'
        });
        lottie.loadAnimation({
            container: this.ref('containerDark'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoadingDark_1740993980000.json'
        });
        lottie.loadAnimation({
            container: this.ref('containerNoText'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoading_1740992931000.json',
            pathDark: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoadingDark_1740993980000.json'
        });
        lottie.loadAnimation({
            container: this.ref('containerDarkNoText'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'https://psstatic.cdn.bcebos.com/basics/lxf/pageLoadingDark_1740993980000.json'
        });
    }
}

```
