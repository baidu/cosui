```san export=preview caption=延迟出现/消失
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {
    static template = `
        <div style="position: relative; padding-top: 30px;">
            <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px">
                <div class="cos-col-6">
                    <cos-tooltip
                        getPopupContainer="{{getAladdinContainer}}"
                        openDelay="3000"
                        content="提示信息，用于对元素提供辅助提示"
                    >
                        <cos-button>{{isPc ? 'Hover ' : '点击'}}延迟出现</cos-button>
                    </cos-tooltip>
                </div>
                <div class="cos-col-6">
                    <cos-tooltip
                        getPopupContainer="{{getAladdinContainer}}"
                        closeDelay="3000"
                        content="提示信息，用于对元素提供辅助提示"
                    >
                        <cos-button>{{isPc ? 'Hover ' : '点击'}}出现后延迟消失</cos-button>
                    </cos-tooltip>
                </div>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button
    };
    initData() {
        return {
            getAladdinContainer: () => {
                return this.el;
            }
        };
    }
}

```