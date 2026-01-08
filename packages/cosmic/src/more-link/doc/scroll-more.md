```san export=preview platform=mobile caption=横滑至最右查看更多（仅Mobile支持）

import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import './scroll-more.less';

export default class MoreLinkDemo extends Component {

    static template = `
        <div class="scroll-more">
            <div class="cos-link cos-block cos-space-mb-lg">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">
                    横滑查看更多需搭配 swiper 组件实现，详见：
                    <a href="/components/cosmic/swiper" class="jump-doc">Swiper文档</a>
                </h4>
            </div>
            <cos-swiper
                class="swiper-overscroll-test"
                space-between="{{spaceBetween}}"
                overscroll-url="{{overscrollUrl}}"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="calc(50% - {{spaceBetween/2}}px)"
                    class="demo-item"
                >
                    <div class="item-image" style="background-color:{{item.color}}">
                        <span>{{ index+1 }}</span>
                    </div>
                </cos-swiper-item>
            </cos-swiper>

            <cos-swiper
                class="cos-space-mt-lg swiper-overscroll-test"
                indicator="outer"
                space-between="{{spaceBetween}}"
                overscroll-url="{{overscrollUrl}}"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="calc(50% - {{spaceBetween/2}}px)"
                    class="demo-item"
                >
                    <div class="item-image" style="background-color:{{item.color}}">
                        <span>{{ index+1 }}</span>
                    </div>
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
            spaceBetween: 9,
            overscrollUrl: 'https://www.baidu.com/',
            overscrollUrlNoJump: 'javascript:void(0);',
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
    };
}

```