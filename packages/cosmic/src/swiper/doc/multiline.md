``` san export=preview caption=常用场景-多行展现
import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Input from '@cosui/cosmic/input';
import './multiline.less'

// 用于生成长度为 n 的 demo 数据
const listData = function(n) {
    const dataTemplate = [
        {
            color: "#8A73FF",
            title: "1"
        },
        {
            color: "#00B5F2",
            title: "2"
        },
        {
            color: "#3FC746",
            title: "3"
        },
        {
            color: "#91D543",
            title: "4"
        },
        {
            color: "#FFCB00",
            title: "5"
        },
        {
            color: "#FF8200",
            title: "6"
        },
        {
            color: "#FF471A",
            title: "7"
        }
    ];
    return Array.from({ length: n }, (_, i) => {
        const templateItem = dataTemplate[i % dataTemplate.length];
        return {
            color: templateItem.color,
            title: i + 1
        };
    });
};

export default class Default extends Component {

    static template = `
        <div>
            <h4>2 行 3 列，按行排布</h4>
            <cos-swiper class="mobile-padding-none" snap-align="center" snap-stop="always">
                <cos-swiper-item s-for="_, i in range(list12.length/(2*3))" width="100%" class="demo-item">
                    <div s-for="_, j in [0, 1]" class="cos-row">
                        <div s-for="_, k in [0, 1, 2]" class="cos-col">
                            <div class="item-image" style="background-color:{{list12[i * 3 + j * 6 + k].color}}">
                                <span>{{list12[i * 3 + j * 6 + k].title}}</span>
                            </div>
                        </div>
                    </div>
                </cos-swiper-item>
            </cos-swiper>
            <br/>

            <h4>2 行 3 列，按列排布</h4>
            <cos-swiper class="mobile-padding-none" snap-align="center" snap-stop="always">
                <cos-swiper-item s-for="_, i in range(list12.length/(2*3))" width="100%" class="demo-item">
                    <div s-for="_, j in [0, 1]" class="cos-row">
                        <div s-for="_, k in [0, 1, 2]" class="cos-col">
                            <div class="item-image" style="background-color:{{list12[i * 6 + j + k * 2].color}}">
                                <span>{{list12[i * 6 + j + k * 2].title}}</span>
                            </div>
                        </div>
                    </div>
                </cos-swiper-item>
            </cos-swiper>
            <br/>

            <h4>自定义行数与列数</h4>
            <div class="demo-controller">
                <div id="width-input">
                    <label>行数:</label>
                    <cos-input value="{=rowCount=}" size="md" on-input="updateSwiper"/>
                </div>
                <div id="width-input">
                    <label>列数:</label>
                    <cos-input value="{=colCount=}" size="md" on-input="updateSwiper"/>
                </div>
            </div>
            <cos-swiper class="mobile-padding-none" snap-align="center" snap-stop="always" s-ref="swiper">
                <cos-swiper-item
                    s-for="_, i in range(list36.length/(rowCount*colCount))"
                    width="100%"
                    class="demo-item"
                >
                    <div s-for="_, j in range(rowCount)" class="cos-row">
                        <div s-for="_, k in range(colCount)" class="cos-col">
                            <div
                                s-if="i * rowCount * colCount + k * rowCount + j < list36.length"
                                class="item-image"
                                style="background-color:{{list36[i * rowCount * colCount + j + k * rowCount].color}}"
                            >
                                <span>{{list36[i * rowCount * colCount + j + k * rowCount].title}}</span>
                            </div>
                        </div>
                    </div>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'cos-input': Input
    };

    initData() {
        return {
            rowCount: 3,
            colCount: 4,
            list12: listData(12),
            list36: listData(36)
        };
    };

    // 用于生成长度为 n (上取整)的空数组，便于迭代
    range(n) {
        return Array(Math.ceil(n));
    }

    // 及时更新 swiper 内部逻辑
    updateSwiper() {
        this.nextTick(()=>{
            const swiper = this.ref('swiper');
            if(swiper){
                swiper.scrollToIndex?.(0);
                swiper.updatedWidth?.();
            }
        })
    }
}

```
