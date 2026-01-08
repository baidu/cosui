```san export=preview platform=pc caption=弹窗点击蒙层可关闭(目前仅支持pc)
import {Component} from 'san';
import Dialog from '@cosui/cosmic/dialog';
import Button from '@cosui/cosmic/button';
import Image from '@cosui/cosmic/image';

export default class Demo extends Component {

    static template = `
        <div>
            <cos-button
                on-click="handleClick"
            >
                打开对话窗
            </cos-button>
            <cos-dialog
                open="{=open=}"
                outsideClosable="true"
                closable="true"
                on-ok="handleOk"
                on-close="handleClose"
                on-cancel="handleCancel"
            >
                内容内容
            </cos-dialog>
        </div>`;

    static components = {
        'cos-dialog': Dialog,
        'cos-button': Button,
        'cos-image': Image
    };

    initData() {
        return {
            open: false
        };
    }

    handleClick() {
        this.data.set('open', true);
    }
    handleCancel() {
        this.data.set('open', false);
    }

    handleOk() {
        this.data.set('open', false);
    }

    handleClose() {
        console.log('dialog close')
    }
}
```