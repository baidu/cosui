```san export=preview caption=为段落设置不同大小字体
import {Component} from 'san';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-text-body cos-color-text">{{text}}</p>
            <p class="cos-text-body-lg cos-color-text">{{text}}</p>
        </div>
    `;

    initData() {
        return {
            text: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。',
        };
    }
}
```