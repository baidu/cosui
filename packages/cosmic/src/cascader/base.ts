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
 * @file Cascader 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import Checkbox from '@cosui/cosmic/checkbox';
import Toast from '@cosui/cosmic/toast';
import SelectedTags from '../common/selected-tags';
import OptionComponent from './option';
import {getSelectedOptions, findIndex, findOption, getLeafOptions} from './utils';
import type {CascaderProps, Option, CascaderData, CascaderEvents} from './interface';

export default class Cascader extends Component<CascaderData> {
    static components = {
        'cos-icon': Icon,
        'cos-button': Button,
        'cos-checkbox': Checkbox,
        'cos-toast': Toast,
        'cos-selected-tags': SelectedTags,
        'cos-option': OptionComponent
    };

    static computed = {

        /**
         * 多选状态下，预选择数量
         */
        preSelectedOptionsCnt(this: Cascader) {
            const selectedPath = this.data.get('_selectedPath') as Option[][];
            if (!selectedPath || !Array.isArray(selectedPath)) {
                return 0;
            }

            const countedLeafNodes = new Set<string>();
            let preSelectedOptionsCnt = 0;

            // 遍历所有层级
            selectedPath.forEach((layerOptions: Option[]) => {
                if (layerOptions && Array.isArray(layerOptions)) {
                    // 遍历当前层的所有选项
                    for (const option of layerOptions) {
                        // 只计算叶子节点（没有子选项的节点）
                        if (option.checked && (!option.options || option.options?.length === 0)) {
                            // 确保不重复计算
                            if (!countedLeafNodes.has(option.value)) {
                                countedLeafNodes.add(option.value);
                                preSelectedOptionsCnt++;
                            }
                        }
                    }
                }
            });

            return preSelectedOptionsCnt;
        },

        /**
         * 选中叶子结点，用于回填
         */
        _selectedTags(this: Cascader) {
            const selectedOptions = this.data.get('_selectedOptions');
            if (!selectedOptions || selectedOptions.length === 0) {
                return null;
            }

            return selectedOptions.map((option: Option) => {
                return {
                    label: option._labelPath.join('/'),
                    value: option.value
                };
            });
        },

        /**
         * 将 Cascader 组件的选项数组的叶子结点
         *
         * @param this Cascader 组件实例
         * @returns 叶子结点数组
         */
        _leafOptions(this: Cascader) {
            let options = this.data.get('options');
            return getLeafOptions(options);
        }
    };

    initData(): CascaderProps {
        return {
            value: '',
            label: '',
            title: '',
            placeholder: '',
            options: [],
            maxOptions: undefined,
            direction: 'vertical',
            multiple: false,
            searchable: false,
            _open: false,
            _selectedPath: [],
            // 展现的选项列表
            _optionsList: [],
            _listPaddingBottom: 0,
            _currentLayer: 0,
            _selectedLabels: [],
            // 每一层的选中索引
            _activityValues: [],
            _value: [],
            _selectAll: [],
            _selectedOptions: [],
            _searching: false,
            _searchValue: ''
        };
    }

    inited() {
        this.handleOptionsChange();
    }

    created() {
        this.watch('value', this.initSelectedOptions);
        this.watch('_selectedPath', this.buildOptionsList);
        // options 变化时，重新构建选项列表
        this.watch('options', this.handleOptionsChange);
    }

    detached() {
        this.data.set('_selectedPath', []);
        this.data.set('_selectedLabels', []);
    }

    handleOptionsChange() {
        this.addOptionPath();
        this.initSelectedOptions(false);
        this.buildOptionsList();
    }

    /**
     * 初始化选项
     */
    initSelectedOptions(forceUpdate: boolean = true) {
        let values = this.data.get('value') || [];
        values = Array.isArray(values) ? values : [values];
        this.data.set('_value', values);

        // 如果值为空，且不强制更新，直接返回
        // 强制更新用于处理 value 变为空时，已选路径不更新的问题
        if (!values?.length && !forceUpdate) {
            return;
        }

        const options = this.data.get('options');
        const multiple = this.data.get('multiple') || false;
        const activityValues: string[] = [];
        let {selectedPath = [], selectedLabels} = getSelectedOptions(multiple, options, values, []);

        if (!selectedPath?.length) {
            return;
        }

        // 单选处理
        if (!multiple) {
            for (let i = 0; i < selectedPath.length; i++) {
                this.updateOptionChecks([(selectedPath[i] as Option)]);
                activityValues[i] = (selectedPath[i] as Option).value;
            }
            this.data.set('_activityValues', activityValues);
            this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
            this.data.set('_currentLayer', selectedPath.length - 1);
            this.data.set('_selectedLabels', selectedLabels || values);
            const selectedOptions = selectedPath[selectedPath.length  - 1];
            this.data.set('_selectedOptions', Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]);
            return;
        }

        // 多选处理
        for (let i = 0; i < selectedPath.length; i++) {
            const currentSelected = selectedPath[i] as Option[];
            if (!currentSelected) {
                continue;
            }

            // 第一层: 取第一个选项作为展开项
            if (i === 0) {
                activityValues.push(currentSelected[0]?.value);
                continue;
            }
            // 第二/三层: 取上一层的选中的第一个子选项作为展开项
            const lastSelected = selectedPath[i - 1] as Option[];
            const lastOption = lastSelected.filter((item: Option) => item.value === activityValues[i - 1])[0];
            const currentSelectedValue = (selectedPath[i] as Option[]).map((item: Option) => item.value);
            let firstOption = null;
            lastOption?.options?.forEach((item: Option) => {
                if (currentSelectedValue.includes(item.value)) {
                    firstOption = item;
                    return;
                }
            });
            if (!firstOption) {
                continue;
            }
            activityValues[i] = (firstOption as Option).value;
        }
        this.data.set('_activityValues', activityValues);

        // 从后往前遍历
        for (let i = selectedPath.length - 1; i >= 0; i--) {
            const currentSelected = selectedPath[i] as Option[];
            if (i === selectedPath.length - 1) {
                currentSelected.forEach(item => {
                    this.updateOptionChecks([item]);
                });
                continue;
            }

            const nextSelected = selectedPath[i + 1] as Option[];
            const nextSelectedValues = nextSelected.map(item => item.value);
            currentSelected.forEach(item => {
                // 叶子节点
                if (!item.options || item.options.length === 0) {
                    this.updateOptionChecks([item]);
                    return;
                }

                const children = item.options.filter(subItem => !subItem.disabled);
                // 判断子节点是否被选中（选中在 selectedPath 中能找到）
                const hasSelectedChildren = children.some(child => nextSelectedValues.includes(child.value));
                if (hasSelectedChildren) {
                    // 判断子节点是否都被选中（都能在 selectedPath 中找到）
                    const allSelected = children.every(child => nextSelectedValues.includes(child.value));
                    this.updateOptionChecks([item], activityValues.includes(item.value), !allSelected, allSelected);
                }
            });
        }

        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
        this.data.set('_currentLayer', selectedPath.length === 1 ? 0 : Math.max(0, selectedPath.length - 1));
        this.data.set('_selectedLabels', selectedLabels || values);

        const selectedOptions = selectedPath[selectedPath.length  - 1];
        this.data.set('_selectedOptions', Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]);

    }

    /**
     * 多选点击，即全选所有子级
     * @param option 选中项
     * @param layer 当前层级
     * @param event 事件对象
     */
    handleMultiSelectAllChanged(
        option: Option,
        layer: number,
        event: {event: Event, checked: boolean}
    ) {
        // 没有子级则直接返回，其状态在 handledSelect 已处理
        if (!option.options) {
            return;
        }

        const {checked} = event;
        const selectedPath = this.data.get('_selectedPath') as Option[][];

        const currentOption = findOption(layer, option.value, selectedPath);
        if (!currentOption) {
            return;
        }
        // 修改当前选项状态
        currentOption.allChecked = checked;
        currentOption.preChecked = false;

        // 获取当前选项的子选项
        const childrenOptions = currentOption.options?.filter((item: Option) => !item.disabled);
        if (!childrenOptions) {
            return;
        }

        if (checked && layer < 2) {
            if (!selectedPath[layer + 1]) {
                selectedPath[layer + 1] = [];
            }

            // 避免修改原 childrenOptions
            const copyOption = JSON.parse(JSON.stringify(childrenOptions));
            // 将子选项添加到selectedPath[layer + 1]，避免重复添加
            const existingValues = new Set(selectedPath[layer + 1].map(item => item.value));
            // 过滤掉已存在的选项，只添加不存在的
            const newOptions = copyOption.filter((opt: Option) => !existingValues.has(opt.value));
            selectedPath[layer + 1] = [...selectedPath[layer + 1], ...newOptions];

            // 递归添加所有子孙节点
            this.addAllChildrenToPath(copyOption, selectedPath, layer + 1);
        }

        const activityValues = this.data.get('_activityValues') || [];
        // 更新所有子孙节点
        this.updateChildStatus(checked, layer, option, selectedPath);
        // 更新当前选项的兄弟节点状态
        this.updateSiblingStatus(option, activityValues, selectedPath, layer);
        // 更新当前选项的父节点状态
        this.updateParentStatus(layer, activityValues, selectedPath);
        this.data.set('_currentLayer', layer + 1);
        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
    }

    /**
     * 构建选项列表，依赖选择路径
     */
    buildOptionsList() {
        const selectedPath = this.data.get('_selectedPath');
        const currentLayer = this.data.get('_currentLayer');
        const activityValues: string[] = this.data.get('_activityValues') || [];
        const optionsList: Option[][] = [];

        for (let i = 0; i <= currentLayer; i++) {
            let curOptions = undefined;
            if (i === 0) {
                curOptions = this.data.get('options');
            }
            else {
                // 获取上一层的选中项
                const preSelected = selectedPath[i - 1];
                // 获取上一层的选中索引
                const preSelectedIndex = activityValues[i - 1];
                if (Array.isArray(preSelected)) {
                    // 获取上一层选中项的 value
                    const selectedValue = preSelectedIndex;

                    // 通过 value 查找选中项
                    const selectedOption = preSelected.find(item => item.value === selectedValue);
                    if (selectedOption) {
                        curOptions = selectedOption.options as Option[];
                    }
                }
                else {
                    // 单选情况
                    curOptions = preSelected.options;
                }
            }

            if (!Array.isArray(curOptions)) {
                break;
            }

            const copiedOptions = JSON.parse(JSON.stringify(curOptions));
            copiedOptions.forEach((option: Option) => {
                const selectedOptions = Array.isArray(selectedPath[i]) ? selectedPath[i] : [selectedPath[i]];
                (selectedOptions as Option[]).forEach((item: Option) => {
                    if (item && option.value === item.value) {
                        this.updateOptionChecks([option], !!item.checked, !!item.preChecked, !!item.allChecked);
                    }
                });
            });
            optionsList[i] = copiedOptions;
        }

        this.data.set('_optionsList', optionsList);
        return optionsList;
    }

    /**
     * 更新选择状态
     * 默认更新为待选中状态
     */
    updateOptionChecks(
        options: Option[],
        checked: boolean = true,
        preChecked: boolean = false,
        allChecked: boolean = false
    ) {
        options && options.forEach(option => {
            option.checked = checked;
            option.preChecked = preChecked;
            option.allChecked = allChecked;
        });
    };

    /**
     * 设置 list 区域距离底部高度，展示多选按钮区域
     * 在 mobile 中实现
     */
    setListPaddingBottom() {}

    /**
     * 选中项未暴露时，滚动至其暴露
     * 在 pc 和 mobile 中分别实现
     */
    scrollToSelectedOptions() {}

    /**
     * 面板点击事件处理
     */
    handleClick() {
        const openPanel = this.data.get('_open');
        if (!openPanel) {
            this.fire('open');
        }

        this.data.set('_open', true);

        this.nextTick(() => {
            this.setListPaddingBottom();
            this.scrollToSelectedOptions();
        });
    }

    /**
     * tab 展开式 - tab 点击事件
     */
    handleSelectTab(index: number) {
        this.data.set('_currentLayer', index);
    }

    /**
     * 面板关闭事件处理
     */
    handleClose() {
        this.data.set('_open', false);

        this.fire('close');

        const selectedPath = this.data.get('_selectedPath');
        const currentLayer = selectedPath.length - 1;
        this.data.set('_currentLayer', currentLayer > 0 ? currentLayer : 0);
    }

    /**
     * 选项点击方法，包含单选与多选处理
     */
    handleSelect(index: number, option: Option, layer: number, event: Event) {
        if (option.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        // 多选
        if (this.data.get('multiple')) {
            this.handleMultiSelect(option, layer, event);
            return;
        }

        // 单选
        const selectedPath = this.data.get('_selectedPath');
        // 每一层只能有一个选中项，因此直接替换当前层级的选项
        selectedPath[layer] = {
            ...option,
            checked: true
        };
        // 因为选择了新路径，需要删除后续层级的选项
        selectedPath.length = layer + 1;

        // 非叶子节点层级递增，到达叶子节点后关闭面板，记录筛选值
        if (option.options) {
            this.data.set('_currentLayer', layer + 1);
        }
        else {
            this.handleClose();
            this.data.set('_selectedLabels', [option.label || option.value]);
            this.data.set('_selectedOptions', [option]);

            this.fire<CascaderEvents['change']>('change', option);
        }

        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
    }

    /**
     * 递归地将所有子孙节点添加到 selectedPath 中
     * @param options 当前层级的选项
     * @param selectedPath 选中路径
     * @param layer 当前层级
     */
    addAllChildrenToPath(options: Option[], selectedPath: Option[][], layer: number) {
        // 防止递归过深
        if (layer >= 2) {
            return;
        }

        // 确保下一层存在
        if (!selectedPath[layer + 1]) {
            selectedPath[layer + 1] = [];
        }

        // 遍历当前层级的所有选项
        for (const option of options) {
            // 如果选项有子节点
            if (option.options && option.options.length > 0) {
                // 确保下一层存在
                if (!selectedPath[layer + 1]) {
                    selectedPath[layer + 1] = [];
                }

                // 将子节点添加到下一层
                const childOptions = JSON.parse(JSON.stringify(option.options));
                // 去重处理
                const existingValues = new Set(selectedPath[layer + 1].map(item => item.value));
                const newOptions = childOptions.filter((opt: Option) => !existingValues.has(opt.value));
                // 添加新选项
                if (newOptions.length > 0) {
                    selectedPath[layer + 1] = [...selectedPath[layer + 1], ...newOptions];
                    // 递归处理下一层
                    this.addAllChildrenToPath(newOptions, selectedPath, layer + 1);
                }
            }
        }
    }

    /**
     * 从 selectedPath 找到当前选中项的子节点
     * @param option 当前选中项
     * @param layer 当前层级
     * @param selectedPath 选中路径
     * @return 子节点数组
     */
    findChildrenOptions(option: Option, layer: number, selectedPath: Option[][] | Option[]): Option[] {
        if (layer >= 2 || !option.options || option.options?.length === 0) {
            return [];
        }

        // 如果下一层不存在，返回空数组
        if (!selectedPath[layer + 1] || !Array.isArray(selectedPath[layer + 1])) {
            return [];
        }

        // 获取子节点的值列表
        const childValues = option?.options?.map((item: Option) => item.value);

        // 从 selectedPath 中找到当前选中项的子节点
        // 子节点必须在当前选中项的 options 中存在
        const nextLayerOptions = selectedPath[layer + 1] as Option[];
        const childOptions: Option[] = [];

        for (const item of nextLayerOptions) {
            if (childValues.includes(item.value) && !item.disabled) {
                childOptions.push(item);
            }
        }
        return childOptions;
    }

    /**
     * 更新子节点及其所有子孙节点的状态
     * @param children 子节点数组
     * @param checked 是否选中
     * @return 更新后的子节点数组
     */
    updateChildStatus(checked: boolean, layer: number, option: Option, selectedPath: Option[][] | Option[]) {
        const children = this.findChildrenOptions(option, layer, selectedPath);

        if (!children || children.length === 0) {
            return;
        }

        children.forEach(child => {
            // 判断是否为叶子节点
            const isLeafNode = !child.options || child.options.length === 0;
            if (isLeafNode) {
                // 叶子节点只需要更新checked状态
                child.checked = checked;
            }
            else {
                // 非叶子节点更新allChecked和preChecked状态
                child.allChecked = checked;
                child.preChecked = false; // 无论是选中还是取消选中，preChecked都设为false
            }

            // 如果子节点还有子节点，递归更新
            if (child.options && child.options.length > 0) {
                // 递归更新子节点的子节点
                this.updateChildStatus(checked, layer + 1, child, selectedPath);
            }
        });
    }

    /**
     * 基于其子节点的选中状态，更新指定层级选项的状态（父级、兄弟）
     * @param targetLayer 要更新状态的层级
     * @param childLayer 子节点所在的层级
     * @param selectedPath 选中路径
     * @param excludeValue 需要排除的选项值（用于兄弟节点更新时排除当前选中项）
     */
    updateLayerStatus(
        targetLayer: number,
        childLayer: number,
        selectedPath: Option[][],
        excludeValue?: string
    ) {
        const optionsList = this.data.get('_optionsList');
        const targetOptions = optionsList[targetLayer];

        if (!targetOptions?.length) {
            return;
        }

        // 过滤掉需要排除的选项（用于兄弟节点场景）
        const optionsToUpdate = excludeValue
            ? targetOptions.filter((item: Option) => item.value !== excludeValue)
            : targetOptions;

        optionsToUpdate.forEach((option: Option) => {
            if (!option.options?.length) {
                return;
            }

            // 计算全选和半选的子节点数量
            let allSelectedCount = 0;
            let preSelectedCount = 0;

            option.options.forEach((opt: Option) => {
                // 查看当前节点的子节点的选中状态
                const computedOption = selectedPath[childLayer]
                    ?.filter((item: Option) => item.value === opt.value)?.[0];

                // 子节点在 selectedPath 找不到，则没有选中
                if (!computedOption) {
                    return;
                }

                // 非叶子节点
                if (opt.options && opt.options.length > 0) {
                    // 全选状态
                    if (computedOption.allChecked) {
                        allSelectedCount++;
                    }
                    // 半选状态
                    else if (computedOption.preChecked) {
                        preSelectedCount++;
                    }
                }
                // 叶子节点
                else {
                    if (computedOption.checked) {
                        allSelectedCount++;
                    }
                }
            });

            const optionOptionsLen = option.options.length;
            // 总选中数 = 全选数 + 半选数
            const selectedCount = allSelectedCount + preSelectedCount;
            // 如果所有子节点都是全选状态，则父节点也是全选
            const allChildrenSelected = allSelectedCount === optionOptionsLen;
            // 如果有任何子节点被选中（全选或半选）
            const hasSelectedChildren = !allChildrenSelected && selectedCount > 0;

            const existingItemIndex = findIndex(option.value, selectedPath[targetLayer]);

            // 选项不存在，则插入
            if (existingItemIndex === -1) {
                selectedPath[targetLayer].push({
                    ...option,
                    allChecked: !!allChildrenSelected,
                    preChecked: !!hasSelectedChildren
                });
            }
            else {
                const setOption = selectedPath[targetLayer][existingItemIndex];
                setOption.allChecked = !!allChildrenSelected;
                setOption.preChecked = !!hasSelectedChildren;
            }
        });

        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
    }

    updateSiblingStatus(option: Option, activityValues: string[], selectedPath: Option[][], currentLayer: number) {
        // 更新当前层级的兄弟节点状态，排除当前选中的节点
        this.updateLayerStatus(currentLayer, currentLayer + 1, selectedPath, option.value);
    }

    /**
     * 更新上层节点状态
     * @param currentLayer 当前层级
     * @param activityValues 活动路径
     * @param selectedPath 选中路径
     */
    updateParentStatus(currentLayer: number, activityValues: string[], selectedPath: Option[][]) {
        if (currentLayer <= 0) {
            return;
        }

        const lastSelectedValue = activityValues[currentLayer - 1];
        // 获取当前层级对应的上一层选项
        const parentOption = findOption(currentLayer - 1, lastSelectedValue, selectedPath);
        if (!parentOption || !parentOption.options || parentOption.options.length <= 0) {
            return;
        }

        // 更新上一层级的状态
        this.updateLayerStatus(currentLayer - 1, currentLayer, selectedPath);

        // 递归更新上一层
        this.updateParentStatus(currentLayer - 1, activityValues, selectedPath);
    }

    /**
     * 更新当前层选项 checked 状态
     * @param layer 当前层
     * @param currOption 当前选中项
     * @param selectedPath 选中路径
     */
    updateCurrentLayerOptions(layer: number, currOption: Option, selectedPath: Option[][]) {
        selectedPath[layer] = selectedPath[layer].map((opt: Option) => {
            // 当前选中项，设置 checked 为 true
            if (opt.options && opt.options.length > 0 && opt.value === currOption.value) {
                return {
                    ...opt,
                    checked: true
                };
            }

            // 如果不是当前选中项且非叶子节点，需要将其状态设置为非展现
            if (opt.options && opt.options.length > 0) {
                return {
                    ...opt,
                    checked: false
                };
            }

            // 叶子节点不处理，当 checked=true 即表示被选中
            return opt;
        });
    }

    /**
     * 多选
     * @param option 选中项
     * @param layer 当前层级
     * @param event 事件对象
     */
    handleMultiSelect(option: Option, layer: number, event: Event) {
        const checked = !option.checked;
        const maxOptions = this.data.get('maxOptions');
        const preSelectedOptionsCnt = this.data.get('preSelectedOptionsCnt');

        if (checked
            && !option.options?.length
            && maxOptions
            && maxOptions <= preSelectedOptionsCnt
        ) {
            Toast.show({
                message: `最多可选${maxOptions}项`,
                size: 'md'
            });
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const selectedPath = this.data.get('_selectedPath');
        const activityValues = this.data.get('_activityValues');

        if (!selectedPath[layer]) {
            selectedPath[layer] = [];
        }

        // 存在子节点时
        if (option.options) {
            const existingItemIndex = findIndex(option.value, selectedPath[layer] as Option[]);
            if (existingItemIndex === -1 && checked) {
                (selectedPath[layer] as Option[]).push({
                    ...option,
                    checked
                });
            }

            this.updateCurrentLayerOptions(layer, option, selectedPath as Option[][]);

            // 展开下一层
            this.data.set('_currentLayer', layer + 1);
        }
        else {
            const existingItemIndex = findIndex(option.value, selectedPath[layer] as Option[]);
            if (existingItemIndex === -1 && checked) {
                (selectedPath[layer] as Option[]).push({
                    ...option,
                    checked
                });
            }
            else {
                // 更新selectedPath中对应的节点状态
                (selectedPath[layer] as Option[])[existingItemIndex] = {
                    ...(selectedPath[layer] as Option[])?.[existingItemIndex],
                    checked
                };
            }

            this.updateCurrentLayerOptions(layer, option, selectedPath as Option[][]);

            if (layer > 0) {
                this.updateParentStatus(layer, activityValues, selectedPath as Option[][]);
            }
            this.data.set('_currentLayer', layer);
        }

        activityValues[layer] = option.value;
        // 清除后续层级的索引，避免保留上一次的选择
        activityValues.length = layer + 1;

        this.data.set('_activityValues', activityValues);
        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));
    }

    /**
     * 多选重置
     */
    multiReset() {
        this.data.set('_currentLayer', 0);
        this.data.set('_selectedPath', []);
        this.data.set('_selectedLabels', []);
    }

    /**
     * 多选确认，需派发所有已选值并关闭面板
     */
    multiConfirm(event: Event) {
        const selectedPath = this.data.get('_selectedPath') as Option[][];

        // 从 selectedPath 中提取所有已选中的选项
        const selectedOptions: Option[] = [];

        // 遍历所有层级的选项
        selectedPath.forEach(layerOptions => {
            // 找出所有已选中的选项（preChecked 或 allChecked）
            const selected = layerOptions.filter((option: Option) => {
                return (!option.options || option.options.length === 0) && option.checked;
            });

            // 将选中的选项添加到结果中
            selectedOptions.push(...selected);
        });
        this.data.set('_selectedOptions', selectedOptions);
        // 提取值和标签
        const value = selectedOptions.map(option => option.value);
        const label = selectedOptions.map(option => option.label || option.value);

        this.data.set('_selectedLabels', label);

        const _value = this.data.get('_value');
        this.handleClose();

        // 检查值是否变化
        if (Array.isArray(_value)
            && value.length === _value.length
            && value.every((item: string, index: number) => item === _value[index])
            || (!Array.isArray(_value) && value === _value)
        ) {
            // 值未变化，不派发 change 事件
            return;
        }

        this.data.set('_value', value);
        this.fire<CascaderEvents['change']>('change', {
            event,
            value,
            label
        });
    }

    /**
     * 计算选项及其所有子孙节点中的叶子节点数量
     * @param option 当前选项
     * @return 叶子节点数量
     */
    countLeafNodes(option: Option): number {
        // 如果没有子节点，则是叶子节点，返回1
        if (!option.options || option.options.length === 0) {
            return 1;
        }

        // 过滤掉禁用的选项
        const validOptions = option.options?.filter(item => !item.disabled);

        // 递归计算所有子节点的叶子节点数量
        let leafCount = 0;
        for (const childOption of validOptions) {
            leafCount += this.countLeafNodes(childOption);
        }

        return leafCount;
    }

    /**
     * 多选点击全选需前置校验是否超过最大值
     */
    handleMultiSelectAllClicked(option: Option, event: Event) {
        // 如果当前选项已选中，点击即取消选中，不进行后续校验
        if (option.allChecked) {
            return;
        }

        const maxOptions = this.data.get('maxOptions');
        if (!maxOptions) {
            return;
        }

        // 计算所有子孙叶子节点的数量
        const leafNodeCount = this.countLeafNodes(option);
        const preSelectedOptionsCnt = this.data.get('preSelectedOptionsCnt');

        // 如果选中当前选项及其所有子孙节点不会超过最大值，则允许选中
        if (leafNodeCount + preSelectedOptionsCnt <= maxOptions) {
            return;
        }

        Toast.show({
            message: `最多可选${maxOptions}项`,
            size: 'md'
        });
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * 给结点增加路径，便于后续使用（回填展示)
     * _labelPath：路径下label数组
     * _valuesPath：路径下value数组
     */
    addOptionPath() {
        const options = this.data.get('options');
        if (!Array.isArray(options)) {
            return;
        }

        // 递归遍历所有选项，给叶子节点增加激活路径记录
        function addOptionPathRecursive(
            options: Option[],
            curLabelPath: string[] = [],
            curValuePath: string[] = []
        ) {
            options.forEach((optionItem: Option) => {
                const {label, value} = optionItem;
                let newCurLabelPath = [...curLabelPath, label || value];
                let newCurValuePath = [...curValuePath, value];

                optionItem._labelPath = newCurLabelPath;
                optionItem._valuesPath = newCurValuePath;

                if (optionItem.options && optionItem.options.length > 0) {
                    addOptionPathRecursive(optionItem.options, newCurLabelPath, newCurValuePath);
                }
            });
        }

        addOptionPathRecursive(options, [], []);
        this.data.set('options', options);
    }
}