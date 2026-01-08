```san export=preview platform=pc/mobile caption=弱样式示例
import {Component} from 'san';
import Poi from '@cosui/cosmic-dqa/poi';
export default class Demo extends Component {

    static template = `
        <div>
            <h3>单点地图(弱样式)</h3>
            <div class="cos-row cos-gutter">
                <div class="cos-col-12">
                    <cosd-poi
                        map-image="{{mapImage}}"
                        link-info="{{linkInfo}}"
                        marker="{{marker}}"
                        address="{{address}}"
                        area="{{area}}"
                        max-width="50%"
                        folded="{{folded}}"
                    /><cosd-poi
                        map-image="{{mapImage}}"
                        link-info="{{linkInfo}}"
                        marker="{{marker}}"
                        address="{{address}}"
                        area="{{area}}"
                        max-width="50%"
                        folded="{{folded}}"
                    />
                </div>
            </div>
        </div>`;

    static components = {
        'cosd-poi': Poi
    };

    initData() {
        return {
            mapImage: 'https://img1.baidu.com/it/u=1180593395,734189004&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=512',
            ratio: 3,
            linkInfo: {
                href: 'https://m.baidu.com/s?word=测试linkInfo'
            },
            marker: true,
            area: '河北省',
            address: '石家庄市长安区南高营立交桥',
            folded: true
        };
    }
}
```