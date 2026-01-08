``` san export=preview caption=中间截断
import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import './clmap-before-suffix.less';

export default class Demo extends Component {
    static trimWhitespace = 'all';

    static template = `
        <h3 class="heading cos-text-headline-sm cos-space-m-none cos-flex cos-items-center">
            <p class="cos-line-clamp-1">{{text | raw}}</p>
            <span class="cos-space-ml-xxs cos-color-text-primary">
                -
                <cos-icon name="menu"/>
                合集
            </span>
        </h3>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData() {
        return {
            text: '<em>三花猫</em>是一种身披黑、红（橘）和白三种颜色的猫'
        };
    }
}
```