``` san export=preview caption=修改toast的配置(PC) platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class PCConfig extends Component {

    static template = `
        <div data-testid="pc-config-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <p>
                Toast 组件具有以下整体配置项，整体配置会影响页面内的所有 Toast，使用前请考量对页面内其他 Toast 影响的情况，可按需配置：
            </p>
            <ul>
                <li>baseTop: 距离页面顶部的高度，默认值 15px，body类含 cos-pc 时为 120px</li>
                <li>gap: Toast 的垂直间距，默认值 15px</li>
                <li>maxToastCount: 最多显示的 Toast 数量，默认值 3</li>
            </ul>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button on-click="showDefault()">默认设置</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="changeBaseTop()">顶部高度</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="changeGap()">垂直间距</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="secondary" on-click="changeMaxToastCount()">显示数量</cos-button>
                </div>
            </div>

            <p class="cos-space-pt-xs">
                Toast 组件个性化隔离配置距离页面顶部的高度，不影响页面内其他 Toast，且优先级高于整体配置，可按需进行修改：
            </p>
            <div class="cos-row cos-gutter">
                <div class="cos-col-6">
                    <cos-button on-click="showConfigTop()">个性化配置顶部高度</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-toast': Toast,
        'cos-button': Button
    };

    setDefault() {
        Toast.baseTop = 15;
        Toast.gap = 15;
        Toast.toastHeight = 42;
        Toast.maxToastCount = 3;
    }

    showDefault(){
        this.setDefault();
        Toast.info({
            message: '恢复默认设置',
        });
    }

    changeBaseTop() {
        Toast.baseTop = 200;
        Toast.info({
            message: '修改距离页面顶部高度为200',
        });
    }

    changeGap() {
        Toast.gap = 50;
        Toast.info({
            message: '修改垂直间距为50',
        });
    }

    changeMaxToastCount() {
        Toast.maxToastCount = 5;
        Toast.info({
            message: '修改最多显示数量为5',
        });
    }

    showConfigTop() {
         Toast.info({
            message: '修改距离页面顶部高度为400',
            top: 400,
        });
    }
}

```
