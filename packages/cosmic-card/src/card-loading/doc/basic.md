```san export=preview caption=CardLoading
import {Component} from 'san';
import CardLoading from '@cosui/cosmic-card/card-loading';

export default class LoadingDemo extends Component {
    static template = `
        <div>
            <div data-testid="default-card-loading">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">默认</h4>
                <cosc-card-loading/>
            <div>
            <div data-testid="card-loading-with-right-text">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">文字在图标右侧</h4>
                <cosc-card-loading direction="right"/>
            <div>
            <div data-testid="card-loading-with-custom-text">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">修改文案</h4>
                <cosc-card-loading text="loading..."/>
            <div>
        </div>
    `;

    static components = {
        'cosc-card-loading': CardLoading
    };
}

```