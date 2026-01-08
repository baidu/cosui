```san export=preview platform=pc caption=基本使用
import {Component} from 'san';
import Popover from '@cosui/cosmic/popover';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div class="cos-row cos-gutter">
            <div class="cos-col-3">
                <cos-button on-click="handleClick">打开弹层</cos-button>
                <cos-popover
                    style="width:560px;padding: 15px;"
                    open="{=open=}"
                    on-close="handleClose"
                >
                    <div>
                        三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                    </div>
                </cos-popover>
            </div>
        </div>`;

    static components = {
        'cos-popover': Popover,
        'cos-button': Button
    };

    initData() {
        return {
            open: false
        };
    }

    handleClick() {
        this.data.set('open', true);
    }

    handleClose() {
        console.log('handleClose');
    }
}
```