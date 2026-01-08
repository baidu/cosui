```san export=preview caption=自定义入口

import {Component} from 'san';
import Cascader from '@cosui/cosmic/cascader';
import Icon from '@cosui/cosmic/icon';

export default class Demo extends Component {

    static template = `
        <div style="height: 210px">
            <cos-cascader
                style="width: 100%"
                options="{{options}}"
                title="{{title}}"
                label="{{label}}"
                placeholder="{{placeholder}}"
                on-open="handleOpen"
                on-close="handleClose"
                on-change="handleChange"
            >
                <cos-icon name="baidu" slot="entry" class="{{value ? 'cos-color-text-primary' : ''}}" />
            </cos-cascader>
        </div>
    `;

    static components = {
        'cos-cascader': Cascader,
        'cos-icon': Icon
    };

    initData() {
        return {
            title: '筛选类型',
            label: '筛选标签',
            placeholder: '请选择',
            options: [
                {
                    label: '1-1-选项一',
                    value: 'v-1-1-选项一',
                    options: [
                        {
                            label: '1-2-选项一',
                            value: 'v-1-2-选项一',
                            options: [
                                {
                                    label: '1-3-选项一',
                                    value: 'v-1-3-选项一'
                                },
                                {
                                    label: '1-3-选项二',
                                    value: 'v-1-3-选项二'
                                }
                            ]
                        },
                        {
                            label: '1-2-选项二',
                            value: 'v-1-2-选项二'
                        },
                        {
                            label: '1-2-选项三',
                            value: 'v-1-2-选项三'
                        }
                    ]
                },
                {
                    label: '2-1-选项二',
                    value: 'v-2-1-选项二',
                    options: [
                        {
                            label: '2-2-选项一',
                            value: 'v-2-2-选项一',
                            options: [
                                {
                                    label: '2-3-选项一',
                                    value: 'v-2-3-选项一'
                                },
                                {
                                    label: '2-3-选项二',
                                    value: 'v-2-3-选项二'
                                }
                            ]
                        },
                        {
                            label: '2-2-选项二',
                            value: 'v-2-2-选项二',
                            disabled: true
                        }
                    ]
                },
                {
                    label: '3-1-选项三',
                    value: 'v-3-1-选项三',
                    options: [
                        {
                            label: '3-2-选项一',
                            value: 'v-3-2-选项一'
                        },
                        {
                            label: '3-2-选项二',
                            value: 'v-3-2-选项二',
                            disabled: true
                        }
                    ]
                },
                {
                    label: '4-1-选项四',
                    value: 'v-4-1-选项四',
                    disabled: true
                },
                {
                    label: '5-1-选项五',
                    value: 'v-5-1-选项五',
                }
            ]
        };
    }

    handleOpen() {
        console.log('open');
    }

    handleClose() {
        console.log('close');
    }

    handleChange(event) {
        console.log('selected value', event.value);
        this.data.set('value', event.value);
    }
}
```
