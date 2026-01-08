```san export=preview platform=pc/mobile caption=基本示例
import {Component} from 'san';
import ShopAddress from '@cosui/cosmic-dqa/shop-address';
export default class Demo extends Component {

    static template = `
        <div>
            <h3>店铺(强样式)</h3>
            <cosd-shop-address
                thumbnail="{{thumbnail}}"
                title="{{title}}"
                distance="{{distance}}"
                tags="{{tags}}"
                linkInfo="{{linkInfo}}"
                navigationInfo="{{navigationInfo}}"
                poi="{{poi}}"
                folded="{{folded}}"
            />
        </div>`;

    static components = {
        'cosd-shop-address': ShopAddress
    };

    initData() {
        return {
            thumbnail: 'https://gimg3.baidu.com/search/src=https%3A%2F%2Fpoi-pic-gz.cdn.bcebos.com%2F001%2F161_abb77836fc89b8f07750efd0fe47d2c6.jpeg&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=r3,2&n=0&g=6&er=404&q=75&fmt=auto&maxorilen2heic=2000000?sec=1713286800&t=a9a6c40056ff11f7b758a7cc8737cf1d',
            title: '海底捞火锅西单店',
            distance: '20km',
            tags: [{text: '3人访问'}, {text: '五星'}],
            linkInfo: {
                href: 'https://m.baidu.com/s?word=测试linkInfo'
            },
            navigationInfo: {
                href: 'https://m.baidu.com/s?word=测试navigationInfo'
            },
            poi: {
                name: '电玩望京店',
                area: '北京市',
                address: '北京市西城区西单北大街109号西单婚庆大楼7层(西单商场对面)'
            },
            folded: false
        };
    }
}
```