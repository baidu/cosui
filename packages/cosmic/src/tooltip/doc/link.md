```san export=preview caption=跳转气泡
import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import './link.less';
export default class Demo extends Component {

    static template = `
        <div style="position: relative; padding-top: 25px;">
            <cos-tooltip getPopupContainer="{{getAladdinContainer}}" trigger="click">
                <cos-button>点击触发带跳转链接的气泡</cos-button>
                <a
                    slot="content"
                    class="{{isPc ? 'cos-tooltip-link-pc' : 'cos-tooltip-link'}}"
                    href="{{href}}"
                >
                    提示内容
                    <span s-if="isPc">跳转</span>
                    <cos-icon s-else name="right" />
                </a>
            </cos-tooltip>
        </div>`;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-button': Button,
        'cos-icon': Icon
    };
    initData() {
        return {
            getAladdinContainer: () => {
                return this.el;
            },
            href: 'https://www.baidu.com/s?wd=%E7%8C%AB'
        };
    }
}
```