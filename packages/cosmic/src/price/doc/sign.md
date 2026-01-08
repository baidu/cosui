```san export=preview  caption=货币符号 / 代号
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class Demo extends Component {

    static template = `
        <div data-testid="price-sign">
            <h3>单价格</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price1}}"
                        sign="¥"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price2}}"
                        sign="$"
                    />
                </div>
            </div>
            <h3>代号</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price1}}"
                        sign="CNY"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price2}}"
                        sign="USD"
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