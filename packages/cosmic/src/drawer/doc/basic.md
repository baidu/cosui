```san export=preview platform=mobile caption=基本使用
import {Component} from 'san';
import Drawer from '@cosui/cosmic/drawer';
import Button from '@cosui/cosmic/button';
import Textarea from '@cosui/cosmic/textarea';
import './basic.less';
export default class Demo extends Component {

    static template = `
        <div class="cos-row cos-gutter">
            <div class="cos-col-12">
                <div class="cos-space-mb-3xl">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
                    <label class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">抽屉显示内容</label>
                    <cos-textarea value="{=text=}" height="{{180}}"/>
                </div>
                <cos-button on-click="handleClick">自适应高度显示</cos-button>
                <cos-drawer
                    open="{=open=}"
                    title="{{title}}"
                    on-close="handleClose"
                >
                    <div>
                        {{text}}
                    </div>
                </cos-drawer>
            </div>
        </div>`;

    static components = {
        'cos-drawer': Drawer,
        'cos-button': Button,
        'cos-textarea': Textarea
    };

    initData() {
        return {
            open: false,
            title: '标题',
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。'
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