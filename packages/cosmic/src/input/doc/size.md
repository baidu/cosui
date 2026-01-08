```san export=preview caption=设置尺寸
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <h4 class="cos-color-text-minor cos-font-regular">sm：高度 30px</h4>
            <cos-input size="sm" placeholder="占位文案"/>
            <h4 class="cos-color-text-minor cos-font-regular">md：高度 36px</h4>
            <cos-input  size="md" placeholder="占位文案"/>
            <h4 class="cos-color-text-minor cos-font-regular">lg：默认高度 40px</h4>
            <cos-input placeholder="占位文案" class="cos-space-mt-sm"/>
        <template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
