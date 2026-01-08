```san export=preview caption=组合使用
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import './combination.less';

export default class Combination extends Component {
    static template = `
        <div data-testid="combination-tabs">
            <p>某些场景需要支持滑动内容区域交互，可以结合 Swiper 组件使用</p>
            <cos-tabs class="custom-tabs">
                <cos-tab slot="tab">Tab 1</cos-tab>
                <cos-tab slot="tab">Tab 2</cos-tab>
                <cos-tab slot="tab">Tab 3</cos-tab>
            </cos-tabs>
            <!-- 不需要引入 TabPane，自定义引入 Swiper 组合使用即可 -->
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
    };
}
```
