```san export=preview caption=段落后跟随“详情>”
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-text-body-lg cos-color-text">
                {{text}}
                <a class="cos-link" href="https://www.baidu.com" style="margin-left: 1px">详情 ></a>
            </p>
        </div>
    `;

    initData() {
        return {
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”，这种颜色组合是由基因决定的，通常只出现在母猫身上...'
        };
    }
}
```