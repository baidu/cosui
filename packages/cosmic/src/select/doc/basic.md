```san export=preview caption=基础筛选器

import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';

export default class Demo extends Component {

    static template = `
        <div style="height: 325px;">
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">列表样式-单选</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance1}}"
                    options="{{options}}"
                    on-change="change"
                    on-toggle-panel="handleToggle"
                >
                </cos-select>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签样式-单选</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance2}}"
                    options="{{options}}"
                    on-change="change"
                    on-toggle-panel="handleToggle"
                >
                </cos-select>
            </div>
        </div>
    `;

    static components = {
        'cos-select': Select
    };

    initData() {
        return {
            label: '筛选标签',
            title: '标题',
            placeholder: '未选择前的默认文案',
            appearance1: 'mark',
            appearance2: 'tag',
            options: [{
                value: 'value1',
                label: '选项一'
            }, {
                value: 'value2',
                label: '选项二'
            }, {
                value: 'value3',
                label: '选项三'
            }, {
                value: 'value4',
                label: '选项四',
                disabled: true
            }, {
                value: 'value5',
                label: '选项五'
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
                label: '选项九'
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
        console.log('[select] trigger change event', event);
    }

    handleToggle(params) {
        console.log('[select] trigger toggle-panel event', params);
    }
}

```