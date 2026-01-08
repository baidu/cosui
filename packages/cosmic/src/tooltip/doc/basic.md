```san export=preview caption=基本用法
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div style="position: relative;padding-top: 20px;">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本使用</h4>
            <cos-tooltip
                content="提示内容"
                disabled="{{disabled}}"
                bubbleClass="aaa"
                getPopupContainer="{{getAladdinContainer}}"
            >
                <cos-button>{{isPc ? 'Hover ' : '点击'}}出气泡提示</cos-button>
            </cos-tooltip>
            <cos-button style="margin-top:10px;" on-click="changeDisabled">{{text}}</cos-button>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">使用自定义插槽</h4>
            <cos-tooltip getPopupContainer="{{getAladdinContainer}}">
                <cos-button>自定义气泡</cos-button>
                <div slot="content">这是一个使用 slot 嵌入的消息</div>
            </cos-tooltip>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button
    };
    initData() {
        return {
            getAladdinContainer: () => {
                return this.el;
            },
            disabled: false,
            text: '点击禁用气泡提示'
        };
    }
    changeDisabled() {
        const disabled = this.data.get('disabled');
        this.data.set('disabled', !disabled);
        this.data.set('text', disabled ? '禁用气泡' : '取消禁用');
    }
}
```