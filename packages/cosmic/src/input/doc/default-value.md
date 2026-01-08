```san export=preview caption=默认值
import {Component} from 'san';
import Input from '@cosui/cosmic/input';

export default class InputDemo extends Component {
    static template = `
        <template>
            <cos-input value="Rose"/>
            <cos-input
                value="Rose"
                appearance="filled"
                class="cos-space-mt-md"
            />
        </template>
    `;

    static components = {
        'cos-input': Input
    };
}

```
