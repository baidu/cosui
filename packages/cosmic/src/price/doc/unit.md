```san export=preview  caption=自定义单位
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class Demo extends Component {

    static template = `
        <div data-testid="price-unit">
            <h3>单价格</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price1}}"
                        unit="起"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        sign="¥"
                        value="{{price2}}"
                        unit="超值"
                    />
                </div>
            </div>
            <h3>区间价格</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        unit="起"
                        max="{{price2}}"
                        min="{{price3}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        range
                        sign="¥"
                        unit="超值"
                        max="{{price2}}"
                        min="{{price3}}"
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
            price1: 314159.2653,
            price2: 31415.9265,
            price3: 3141.5926
        };
    }
}

```