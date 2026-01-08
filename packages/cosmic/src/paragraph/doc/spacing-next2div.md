```san export=preview caption=段落与div之间的间距为12px（蓝色框为div内容）
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-text-body-lg cos-color-text cos-space-mb-sm">{{text1}}</p>
            <div style="border: solid 1px blue; display: flex; padding: 0; margin: 0;">
                <img src="https://psstatic.cdn.bcebos.com/crosswise/search_components/image-example_1699361039000.png" style="width: 200px;"/>
                <p>{{text2}}</p>
            </div>
        </div>
    `;

    initData() {
        return {
            text1: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。',
            text2: '布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合。'
        };
    }
}
```