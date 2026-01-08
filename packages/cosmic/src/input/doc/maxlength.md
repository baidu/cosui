```san export=preview caption=最大字符限制
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input maxlength="{{10}}" placeholder="最多输入10个字符"/>
            <cos-input
                maxlength="{{10}}"
                appearance="filled"
                placeholder="最多输入10个字符"
                class="cos-space-mt-md"
            />
        </template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
