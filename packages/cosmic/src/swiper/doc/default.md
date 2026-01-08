``` san export=preview caption=基本用法
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import './default.less';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-basic-scroll">
            <cos-swiper spaceBetween="{{spaceBetween}}">
                <cos-swiper-item
                    s-for="item, index in list"
                    width="calc(50% - {{spaceBetween/2}}px)"
                    class="demo-item"
                >
                    <div class="item-image" style="background-color:{{item.color}}">
                        <span>{{ index+1 }}</span>
                    </div>
                    <div class="item-text">{{ item.title }}</div>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'cos-image': Image
    };

    initData() {
        return {
            // 设置不同的间距
            spaceBetween: 10,
            list: [
                {
                    color: "#8A73FF",
                    "title": "这是第 1 项"
                },
                {
                    color: "#00B5F2",
                    "title": "这是第 2 项"
                },
                {
                    color: "#3FC746",
                    "title": "这是第 3 项"
                },
                {
                    color: "#91D543",
                    "title": "这是第 4 项"
                },
                {
                    color: "#FFCB00",
                    "title": "这是第 5 项"
                },
                {
                    color: "#FF8200",
                    "title": "这是第 6 项"
                },
                {
                    color: "#FF471A",
                    "title": "这是第 7 项"
                },
            ]
        };
    }
}

```