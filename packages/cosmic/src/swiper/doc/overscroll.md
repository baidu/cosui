``` san export=preview platform=mobile caption=滑至最右查看更多（仅支持Mobile，PC不生效）
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import './overscroll.less'

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-overscroll">
            <h4>常规横滑查看更多</h4>
            <cos-swiper class="swiper-overscroll-test" space-between="{{spaceBetween}}" overscroll-url="{{overscrollUrl}}">
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

            <h4 class="cos-space-mt-3xl">常规横滑查看更多(自定义横滑文字)</h4>
            <cos-swiper class="swiper-overscroll-test" space-between="{{spaceBetween}}"
            overscroll-url="{{overscrollUrl}}" overscroll-move-text="查看" overscroll-text="更多">
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

            <h4 class="cos-space-mt-3xl">翻页横滑查看更多</h4>
            <cos-swiper overscroll-url="{{overscrollUrl}}" indicator="center" snap-align="start" snap-stop="always">
                <cos-swiper-item
                    s-for="item, index in list"
                    width="100%"
                    class="demo-item"
                >
                    <div class="item-image" style="background-color:{{item.color}}">
                        <span>{{ index+1 }}</span>
                    </div>
                </cos-swiper-item>
            </cos-swiper>

            <h4 class="cos-space-mt-3xl">翻页横滑查看更多自定义事件</h4>
            <cos-swiper overscroll-url="{{overscrollUrl}}" indicator="center" snap-align="start" snap-stop="always" on-over-scroll="handleOverScroll">
                <cos-swiper-item
                    s-for="item, index in list"
                    width="100%"
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

    handleOverScroll(e) {
        console.log(e);
    }
}

```
