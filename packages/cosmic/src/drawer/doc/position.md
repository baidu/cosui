```san export=preview platform=mobile caption=显示位置
import {Component} from 'san';
import Drawer from '@cosui/cosmic/drawer';
import Button from '@cosui/cosmic/button';
import Switcher from '@cosui/cosmic/switcher';
import './position.less';
export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-flex cos-items-center cos-space-mt-none cos-space-mb-xs">
                <label class="cos-color-text-minor cos-font-regular">按抽屉展开方向滑动关闭：</label>
                <cos-switcher on-change="handleCloseOnSwipe" checked="{=closeOnSwipe=}" size="xs"></cos-switcher>
            </div>

            <div class="cos-row cos-gutter">
                <div class="cos-col-3">
                    <cos-button on-click="handleBottomClick">底部抽屉</cos-button>
                    <cos-drawer
                        open="{=bottom.open=}"
                        closeOnSwipe="{{closeOnSwipe}}"
                        title="{{bottom.title}}"
                        on-close="handleClose"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
                <div class="cos-col-3">
                    <cos-button on-click="handleLeftClick">左侧抽屉</cos-button>
                    <cos-drawer
                        open="{=left.open=}"
                        closeOnSwipe="{{closeOnSwipe}}"
                        title="{{left.title}}"
                        position="left"
                        on-close="handleClose"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
                <div class="cos-col-3">
                    <cos-button on-click="handleRightClick">右侧抽屉</cos-button>
                    <cos-drawer
                        open="{=right.open=}"
                        closeOnSwipe="{{closeOnSwipe}}"
                        title="{{right.title}}"
                        position="right"
                        on-close="handleClose"
                    >
                        <div>
                            三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。
                        </div>
                    </cos-drawer>
                </div>
                <div class="cos-col-3">
                    <cos-button on-click="handleTopClick">顶部抽屉</cos-button>
                    <cos-drawer
                        open="{=top.open=}"
                        closeOnSwipe="{{closeOnSwipe}}"
                        closeable="{{false}}"
                        position="top"
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
        'cos-switcher': Switcher,
        'cos-button': Button
    };

    initData() {
        return {
            bottom: {
                open: false,
                title: '标题'
            },
            left: {
                open: false,
                title: '标题'
            },
            right: {
                open: false,
                title: '标题'
            },
            top: {
                open: false,
                title: '标题'
            },
            closeOnSwipe: true
        };
    }

    handleBottomClick() {
        this.data.set('bottom.open', true);
    }

    handleLeftClick() {
        this.data.set('left.open', true);
    }
    handleRightClick() {
        this.data.set('right.open', true);
    }
    handleTopClick() {
        this.data.set('top.open', true);
    }
    handleClose() {
        console.log('handleClose');
    }

    handleCloseOnSwipe() {
        this.data.set('closeOnSwipe', !this.data.get('closeOnSwipe'));
    }
}
```