``` san export=preview caption=设置滚动对齐方式
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import './active-index.less'

export default class Default extends Component {

    static template = `
        <div data-testid="active-index">
            <div class="demo-controller cos-space-mb-lg">
                <div id="scroll-behavior-input">
                    <label>对齐方式（align-type）</label>
                    <cos-radio-group value="{=alignType=}">
                        <cos-radio value="left" checked>left</cos-radio>
                        <cos-radio value="center">center</cos-radio>
                    </cos-radio-group>
                </div>
            </div>

            <cos-swiper
                s-ref="swiper"
                active-index="{{+activeIndex}}"
                align-type="{{alignType}}"
                on-scroll="onScroll"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="30%"
                    class="demo-item"
                    on-click="native:onItemClick(index)"
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
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup
    };

    initData() {
        return {
            alignType: 'center',
            activeIndex: 3,
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
    onItemClick(index) {
        this.data.set('activeIndex', index);
        this.ref('swiper').scrollToIndex(index);
    }
    onScroll(params) {
        console.log('onScroll', params);
    }
}

```
