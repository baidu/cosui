```san export=preview caption=使用插槽
import {Component} from 'san';
import Textarea from '@cosui/cosmic/textarea';
import Button from '@cosui/cosmic/button';

export default class TextareaDemo extends Component {
    static template = `
        <template>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">内部带按钮</h4>
            <cos-textarea
                height="{{108}}"
                appearance="filled"
                placeholder="占位文案"
            >
                <cos-button slot="bottomSuffix" size="sm" style="width: 57px;">提交</cos-button>
            </cos-textarea>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">尾部更多操作</h4>
            <cos-textarea
                count
                clear
                height="{{108}}"
                maxlength="{{20}}"
                appearance="filled"
                placeholder="占位文案"
            >
                <cos-button slot="bottomSuffix" size="sm" style="width: 57px;">提交</cos-button>
            </cos-textarea>
            <h4 class="cos-color-text-minor cos-space-mt-xxl cos-space-mb-xs cos-font-regular">标题插槽</h4>
            <cos-textarea
                clear
                height="{{150}}"
                maxlength="{{100}}"
                max-height="{{180}}"
                appearance="filled"
                placeholder="占位文案"
            >
                <div slot="title">用户建议</div>
            </cos-textarea>
        </template>
    `;

    static components = {
        'cos-button': Button,
        'cos-textarea': Textarea
    };
}

```
