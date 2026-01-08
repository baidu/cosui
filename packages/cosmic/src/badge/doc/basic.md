```san export=preview caption=基本使用
import {Component} from 'san';
import Badge from '@cosui/cosmic/badge';

export default class Demo extends Component {

    static template = `
        <div>
            <div class="cos-row">
                点：<cos-badge dot />
            </div>
            <div class="cos-row">
                数字：<cos-badge value="10"/>
            </div>
            <div class="cos-row">
                文字：<cos-badge value="文字"/>
            </div>
        </div>`;

    static components = {
        'cos-badge': Badge,
    };
}
```