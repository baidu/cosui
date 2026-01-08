``` san export=preview caption=显示文本(PC) platform=pc
import {Component} from 'san';
import Button from '@cosui/cosmic/button';
import Toast from '@cosui/cosmic/toast';

export default class PCBasic extends Component {

    static template = `
        <div data-testid="pc-text-toast">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">点击下方按钮查看示例效果</h4>
            <div class="cos-row cos-gutter">
                <div class="cos-col">
                    <cos-button on-click="showShortText()">短文本提示</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button on-click="showLongText()">长文本提示</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-toast': Toast,
        'cos-button': Button
    };

    showShortText() {
        Toast.show({
            message: '短文本提示',
        });
    }

    showLongText() {
        Toast.show({
            message: '长文本应清晰的描述现状提示最长的内容在三十字以内避免长篇大论超出部分省略',
        });
    }
}

```
