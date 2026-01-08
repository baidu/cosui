```san export=preview caption=等分链接
import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';

export default class Demo extends Component {
    static template = `
        <div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">二等分</h4>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div
                    s-for="index in [0, 1]"
                    class="cos-col cos-col-6">
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link-button cos-block cos-text-center"
                        s-bind="linkInfo">
                        <div>链接</div>
                    </div>
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">三等分</h4>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div s-for="index in [0, 1, 2]" class="cos-col cos-col-4" >
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link-button cos-block cos-text-center"
                        s-bind="linkInfo">
                        <div>链接</div>
                    </div>
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">四等分，带图标</h4>
            <div class="cos-row cos-row-col-12 cos-gutter">
                <div s-for="index in [0, 1, 2, 3]" class="cos-col cos-col-3 cos-line-clamp-1" >
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link-button cos-flex cos-justify-center"
                        s-bind="linkInfo">
                        <div class="cos-line-clamp-1 cos-text-center">
                            <cos-icon name="baidu"/>链接</div>
                    </div>
                </div>
            </div>
            <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">五等分, 文字超出一行省略号代替</h4>
            <div class="cos-row cos-gutter">
                <div s-for="index in [0, 1, 2, 3, 4]" class="cos-col  cos-line-clamp-1 cos-flex-1" >
                    <div
                        s-is="{{linkInfo.href ? 'a' : 'div'}}"
                        class="cos-link-button cos-block cos-text-center"
                        s-bind="linkInfo">
                        <div class="cos-line-clamp-1">链接链接链接链接链接</div>
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