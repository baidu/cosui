```san export=preview caption=特殊图片标签
import {Component} from 'san';

export default class Demo extends Component {
    static template = `
        <div data-testid="tag-image">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">复杂样式标签，使用图片直接展示</h4>
                <img
                    height="18"
                    src="{{src1}}"
                    alt="特殊标签使用图片展示"
                />
                <img
                    height="18"
                    src="{{src2}}"
                    alt="特殊标签使用图片展示"
                    class="cos-space-ml-3xl"
                />
        </div>
    `;

    initData() {
        return {
            src1: 'https://gips2.baidu.com/it/u=2776849620,2848488513&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f2000_740',
            src2: 'https://gips0.baidu.com/it/u=857053459,1534982105&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f621_180'
        };
    }
}

```
