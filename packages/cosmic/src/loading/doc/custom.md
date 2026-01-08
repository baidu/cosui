``` san export=preview caption=自定义图标
import {Component} from 'san';
import Loading from '@cosui/cosmic/loading';
import './index.less';

export default class Default extends Component {

    static template = `
        <div data-testid="custom-loading">
            <p class="cos-text-subtitle-sm cos-color-text-minor">自定义图标</p>
            <cos-loading>
                <div slot="icon" class="custom-loading-icon"></div>
            </cos-loading>
        </div>
    `;

    static components = {
        'cos-loading': Loading
    };
}

```
