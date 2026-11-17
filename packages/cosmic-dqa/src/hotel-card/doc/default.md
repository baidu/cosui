```san export=preview caption=单个示例

import {Component} from 'san';
import HotelCard from '@cosui/cosmic-dqa/hotel-card';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>基本样式</h3>
            <cosd-hotel-card s-bind="{{card1}}" />
            <h3>标签</h3>
            <cosd-hotel-card s-bind="{{card2}}" />
            <h3>价格</h3>
            <cosd-hotel-card s-bind="{{card3}}" />
            <h3>来源</h3>
            <cosd-hotel-card s-bind="{{card4}}" />
        </div>
    `;

    static components = {
        'cosd-hotel-card': HotelCard
    };

    initData() {
        return {
            card1: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img0.baidu.com/it/u=1911918401,395561616&fm=253&fmt=auto&app=138&f=JPEG?w=522&h=500',
                title: '酒店名字限制1行酒店名字限制1行酒店名字限制1行酒店名字限制1行',
                score: {
                    value: 4.8,
                    score: true,
                    type: 'text'
                },
                distance: '距离市中心1.7km',
                district: 'xxx商圈'
            },
            card2: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img0.baidu.com/it/u=1911918401,395561616&fm=253&fmt=auto&app=138&f=JPEG?w=522&h=500',
                title: '酒店名称',
                score: {
                    value: 4.8,
                    score: true,
                    type: 'text'
                },
                distance: '距离市中心1.7km',
                district: 'xxx商圈',
                tags: [
                    {
                        text: '精选',
                        color: 'var(--cos-amber-2)',
                        bgColor: 'var(--cos-tan--5)',
                        iconBgColor: 'var(--cos-color-bg-warning-light-active)'
                    },
                    // 简写形式，默认为灰色、线型的标签
                    '免费取消'
                ]
            },
            card3: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img0.baidu.com/it/u=1911918401,395561616&fm=253&fmt=auto&app=138&f=JPEG?w=522&h=500',
                title: '酒店名称',
                score: {
                    value: 4.8,
                    score: true,
                    type: 'text'
                },
                distance: '距离市中心1.7km',
                district: 'xxx商圈',
                price: {
                    sign: '¥',
                    value: 399,
                    min: 399,
                    max: 399,
                    unit: '起/晚',
                    originValue: 0,
                    originText: 0
                },
                tags: [
                    {
                        text: 'xx 好评榜 第1名',
                        icon: 'list-fill',
                        color: 'var(--cos-amber-2)',
                        bgColor: 'var(--cos-tan--5)',
                        iconBgColor: 'var(--cos-color-bg-warning-light-active)'
                    },
                    // 简写形式，默认为灰色、线型的标签
                    '免费取消'
                ]
            },
            card4: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img0.baidu.com/it/u=1911918401,395561616&fm=253&fmt=auto&app=138&f=JPEG?w=522&h=500',
                title: '酒店名称',
                score: {
                    value: 4.8,
                    score: true,
                    type: 'text'
                },
                distance: '距离市中心1.7km',
                district: 'xxx商圈',
                price: {
                    sign: '¥',
                    value: 399,
                    unit: '起/晚',
                },
                source: '来自xx平台'
            }
        }
    }
}
```
