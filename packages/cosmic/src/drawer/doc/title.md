```san export=preview platform=mobile caption=标题
import {Component} from 'san';
import Drawer from '@cosui/cosmic/drawer';
import Button from '@cosui/cosmic/button';
import './title.less';

export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col-4">
                   <cos-button on-click="handleNoneTitleClick">不使用标题</cos-button>
                    <cos-drawer
                        open="{=noneTitle=}"
                        class="none-title"
                        closeOnSwipe
                        on-close="handleClose"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
                <div class="cos-col-4">
                    <cos-button on-click="handleCustomTitleClick" >自定义标题</cos-button>
                    <cos-drawer
                        open="{=customTitle=}"
                        class="custom-title"
                        closeOnSwipe
                        on-close="handleClose"
                    >
                        <h2 slot="title">自定义title区内容</h2>
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
            </div>

            <div class="cos-row cos-gutter" style="padding-top:20px">
                <div class="cos-col-4">
                   <cos-button on-click="handleCloseIconClick">没有关闭按钮</cos-button>
                    <cos-drawer
                        open="{=closeIcon=}"
                        class="close-icon"
                        closeable="{{false}}"
                        closeOnSwipe
                        on-close="handleClose"
                        title="标题"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
                <div class="cos-col-4">
                    <cos-button on-click="handleHeadlessClick">没有头部</cos-button>
                    <cos-drawer
                        open="{=headless=}"
                        closeable="{{false}}"
                        closeOnSwipe
                        on-close="handleClose"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
            </div>
        </div>`;

    static components = {
        'cos-drawer': Drawer,
        'cos-button': Button
    };

    initData() {
        return {
            noneTitle: false,
            customTitle: false,
            closeIcon: false,
            headless: false
        };
    }

    handleNoneTitleClick() {
        this.data.set('noneTitle', true);
    }

    handleCustomTitleClick() {
        this.data.set('customTitle', true);
    }

    handleCloseIconClick() {
        this.data.set('closeIcon', true);
    }

     handleHeadlessClick() {
        this.data.set('headless', true);
    }

    handleClose() {
        console.log('handleClose');
    }
}
```