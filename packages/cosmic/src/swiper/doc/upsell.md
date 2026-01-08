``` san export=preview caption=常用场景-金刚位
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import './upsell.less'
const imgSrc = [
    "https://gips2.baidu.com/it/u=262811510,2122319558&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f41_40",
    "https://gips1.baidu.com/it/u=3930866800,1612098654&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40",
    "https://gips0.baidu.com/it/u=1737860173,2765596625&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f41_40",
    "https://gips2.baidu.com/it/u=3266588007,2093329813&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f41_40",
    "https://gips0.baidu.com/it/u=130893140,1500561807&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f40_40"
]

export default class Default extends Component {

    static template = `
        <div>
            <div class="pc-only">
                <h4>2-3个：图标和文本横向展示，宽度为3N</h4>
                <div class="cos-row">
                    <div s-for="item, index in list3" class="cos-col-3 demo-item horizontal">
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </div>
                </div>
                <br/>

                <h4>4-6个：等分水平居中</h4>
                <div class="cos-row">
                    <div s-for="item, index in list5" class="cos-col demo-item">
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </div>
                </div>
                <br/>

                <h4>7个及以上：增加翻页箭头，横滑展示（Swiper 实现）</h4>
                <cos-swiper space-between="0">
                    <cos-swiper-item
                        s-for="item, index in list10"
                        width="calc(100% / 7)"
                        class="demo-item"
                    >
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </cos-swiper-item>
                </cos-swiper>
            </div>

            <div class="mobile-only">
                <h4>2个：图标和文本横向展示，宽度为6N</h4>
                <div class="cos-row">
                    <div s-for="item, index in list2" class="cos-col-6 demo-item horizontal">
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </div>
                </div>
                <br/>

                <h4>3-5个：等分水平居中</h4>
                <div class="cos-row">
                    <div s-for="item, index in list5" class="cos-col demo-item">
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </div>
                </div>
                <br/>

                <h4>6个及以上：增加翻页箭头，横滑展示（Swiper 实现）</h4>
                <cos-swiper space-between="0" scrollbar class="mobile-scrollbar">
                    <cos-swiper-item
                        s-for="item, index in list10"
                        width="20%"
                        class="demo-item"
                    >
                        <img class="item-image" src="{{item}}"/>
                        <p class="item-text">文本文本</p>
                    </cos-swiper-item>
                </cos-swiper>
            </div>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem
    };

    initData() {
        return {
            list2: imgSrc.slice(0,2),
            list3: imgSrc.slice(0,3),
            list5: imgSrc.slice(0,5),
            list10: [...imgSrc,...imgSrc]
        };
    }
}

```
