```san export=preview  caption=其他说明
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class PriceDemo extends Component {

    static template = `
        <div data-testid="price-basic-use">
            <p class="cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">可选择的颜色</p>
            <div class="cos-row cos-row-col-12">
                <div class="cos-col-4">
                    <cos-price
                        class="cos-color-text-alive"
                        unit="元"
                        size="lg"
                        format="{{false}}"
                        value="{{price}}"
                    />
                </div>

                <div class="cos-col-4">
                    <cos-price
                        class="cos-color-text"
                        unit="元"
                        size="lg"
                        format="{{false}}"
                        value="{{price}}"
                    />
                </div>

                <div class="cos-col-4">
                    <cos-price
                        class="cos-color-text-minor"
                        unit="元"
                        size="lg"
                        format="{{false}}"
                        value="{{price}}"
                    />
                </div>
            </div>

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">值大于 100,000 携带单位</p>
            <div class="cos-row cos-row-col-12">
                <div class="cos-col-4">
                    <cos-price
                        class="cos-color-text-alive"
                        size="{{size2}}"
                        value="{{price2}}"
                    />
                </div>
                <div class="cos-col-4">
                    <cos-price
                        class="cos-color-text-alive"
                        size="{{size2}}"
                        value="{{price3}}"
                    />
                </div>
            </div>

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">当小数点后为0时显示整数</p>
            <cos-price
                class="cos-color-text-alive"
                size="{{size2}}"
                value="{{price4}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">如需要，省略小数使用'+'号代替</p>
            <cos-price
                class="cos-color-text-alive"
                ellipsis="{{true}}"
                size="{{size2}}"
                value="{{price5}}"
            />
        </div>
    `;

    static components = {
        'cos-price': Price
    };

    initData() {
        return {
            price: 39593,
            littlePrice: 395.99,
            // 仅数字为 lg 大小
            size2: {
                num: 'lg'
            },
            price2: 39593000000,
            price3: 3959300,
            price4: 30000,
            price5: 395930
        };
    }
}
```
