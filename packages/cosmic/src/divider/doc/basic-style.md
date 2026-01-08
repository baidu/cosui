```san export=preview caption=水平divider
import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <div>
            <p>{{content}}</p>
            <div class="cos-divider"></div>
            <p>{{content}}</p>
            <div class="cos-divider" style="width: 50%"></div>
            <p>{{content}}</p>
        </div>
    `;

    initData() {
        return {
            content: '三花猫是一种身披黑、红（橘）和白三种颜色的猫，正式命名为“玳瑁白色猫”。这种颜色组合是由基因决定的，通常只出现在母猫身上。'
        }
    }
}
```