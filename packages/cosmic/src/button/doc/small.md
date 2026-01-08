``` san export=preview caption=小按钮（展示在2N以内的按钮）
import {Component} from 'san';
import Button from '@cosui/cosmic/button';

export default class Default extends Component {

    static template = `
        <div data-testid="button-small">
            <h3>小按钮的font-size是13px</h3>
            <div class="cos-row cos-row-col-12 cos-gutter cos-space-mt-xs">
                <div class="cos-col-2">
                   <cos-button>强按钮</cos-button>
                </div>
                <div class="cos-col-2">
                    <cos-button appearance="secondary">弱按钮</cos-button>
                </div>
                <div class="cos-col-2">
                    <cos-button appearance="text">文本按钮</cos-button>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-button': Button
    };
}

```
