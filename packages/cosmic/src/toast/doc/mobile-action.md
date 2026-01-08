``` san export=preview caption=显示右侧交互区(Mobile) platform=mobile
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class MobileAction extends Component {

    static template = `
        <div data-testid="mobile-action-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter" style="margin-bottom: 16px">
                <div class="cos-col">
                    <cos-button on-click="showButton()">显示按钮</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button on-click="showSuccessButton()">类型信息组合按钮</cos-button>
                </div>
            </div>
            <div class="cos-row cos-gutter" style="margin-bottom: 16px">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showLink()">显示链接</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showSuccessLink()">类型信息组合链接</cos-button>
                </div>
            </div>
            <div class="cos-row cos-gutter" style="margin-bottom: 16px">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showClosePre()">10秒展现</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="closeToast()">点我提前关闭</cos-button>
                </div>
            </div>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showStatic()">静态类型</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showDynamic()">动效类型</cos-button>
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

    showButton() {
        Toast.show(this.getConfig({
            message: '提示内容最多十个字',
            actionType: 'button',
            actionText: '最多四字超出部分省略',
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    showSuccessButton() {
        Toast.show(this.getConfig({
            message: '提示内容最多十个字',
            type: 'success',
            actionType: 'button',
            actionText: '最多四字',
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    showLink() {
        Toast.show(this.getConfig({
            message: '提示内容最多十个字',
            actionType: 'link',
            actionText: '最多四字',
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    showSuccessLink() {
        Toast.show(this.getConfig({
            message: '提示内容最多十个字',
            type: 'success',
            actionType: 'link',
            actionText: '最多四字',
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    showClosePre() {
        Toast.show(this.getConfig({
            message: '我展现10s，你可以提前关闭我',
            duration: 10000,
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    closeToast() {
        Toast.hide();
    }

    showStatic() {
        Toast.show(this.getConfig({
            message: '我是静态的刷新提示',
            type: 'refresh',
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }

    showDynamic() {
        Toast.show(this.getConfig({
            message: '我是动态的刷新提示',
            type: 'refresh',
            animationDuration: 1000,
            onAction: function(event) {
                console.log('触发交互的回调事件: ', event)
            },
        }));
    }
}

```
