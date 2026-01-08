``` san export=preview caption=显示不同尺寸(Mobile) platform=mobile
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class MobileSize extends Component {

    static template = `
        <div data-testid="mobile-size-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showNormalSize()">常规尺寸</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showLargeSize()">大尺寸</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-toast': Toast,
        'cos-button': Button
    }

    getConfig(config) {
        // Demo 演示需要挂载到 Shadow DOM 内部，隔离不同端的样式干扰，保证环境的真实性
        // 正常线上使用时不需要指定 parentSelector
        config.parentSelector = this.data.get('shadowRoot');
        return config;
    }

    showNormalSize() {
        Toast.show(this.getConfig({
            message: '提示内容最多十个字哦超出部分省略',
            type: 'success',
        }));
    }

    showLargeSize() {
        Toast.show(this.getConfig({
            message: '提示最多六字超出部分省略',
            type: 'success',
            size: 'lg',
        }));
    }
}

```
