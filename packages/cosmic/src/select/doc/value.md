```san export=preview caption=默认值&选项定制

import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Switcher from '@cosui/cosmic/switcher';

export default class Demo extends Component {

    static template = `
        <div style="height: 415px;">
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">列表样式-单选-默认值</h4>
                <cos-select
                    style="width: 400px"
                    value="{{value}}"
                    title="{{title}}"
                    appearance="{{appearance1}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">列表样式-多选-选项定制</h4>
                <cos-select
                    style="width: 400px"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance1}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签样式-多选-选项定制</h4>
                <cos-select
                    style="width: 400px"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance2}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    on-change="change"
                >
                </cos-select>
            </div>
        </div>
    `;

    static components = {
        'cos-select': Select,
    };

    initData() {
        return {
            title: '标题',
            placeholder: '未选择前的默认文案',
            multiple: true,
            appearance1: 'mark',
            appearance2: 'tag',
            value: ['value2', 'value3'],

            options: [{
                value: 'value1',
                label: '测试选项一截断测试选项一截断测试选项一截断测试选项一截断测试选项一截断测试选项一截断测试选项一截断测试选项一截断测试选项一截断',
            }, {
                value: 'value2',
                label: '选项二'
            }, {
                value: 'value3',
                label: '选项三'
            }, {
                value: 'value4',
                label: '选项四'
            }, {
                value: 'value5',
                label: '选项五',
                disabled: true
            }, {
                value: 'value6',
                label: '选项六'
            }, {
                value: 'value7',
                label: '选项七'
            }, {
                value: 'value8',
                label: '选项八'
            }, {
                value: 'value9',
                label: '选项九',
                icon: 'https://img1.baidu.com/it/u=130622358,2203931177&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            }, {
                value: 'value10',
                label: '选项十'
            }, {
                value: 'value11',
                label: '选项十一'
            }, {
                value: 'value12',
                label: '选项十二'
            }, {
                value: 'value13',
                label: '选项十三'
            }]
        };
    }

    change(event) {
        console.log('change', event);
    }

    changeAppearance(event) {
        this.data.set('appearance', event.value);
    }
}

```