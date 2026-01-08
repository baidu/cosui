``` san export=preview caption=生命周期
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Lifecycle extends Component {

    static template = `
        <div style="position: relative;padding-top: 20px;">
            <h3>控制 tooltip 的生命周期</h3>
            <div class="remove-click">
                <cos-tooltip
                    s-if="removeTooltip"
                    content="提示内容"
                    getPopupContainer="{{getAladdinContainer}}"
                >
                    <cos-button>点击出气泡提示</cos-button>
                </cos-tooltip>
                <cos-button
                    appearance="secondary"
                    on-click="removeTooltip"
                >
                    tooltip
                </cos-button>
            </div>
            <div class="remove-hover">
                <cos-tooltip
                    s-if="removeTooltip1"
                    content="提示内容"
                    trigger="hover"
                    getPopupContainer="{{getAladdinContainer}}"
                >
                    <cos-button>Hover出气泡提示</cos-button>
                </cos-tooltip>
                <cos-button
                    appearance="secondary"
                    on-click="removeTooltip1"
                >
                    tooltip
                </cos-button>
            </div>
             <div>
                <cos-tooltip
                    s-if="removeTooltip2"
                    content="提示内容"
                    disabled="{{true}}"
                    getPopupContainer="{{getAladdinContainer}}"
                >
                    <cos-button>禁用气泡提示</cos-button>
                </cos-tooltip>
                <cos-button
                    appearance="secondary"
                    on-click="removeTooltip2"
                >
                    tooltip
                </cos-button>
            </div>

            <div>
                <cos-tooltip
                    s-if="removeTooltip3"
                    content="提示内容"
                >
                    <cos-button>测试气泡 resize</cos-button>
                </cos-tooltip>
                <cos-button
                    appearance="secondary"
                    on-click="removeTooltip3"
                >
                    tooltip
                </cos-button>
            </div>
        </div>
    `;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button
    };

    initData() {
        return {
            getAladdinContainer: () => {
                return this.el;
            },
            removeTooltip: true,
            removeTooltip1: true,
            removeTooltip2: true,
            removeTooltip3: true
        };
    }

    removeTooltip() {
        this.data.set('removeTooltip', false)
    }

    removeTooltip1() {
        this.data.set('removeTooltip1', false)
    }

    removeTooltip2() {
        this.data.set('removeTooltip2', false)
    }

    removeTooltip2() {
        this.data.set('removeTooltip3', false)
    }
}

```