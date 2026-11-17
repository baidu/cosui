```san export=preview caption=单个示例

import {Component} from 'san';
import ProductCard from '@cosui/cosmic-dqa/product-card';

export default class DefaultDemo extends Component {

    static template = `
        <div>
            <h3>基本样式</h3>
            <cosd-product-card s-bind="{{card1}}" />
            <h3>标签</h3>
            <cosd-product-card s-bind="{{card2}}" />
            <h3>区间价格与销售信息</h3>
            <cosd-product-card s-bind="{{card3}}" />
            <h3>原价与来源</h3>
            <cosd-product-card s-bind="{{card4}}" />
        </div>
    `;

    static components = {
        'cosd-product-card': ProductCard
    };

    initData() {
        return {
            card1: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img1.baidu.com/it/u=1157185221,3830167191&fm=253&fmt=auto&app=138&f=JPEG?w=756&h=500',
                title: '产品名称限制1行产品名称限制1行产品名称限制1行产品名称限制1行',
                caption: '中大型SUV'
            },
            card2: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img1.baidu.com/it/u=2351502360,3558781250&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800',
                title: '比亚迪宋 Pro DM-i',
                tags: [
                    {
                        text: '电车销量榜 NO.2',
                        icon: 'list-fill',
                        color: 'var(--cos-amber-2)',
                        bgColor: 'var(--cos-tan--5)',
                        iconBgColor: 'var(--cos-color-bg-warning-light-active)'
                    },
                    // 简写形式，默认为灰色、线型的标签
                    '限时优惠'
                ],
                // 数组形式的描述，使用分割线切分展示
                caption: ['中大型SUV', '3.2-3.8L/100km']
            },
            card3: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img1.baidu.com/it/u=2351502360,3558781250&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800',
                title: '比亚迪宋 Pro DM-i',
                tags: [
                    {
                        text: '电车销量榜 NO.2',
                        icon: 'list-fill',
                        color: 'var(--cos-amber-2)',
                        bgColor: 'var(--cos-tan--5)',
                        iconBgColor: 'var(--cos-color-bg-warning-light-active)'
                    }
                ],
                caption: ['中大型SUV', '3.2-3.8L/100km'],
                price: {
                    format: false,
                    range: true,
                    sign: '¥',
                    min: '10.2',
                    max: '18.8',
                    unit: '万'
                },
                sales: '月销1.2万'
            },
            card4: {
                linkInfo: {
                    href: 'http://www.baidu.com'
                },
                thumbnail: 'https://img0.baidu.com/it/u=2824773580,1636240330&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667',
                title: '苹果 iPhone 16 Pro Max',
                caption: ['120HZ刷新率', '苹果A18 Pro', '三摄'],
                price: {
                    sign: '¥',
                    value: 8999,
                    originValue: 9999
                },
                sales: '销量999',
                source: 'Apple产品京东旗舰店'
            }
        }
    }
}
```
