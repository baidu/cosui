```san export=preview  caption=带icon的标签
import {Component} from 'san';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';
import './icon.less';

export default class Demo extends Component {
    static template = `
        <div data-testid="tag-icon" class="tag-icon-demo">
            <h4>二级弱面标签-有icon（该处示例仅作组件能力说明）</h4>
            <div>
                <cos-tag appearance="filled" class="cos-color-text-on-warning-light cos-color-bg-warning-light">
                    <cos-icon name="baidu"></cos-icon>
                    警示
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-error-light cos-color-bg-error-light">
                    <cos-icon name="baidu"></cos-icon>
                    风险
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-success-light cos-color-bg-success-light">
                    <cos-icon name="baidu"></cos-icon>
                    成功
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-tiny-active cos-tag-color-bg">
                    <cos-icon name="baidu"></cos-icon>
                    标签
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-primary-light cos-color-bg-primary-light">
                    <cos-icon name="baidu"></cos-icon>
                    标签
                </cos-tag>
                <cos-tag appearance="filled" class="cos-color-text-on-alive-light cos-color-bg-alive-light">
                    <cos-icon name="baidu"></cos-icon>
                    优惠信息
                </cos-tag>
            </div>
        </div>
    `;

    static components = {
        'cos-tag': Tag,
        'cos-icon': Icon
    };
}

```
