```san export=preview caption=弹窗基本使用
import {Component} from 'san';
import Dialog from '@cosui/cosmic/dialog';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px;margin-bottom: 20px;">
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleClick('singleButtonDialog')"
                    >
                        单按钮弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=singleButtonDialog.open=}"
                        okText=""
                        on-ok="handleOk('singleButtonDialog')"
                        on-close="handleClose('singleButtonDialog')"
                        on-cancel="handleCancel('singleButtonDialog')"
                    >
                        自定义内容
                    </cos-dialog>
                </div>
                 <div class="cos-col-4">
                    <cos-button
                        on-click="handleClick('doubleButtonDialog')"
                    >
                        双按钮弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=doubleButtonDialog.open=}"
                        on-ok="handleOk('doubleButtonDialog')"
                        on-close="handleClose('doubleButtonDialog')"
                        on-cancel="handleCancel('doubleButtonDialog')"
                    >
                        自定义内容
                    </cos-dialog>
                </div>
                <div class="cos-col-4">
                     <cos-button
                        on-click="handleClick('customBehaviorDialog')"
                    >
                        customBehavior 按钮
                    </cos-button>
                    <cos-dialog
                        open="{=customBehaviorDialog.open=}"
                        okText=""
                        customBehaviorText="按钮3"
                        on-customBehavior="handleCustomBehavior('customBehaviorDialog')"
                        on-cancel="handleCancel('customBehaviorDialog')"
                    >
                       自定义内容
                    </cos-dialog>
                </div>
                 <div class="cos-col-4" s-if="!isPc">
                     <cos-button
                        on-click="handleClick('threeButtonDialog')"
                    >
                        多按钮弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=threeButtonDialog.open=}"
                        customBehaviorText="按钮3"
                        on-customBehavior="handleCustomBehavior('threeButtonDialog')"
                        on-ok="handleOk('threeButtonDialog')"
                        on-close="handleClose('threeButtonDialog')"
                        on-cancel="handleCancel('threeButtonDialog')"
                    >
                       自定义内容
                    </cos-dialog>
                </div>
            </div>
            <div class="cos-row cos-gutter cos-justify-between"
                style="--cos-grid-gutter: 10px">
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleClick('footlessDialog')"
                    >
                        无操作区弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=footlessDialog.open=}"
                        footless="true"
                        closable="true"
                        on-close="handleClose('footlessDialog')"
                    >
                        <div style="margin-bottom:15px;">自定义内容</div>
                    </cos-dialog>
                </div>
                <div class="cos-col-4" s-if="isPc">
                    <cos-button
                        on-click="handleClick('closableDialog')"
                    >
                        显示关闭按钮
                    </cos-button>
                    <cos-dialog
                        open="{=closableDialog.open=}"
                        closable="true"
                        on-ok="handleOk('closableDialog')"
                        on-close="handleClose('closableDialog')"
                        on-cancel="handleCancel('closableDialog')"
                    >
                       自定义内容
                    </cos-dialog>
                </div>
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleClick('largeDialog')"
                    >
                        自定义大弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=largeDialog.open=}"
                        on-ok="handleOk('largeDialog')"
                        on-close="handleClose('largeDialog')"
                        on-cancel="handleCancel('largeDialog')"
                    >
                       <div style="height:600px;">自定义内容</div>
                    </cos-dialog>
                </div>
            </div>
        </div>`;

    static components = {
        'cos-dialog': Dialog,
        'cos-button': Button
    };

    initData() {
        return {
            footlessDialog: {
                open: false
            },
            singleButtonDialog: {
                open: false
            },
            doubleButtonDialog: {
                open: false
            },
            threeButtonDialog: {
                open: false
            },
            closableDialog: {
                open: false
            },
            largeDialog: {
                open: false
            },
            customBehaviorDialog: {
                open: false
            },
            isPc: false
        };
    }
    handleClick(type) {
        type && this.data.set(type +'.open', true);
    }
    handleClose(type) {
        console.log('dialog close');
    }
    handleCancel(type) {
        type && this.data.set(type +'.open', false);
        console.log('cancel');
    }
    handleOk(type) {
        type && this.data.set(type +'.open', false);
        console.log('ok');
    }
    handleCustomBehavior(type) {
        this.data.set(type +'.open', false);
        console.log('customBehavior');
    }
}
```