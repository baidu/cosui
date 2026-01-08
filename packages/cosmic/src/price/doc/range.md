```san export=preview  caption=区间价格
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class Demo extends Component {

    static template = `
        <div data-testid="price-range">
            <h3>其中一个值大于 100,000, 携带单位</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        max="{{price1}}"
                        min="{{price2}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        max="{{price3}}"
                        min="{{price4}}"
                    />
                </div>
            </div>
            <h3>传入最大值时，默认最小值为0</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        max="{{price3}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        max="{{price4}}"
                    />
                </div>
            </div>
            <h3>取消默认格式化的区间价格</h3>
            <div class="cos-row cos-flex-wrap">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        format="{{false}}"
                        range
                        max="{{price1}}"
                        min="{{price3}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        format="{{false}}"
                        range
                        max="{{price1}}"
                        min="{{price4}}"
                    />
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-price': Price
    };

    initData() {
        return {
            price1: 3141590000.2653,
            price2: 314159000.2653,
            price3: 31415.9265,
            price4: 3141.5926
        };
    }
}

```