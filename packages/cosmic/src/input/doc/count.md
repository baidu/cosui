```san export=preview caption=字数统计
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input count maxlength="{{10}}" placeholder="占位文案"/>
            <cos-input
                count
                maxlength="{{10}}"
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
