``` san export=preview caption=自动播放&循环播放&视口播放
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import Switcher from '@cosui/cosmic/switcher';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import './autoplay-loop.less';

export default class Default extends Component {

    static template = `
        <div data-testid="swiper-autoplay">
            <div class="demo-controller">
                <div id="loop-switcher">
                    <label>是否循环播放(loop):</label>
                    <cos-switcher checked="{=loop=}" size="sm"/>
                </div>
            </div>
            <div class="demo-controller cos-space-mb-lg">
                <div>
                    <label>自动播放类型(autoplay):</label>
                    <cos-radio-group value="{=autoplay=}" on-change="handleRadioChange">
                        <cos-radio value="{{true}}" checked>true</cos-radio>
                        <cos-radio value="{{false}}">false</cos-radio>
                        <cos-radio value="visible">visible</cos-radio>
                    </cos-radio-group>
                </div>
            </div>
            <cos-swiper autoplay="{{autoplay}}" indicator="center" loop="{{loop}}" on-change="handleChange">
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
        'cos-switcher': Switcher,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup
    };

    initData() {
        return {
            autoplay: true,
            loop: true,
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

    handleChange(params) {
        params.autoplay && console.log('自动播放中', params);
    }
}

```
