```san export=preview caption=自定义
import {Component} from 'san';
import Slider from '@cosui/cosmic/slider';
import './custom.less';

export default class Demo extends Component {

    static template = `
        <div>
            <p class="cos-space-mb-lg cos-color-text-minor">可对滑块进行步长、最大/最小值的设置。</p>
            <div class="custom-demo">
                <p class="cos-color-text-minor">step=10，单游标滑块，使用默认刻度</p>
                <cos-slider step="{{10}}" marks value="{{value}}"
                    on-change="handleChange"
                    on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">step=10，双滑标滑块，自定义刻度</p>
                <cos-slider range marks="{{marks}}" step="{{10}}"
                    tooltipFormat="{{tooltipFormat}}" value="{{[40, 60]}}"
                    on-change="handleChange"
                    on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">最小值/最大值</p>
                <cos-slider range marks="{{marks1}}" min="{{10}}" max="{{30}}" value="{{[12, 20]}}"
                    on-change="handleChange" on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">自定义滑块游标（Tooltip）内容</p>
                <cos-slider value="{{value}}" tooltipFormat="{{tooltipFormatPercentage}}"
                    on-change="handleChange" on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">无 Tooltip 游标</p>
                <cos-slider value="{{value}}" tooltip="{{false}}"
                    on-change="handleChange" on-change-complete="handleChangeComplete"/>

                <p class="cos-color-text-minor">主题色自定义示例（以电商为例）</p>
                <cos-slider value="{{value}}" class="cos-shop"
                    on-change="handleChange" on-change-complete="handleChangeComplete"/>
            </div>
        </div>`;

    static components = {
        'cos-slider': Slider,
    };

    initData() {
        return {
            marks: {
                0: '0°C',
                20: '20°C',
                40: '40°C',
                60: '60°C',
                80: '80°C',
                100: '100°C'
            },
            marks1: {
                10: '最小值: 10',
                30: '最大值: 30'
            },
            tooltipFormatPercentage: (value) => {
                return value + '%';
            },
            tooltipFormat: (value) => {
                return value + '°C';
            },
            value: 10,
            valueRange: [30, 60]
        };
    }

    handleChange(value) {
        console.log('=====change value', value);
    }

    handleChangeComplete(value) {
        console.log('=====change-complete value', value);
    }
}
```