```san export=preview platform=mobile caption=级联单选-横向tab式

import {Component} from 'san';
import Cascader from '@cosui/cosmic/cascader';
import './size.less'

export default class Demo extends Component {

    static template = `
        <div>
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本用法</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    label="{{label}}"
                    placeholder="{{placeholder}}"
                    direction="{{direction}}"
                    on-open="handleOpen"
                    on-close="handleClose"
                    on-change="handleChange"
                >
                </cos-cascader>
            </div>
            <div>
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">传入预选择值</h4>
                <cos-cascader
                    style="width: 100%"
                    options="{{options}}"
                    title="{{title}}"
                    label="{{label}}"
                    value="{{value}}"
                    placeholder="{{placeholder}}"
                    direction="{{direction}}"
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
            value: 'huawei',
            direction: 'horizontal',
            maxOptions: 10,
            options: [
                {
                    label: '电子产品',
                    value: 'electronics',
                    options: [
                        {
                            label: '手机',
                            value: 'phones',
                            options: [
                                {
                                    label: 'iPhone',
                                    value: 'iphone'
                                },
                                {
                                    label: '华为',
                                    value: 'huawei'
                                },
                                {
                                    label: '小米',
                                    value: 'xiaomi'
                                }
                            ]
                        },
                        {
                            label: '电脑',
                            value: 'computers',
                            options: [
                                {
                                    label: '笔记本',
                                    value: 'laptop'
                                },
                                {
                                    label: '台式机',
                                    value: 'desktop'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '服装',
                    value: 'clothing',
                    options: [
                        {
                            label: '男装',
                            value: 'men',
                            options: [
                                {
                                    label: 'T恤',
                                    value: 'tshirt'
                                },
                                {
                                    label: '裤子',
                                    value: 'pants'
                                }
                            ]
                        },
                        {
                            label: '女装',
                            value: 'women',
                            options: [
                                {
                                    label: '连衣裙',
                                    value: 'dress'
                                },
                                {
                                    label: '上衣',
                                    value: 'top'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '家具',
                    value: 'furniture'
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
    }

}
```
