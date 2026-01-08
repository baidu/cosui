```san export=preview caption=回搜链接
import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import './default.less';

export default class Demo extends Component {
    static template = `
        <div>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div class="cos-col cos-col-4">
                    <div class="cos-search-link cos-text-body">
                        <component
                            s-is="{{linkInfo.href ? 'a' : 'div'}}"
                            class="cos-search-link-text"
                            s-bind="linkInfo">
                            回搜文本
                        </component>
                        <cos-icon name="research" class="cos-search-link-icon" />
                    </div>
                </div>
                <div class="cos-col cos-col-4">
                    <div class="cos-search-link cos-text-body-lg-higher">
                        <component
                            s-is="{{linkInfo.href ? 'a' : 'div'}}"
                            s-bind="linkInfo"
                            class="cos-search-link-text">
                            回搜文本
                        </component>
                        <cos-icon name="research" class="cos-search-link-icon" />
                    </div>
                </div>
                <div class="cos-col cos-col-4">
                    <div class="cos-search-link cos-text-headline cos-search-link-lg">
                        <component
                            s-is="{{linkInfo.href ? 'a' : 'div'}}"
                            s-bind="linkInfo"
                            class="cos-search-link-text">
                            回搜文本
                        </component>
                        <cos-icon name="research" class="cos-search-link-icon" />
                    </div>
                </div>
            </div>
        </div>
    `;
    static components = {
        'cos-icon': Icon
    };

    initData() {
        return {
            linkInfo: {
                href: 'https://www.baidu.com',
                'data-click-info': '{}',
                'data-tc-redirect': 'https://www.baidu.com',
            }
        }
    };
}

```