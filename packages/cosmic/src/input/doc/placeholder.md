```san export=preview caption=placeholder
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input placeholder="占位文案"/>
            <cos-input
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
