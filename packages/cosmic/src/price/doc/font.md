```san export=preview  caption=字体样式调整
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class PriceDemo extends Component {

    static template = `
        <div data-testid="price-font">
            <h3>默认等宽字体效果</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price}}"
                        size="xl"
                        format="{{false}}"
                    />
                </div>
            </div>
            <h3>设置变宽字体</h3>
            <div class="cos-row">
                <div class="cos-flex-1" style="font-variant-numeric: lining-nums proportional-nums;">
                    <cos-price
                        class="cos-color-text-alive"
                        value="{{price}}"
                        size="xl"
                        format="{{false}}"
                    />
                </div>
            </div>
            <h3>字重效果对比</h3>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        style="font-weight: 400; /* cosmic-token-disable-line */"
                        value="{{price}}"
                        size="{{size}}"
                        format="{{false}}"
                        origin-text="Regular"
                    />
                </div>
            </div>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        style="font-weight: 500; /* cosmic-token-disable-line */"
                        value="{{price}}"
                        size="{{size}}"
                        format="{{false}}"
                        origin-text="Medium"
                    />
                </div>
            </div>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        style="font-weight: 700; /* cosmic-token-disable-line */"
                        value="{{price}}"
                        size="{{size}}"
                        format="{{false}}"
                        origin-text="Bold"
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
            price: 123456789,
            size: {
                num: 'xl',
                originText: 'sm'
            }
        };
    }
}

```
