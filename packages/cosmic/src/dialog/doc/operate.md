```san export=preview platform=mobile caption=运营弹窗(目前仅支持mobile)
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
                open="{=dialogData.open=}"
                headless="{{dialogData.headless}}"
                footless="{{dialogData.footless}}"
                closable="{{dialogData.closable}}"
                on-ok="handleOk"
                on-close="handleClose"
                on-cancel="handleCancel"
            >
                <cos-image
                    src="{{src}}"
                    mask-type="info"
                    class="cos-image-3/2"
                >
                </cos-image>
            </cos-dialog>
        </div>`;

    static components = {
        'cos-dialog': Dialog,
        'cos-button': Button,
        'cos-image': Image
    };

    initData() {
        return {
            dialogData: {
                open: false,
                headless: true,
                footless: true,
                closable: true
            },
            src: 'https://selfpage-gips.cdn.bcebos.com/480c625d7464e79788e4ae2b0583a819.jpeg'
        };
    }

    handleClick() {
        this.data.set('dialogData.open', true);
    }
    handleCancel() {
        this.data.set('dialogData.open', false);
    }

    handleOk() {
        this.data.set('dialogData.open', false);
    }

    handleClose() {

    }
}
```