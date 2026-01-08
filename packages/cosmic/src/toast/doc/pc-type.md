``` san export=preview caption=显示不同类型(PC) platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class PCType extends Component {

    static template = `
        <div data-testid="pc-type-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showInfo()">普通信息</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showSuccess()">成功信息</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showWarning()">警告信息</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="showError()">错误信息</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-toast': Toast,
        'cos-button': Button
    };

    showInfo() {
        Toast.info({
            message: '普通信息提示',
        });
    }

    showSuccess() {
        Toast.success({
            message: '成功信息提示',
        });
    }

    showWarning() {
        Toast.warn({
            message: '警告信息提示',
        });
    }

    showError() {
        Toast.error({
            message: '错误信息提示',
        });
    }
}

```
