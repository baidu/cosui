```san export=preview platform=mobile caption=高级搜索

import {Component} from 'san';
import Cascader from '@cosui/cosmic/cascader';

export default class Demo extends Component {

    static template = `
        <div>
            <div class="cos-space-mb-xs">
                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">基本单选-搜索</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    label="{{label}}"
                    placeholder="{{placeholder}}"
                    searchable
                    on-open="handleOpen"
                    on-close="handleClose"
                    on-change="handleChange"
                >
                </cos-cascader>
            </div>
            <div class="cos-space-mb-xs">
                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">横向tab-搜索</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    direction="{{direction}}"
                    searchable
                    on-open="handleOpen"
                    on-close="handleClose"
                    on-change="handleChange"
                >
                </cos-cascader>
            </div>
            <div class="cos-space-mb-xs">
                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">级联多选-搜索</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    searchable
                    multiple
                    on-open="handleOpen"
                    on-close="handleClose"
                    on-change="handleChange"
                >
                </cos-cascader>
            </div>
            <div class="cos-space-mb-xs">
                <h4 class="cos-color-text-minor cos-space-mb-xs cos-font-regular">级联多选最大限制5项-搜索</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    placeholder="{{placeholder}}"
                    searchable
                    multiple
                    maxOptions="{{5}}"
                    on-open="handleOpen"
                    on-close="handleClose"
                    on-change="handleChange"
                >
                </cos-cascader>
            </div>
        </div>
    `;

    static components = {
        'cos-cascader': Cascader
    };

    initData() {
        return {
            title: '筛选类型',
            label: '筛选标签',
            placeholder: '请选择',
            value: 'v-1-3-选项一',
            direction: 'horizontal',
            maxOptions: 10,
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
                    label: '5-1-选项三',
                    value: 'v-5-1-选项三',
                    options: [
                        {
                            label: '5-2-选项一',
                            value: 'v-5-2-选项一'
                        }
                    ]
                },
                {
                    label: '6-1-选项三',
                    value: 'v-6-1-选项三',
                    options: [
                        {
                            label: '6-2-选项一',
                            value: 'v-6-2-选项一'
                        }
                    ]
                },
                {
                    label: '7-1-选项三',
                    value: 'v-7-1-选项三',
                    options: [
                        {
                            label: '7-2-选项一',
                            value: 'v-7-2-选项一'
                        }
                    ]
                },
                {
                    label: '8-1-选项四',
                    value: 'v-8-1-选项四'
                },
                {
                    label: '9-1-选项四',
                    value: 'v-9-1-选项四'
                },
                {
                    label: '10-1-选项四',
                    value: 'v-10-1-选项四'
                },
            ],
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
    }

}
```