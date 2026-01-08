```san export=preview caption=支持清空（输入框聚焦且有值时展现）
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input clear placeholder="占位文案"/>
            <cos-input
                clear
                appearance="filled"
                placeholder="占位文案"
                class="cos-space-mt-md"
            />
        </template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
