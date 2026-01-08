``` san export=preview caption=指示器位置&图片间距
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import Input from '@cosui/cosmic/input';
import Select from '@cosui/cosmic/select';
import Button from '@cosui/cosmic/button';
import './indicator-and-space.less';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-indicator">
            <div class="demo-controller">
                <div id="width-input">
                    <label>图片宽度占比 width（%）:</label>
                    <cos-input value="{=width=}" size="md"/>
                </div>
                <div id="indicator-select">
                    <label>指示器位置 indicator:</label>
                    <cos-select
                        style="width: 200px;"
                        value="{=indicator=}"
                        options="{{options}}"
                    />
                </div>
                <div id="space-between-input">
                    <label>图片间距 space-between（px）:</label>
                    <cos-input value="{=spaceBetween=}" size="md"/>
                </div>
                <cos-button s-if="isPc" on-click="updatedSwiperWidth">更新 swiper(修改width、space-between 数值后需要点击)</cos-button>
            </div>

            <cos-swiper
                indicator="{{indicator}}"
                space-between="{{spaceBetween}}"
                active-index="{{activeIndex}}"
                snap-align="none"
                snap-stop="always"
                s-ref="swiper"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="{{width}}%"
                    class="demo-item"
                >
                    <div class="item-image" style="background-color:{{item.color}}">
                        <span>{{ index+1 }}</span>
                    </div>
                </cos-swiper-item>
            </cos-swiper>

            <div class="cos-space-mt-3xl cos-space-mb-xl">抹除外部 13 px 的间距</div>
            <cos-swiper
                indicator="{{indicator}}"
                space-between="{{spaceBetween}}"
                active-index="{{activeIndex}}"
                snap-align="none"
                snap-stop="always"
                s-ref="swiper"
                class="remove-spacing"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="{{width}}%"
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
        'cos-select': Select,
        'cos-button': Button
    };

    initData() {
        return {
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
                {
                    color: "#8A73FF",
                    "title": "这是第 8 项"
                },
                {
                    color: "#00B5F2",
                    "title": "这是第 9 项"
                },
                {
                    color: "#3FC746",
                    "title": "这是第 10 项"
                },
            ],
            indicator: "",
            activeIndex: 0,
            spaceBetween: 9,
            width: 28,
            options: [{
                label: "(默认为空 没有指示器)",
                value: ""
            }, {
                label: "left",
                value: "left"
            }, {
                label: "right",
                value: "right"
            }, {
                label: "center",
                value: "center"
            }, {
                label: "outer",
                value: "outer"
            }]
        };
    }

    updatedSwiperWidth() {
        this.ref('swiper')?.updatedWidth();
    }
}
```
