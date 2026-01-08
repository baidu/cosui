import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Image from '@cosui/cosmic/image';
import Button from '@cosui/cosmic/button';
import accelerateEmphasized from '../assets/animation/accelerate-emphasized.png';
import accelerate from '../assets/animation/accelerate.png';
import decelerateEmphasized from '../assets/animation/decelerate-emphasized.png';
import decelerate from '../assets/animation/decelerate.png';
import linear from '../assets/animation/linear.png';
import standard from '../assets/animation/standard.png';
import './transition.less';

export default class BasicDemo extends Component {
    static template = `
        <div style="max-width: 720px;">
            <div class="cos-flex animation-select">
                <cos-select
                    class="cos-space-mr-sm"
                    style="width: 300px;"
                    label="动画时长"
                    title="动画时长"
                    placeholder="{{placeholder}}"
                    appearance="mark"
                    value="cos-transition-duration-480"
                    options="{{durationOptions}}"
                    on-change="durationChange"
                >
                </cos-select>
                <cos-select
                    style="width: 420px;"
                    label="动画曲线"
                    title="动画曲线"
                    value="cos-transition-easing-standard"
                    placeholder="{{placeholder}}"
                    appearance="mark"
                    options="{{easingOptions}}"
                    on-change="easingChange"
                >
                </cos-select>
            </div>
            <div class="animation-demo cos-space-mt-sm cos-flex cos-flex-wrap">
                <img
                    src="{{src}}"
                    alt="基本样式"
                    class="animation-demo-image cos-space-mr-sm cos-space-mt-none"
                />
                <div class="animation-demo-wrap cos-inline-flex">
                    <div class="animation-demo-ball" style="{{animation}}"></div>
                    <div class="animation-demo-ball" style="{{animation}}animation-delay: 24ms;"></div>
                    <div class="animation-demo-ball" style="{{animation}}animation-delay: 50ms;"></div>
                </div>
            </div>
        </div>
    `;

    static computed = {
        animation() {
            const duration: string = this.data.get('duration');
            const easing: string = this.data.get('easing');
            return `animation-duration: ${duration};animation-timing-function: ${easing};`;
        }
    };
    static components = {
        'cos-select': Select,
        'cos-image': Image,
        'cos-button': Button
    };
    srcMap = {
        standard,
        linear,
        decelerate,
        decelerateEmphasized,
        accelerate,
        accelerateEmphasized
    };
    initData() {
        return {
            placeholder: '请选择token',
            duration: 'var(--cos-transition-duration-extralongest)',
            easing: 'var(--cos-transition-easing-standard)',
            src: standard
        };
    }

    capitalizeFirstLetter(str: string) {
        if (str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    easingChange(params: { value: any }) {
        this.data.set('easing', params.value);
        const easingOptions = this.data.get('easingOptions');
        const options = easingOptions.find((item: { value: any }) => item.value === params.value);
        const regex = /cos-transition-easing-([\w-]+)/;
        let src = options.label.match(regex)[1];
        if (src.split('-').length > 1) {
            const strArr = src.split('-');
            src = strArr[0] + this.capitalizeFirstLetter(strArr[1]);
        }
        this.data.set('src', this.srcMap[src]);
    }

    durationChange(params: { value: any }) {
        this.data.set('duration', params.value);
    }
}