``` san export=preview caption=图标
import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import iconCssContent from '@cosui/icon/dist/cos-icon.css?inline';
import './index.less';

export default class Default extends Component {

    static template = `
        <div data-testid="icon-default">
            <div class="cos-row cos-row-col-12 cos-gutter cos-flex-wrap">
                <div s-for="name in iconNames" key="{{name}}" class="cos-col-3 custom-col">
                    <cos-icon name="{{name}}"/>
                    <div>{{name}}</div>
                </div>
            </div>

        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData() {
        return {
            iconNames: []
        }
    }

    attached() {
        this.extractIconName();
    }

    extractIconName() {
        // 直接使用导入的 CSS 内容
        const data = iconCssContent || '';
        // 提取出cos-icon-开头的类名
        const extractedNames = data.match(/\.cos-icon-([a-z0-9-])+/g);
        const iconNames = extractedNames.map(className => className.replace(/\.cos-icon-([a-z0-9-]+)/, '$1'));
        this.data.set('iconNames', iconNames);
    }
}
```
