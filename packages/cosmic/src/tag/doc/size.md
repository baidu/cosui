```san export=preview  caption=尺寸大小
import {Component} from 'san';
import Tag from '@cosui/cosmic/tag';
import './size.less';

export default class TagDemo extends Component {

    static template = `
        <div data-testid="tag-size">
        <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">两档尺寸，size 分别是md、sm</h4>
            <div class="cos-row">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">圆底标签：</h4>
                <div class="cos-space-mr-xs">
                    <cos-tag appearance="filled" class="cos-color-text-on-error-light cos-color-bg-error-light" size="md">
                    中号标签
                    </cos-tag>
                </div>
                <cos-tag appearance="filled" class="tag-sm">
                    小号标签
                </cos-tag>
            </div>
            <div class="cos-row cos-space-mt-sm">
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">单字标签：</h4>
                <div class="cos-space-mr-xs">
                    <cos-tag appearance="filled" class="cos-color-bg-em" size="md">新</cos-tag>
                </div>
                <cos-tag appearance="filled" class="cos-color-bg-alive">沸</cos-tag>
            </div>
        </div>
    `;

    static components = {
        'cos-tag': Tag
    };

}

```
