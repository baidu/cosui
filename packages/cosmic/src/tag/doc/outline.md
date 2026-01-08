```san export=preview  caption=线型标签
import {Component} from 'san';
import Tag from '@cosui/cosmic/tag';

export default class Demo extends Component {

    static template = `
        <div data-testid="tag-outline">
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag
                    appearance="outline"
                    class="cos-color-border-primary-light cos-color-text-primary"
                >
                    标签
                </cos-tag>
            </div>
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag
                    appearance="outline"
                    class="cos-color-border-success-light cos-color-text-success"
                >
                    标签
                </cos-tag>
            </div>
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag
                    appearance="outline"
                    class="cos-color-border-em-light cos-color-text-alive"
                >
                    标签
                </cos-tag>
            </div>
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag
                    appearance="outline"
                    class="cos-color-border cos-color-text-minor"
                >
                    标签
                </cos-tag>
            </div>
        </div>
    `;

    static components = {
        'cos-tag': Tag
    };
}
```
