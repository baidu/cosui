``` san export=preview caption=自动切换
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-autoplay-test">
            <div class="cos-button show-swiper" on-click="showSwiper">show-swiper</div>
            <div class="cos-button hide-swiper" on-click="hideSwiper">hide-swiper</div>
            <div class="cos-button add-item" on-click="addItem">+1</div>
            <div class="cos-button remove-item" on-click="removeItem">-1</div>

            <cos-swiper s-if="isShow" autoplay indicator="center" snap-align="start" snap-stop="always">
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
            isShow: true,
            imgSrc: 'https://img0.baidu.com/it/u=2413869369,2296014537&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
            list: new Array(7).fill({
                span: 6
            })
        };
    }

    showSwiper() {
        this.data.set('isShow', true);
    }

    hideSwiper() {
        this.data.set('isShow', false);
    }

    addItem() {
        this.data.push('list', {span: 6});
    }

    removeItem() {
        this.data.pop('list');
    }
}

```
