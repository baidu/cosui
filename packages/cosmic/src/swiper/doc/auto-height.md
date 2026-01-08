``` san export=preview caption=翻页场景高度自适应
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import './auto-height.less';

export default class Default extends Component {

    static template = `
        <div>
            <cos-swiper
                indicator="center"
                snap-align="start"
                snap-stop="always"
                auto-height="{{true}}"
            >
                <cos-swiper-item
                    s-for="item, index in list"
                    width="100%"
                    class="demo-item"
                >
                    <div class="item-image item-image-{{index}}" style="background-color:{{item.color}}">
                        <span>{{index + 1}}</span>
                    </div>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem
    };

    initData() {
        return {
            list: [
                {
                    color: "#8A73FF"
                },
                {
                    color: "#00B5F2"
                },
                {
                    color: "#3FC746"
                },
                {
                    color: "#91D543"
                },
                {
                    color: "#FFCB00"
                },
                {
                    color: "#FF8200"
                },
                {
                    color: "#FF471A"
                }
            ]
        };
    }
}

```
