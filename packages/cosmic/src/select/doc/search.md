```san export=preview platform=mobile caption=搜索选项
import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Switcher from '@cosui/cosmic/switcher';
import Radio from '@cosui/cosmic/radio';
import RadioGroup from '@cosui/cosmic/radio-group';

export default class Demo extends Component {
    static template = `
        <div>
            <p class="cos-color-text-minor">列表样式-单选</p>
            <cos-select
                label="{{label}}"
                title="{{title}}"
                placeholder="{{placeholder}}"
                options="{{options}}"
                appearance="mark"
                show-selected="{{showSelected}}"
                searchable
            >
            </cos-select>
            <p class="cos-color-text-minor">列表样式-多选</p>
            <cos-select
                label="{{label}}"
                title="{{title}}"
                placeholder="{{placeholder}}"
                options="{{options}}"
                appearance="mark"
                show-selected="{{showSelected}}"
                multiple
                searchable
            >
            </cos-select>
            <p class="cos-color-text-minor">标签样式-单选</p>
            <cos-select
                label="{{label}}"
                title="{{title}}"
                placeholder="{{placeholder}}"
                options="{{options}}"
                appearance="tag"
                show-selected="{{showSelected}}"
                searchable
            >
            </cos-select>
            <p class="cos-color-text-minor">标签样式-多选</p>
            <cos-select
                label="{{label}}"
                title="{{title}}"
                placeholder="{{placeholder}}"
                options="{{options}}"
                appearance="tag"
                show-selected="{{showSelected}}"
                multiple
                searchable
            >
            </cos-select>
        </div>
    `;

    static components = {
        'cos-select': Select,
        'cos-switcher': Switcher,
        'cos-radio': Radio,
        'cos-radio-group': RadioGroup,
    };

    initData() {
        return {
            showSelected: true,
            label: '筛选标签',
            title: '标题1',
            placeholder: '未选择前的默认文案',
            options: [{
                label: '分组一',
                value: 'group1',
                options: [{
                    value: 'value1',
                    label: '选项一'
                }, {
                    value: 'value2',
                    label: '选项二',
                    disabled: true
                }, {
                    value: 'value3',
                    label: '选项三'
                }, {
                    value: 'value4',
                    label: '选项四'
                }]
            }, {
                label: '分组二',
                value: 'group2',
                options: [{
                    value: 'value5',
                    label: '选项五',
                }, {
                    value: 'value6',
                    label: '选项六',
                }, {
                    value: 'value7',
                    label: '选项七',
                }]
            }, {
                label: '分组三',
                value: 'group3',
                options: [{
                    value: 'value8',
                    label: '选项八',
                }, {
                    value: 'value9',
                    label: '选项九',
                }, {
                    value: 'value10',
                    label: '选项十',
                }, {
                    value: 'value11',
                    label: '选项十一',
                }, {
                    value: 'value12',
                    label: '选项十二',
                }, {
                    value: 'value13',
                    label: '选项十三',
                }]
            },
            {
                label: '非分组一',
                value: 'nogroup1'
            },
            {
                label: '非分组二',
                value: 'nogroup2'
            },
            {
                label: '非分组三',
                value: 'nogroup3'
            },
            {
                label: '非分组四',
                value: 'nogroup4'
            }]
        }
    }
}
```