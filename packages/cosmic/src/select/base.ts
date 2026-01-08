/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * @file Select Base
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import Checkbox from '@cosui/cosmic/checkbox';
import Toast from '@cosui/cosmic/toast';
import Option from './option';
import type {
    SelectProps,
    SelectEvents,
    OptionItem,
    SelectData,
    SearchOptionItem,
    SelectMethods
} from './interface';

export default class Base extends Component<SelectData> implements SelectMethods {
    static computed = {
        /**
         * 全选状态，仅多选 mark 视觉风格展示
         */
        selectAllParams(this: Base): {checked: boolean, indeterminate: boolean} {
            const options = this.data.get('options');
            let optionsLength = 0;

            // 遍历每一项处理可能会有的分组
            options.forEach((option: OptionItem) => {
                optionsLength += option.options ? option.options.length : 1;
            });

            const preSelectedLength = this.data.get('_preSelectOptions').length;

            const checked = preSelectedLength === optionsLength;
            const indeterminate = preSelectedLength > 0 && preSelectedLength < optionsLength;

            return {
                checked,
                indeterminate
            };
        },
        /**
         * 多选，选项限制+预选项展示
         */
        multiHelpText(this: Base) {
            let text = [];
            const maxOptions = this.data.get('maxOptions');
            if (maxOptions) {
                text.push(`最多选 ${maxOptions} 项`);
            }

            const showSelected = this.data.get('showSelected');
            if (showSelected) {
                const selectedOptions = this.data.get('_preSelectOptions');
                const labels = selectedOptions.map((option: OptionItem) => option.label || option.value).join('、');
                text.push(`已选：${labels}`);
            }
            return text.join(' | ');
        },
        // 搜索命中的结果
        searchResult(this: Base) {
            const options = this.data.get('options');
            const searchValue = this.data.get('_searchValue');
            let result: SearchOptionItem[] = [];
            // 递归遍历option，获取所有叶子结点，并记录其节点路径
            const findLeafSearchOption = (options: OptionItem[], indexPath: number[] = []) => {
                for (let i = 0; i <= options.length; i++) {
                    let childrenOptions = options[i]?.options;
                    let label = options[i]?.label;
                    let newIndexPath = [...indexPath, i];
                    if (childrenOptions && Array.isArray(childrenOptions)) {
                        findLeafSearchOption(childrenOptions, newIndexPath);
                        continue;
                    }
                    if (label && label.includes(searchValue)) {
                        result.push({...options[i], indexPath: newIndexPath});
                    }
                }
            };
            findLeafSearchOption(options);
            return result;
        }
    };

    static components = {
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-checkbox': Checkbox,
        'cos-toast': Toast,
        'option': Option
    };

    openTimer: null | ReturnType<typeof setTimeout>;

    initData(): SelectProps {
        return {
            value: '',
            label: '',
            title: '',
            placeholder: '',
            options: [],
            appearance: 'mark',
            multiple: false,
            maxOptions: undefined,
            showSelected: false,
            searchable: false,
            _searchValue: '',
            _searching: false,
            _openPanel: false,
            // 多选时预选项
            _preSelectOptions: [],
            // 已选择项
            _selectedOptions: [],
            _listPaddingBottom: 0
        };
    }

    inited(): void {
        // 获取 value 对应的 option
        const selectedOptions = this.initOptions();
        this.data.set('_selectedOptions', selectedOptions);
    }

    created(): void {
        this.watch('value', () => {
            this.data.set('_selectedOptions', this.initOptions());
        });
    }

    detached(): void {
        this.openTimer && clearTimeout(this.openTimer);
        this.openTimer = null;
        this.data.set('_preSelectOptions', []);
        this.data.set('_selectedOptions', []);
    }

    // pc
    closePanel() {
        this.fire<SelectEvents['toggle-panel']>('toggle-panel', {
            open: false
        });
    }

    // mobile
    setListPaddingBottom() {}

    /**
     * 切换筛选项面板状态
     */
    togglePanel(): void {
        const openPanel = this.data.get('_openPanel');

        if (openPanel) {
            this.data.set('_openPanel', false);
            return;
        }

        this.fire<SelectEvents['toggle-panel']>('toggle-panel', {
            open: true
        });

        // 打开面板时，根据 values 初始化 options 选中状态

        const selectedOptions = this.initOptions();
        this.data.set('_selectedOptions', selectedOptions);
        if (!selectedOptions.length) {
            this.data.set('_openPanel', true);
            this.nextTick(() => {
                this.setListPaddingBottom();
            });
            return;
        }

        // 找到第一个被选中的 option，滚动到可视区域
        const targetValue = selectedOptions[0].value;
        const options = this.data.get('options');

        let currentIndex = 0;
        let index = -1;
        for (const option of options) {
            if (Array.isArray(option.options)) {
                for (const subOption of option.options) {
                    if (subOption.value === targetValue) {
                        index = currentIndex;
                        break;
                    }
                    currentIndex++;
                }
            }
            else {
                if (option.value === targetValue) {
                    index = currentIndex;
                    break;
                }
                currentIndex++;
            }
            if (index !== -1) {
                break;
            };
        }

        // 这里用 nextTick 会出现 conatinerNode 还没有渲染出来的情况，因此使用定时器
        this.openTimer = setTimeout(() => {
            this.scrollToIndex(index);
            this.setListPaddingBottom();
        }, 30);

        this.data.set('_openPanel', true);
    }

    /**
     * 初始化 options 的选中状态
     */
    initOptions() {
        let values = this.data.get('value');
        if (!Array.isArray(values)) {
            values = [values];
        }

        // 根据给定的 value 初始化 options 的选中状态
        const options = this.data.get('options');
        const selectedOptions: OptionItem[] = [];
        options.forEach((option: OptionItem, index: number) => {
            if (Array.isArray(option.options)) {
                option.options.forEach((subOption: OptionItem, subIndex: number) => {
                    const isChecked = values.includes(subOption.value);
                    this.data.set(`options[${index}].options[${subIndex}].checked`, isChecked);
                    isChecked && selectedOptions.push(subOption);
                });
            }
            else {
                const isChecked = values.includes(option.value);
                this.data.set(`options[${index}].checked`, isChecked);
                isChecked && selectedOptions.push(option);
            }
        });

        if (this.data.get('multiple')) {
            this.data.set('_preSelectOptions', selectedOptions);
        }

        return selectedOptions;
    }

    /**
     * 选择筛选项
     */
    selectOption(index: number, subIndex: number, option: OptionItem, event: Event) {
        if (option.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (this.data.get('multiple')) {
            this.multiSelectOption(index, subIndex, option, event);
            return;
        }

        // 单选
        if (subIndex || subIndex === 0) {
            this.data.set(`options[${index}].options[${subIndex}].checked`, true);
        }
        else {
            this.data.set(`options[${index}].checked`, true);
        }
        this.data.set('_selectedOptions', [option]);
        this.data.set('value', option.value);
        this.fire<SelectEvents['change']>('change', {
            event,
            value: option.value
        });
        this.data.set('_openPanel', false);
    }

    /**
     * 多选选择筛选项
     */
    multiSelectOption(index: number, subIndex: number, option: OptionItem, event: Event) {
        let checked = true;
        const maxOptions = this.data.get('maxOptions');
        const selectedOptions = this.data.get('_preSelectOptions');
        const selectedIndex = selectedOptions.findIndex((item: OptionItem) => item.value === option.value);
        if (selectedIndex !== -1) {
            // 把已经选中的筛选项移除
            selectedOptions.splice(selectedIndex, 1);
            checked = false;
        }
        else if (maxOptions && selectedOptions.length >= maxOptions) {
            Toast.show({
                message: '最多可选' + maxOptions + '项',
                size: 'md'
            });
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        option.checked = checked;

        if (subIndex || subIndex === 0) {
            this.data.set(`options[${index}].options[${subIndex}]`, JSON.parse(JSON.stringify(option)));
        }
        else {
            this.data.set(`options[${index}]`, JSON.parse(JSON.stringify(option)));
        }

        checked && selectedOptions.push(option);

        this.data.set('_preSelectOptions', [].concat(selectedOptions));
        if (this.data.get('showSelected')) {
            this.nextTick(() => {
                this.setListPaddingBottom();
            });
        }
    }

    /**
     * 多选点击全选
     */
    multiSelectAllClicked(event: Event) {
        const maxOptions = this.data.get('maxOptions');
        const options = this.data.get('options');
        if (maxOptions) {
            // 计算所有 options 的长度
            let optionsLength = options.length;
            options.forEach((option: OptionItem) => {
                if (Array.isArray(option.options)) {
                    optionsLength += option.options.length;
                }
            });

            if (optionsLength >= maxOptions) {
                Toast.show({
                    message: '最多可选' + maxOptions + '项',
                    size: 'md'
                });
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    }

    /**
     * 多选全选状态改变
     */
    multiSelectAllChanged(event: {event: Event, checked: boolean}) {
        const options = this.data.get('options');
        const result: OptionItem[] = [];
        options.forEach((option: OptionItem, index: number) => {
            this.data.set(`options[${index}].checked`, event.checked);
            event.checked && result.push(option);
            if (Array.isArray(option.options)) {
                option.options.forEach((subOption: OptionItem, subIndex: number) => {
                    this.data.set(`options[${index}].options[${subIndex}].checked`, event.checked);
                    event.checked && result.push(subOption);
                });
            }
        });
        this.data.set('_preSelectOptions', result);

        if (this.data.get('showSelected')) {
            this.nextTick(() => {
                this.setListPaddingBottom();
            });
        }
    }

    /**
     * 多选重置
     */
    multiReset() {
        // 重置到本次选择的初始状态，而非情况所有选项
        this.initOptions();
    }

    /**
     * 多选确认
     */
    multiConfirm(event: Event) {
        // 更新 _selectedOptions 和 values 并派发 change 事件
        const preSelectOptions = this.data.get('_preSelectOptions');
        this.data.set('_selectedOptions', preSelectOptions);
        const selectedValues = preSelectOptions.map((item: OptionItem) => item.value);
        this.data.set('value', selectedValues);

        this.fire<SelectEvents['change']>('change', {
            event,
            value: selectedValues
        });

        this.data.set('_openPanel', false);
    }

    /**
     * 滚动列表滚动到某个选项
     */
    scrollToIndex(index: number): void {
        const containerNode = this.ref('selectList') as unknown as HTMLElement;
        if (containerNode?.parentElement && containerNode.children?.[index]) {
            const selectedNode = containerNode.children[index] as HTMLElement;
            const bounding = selectedNode.getBoundingClientRect();

            // 判断元素是否在可视区域内
            const isFullyVisible = (
                bounding.top >= 0
                && bounding.left >= 0
                && bounding.bottom <= window.innerHeight
                && bounding.right <= window.innerWidth
            );
            // 元素不在可视区域内，平滑滚动到该元素
            if (!isFullyVisible) {
                selectedNode.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }
}
