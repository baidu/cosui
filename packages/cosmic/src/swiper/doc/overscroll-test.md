``` san export=preview platform=mobile caption=滑至最右查看更多（仅支持Mobile, PC不生效）
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-overscroll">
            <h3>常规横滑查看更多</h3>
            <cos-swiper class="swiper-overscroll-test" space-between="{{spaceBetween}}" overscroll-url="{{overscrollUrl}}">
                <cos-swiper-item
                    s-for="item, index in list"
                    width="calc(50% - {{spaceBetween}}px)"
                >
                    <cos-image
                        src="{{imgSrc}}"
                    />
                    <div>二级标题 {{ index }}</div>
                    <div class="c-color-gray">辅助功能 {{ index }}</div>
                </cos-swiper-item>
            </cos-swiper>

            <h3>常规横滑没有查看更多链接</h3>
            <cos-swiper class="swiper-overscroll-test-no-more-url" space-between="{{spaceBetween}}">
                <cos-swiper-item
                    s-for="item, index in list"
                    width="calc(50% - {{spaceBetween}}px)"
                >
                    <cos-image
                        src="{{imgSrc}}"
                    />
                    <div>二级标题 {{ index }}</div>
                    <div class="c-color-gray">辅助功能 {{ index }}</div>
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
            overscrollUrl: '/components/cosmic/swiper',
            imgSrc: 'https://img0.baidu.com/it/u=2413869369,2296014537&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
            list: new Array(1).fill({
                span: 6
            })
        };
    }
}

```
