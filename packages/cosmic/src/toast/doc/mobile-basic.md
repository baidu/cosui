``` san export=preview caption=显示文本(Mobile) platform=mobile
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class MobileBasic extends Component {

    static template = `
        <div data-testid="mobile-text-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button on-click="showOneLine()">单行文字</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button on-click="showMultiLine()">多行文字</cos-button>
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

    showOneLine() {
        Toast.show(this.getConfig({
            message: '单行文字',
        }));
    }

    showMultiLine() {
        Toast.show(this.getConfig({
            message: '提示单行最多显示十四个汉字哦双行内容',
        }));
    }
}

```
