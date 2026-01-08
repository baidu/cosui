```san export=preview  caption=基本使用
import {Component} from 'san';
import Price from '@cosui/cosmic/price';

export default class PriceDemo extends Component {

    static template = `
        <div data-testid="price-basic-use">
            <p class="cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                数字+元
            </p>
            <cos-price
                class="cos-color-text-alive"
                unit="元"
                size="lg"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                数字+元（大小组合）
            </p>
            <cos-price
                class="cos-color-text-alive"
                unit="元/单位"
                size="{{size2}}"
                format="{{false}}"
                value="395"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                数字+自定义文字
            </p>
            <cos-price
                class="cos-color-text-alive"
                unit="元/单位"
                size="lg"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                符号+数字
            </p>
            <cos-price
                class="cos-color-text-alive"
                sign="¥"
                size="{{size}}"
                format="{{false}}"
                value="{{price}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                符号+数字（大小组合）
            </p>
            <cos-price
                class="cos-color-text-alive"
                sign="¥"
                size="{{size}}"
                format="{{false}}"
                value="{{littlePrice}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">
                符号+数字+文字（大小组合）
            </p>
            <cos-price
                class="cos-color-text-alive"
                sign="¥"
                unit="起"
                size="{{size}}"
                format="{{false}}"
                value="{{littlePrice}}"
            />

            <p class="cos-space-mt-xxl cos-space-mb-xs cos-text-subtitle-sm cos-color-text-minor">符号+数字+单位</p>
            <cos-price
                class="cos-color-text-alive"
                sign="¥"
                size="{{size3}}"
                value="19000"
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
            size: {
                num: {
                    integer: 'lg',
                    decimal: 'sm'
                },
                unit: 'xs',
                sign: 'lg',
            },
            size2: {
                num: {
                    integer: 'lg',
                    decimal: 'sm'
                },
                unit: 'sm',
                sign: 'lg',
            },
            size3: {
                num: {
                    integer: 'lg',
                    decimal: 'lg',
                    quantityUnit: 'sm'
                },
                unit: 'xs',
                sign: 'lg'
            }
        };
    }
}
```
