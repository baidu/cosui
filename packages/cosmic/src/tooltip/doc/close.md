```san export=preview platform=pc caption=带关闭按钮示例
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import './close.less';

export default class Demo extends Component {

    static template = `
        <div style="position: relative; padding-top: 45px;">
            <cos-tooltip
                trigger="custom"
                open="{{open}}"
                getPopupContainer="{{getAladdinContainer}}">
                <cos-button on-click="handleClick">点击打开气泡</cos-button>
                <div slot="content" class="container">
                    <div class="title">标题</div>
                    <div
                        class="close"
                        on-click="handleClose">
                        <cos-icon name="close"/>
                    </div>
                    <div class="content">这是一个使用 slot 嵌入的消息</div>
                </div>
            </cos-tooltip>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button,
        'cos-icon': Icon
    };
    initData() {
        return {
            getAladdinContainer: () => {
                return this.el;
            },
            open: false
        };
    }

    handleClick() {
        this.data.set('open', true);
    }

    handleClose() {
        this.data.set('open', false);
    }
}
```