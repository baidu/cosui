```san export=preview caption=等分样式文字超出省略
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import './equal-splits.less';

export default class EqualSplits extends Component {
    static template = `
        <div class="equal-splits-tabs">
            <h4>二等分</h4>
            <cos-tabs class="custom-content-tabs" on-change="handleChange">
                <cos-tab slot="tab" s-for="tab in cityTabs2" class="custom-tab">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="pane in cityTabs2" class="cos-space-mt-md">{{pane.content}}</cos-tab-pane>
            </cos-tabs>
            <br /><br />
            <h4>三等分</h4>
            <cos-tabs class="custom-content-tabs" on-change="handleChange">
                <cos-tab slot="tab" s-for="tab in cityTabs3" class="custom-tab">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="pane in cityTabs3" class="cos-space-mt-md">{{pane.content}}</cos-tab-pane>
            </cos-tabs>
            <br /><br />
            <h4>四等分</h4>
            <cos-tabs class="custom-content-tabs" on-change="handleChange">
                <cos-tab slot="tab" s-for="tab in cityTabs4" class="custom-tab">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="pane in cityTabs4" class="cos-space-mt-md">{{pane.content}}</cos-tab-pane>
            </cos-tabs>
            <br /><br />
            <h4>五等分</h4>
            <cos-tabs class="custom-content-tabs" on-change="handleChange">
                <cos-tab slot="tab" s-for="tab in cityTabs5" class="custom-tab">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="pane in cityTabs5" class="cos-space-mt-md">{{pane.content}}</cos-tab-pane>
            </cos-tabs>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane
    };

    initData() {
        return {
            activeIndex: 0,
            cityTabs2: [
                {
                    title: '北京北京北京北京北京北京',
                    content: '北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。',
                },
                {
                    title: '上海上上海上海上海上海上海上海海上海',
                    content: '上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。',
                }
            ],
            cityTabs3: [
                {
                    title: '北京北京',
                    content: '北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。',
                },
                {
                    title: '上海上海上海',
                    content: '上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                }
            ],
            cityTabs4: [
                {
                    title: '北京北京',
                    content: '北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。',
                },
                {
                    title: '上海上海上海',
                    content: '上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                }
            ],
            cityTabs5: [
                {
                    title: '北京北京',
                    content: '北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。',
                },
                {
                    title: '上海上海上海',
                    content: '上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                },
                {
                    title: '广州',
                    content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                }
            ],
        }
    }

    handleChange(activeIndex) {
        console.log('activeIndex: ', activeIndex);
    }
}
```
