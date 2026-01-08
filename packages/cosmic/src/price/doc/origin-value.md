```san export=preview  caption=多价格
import {Component} from 'san';
import Price from '@cosui/cosmic/price';
import './origin-value.less';

export default class Demo extends Component {

    static template = `
        <div data-testid="price-origin-value">
            <p class="cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">双价格</p>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        sign="¥"
                        size="{{size}}"
                        value="{{price}}"
                        originValue="{{originPrice}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <div class="cos-flex cos-items-baseline">
                        <span class="price-text cos-color-text-alive cos-font-medium">折后</span>
                        <cos-price
                            class="cos-color-text-alive"
                            sign="¥"
                            unit="｜优惠前"
                            size="{{size}}"
                            value="{{price}}"
                        />
                        <cos-price
                            class="cos-color-text-alive"
                            sign="¥"
                            size="xs"
                            value="799"
                        />
                    </div>
                </div>
            </div>

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                描述文本
            </p>
            <div class="cos-row">
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        sign="¥"
                        size="{{size}}"
                        value="{{price}}"
                        originValue="{{originPrice}}"
                        originText="{{originText}}"
                    />
                </div>
                <div class="cos-flex-1">
                    <cos-price
                        class="cos-color-text-alive"
                        sign="¥"
                        size="{{size}}"
                        value="{{price}}"
                        originText="{{originText}}"
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
            price: 395,
            originPrice: 799.99,
            size: {
                num: 'md',
                sign: 'md'
            },
            originText: '超优惠'
        };
    }
}
```