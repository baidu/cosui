```san export=preview caption=基本示例
import {Component} from 'san';
import CarScroll from '@cosui/cosmic-dqa/car-scroll';
import './default.less';

export default class Demo extends Component {
    static template = `
        <div>
            <cosd-car-scroll
                items="{{items}}"
                link-info="{{linkInfo}}"
                line-clamp="{{lineClamp}}"
                on-item-click="handleItemClick"
            />
        </div>
    `;

    static components = {
        'cosd-car-scroll': CarScroll
    }

    initData() {
        return {
            items: [
                {
                    image: 'https://youjia-image.cdn.bcebos.com/seriesImage/16378277278780387b06.png',
                    title: '奥迪Q5L',
                    price: '¥29.99-34.69万',
                    tags: ['紧凑型SUV', '油耗6.6L起'],
                    linkInfo: {
                        href: 'https://www.baidu.com'
                    },
                    objectFit: 'contain'
                },
                {
                    image: 'https://youjia-image.cdn.bcebos.com/modelImage/eaaadda03e6e6293e36ea13c7ccf1d58_unknow_1112_91/1763055667090/e0ff26656e82153cb543c94d5c77aa44.jpg@!watermark_1',
                    title: '奔驰GLA',
                    price: '停售',
                    tags: ['紧凑型SUV', '紧凑型SUV']
                },
                {
                    image: 'https://youjia-image.cdn.bcebos.com/modelImage/eaaadda03e6e6293e36ea13c7ccf1d58_unknow_1112_91/1763055667090/e0ff26656e82153cb543c94d5c77aa44.jpg@!watermark_1',
                    title: '奔驰GLC',
                    price: '¥29.99-34.69万',
                    tags: ['紧凑型SUV', '油耗6.6L起']
                }
            ],
            lineClamp: 1
        };
    }

    handleItemClick(e) {
        console.log('item clicked', e);
    }
}
```

