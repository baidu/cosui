```san export=preview caption=多选筛选器

import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';
import Switcher from '@cosui/cosmic/switcher';
import Input from '@cosui/cosmic/input';

export default class Demo extends Component {

    static template = `
        <div style="height: 505px">
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">列表样式-多选</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance1}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签样式-多选</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance2}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签样式-多选-展示已选项</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance2}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    show-selected="{{showSelected}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">标签样式-多选-设置多选上限</h4>
                <cos-select
                    style="width: 400px"
                    label="{{label}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    appearance="{{appearance2}}"
                    options="{{options}}"
                    multiple="{{multiple}}"
                    max-options="{{max}}"
                    on-change="change"
                >
                </cos-select>
            </div>

            <div class="cos-flex cos-items-center cos-space-mt-xs">
                <label class="cos-color-text-minor cos-font-regular cos-space-mr-lg">多选数量上限（Max Options）: </label>
                <cos-input on-change="changeMaxOptions" size="sm"></cos-input>
            </div>
        </div>
    `;

    static components = {
        'cos-select': Select,
        'cos-input': Input
    };

    initData() {
        return {
            label: '筛选标签',
            title: '标题',
            placeholder: '未选择前的默认文案',
            appearance1: 'mark',
            appearance2: 'tag',
            multiple: true,
            showSelected: true,
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
                label: '选项四'
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

    changeMaxOptions(event) {
        this.data.set('max', Number(event.value));
    }
}

```