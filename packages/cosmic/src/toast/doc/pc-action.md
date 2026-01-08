``` san export=preview caption=显示右侧交互区(PC) platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class MobileAction extends Component {

    static template = `
        <div data-testid="pc-action-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter" style="margin-bottom: 16px">
                <div class="cos-col">
                    <cos-button on-click="showTextButton()">显示文字按钮</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button on-click="showTextCloseButton()">显示文字和关闭按钮</cos-button>
                </div>
            </div>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showTypeTextButton()">类型信息组合文字按钮</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showTypeTextCloseButton()">类型信息组合文字和关闭按钮</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-toast': Toast,
        'cos-button': Button
    }

    showTextButton() {
        Toast.show({
            message: '普通信息提示',
            actionText: '文字按钮',
            onAction: function(event) {
                console.log('触发文字按钮的回调事件: ', event)
            },
        });
    }

    showTextCloseButton() {
        Toast.show({
            message: '普通信息提示',
            actionText: '文字按钮超出部分省略',
            onAction: function(event) {
                console.log('触发文字按钮的回调事件: ', event)
            },
            closable: true,
            onClose: function(event) {
                console.log('触发关闭按钮的回调事件: ', event)
            },
        });
    }

    showTypeTextButton() {
        Toast.show({
            message: '成功信息提示',
            type: 'success',
            actionText: '文字按钮',
            onAction: function(event) {
                console.log('触发文字按钮的回调事件: ', event)
            },
        });
    }

    showTypeTextCloseButton() {
        Toast.show({
            message: '错误信息提示',
            type: 'error',
            actionText: '文字按钮',
            onAction: function(event) {
                console.log('触发文字按钮的回调事件: ', event)
            },
            closable: true,
            onClose: function(event) {
                console.log('触发关闭按钮的回调事件: ', event)
            },
        });
    }
}

```
