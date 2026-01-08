```san export=preview caption=头部区域滚动
import {Component} from 'san';
import Tabs from '@cosui/cosmic/tabs';
import Tab from '@cosui/cosmic/tab';
import TabPane from '@cosui/cosmic/tab-pane';
import Icon from '@cosui/cosmic/icon';
import './scroll.less';

export default class Scroll extends Component {
    static template = `
        <div data-testid="scroll-tabs" class="scroll-tabs">
            <h4>横向滚动 {{isPc ? '带箭头' : ''}}</h4>
            <cos-tabs class="custom-tabs" arrow="{{isPc}}">
                <cos-tab slot="tab" s-for="tab in tabs">{{ tab }}</cos-tab>
                <cos-tab-pane s-for="pane in tabPanes">{{ pane }}</cos-tab-pane>
            </cos-tabs>
        </div>
    `;

    static components = {
        'cos-tabs': Tabs,
        'cos-tab': Tab,
        'cos-tab-pane': TabPane,
        'cos-icon': Icon,
    };

    initData() {
        const tabs = ["北京站","北京东站","北京南站","北京西站","北京北站","北京朝阳站","大兴机场站","清河站"];
        const tabPanes = [
            "北京站，位于中国北京市东城区，是中国铁路北京局集团有限公司管辖的特等站。",
            "北京东站，位于市区东部，是连接京哈铁路等线路的重要节点。",
            "北京南站，坐落于南城，作为高速铁路的主要枢纽，服务于京沪高铁等多条高速线路。",
            "北京西站，位于城市西部，是京广铁路、京九铁路等干线的始发终到站，客流量巨大。",
            "北京北站，原名西直门站，位于市区北部，是京包铁路、京张高铁的起点，连接着北方多个城市。",
            "北京朝阳站，新兴的高铁站，位于朝阳区，服务于京哈高铁等线路，进一步提升了北京的铁路交通能力。",
            "大兴机场站，紧邻北京大兴国际机场，是专为机场旅客设计的铁路站点，实现了空铁联运的无缝对接。",
            "清河站，位于海淀区清河地区，是京张高铁的重要站点，连接着北京与张家口等地，促进了区域间的交流与合作。"
        ];

        return {
            tabs,
            tabPanes,
            activeIndex: 0,
            showLeftArrow: false,
            showRightArrow: true,
        };
    }
}
```