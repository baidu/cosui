```san export=preview caption=自定义入口
import {Component} from 'san';
import Select from '@cosui/cosmic/select';
import Icon from '@cosui/cosmic/icon';

export default class Demo extends Component {
    static template = `
        <div style="height: 260px;">
            <div>
                <p class="cos-space-mt-xs --cos-text-body-lg cos-color-text-minor">图标入口</p>
                <cos-select title="{{title}}" options="{{options}}" on-change="handleChange1">
                    <cos-icon name="baidu" slot="entry" class="{{value1 ? 'cos-color-text-primary' : ''}}" />
                </cos-select>
            </div>

            <div>
                <p class="cos-space-mt-xs --cos-text-body-lg cos-color-text-minor">文字入口（弹窗/下拉内容仅示例，业务可自定义）</p>
                <cos-select
                    label="{{label}}"
                    title="{{title}}"
                    value="{{value2}}"
                    options="{{options}}"
                    on-change="handleChange2"
                    on-toggle-panel="handleToggle"
                >
                    <div slot="entry">
                        <span>{{value2 ? getSelectedLabel(value2) : label}}</span>
                        <cos-icon name="{{openPanel ? 'up' : 'down'}}" />
                    </div>
                </cos-select>
            </div>
        </div>
    `;

    static components = {
        'cos-select': Select,
        'cos-icon': Icon
    };

    initData() {
        return {
            label: '请选择',
            title: '自定义入口',
            value1: '',
            value2: '',
            openPanel: false,
            options: [{
                label: '选项1',
                value: 'option1'
            }, {
                label: '选项2',
                value: 'option2',
                disabled: true
            }, {
                label: '选项3',
                value: 'option3'
            }, {
                label: '选项4',
                value: 'option4'
            }]
        }
    }

    getSelectedLabel(value) {
        const option = this.data.get('options').find(opt => opt.value === value);
        return option ? option.label : this.data.get('label');
    }

    handleChange1(event) {
        this.data.set('value1', event.value);
    }

    handleChange2(event) {
        this.data.set('value2', event.value);
        this.data.set('openPanel', false);
    }

    handleToggle(event) {
        this.data.set('openPanel', event.open);
    }
}
```