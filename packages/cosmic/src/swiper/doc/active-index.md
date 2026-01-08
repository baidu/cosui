``` san export=preview caption=设置不同activeIndex和滚动行为切换展示不同的元素
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import Input from '@cosui/cosmic/input';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import './active-index.less'

export default class Default extends Component {

    static template = `
        <div data-testid="active-index">
            <div class="demo-controller cos-space-mb-lg">
                <div id="index-input">
                    <label>activeIndex:</label>
                    <cos-input value="{=activeIndex=}" size="md"/>
                </div>
                <div s-if="!isPc" id="scroll-behavior-input">
                    <label>scroll-behavior:</label>
                    <cos-radio-group value="{=scrollBehavior=}">
                        <cos-radio value="smooth" checked>smooth</cos-radio>
                        <cos-radio value="auto">auto</cos-radio>
                    </cos-radio-group>
                </div>
            </div>

            <cos-swiper
                indicator="center"
                active-index="{{+activeIndex}}"
                scroll-behavior="{{scrollBehavior}}"
            >
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
        'cos-image': Image,
        'cos-input': Input,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup
    };

    initData() {
        return {
            scrollBehavior: 'smooth',
            activeIndex: 0,
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
