```san export=preview caption=外观风格
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import Image from '@cosui/cosmic/image';
import './appearance.less';
import Cascader from '@cosui/cosmic/cascader';

export default class Appearance extends Component {
    static template = `
        <div data-testid="appearance-tabs" class="appearance-tabs">
            <h4>Bar 样式</h4>
            <cos-tabs appearance="bar" class="custom-bar-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
            </cos-tabs>

            <br /><br />
            <h4>pill 样式</h4>
            <cos-tabs appearance="pill" class="custom-pill-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
            </cos-tabs>

            <br /><br />
            <h4>pill-filled 样式</h4>
            <cos-tabs appearance="pill-filled">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
            </cos-tabs>

            <br /><br />
            <h4>card 样式</h4>
            <div class="custom-card-tabs">
                <cos-tabs appearance="card">
                    <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                    <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
                </cos-tabs>
            </div>

            <br /><br />
            <h4>line 样式</h4>
            <p class="cos-space-mt-xs">（如果想控制下划线的宽度，请参考本例样式给 .cos-tab-indicator 类名设置 width 属性）</p>
            <cos-tabs appearance="line" class="custom-line-tabs">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
            </cos-tabs>

            <template s-if="isPc">
                <br /><br />
                <h4>line 样式 + cascader</h4>
                <p class="cos-space-mt-xs">用户可通过定位的方式添加 cascader</p>
                <cos-tabs appearance="line" id="cos-tabs-line-box">
                    <div class="cos-test-cas">
                        <cos-cascader
                            slot="right"
                            options="{{optionsCategories}}"
                            placeholder="{{placeholder}}"
                            value="{{value}}"
                        >
                        </cos-cascader>
                        <cos-cascader
                            slot="right"
                            options="{{optionsDays}}"
                            placeholder="{{placeholder}}"
                            title="{{title}}"
                            label="{{label}}"
                            value="{{value2}}"
                        >
                        </cos-cascader>
                    </div>
                    <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                    <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
                </cos-tabs>
            </template>

            <template s-if="isPc">
                <br /><br />
                <h4>line 样式 + 没有按钮</h4>
                <p class="cos-space-mt-xs">（深圳之后的城市没有对应的内容，用户可以自行补充）</p>
                <cos-tabs appearance="line" class="custom-line-tabs">
                    <cos-tab slot="tab" s-for="tab in imageTabs">{{ tab }}</cos-tab>
                    <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
                </cos-tabs>
            </template>

            <template s-if="isPc">
                <br /><br />
                <h4>line 样式 + 默认按钮</h4>
                <p class="cos-space-mt-xs">（深圳之后的城市没有对应的内容，用户可以自行补充）</p>
                <cos-tabs appearance="line" class="custom-line-tabs" arrow="true">
                    <cos-tab slot="tab" s-for="tab in imageTabs">{{ tab }}</cos-tab>
                    <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
                </cos-tabs>
            </template>

            <template s-if="isPc">
                <br /><br />
                <h4>line 样式 + right 按钮</h4>
                <p class="cos-space-mt-xs">（深圳之后的城市没有对应的内容，用户可以自行补充）</p>
                <cos-tabs appearance="line" class="custom-line-tabs" arrow="right">
                    <cos-tab slot="tab" s-for="tab in imageTabs">{{ tab }}</cos-tab>
                    <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
                </cos-tabs>
            </template>

            <template s-if="isPc">
                <br /><br />
                <h4>line 样式 + pill 二级 Tabs（修改了 pill 的样式）</h4>
                <p class="cos-space-mt-xs">二级 tabs 是 pill 主题改造的。（广州之后的城市没有对应的内容，用户可以自行补充）</p>
                <cos-tabs appearance="line" class="custom-line-two2" arrow="right">
                    <cos-tab slot="tab" s-for="tab in cityTabs">{{ tab.title }}</cos-tab>
                    <cos-tab-pane s-for="pane in cityTabs">
                        <cos-tabs class="custom-line-sub2" appearance="pill" arrow="right" style="width: 512px;">
                            <cos-tab slot="tab" s-for="tab in pane.children">{{ tab.title }}</cos-tab>
                            <cos-tab-pane s-for="tab in pane.children">{{ tab.content }}</cos-tab-pane>
                        </cos-tabs>
                    </cos-tab-pane>
                </cos-tabs>
            </template>

            <br /><br />
            <h4>outline 样式</h4>
            <p class="cos-space-mt-xs">（如果想控制横滑时两侧负边距，请参考本例样式给 .cos-tabs-header-left/right-margin 类名设置 margin-left/right 属性，当前为 -3px）</p>
            <cos-tabs appearance="outline" class="custom-image-tabs" arrow="{{isPc}}">
                <cos-tab slot="tab" s-for="tab in imageTabs">
                    <div><cos-image class="cos-img" src="{{src}}" alt="基本样式" /></div>
                    <p class="cos-space-m-none">{{ tab }}</p>
                </cos-tab>
            </cos-tabs>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-image': Image,
        'cos-cascader': Cascader
    };

    initData() {
        const tabs = ["北京北京","上海上海上海","广州","深圳"];
        const imageTabs = ["北京","上海","广州","深圳","香港","台湾","澳门","海南","江西","广西","重庆","天津"];
        const tabPanes = [
            "北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。",
            "上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。",
            "广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。",
            "深圳市（Shenzhen），别称鹏城，中国改革开放的窗口和新兴现代化城市，以科技创新和高新技术产业闻名于世。"
        ];
        const placeholder = '请选择';
        const value2 = 'all';
        const optionsCategories = [
            {
                label: '深度游',
                value: 'you1',
            },
            {
                label: '跟团游',
                value: 'you2',
            },
            {
                label: '自由行',
                value: 'you3',
            },
        ];
        const optionsDays = [
            {
                label: '全部',
                value: 'all'
            },
            {
                label: '一日游',
                value: 'one'
            },
            {
                label: '二日游',
                value: 'two'
            },
            {
                label: '三日游',
                value: 'three'
            }
        ];

        const cityTabs = [
            {
                title: '北京',
                content: '北京市（Beijing），简称“京”，古称燕京、北平，是中华人民共和国首都、直辖市、国家中心城市、超大城市。',
                children: [
                    {
                        title: '东城区',
                        content: '东城区位于北京市中心东部，是北京市的政治中心和历史文化遗址集中地。'
                    },
                    {
                        title: '西城区',
                        content: '西城区位于北京市中心西部，是北京市的文化、教育和金融中心之一。'
                    },
                    {
                        title: '朝阳区',
                        content: '朝阳区作为北京市面积最大的区，朝阳区位于市区东部，是北京的经济、文化和国际交往中心。'
                    },
                    {
                        title: '丰台区',
                        content: '丰台区位于北京市南部，是北京市的交通枢纽之一，拥有丰富的历史遗迹和文化景观。'
                    },
                    {
                        title: '海淀区',
                        content: '海淀区位于北京西北部，是著名的教育科研基地。'
                    },
                    {
                        title: '顺义区',
                        content: '顺义区位于北京东北部，是重要的临空经济区。'
                    },
                    {
                        title: '石景山区',
                        content: '石景山区位于北京市西部，是首都的工业基地，同时也是一个风景优美的山区。'
                    },
                    {
                        title: '房山区',
                        content: '房山区位于北京市西南部，拥有丰富的自然资源和历史文化景观，是首都重要的生态涵养区。'
                    },
                    {
                        title: '通州区',
                        content: '通州区位于北京市东部，是北京市的副中心，正在快速发展成为未来的行政和经济中心。'
                    },
                    {
                        title: '昌平区',
                        content: '昌平区位于北京市北部，历史悠久，拥有著名的明十三陵等文化遗产，同时也是一个重要的科技创新基地。'
                    },
                    {
                        title: '大兴区',
                        content: '大兴区位于北京市南部，是首都国际航空枢纽大兴国际机场的所在地，正成为新的经济增长点。'
                    },
                    {
                        title: '怀柔区',
                        content: '怀柔区位于北京市东北部，是首都的生态涵养区，拥有众多自然风景区和影视拍摄基地。'
                    },
                    {
                        title: '平谷区',
                        content: '平谷区位于北京市东北部，生态环境优越，以其风景秀丽的山水和农业生产而闻名。'
                    },
                    {
                        title: '密云区',
                        content: '密云区位于北京市东北部，拥有丰富的水资源，是北京市的重要水源保护区，同时也是旅游胜地。'
                    },
                    {
                        title: '延庆区',
                        content: '延庆区位于北京市西北部，因其丰富的自然景观和冬奥会场馆而备受关注，是北京市的重要休闲旅游区。'
                    }
                ]
            },
            {
                title: '上海',
                content: '上海市（Shanghai），简称“沪”或“申”，位于中国华东地区，是中国的经济、金融、贸易和航运中心。',
                children: [
                    {
                        title: '黄浦区',
                        content: '黄浦区地处上海市中心城区中部，黄浦江和苏州河合流处的西南端。'
                    },
                    {
                        title: '浦东新区',
                        content: '浦东新区作为上海最大的行政区，不仅包括了外环线以内的区域，还包括了原南汇等郊区部分。'
                    },
                    {
                        title: '崇明区',
                        content: '崇明区位于长江口，是一个以农业和生态旅游为主的区域。'
                    },
                    {
                        title: '徐汇区',
                        content: '徐汇区：徐汇区位于上海中心城区的西南部，东北侧与黄浦区毗邻，东临黄浦江，西与闵行区分界，北与静安区、长宁区接壤。'
                    }
                ]
            },
            {
                title: '广州',
                content: '广州市（Guangzhou），别称羊城、花城，是广东省的省会，中国南方的政治、经济、文化、科技和交通中心。',
                children: [
                    {
                        title: '越秀区',
                        content: '越秀区，隶属广东省广州市，是广州市的中心城区，位于广州市区中心。'
                    },
                    {
                        title: '荔湾区',
                        content: '荔湾区，隶属于广东省广州市，是广州市老城区之一，是国家中心城市的中心城区。'
                    },
                    {
                        title: '海珠区',
                        content: '海珠区，隶属于广东省广州市，位于广州市南部，介于东经113°14′~113°23′，北纬23°3~23°16″之间。'
                    },
                    {
                        title: '天河区',
                        content: '天河区，广东省广州市辖区，位于广州市东部，1985年由广州郊区分出组建。'
                    },
                    {
                        title: '番禺区',
                        content: '番禺区，隶属于广东省广州市，位于广州市中南部，珠江三角洲中部河网地带。'
                    }
                ]
            },
            {
                title: '深圳'
            },
            {
                title: '香港'
            },
            {
                title: '台湾'
            },
            {
                title: '澳门'
            },
            {
                title: '海南'
            },
            {
                title: '江西'
            },
            {
                title: '广西'
            },
            {
                title: '重庆'
            },
            {
                title: '天津'
            }
        ];

        return {
            tabs,
            imageTabs,
            tabPanes,
            optionsCategories,
            optionsDays,
            value2,
            placeholder,
            cityTabs,
            src: 'https://gips0.baidu.com/it/u=226016356,1716158994&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f712_712'
        };
    }

    attached() {
       const container = this.el.querySelector('#cos-tabs-line-box .cos-tabs-header-container');
       if(this.data.get('isPc')) {
            const cascader = this.el.querySelector('.cos-test-cas');
            container.appendChild(cascader);
       }
    }
}
```
