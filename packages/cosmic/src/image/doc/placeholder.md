```san export=preview caption=占位图
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Loading from '@cosui/cosmic/loading';

export default class ImageDemo extends Component {
    static template = `
        <div data-testid="image-placeholder">
            <div class="cos-row cos-row-col-12 cos-gutter" style="--cos-grid-gutter: 16px">
                <div class="cos-col-5">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">默认占位显示</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-3-2"
                    />
                </div>
                <div class="cos-col-5">
                    <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">使用 placeholder 插槽自定义</h4>
                    <cos-image
                        src="{{src}}"
                        class="cos-image-3-2"
                    >
                        <div
                            slot="placeholder"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: url('https://psstatic.cdn.bcebos.com/crosswise/search_components/custom-placeholder_1699259051000.png') center /cover no-repeat;
                                line-height: 1;
                            "
                        >
                            <cos-loading/>
                        </div>
                    </cos-image>
                </div>
            </div>
        </div>
    `;
    static components = {
        'cos-image': Image,
        'cos-loading': Loading
    };

    initData() {
        return {
            src: '',
            placeholder: 'https://psstatic.cdn.bcebos.com/crosswise/search_components/loading-small_1699259580000.png'
        };
    }
}

```
