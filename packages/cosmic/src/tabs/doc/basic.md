```san export=preview caption=常用样式
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import './basic.less';

export default class Basic extends Component {
    static template = `
        <div data-testid="basic-tabs" class="basic-tabs">
            <h4>单级 Tabs</h4>
            <cos-tabs class="custom-content-tabs" on-change="handleChange">
                <cos-tab slot="tab" s-for="tab in cityTabs">{{ tab.title }}</cos-tab>
                <cos-tab-pane s-for="pane in cityTabs">{{pane.content}}</cos-tab-pane>
            </cos-tabs>

            <br /><br />
            <h4>两级 Tabs</h4>
            <p class="cos-space-mt-xs cos-color-text-minor">（如果想控制第二级 Tabs 的两侧负边距，请参考本例样式给 .cos-tabs-header-left/right-margin 类名设置 margin-left/right 属性，当前为 -16px）</p>
            <div class="custom-multi-tabs cos-row cos-space-mt-xs">
                <cos-tabs appearance="bar" on-change="handleChange">
                    <cos-tab slot="tab" s-for="tab in cityTabs">{{ tab.title }}</cos-tab>
                    <cos-tab-pane s-for="pane in cityTabs" class="cos-space-mt-xs">
                        <cos-tabs appearance="pill-filled" on-change="handleChange" arrow="{{isPc}}">
                            <cos-tab slot="tab" s-for="tab in pane.children">{{ tab.title }}</cos-tab>
                            <cos-tab-pane s-for="tab in pane.children">{{tab.content}}</cos-tab-pane>
                        </cos-tabs>
                    </cos-tab-pane>
                </cos-tabs>
            </div>

            <br /><br />
            <h4>图文 Tabs</h4>
            <div class="custom-img-tabs cos-row cos-space-mt-xs">
                <cos-tabs appearance="outline">
                    <cos-tab slot="tab" s-for="tab in tabs">
                        <cos-image class="cos-img" src="{{src}}" alt="基本样式" />
                        <p class="cos-space-m-none">{{ tab.title }}</p>
                    </cos-tab>
                </cos-tabs>
            </div>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-icon': Icon,
        'cos-image': Image
    };

    initData() {
        return {
            activeIndex: 0,
            tabs: [
                { title: '图文tab1', content: '标签内容 1' },
                { title: '图文tab2', content: '标签内容 2' },
                { title: '图文tab3', content: '标签内容 1' },
                { title: '图文tab4', content: '标签内容 2' },
                { title: '图文tab5', content: '标签内容 1' }
            ],
            cityTabs: [
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
                }
            ],
            src: 'https://gips0.baidu.com/it/u=226016356,1716158994&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f712_712'
        }
    }

    handleChange(activeIndex) {
        console.log('activeIndex: ', activeIndex);
    }

    handleRightArrowClick() {
        console.log('handleRightArrowClick');
    }

    turnPage(direction) {
        const scroller = this.ref('arrowTabs').ref('tabsHeader');
        const scrollCoord = ((direction === 'left') ? -1 : 1) * scroller.offsetWidth;
        scroller.scrollBy(scrollCoord, 0);
    }
}
```
