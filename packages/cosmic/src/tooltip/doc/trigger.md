```san export=preview caption=触发方式
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {
    static template = `
        <div style="position: relative;padding-top: 60px;">
            <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;position: relative;">
                <div class="cos-col-4">
                    <cos-tooltip
                        trigger="hover"
                        content="提示信息，用于对元素提供辅助提示"
                        getPopupContainer="{{getAladdinContainer}}"
                    >
                        <cos-button>hover</cos-button>
                    </cos-tooltip>
                </div>
                <div class="cos-col-4 trigger-click">
                    <cos-tooltip
                        trigger="click"
                        content="提示信息，用于对元素提供辅助提示"
                        getPopupContainer="{{getAladdinContainer}}"
                    >
                        <cos-button>click</cos-button>
                    </cos-tooltip>
                </div>
                <div class="cos-col-4">
                    <cos-tooltip
                        trigger="custom"
                        open="{{open}}"
                        content="提示信息，用于对元素提供辅助提示"
                        getPopupContainer="{{getAladdinContainer}}"
                    >
                        <cos-button on-click="handleClick">自定义</cos-button>
                    </cos-tooltip>
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">自定义：不通过默认事件触发，通过 open 属性控制展现/隐藏</h4>
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
            open: false
        };
    }
    handleClick() {
        this.data.set('open', !this.data.get('open'));
    }
}

```