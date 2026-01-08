```san export=preview caption=自定义内容
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import Image from '@cosui/cosmic/image';
import './custom.less';

export default class Custom extends Component {
    static template = `
        <div data-testid="custom-tabs">
            <h3>双行文本</h3>
            <p>可根据场景，自定义头部 Tab 的内容为双行文本</p>
            <cos-tabs class="custom-text-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">
                    <div>{{ tab.title }}</div>
                    <div>{{ tab.subTitle }}</div>
                </cos-tab>
            </cos-tabs>

            <br /><br />
            <h3>图文定制</h3>
            <p>可根据场景，自定义头部 Tab 的内容为图文混合</p>
            <cos-tabs appearance="pill" class="custom-img-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">
                   <cos-image class="cos-img" src="{{src}}" alt="基本样式" />
                   <div>{{ tab.title }}</div>
                </cos-tab>
            </cos-tabs>

            <br /><br />
            <h3>运营场景定制</h3>
            <p>运营场景复杂多变，可根据所需自由定制 Tab 的外观</p>
            <cos-tabs class="custom-op-tabs" activeIndex="{{activeIndex}}">
                <cos-tab slot="tab">运营标题 1</cos-tab>
                <cos-tab slot="tab">运营标题 2</cos-tab>
                <cos-tab slot="tab" class="custom-op-tab">
                    运营标题 3
                    <div class="op-badge">运营标签</div>
                </cos-tab>
                <cos-tab slot="tab">运营标题 4</cos-tab>
            </cos-tabs>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-image': Image,
    };

    initData() {
        const tabs = [];

        // 根据业务需要，灵活自定义数据结构
        for (let i = 1; i <= 4; i++) {
            tabs.push({ title: '主标题 ' + i, subTitle: '副标题 ' + i });
        }

        return {
            src: 'https://img1.baidu.com/it/u=4127173262,3020090260&fm=253&fmt=auto&app=138&f=JPG?w=500&h=753',
            tabs,
            activeIndex: 2,
        };
    }
}
```
