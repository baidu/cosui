```san export=preview caption=级联单选-递进展开式

import {Component} from 'san';
import Cascader from '@cosui/cosmic/cascader';

export default class Demo extends Component {

    static template = `
        <div style="height: 330px">
            <div class="cos-space-mb-xxl">
                <h4 class="cos-color-text-minor cos-space-mt-none cos-space-mb-xs cos-font-regular">基本用法</h4>
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
            value: 'pineapple',
            options: [
                {
                    label: '水果',
                    value: 'fruits',
                    options: [
                        {
                            label: '热带水果',
                            value: 'tropical',
                            options: [
                                {
                                    label: '芒果',
                                    value: 'mango'
                                },
                                {
                                    label: '香蕉',
                                    value: 'banana'
                                },
                                {
                                    label: '菠萝',
                                    value: 'pineapple'
                                }
                            ]
                        },
                        {
                            label: '柑橘类',
                            value: 'citrus',
                            options: [
                                {
                                    label: '橙子',
                                    value: 'orange'
                                },
                                {
                                    label: '柠檬',
                                    value: 'lemon'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '蔬菜',
                    value: 'vegetables',
                    options: [
                        {
                            label: '根茎类',
                            value: 'roots',
                            options: [
                                {
                                    label: '土豆',
                                    value: 'potato'
                                },
                                {
                                    label: '胡萝卜',
                                    value: 'carrot'
                                }
                            ]
                        },
                        {
                            label: '叶菜类',
                            value: 'leafy',
                            options: [
                                {
                                    label: '生菜',
                                    value: 'lettuce'
                                },
                                {
                                    label: '菠菜',
                                    value: 'spinach',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '肉类',
                    value: 'meat',
                    options: [
                        {
                            label: '禽类',
                            value: 'poultry',
                            options: [
                                {
                                    label: '鸡肉',
                                    value: 'chicken'
                                },
                                {
                                    label: '鸭肉',
                                    value: 'duck'
                                }
                            ]
                        },
                        {
                            label: '红肉',
                            value: 'red',
                            disabled: true
                        }
                    ]
                },
                {
                    label: '海鲜',
                    value: 'seafood'
                },
                {
                    label: '蛋糕',
                    value: 'cake',
                    disabled: true
                }
            ]
        };
    }

    handleOpen() {
        console.log('handleOpen');
    }

    handleClose() {
        console.log('handleClose');
    }

    handleChange(event) {
        console.log('selected value', event.value);
    }
}
```