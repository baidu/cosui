```san export=preview caption=前置和后置文本
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-text-body cos-color-text">
                <em>前置文本</em>
                {{text}}
                <em>后置文本</em>
            </p>
        </div>
    `;

    initData() {
        return {
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上。布偶猫是一种毛色柔软、体态优雅的大型家猫，它们通常拥有浅色的身体和深色的耳朵、面部、四肢及尾巴，眼睛呈蓝色，性格温顺、亲人，布偶猫的毛色和花纹由基因决定，可呈现海豹色、蓝色、巧克力色等多种组合'
        };
    }
}
```
