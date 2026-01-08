```san export=preview platform=pc/mobile caption=落地页调起示例
import {Component} from 'san';
import ShopAddress from '@cosui/cosmic-dqa/shop-address';
export default class Demo extends Component {

    static template = `
        <div>
            <h3>仅店铺,无展开收起</h3>
            <cosd-shop-address
                thumbnail="{{thumbnail}}"
                title="{{title}}"
                distance="{{distance}}"
                tags="{{tags}}"
                linkInfo="{{linkInfo}}"
                navigationInfo="{{navigationInfo}}"
                poi="{{poi}}"
                folded="{{folded}}"
                easybrowser="{{easybrowser}}"
                invoke-info="{{invokeInfo}}"
                on-poi-ready="handlePoiReady"
            />
        </div>`;

    static components = {
        'cosd-shop-address': ShopAddress
    };

    handlePoiReady(invokeParams) {
        const {defaultUrl, params, inited, posName} = invokeParams;
        inited(() => {
            alert('执行调起');
            open(defaultUrl)
        });
    }


    initData() {
        return {
            thumbnail: 'https://gimg3.baidu.com/search/src=https%3A%2F%2Fpoi-pic-gz.cdn.bcebos.com%2F001%2F161_abb77836fc89b8f07750efd0fe47d2c6.jpeg&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=r3,2&n=0&g=6&er=404&q=75&fmt=auto&maxorilen2heic=2000000?sec=1713286800&t=a9a6c40056ff11f7b758a7cc8737cf1d',
            title: '海底捞火锅西单店',
            distance: '20km',
            tags: [{text: '403人访问过'}, {text: '403人访问过'}, {text: '403人访问过'}, {text: '403人访问过'}, {text: '403人访问过'}],
            linkInfo: {
                href: 'https://m.baidu.com/s?word=测试linkInfo'
            },
            poi: {
                name: '电玩望京店',
                area: '北京市',
                address: '北京市西城区西单北大街109号西单婚庆大楼7层(西单商场对面)'
            },
            easybrowser: true,
            invokeInfo: {
                defaultUrl: 'http://api.map.baidu.com/place/search?query=海底捞&location=31.204055632862,121.41117785465&radius=1000&region=上海&output=html&src=webapp.baidu.openAPIdemo',
                params: {
                    origin: '我的位置',
                    destination: 'name:|latlng:',
                    coord_type: 'bd09mc',
                    src: `调用来源`,
                    navInit: 'yes'
                }
            }
        };
    }
}
```