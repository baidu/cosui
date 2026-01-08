```san export=preview platform=pc/mobile caption=基本示例
import {Component} from 'san';
import Poi from '@cosui/cosmic-dqa/poi';
export default class Demo extends Component {

    static template = `
        <div>
            <h3>单点地图(强样式)</h3>
            <div class="cos-row cos-gutter">
                <div class="cos-col-12">
                    <cosd-poi
                        map-image="{{mapImage}}"
                        ratio="{{ratio}}"
                        link-info="{{linkInfo}}"
                        marker="{{marker}}"
                        address="{{address}}"
                        area="{{area}}"
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
            linkInfo: {
                href: 'https://m.baidu.com/s?word=测试linkInfo'
            },
            marker: true
        };
    }
}
```