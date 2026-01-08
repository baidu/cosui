```san export=preview caption=特殊样式
import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import './special.less';

export default class ImageDemo extends Component {
    static template = `
        <div data-testid="image-special" class="image-special">
            <p class="cos-color-text-minor cos-space-mt-none">医疗敏感图</p>
            <div class="cos-row cos-row-col-12">
                <div class="cos-col-6">
                    <cos-image class="image-special-medical image-special-medical-{{show? 'show' : ''}}" src="{{src}}">
                        <div class="image-content" on-click="handleClick">
                            <div class="cos-row cos-color-text-inverse">
                                <div class="image-icon cos-space-mr-xxs"></div>
                                点击查看
                            </div>
                        </div>
                    </cos-image>
                </div>
            </div>
        </div>
    `;
    static components = {
        'cos-image': Image
    };

    initData() {
        return {
            src: 'https://gips3.baidu.com/it/u=3899532479,10663177&fm=3028&app=3028&f=JPEG&fmt=auto&q=75&size=f640_427',
            show: false
        };
    };

    handleClick() {
        console.log(1111)
        this.data.set('show', true)
    }
}

```
