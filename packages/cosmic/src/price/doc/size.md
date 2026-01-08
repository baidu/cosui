```san export=preview  caption=价格尺寸
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class PriceDemo extends Component {

    static template = `
        <div data-testid="price-size">
            <p class="cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">xxs: 12px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="xxs"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">xs: 14px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="xs"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">sm: 16px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="sm"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">md: 18px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="md"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">lg: 21px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="lg"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">xl: 30px</p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="xl"
                format="{{false}}"
                value="{{price}}"
            />
        </div>
    `;

    static components = {
        'cos-price': Price
    };

    initData() {
        return {
            price: 39593
        };
    }
}
```
