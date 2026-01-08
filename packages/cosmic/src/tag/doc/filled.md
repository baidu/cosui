```san export=preview  caption=基本标签
import {Component} from 'san';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';

export default class TagDemo extends Component {

    static template = `
        <div data-testid="tag-filled">
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag appearance="filled" class="cos-color-bg-primary">标签</cos-tag>
            </div>
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag appearance="filled" class="cos-color-bg-success">标签</cos-tag>
            </div>
            <div class="cos-space-mr-3xl cos-inline">
                <cos-tag appearance="filled" class="cos-color-bg-alive">标签</cos-tag>
            </div>
        </div>
    `;

    static components = {
        'cos-tag': Tag
    };

}

```
