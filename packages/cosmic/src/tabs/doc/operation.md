```san export=preview caption=动态增删
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import './operation.less';

export default class Appearance extends Component {
    static template = `
        <div data-testid="appearance-tabs" class="operation-tabs">
            <div class="operation-tabs-head">
                <div>动态增删 Tab</div>
                <div class="operation-tabs-toolbar"> <span on-click="add">增加选项</span> <span on-click="delete">删除选项</span></div>
            </div>
            <cos-tabs appearance="bar" class="custom-bar-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="tab in tabs">{{ tab.content }}</cos-tab-pane>
            </cos-tabs>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
    };

    initData() {
        const tabs = [
            {title:"北京", content:"北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。"},
            {title:"上海", content:"上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。"},
            {title:"广州", content:"广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。"},
            {title:"深圳", content:"深圳市（Shenzhen），别称鹏城，中国改革开放的窗口和新兴现代化城市，以科技创新和高新技术产业闻名于世。"}
        ];

        const addTabs = [
            {title:"重庆市", content:"重庆市（Chongqing），简称“渝”，别称山城、江城，是中华人民共和国直辖市、国家中心城市、超大城市。"},
            {title:"天津市", content:"天津市（Tianjin City），简称“津”，别称津沽、津门，是中华人民共和国直辖市、国家中心城市、超大城市。"}
        ]

        return {
            tabs,
            addTabs,
            index: 0
        };
    }

    add() {
        this.data.push('tabs',this.data.get('addTabs')[this.data.get('index') % 2]);
        this.data.set('index',this.data.get('index') + 1);
    }

    delete() {
        this.data.pop('tabs');
    }
}
```
