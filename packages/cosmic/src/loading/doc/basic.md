``` san export=preview caption=默认loading
import {Component} from 'san';
import './index.less';
import Loading from '@cosui/cosmic/loading';

export default class Default extends Component {

    static template = `
        <div>
            <div data-testid="default-loading">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">默认样式</h4>
                <cos-loading/>
            </div>
            <div data-testid="loading-with-reverse">
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">反色icon，常用于深色背景</h4>
                <div class="loading-box cos-flex cos-rounded-md cos-space-p-sm">
                    <cos-loading appearance="{{appearance}}"/>
                </div>
            </div>
            <div data-testid="loading-with-right-text">
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">文字在图标右侧</h4>
                <cos-loading position="{{position}}"/>
            <div>
            <div data-testid="loading-with-custom-text">
                <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">自定义文案</h4>
                <cos-loading text="{{text}}"/>
            <div>
        </div>
    `;

    static components = {
        'cos-loading': Loading
    };

    initData() {
        return {
            appearance: 'reverse',
            position: 'right',
            text: '请稍候~'
        }
    }
}

```
