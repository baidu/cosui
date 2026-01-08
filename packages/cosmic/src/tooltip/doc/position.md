```san export=preview caption=设置不同的弹出位置
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">容器有足够的区域可供显示</h4>
            <div s-ref="position" class="enough-position"
            style="position: relative;padding:50px 0;">
                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="top-start"
                            getPopupContainer="{{getAladdinContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>top-start </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip getPopupContainer="{{getAladdinContainer}}" content="提示信息，用于对元素提供辅助提示">
                            <cos-button>top(default) </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="top-end"
                            getPopupContainer="{{getAladdinContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>top-end </cos-button>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right-start"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>right-start </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left-start"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>left-start </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>right </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>left </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right-end"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>right-end </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left-end"
                            getPopupContainer="{{getAladdinContainer}}"
                        >
                            <cos-button>left-end </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom-start"
                            getPopupContainer="{{getAladdinContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom-start </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom"
                            getPopupContainer="{{getAladdinContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom-end"
                            getPopupContainer="{{getAladdinContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom-end </cos-button>
                        </cos-tooltip>
                    </div>
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">容器可供显示区域不够，气泡自适应显示</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">调整规则：</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">1. 对于 'top-xxx'｜'bottom-xxx'，气泡的可用高度小于实际高度时，方向对换</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">2. 对于 'top'｜'bottom'，气泡的可用宽度度小于实际宽度时，保持箭头位置不变，挪动气泡</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">3. 对于 'left-xxx'｜'right--xxx'，气泡的可用宽度度小于实际宽度时，方向对换</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">4. 对于 'left'｜'right'，气泡的可用高度小于实际高度时，保持箭头位置不变，挪动气泡。</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">5. 对于 'xxx-start' | 'xxx-end'，初始以选择的方向进行渲染，可用宽度/高度不够的时候，进行方向对换。</h4>
            <div s-ref="adjust-position" class="adjust-position"
            style="position: relative;">
                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="top-end"
                            getPopupContainer="{{getAdjustContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>top-end </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip getPopupContainer="{{getAdjustContainer}}" content="提示信息，用于对元素提供辅助提示">
                            <cos-button>top(default) </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="top-start"
                            getPopupContainer="{{getAdjustContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>top-start</cos-button>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left-start"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>left-start </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right-start"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>right-start </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>left </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>right </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="left-end"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>left-end </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4"></div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="right-end"
                            getPopupContainer="{{getAdjustContainer}}"
                        >
                            <cos-button>right-end </cos-button>
                            <div slot="content" style="white-space: normal;">这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息这是一个<i>使用 slot 嵌入</i>的消息</div>
                        </cos-tooltip>
                    </div>
                </div>

                <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;padding-top: 20px;">
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom-end"
                            getPopupContainer="{{getAdjustContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom-end</cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom"
                            getPopupContainer="{{getAdjustContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom </cos-button>
                        </cos-tooltip>
                    </div>
                    <div class="cos-col-4">
                        <cos-tooltip
                            position="bottom-start"
                            getPopupContainer="{{getAdjustContainer}}"
                            content="提示信息，用于对元素提供辅助提示"
                        >
                            <cos-button>bottom-start </cos-button>
                        </cos-tooltip>
                    </div>
                </div>
            </div>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button
    };
    initData() {
        return {
            getAladdinContainer: () => {
                return this.ref('position');
            },
            getAdjustContainer: () => {
                return this.ref('adjust-position');
            }
        };
    }
}
```