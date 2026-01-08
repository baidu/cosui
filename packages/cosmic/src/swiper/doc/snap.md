```san export=preview caption=滚动吸附功能
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Image from '@cosui/cosmic/image';
import Input from '@cosui/cosmic/input';
import Select from '@cosui/cosmic/select';
import './snap.less';

export default class Snap extends Component {
    static template = `
        <div data-testid="swiper-mobile-snap">
            <div class="demo-controller">
                <div id="width-input">
                    <label>width(%):</label>
                    <cos-input value="{=width=}" size="md"/>
                </div>
                <div id="snap-align-select">
                    <label>snap-align:</label>
                    <cos-select
                        style="width: 200px;"
                        value="{=snapAlign=}"
                        options="{{snapAlignOptions}}"
                    />
                </div>
                <div id="snap-stop-select">
                    <label>snap-stop:</label>
                    <cos-select
                        style="width: 200px;"
                        value="{=snapStop=}"
                        options="{{snapStopOptions}}"
                    />
                </div>
            </div>

            <cos-swiper
                snap-align="{{snapAlign}}"
                snap-stop="{{snapStop}}"
                scrollable
                on-change="handleChange"
                on-over-scroll="handleOverScroll"
                on-scrollend="handleSrollend"
                on-scroll="handleScroll"
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

    handleChange(a){
        console.log('handleChange',a)
    }
    handleOverScroll(a){
        console.log('handleOverScroll',a)
    }
    handleSrollend(a){
        console.log('handleSrollend',a)
    }
    handleScroll(a){
        console.log('handleScroll',a)
    }

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'cos-image': Image,
        'cos-input': Input,
        'cos-select': Select
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
            ],
            snapAlign: "none",
            snapStop: "normal",
            width: 50,
            snapAlignOptions: [{
                label: "none",
                value: "none"
            }, {
                label: "start",
                value: "start"
            }, {
                label: "center",
                value: "center"
            }, {
                label: "end",
                value: "end"
            }],
            snapStopOptions: [{
                label: "normal",
                value: "normal"
            }, {
                label: "always",
                value: "always"
            }]
        };
    }

}
```