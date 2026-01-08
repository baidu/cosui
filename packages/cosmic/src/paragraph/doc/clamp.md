```san export=preview caption=多行截断
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">一行截断：</h4>
            <p class="cos-line-clamp-1 cos-text-body-lg cos-color-text">{{text}}</p>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">两行截断：</h4>
            <p class="cos-line-clamp-2 cos-text-body-lg cos-color-text">{{text}}</p>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">三行截断：</h4>
            <p class="cos-line-clamp-3 cos-text-body-lg cos-color-text">{{text}}</p>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">四行截断：</h4>
            <p class="cos-line-clamp-4 cos-text-body-lg cos-color-text">{{text}}</p>
        </div>
    `;

    initData() {
        return {
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合'
        };
    }
}
```