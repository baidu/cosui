``` san export=preview caption=文本按钮
import {Component} from 'san';
import Button from '@cosui/cosmic/button';

export default class Default extends Component {

    static template = `
        <div data-testid="button-text">
            <h3>文本按钮，分别为text、text-primary</h3>
            <div class="cos-row cos-gutter cos-space-mt-xs">
                <div class="cos-col">
                    <cos-button appearance="text">文本按钮</cos-button>
                </div>
                <div class="cos-col">
                    <cos-button appearance="text-primary">文本按钮</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };
}
```