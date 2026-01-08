```san export=preview platform=pc caption=弹窗变体(目前只支持pc)
import {Component} from 'san';
import Dialog from '@cosui/cosmic/dialog';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div>
            <div class="cos-row cos-gutter cos-justify-between"
                style="--cos-grid-gutter: 10px;margin-bottom:20px;">
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleDefaultClick"
                    >
                        默认弹窗
                    </cos-button>
                    <cos-dialog
                        open="{=defaultOpen=}"
                        appearance="info"
                        on-ok="handleDefaultOk"
                        on-cancel="handleDefaultCancel"
                    >
                        自定义内容
                    </cos-dialog>
                </div>
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleWarningClick"
                    >
                        警示弹窗
                    </cos-button>
                    <cos-dialog
                        appearance="warning"
                        open="{=warningOpen=}"
                        on-ok="handleWarningOk"
                        on-cancel="handleWarningCancel"
                    >
                        自定义内容
                    </cos-dialog>
                </div>
            </div>
            <div class="cos-row cos-gutter cos-justify-between" style="--cos-grid-gutter: 10px">
                <div class="cos-col-4">
                     <cos-button
                        on-click="handleSuccessClick"
                    >
                        成功弹窗
                    </cos-button>
                    <cos-dialog
                        appearance="success"
                        open="{=successOpen=}"
                        on-ok="handleSuccessOk"
                        on-cancel="handleSuccessCancel"
                    >
                        自定义内容
                    </cos-dialog>
                </div>
                <div class="cos-col-4">
                    <cos-button
                        on-click="handleErrorClick"
                    >
                        异常弹窗
                    </cos-button>
                    <cos-dialog
                        appearance="error"
                        open="{=errorOpen=}"
                        on-ok="handleErrorOk"
                        on-cancel="handleErrorCancel"
                    >
                        自定义内容
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
            defaultOpen: false,
            warningOpen: false,
            errorOpen: false,
            successOpen: false
        };
    }

   handleDefaultClick() {
        this.data.set('defaultOpen', true);
    }
    handleDefaultCancel() {
        this.data.set('defaultOpen', false);
    }

    handleDefaultOk() {
        this.data.set('defaultOpen', false);
    }

    handleWarningClick() {
        this.data.set('warningOpen', true);
    }
    handleWarningCancel() {
        this.data.set('warningOpen', false);
    }

    handleWarningOk() {
        this.data.set('warningOpen', false);
    }

    handleSuccessClick() {
        this.data.set('successOpen', true);
    }
    handleSuccessCancel() {
        this.data.set('successOpen', false);
    }

    handleSuccessOk() {
        this.data.set('successOpen', false);
    }

    handleErrorClick() {
        this.data.set('errorOpen', true);
    }
    handleErrorCancel() {
        this.data.set('errorOpen', false);
    }

    handleErrorOk() {
        this.data.set('errorOpen', false);
    }
}
```
