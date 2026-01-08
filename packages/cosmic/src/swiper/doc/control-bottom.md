``` san export=preview platform=pc caption=控制器位置
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-indicator">
            <h3>翻页器模式</h3>
            <cos-swiper
                arrow="bottom"
                snap-align="start"
                snap-stop="always"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="100%"
                >
                    <cos-image
                        src="{{imgSrc}}"
                    />
                </cos-swiper-item>
            </cos-swiper>
            <h3>翻页器模式显示页数</h3>
            <cos-swiper
                arrow="bottom"
                indicator="number"
                snap-align="start"
                snap-stop="always"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="100%"
                >
                    <cos-image
                        src="{{imgSrc}}"
                    />
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
            imgSrc: 'https://img0.baidu.com/it/u=2413869369,2296014537&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
            list: new Array(7).fill({
                span: 6
            })
        };
    }
}

```