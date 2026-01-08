```san export=preview caption=禁用输入框
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input disabled placeholder="已禁止输入"/>
            <cos-input
                disabled
                appearance="filled"
                placeholder="已禁止输入"
                class="cos-space-mt-md"
            />
        </template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
