```san export=preview caption=模拟窗口resize
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';

export default class Demo extends Component {

    static template = `
        <div style="display: inline-block;">
            <cos-tooltip trigger="custom" open>
                <cos-button style="width:150px;">带跳转链接的气泡</cos-button>
                <div slot="content">模拟窗口 resize</div>
            </cos-tooltip>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button
    };
}
```