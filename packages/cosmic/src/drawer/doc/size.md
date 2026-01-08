```san export=preview platform=mobile caption=边界尺寸
import {Component} from 'san';
import Drawer from '@cosui/cosmic/drawer';
import Button from '@cosui/cosmic/button';
import './size.less';
export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">底部抽屉</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col-4 cos-space-mb-xxl">
                   <cos-button on-click="handleBottomMaxClick">最大尺寸</cos-button>
                    <cos-drawer
                        open="{=bottomMax=}"
                        class="bottom-max"
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
                    <cos-button on-click="handleBottomMinClick" >底部最小尺寸</cos-button>
                    <cos-drawer
                        open="{=bottomMin=}"
                        class="bottom-min"
                        closeOnSwipe
                        title="标题"
                        on-close="handleClose"
                    >
                        <div s-for="i in [1, 2, 3, 4, 5, 6]">
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
            </div>

           <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">侧边抽屉</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col-4">
                   <cos-button on-click="handleLeftMaxClick">最大尺寸</cos-button>
                    <cos-drawer
                        open="{=leftMax=}"
                        class="left-max"
                        position="left"
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
                    <cos-button on-click="handleLeftMinClick">最小尺寸</cos-button>
                    <cos-drawer
                        open="{=leftMin=}"
                        class="left-min"
                        position="left"
                        closeOnSwipe
                        title="标题"
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
            bottomMax: false,
            bottomMin: false,
            leftMax: false,
            leftMin: false,
        };
    }

    handleBottomMaxClick() {
        this.data.set('bottomMax', true);
    }

    handleBottomMinClick() {
        this.data.set('bottomMin', true);
    }

    handleLeftMaxClick() {
        this.data.set('leftMax', true);
    }

    handleLeftMinClick() {
        this.data.set('leftMin', true);
    }

    handleClose() {
        console.log('handleClose');
    }
}
```