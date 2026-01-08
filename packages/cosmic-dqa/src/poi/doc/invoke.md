```san export=preview platform=mobile caption=invoke调起示例
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
                        folded="{{folded}}"
                        easybrowser="{{easybrowser}}"
                        invoke-info="{{invokeInfo}}"
                        on-poi-ready="handlePoiReady"
                    />
                </div>
            </div>
        </div>`;

    static components = {
        'cosd-poi': Poi
    };

    handlePoiReady(invokeParams) {
        const {defaultUrl, params, inited, posName} = invokeParams;
        inited(() => {
            alert('执行调起');
            open(defaultUrl);
        })
    }

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
            folded: true,
            easybrowser: true,
            invokeInfo: {
                defaultUrl: 'http://api.map.baidu.com/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&output=html&src=webapp.baidu.openAPIdemo',
                params: {
                    show_type: 'detail_tab',
                    uid: '881a28e7bbf2f45ef842b2f5',
                    src: `调用来源`
                }
            }
        };
    }
}
```