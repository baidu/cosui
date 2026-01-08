```san export=preview caption=段落被套在div中，与父元素的上间距为6px，下间距为9px（蓝色框为div内容）
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div style="border: solid 1px blue">
            <p class="cos-text-body-lg cos-color-text cos-space-mt-xxs cos-space-mb-xs">{{text}}</p>
        </div>
    `;

    initData() {
        return {
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合'
        };
    }
}
```