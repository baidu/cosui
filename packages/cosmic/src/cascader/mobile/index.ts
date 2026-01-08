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

import CascaderBase from '../base';
import Toast from '@cosui/cosmic/toast';
import Drawer from '@cosui/cosmic/drawer';
import SearchInput from '../../common/search-input';
import type {Option} from '../interface';

export default class Cascader extends CascaderBase {
    static template = `
        <div class="cos-cascader">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-cascader-entry{{_open ? ' cos-cascader-entry-active' : ''}}" s-ref="entry">
                        <span s-if="label" class="cos-cascader-entry-label">{{label}}</span>
                        <span s-if="entryText" class="cos-cascader-entry-text">{{entryText}}</span>
                        <span s-else class="cos-cascader-entry-placeholder">{{placeholder}}</span>
                        <cos-icon name="{{ _open ? 'up' : 'down'}}" />
                    </div>
                </slot>
            </div>
            <cos-drawer
                class="cos-cascader-panel{{
                    getDirection === 'horizontal' ? ' cos-cascader-panel-horizontal' : ''
                }}"
                open="{=_open=}"
                title="{{title}}"
                on-close="handleClose"
            >
                <cos-search-input
                    s-if="searchable"
                    value="{{_searchValue}}"
                    active="{{_searching}}"
                    on-focus="onInputFocus"
                    on-input="onInput"
                    on-clear="onClearInput"
                    on-cancel="onCancelSearch"
                />
                <div s-if="_searching" class="cos-cascader-search-list">
                    <template
                        s-if="_searchValue && searchResult.length !== 0"
                        s-for="option, index in searchResult"
                    >
                        <cos-option
                            multiple="{{multiple}}"
                            option="{{option}}"
                            appearance="mark"
                            highlightText="{{_searchValue}}"
                            on-select="handleSelectSearchOption(option, $event)"
                        />
                    </template>
                    <div
                        s-if="_searchValue && searchResult.length === 0"
                        class="cos-cascader-search-list-empty"
                    >无结果</div>
                </div>
                <fragment s-else>
                    <div s-if="getDirection === 'horizontal' && !multiple" class="cos-cascader-tabs">
                        <div
                            s-for="tab, index in tabsList"
                            class="cos-cascader-tabs-item"
                            on-click="handleSelectTab(index)"
                        >
                            <cos-icon class="cos-cascader-tabs-item-icon" s-if="index !== 0" name="right"></cos-icon>
                            <div class="cos-cascader-tabs-item-label">
                                {{tab.label}}
                                <div class="cos-cascader-tabs-item-line" s-if="index === _currentLayer"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="cos-cascader-list cos-cascader-{{getDirection}}"
                        style="padding-bottom: {{_listPaddingBottom}}"
                        s-ref="list"
                    >
                        <template s-for="options, optionsIndex in _optionsList">
                            <div
                                <!-- vertical 类型将展示全部 options, horizontal 类型则只展示当前 options -->
                                s-if="getDirection === 'vertical' || _currentLayer === optionsIndex"
                                class="cos-cascader-options"
                            >
                                <div s-if="showSelectAll && optionsIndex > 0" class="cos-cascader-option-all">
                                    <cos-checkbox
                                        s-bind="{{_selectAll[optionsIndex]}}"
                                        on-click="native:capture:handleSelectAllClicked($event)"
                                        on-change="handleSelectAllChanged($event, optionsIndex)"
                                        appearance="mark"
                                    >
                                        全选
                                    </cos-checkbox>
                                </div>
                                <template s-for="option, index in options">
                                    <cos-option
                                        option="{{option}}"
                                        multiple="{{multiple}}"
                                        direction="{{getDirection}}"
                                        showCircle="{{showCircle(option, optionsIndex)}}"
                                        showCheck="{{showCheck(option)}}"
                                        hideOperation="{{optionsIndex === 0}}"
                                        on-select="handleSelect(index, option, optionsIndex, $event)"
                                        on-select-all-click="handleMultiSelectAllClicked(option,$event)"
                                        on-select-all-changed="handleMultiSelectAllChanged(option,optionsIndex,$event)"
                                    />
                                </template>
                            </div>
                        </template>
                    </div>
                    <div s-if="showFooter" s-ref="footer" class="cos-cascader-footer">
                        <div class="cos-cascader-footer-buttons">
                            <cos-button appearance="secondary" on-click="multiReset">重置</cos-button>
                            <cos-button on-click="multiConfirm">确认（{{preSelectedOptionsCnt}})</cos-button>
                        </div>
                    </div>
                </fragment>
            </cos-drawer>
        </div>
    `;

    static components = {
        ...super.components,
        'cos-drawer': Drawer,
        'cos-search-input': SearchInput
    };

    static computed = {
        ...super.computed,

        /**
         * 入口展示文案
         */
        entryText(this: Cascader) {
            const selectedLabels = this.data.get('_selectedLabels');
            if (selectedLabels.length === 0) {
                return '';
            }

            if (selectedLabels.length === 1) {
                return selectedLabels[0];
            }

            const title = this.data.get('title');
            return `${title}（已选 ${selectedLabels.length} 个）`;
        },

        /**
         * 获取当前 direction
         */
        getDirection(this: Cascader) {
            return this.data.get('direction') || 'vertical';
        },

        /**
         * tab 标题栏，仅 horizontal 类型下出现
         */
        tabsList(this: Cascader) {
            const selectedPath = this.data.get('_selectedPath') as Option[];
            const placeholder = this.data.get('placeholder');
            const result = [];

            result.push({
                label: placeholder,
                value: placeholder
            });

            for (let i = 0, len = selectedPath.length; i < len; i++) {
                const selectedOption = selectedPath[i];
                result[i] = {
                    label: selectedOption.label,
                    value: selectedOption.value
                };

                if (i === selectedPath.length - 1 && selectedOption.options) {
                    result.push({
                        label: placeholder,
                        value: placeholder
                    });
                }
            }

            return result;
        },

        /**
         * 是否展示底部按钮区域
         */
        showFooter(this: Cascader) {
            return this.data.get('multiple');
        },

        /**
         * 是否展示全选按钮
         */
        showSelectAll(this: Cascader) {
            if (this.data.get('getDirection') === 'horizontal') {
                return false;
            }
            return this.data.get('multiple');
        },

        /**
         * input显示已选中的标签项,移动端固定为false
         *
         * @returns boolean
         */
        showEntrySelectedTag(this: Cascader) {
            return false;
        },

        searchResult(this: Cascader) {
            let leafOptions = this.data.get('_leafOptions');
            let searchValue = this.data.get('_searchValue');
            let selectedPath = this.data.get('_selectedPath');
            let result: Option[] = [];
            let checkedOption: Option[] = [];

            // 获取所有被选中的叶子节点
            selectedPath.forEach(tmpSelectedPath => {
                if (Array.isArray(tmpSelectedPath)) {
                    tmpSelectedPath.forEach(option => {
                        if (option.checked && !option.options) {
                            checkedOption.push(option);
                        }
                    });
                }
                else {
                    if (tmpSelectedPath.checked && !tmpSelectedPath.options) {
                        checkedOption.push(tmpSelectedPath);
                    }
                }
            });

            // 获取所有命中搜索的结果
            leafOptions.forEach(option => {
                if (!option._labelPath) {
                    return;
                }
                let newLabel = option._labelPath.join('/');
                if (newLabel.includes(searchValue)) {
                    result.push({
                        ...option,
                        label: newLabel,
                        checked: !!checkedOption.find(value => value.value === option.value)
                    });
                }
            });
            return result;
        }
    };

    attached() {
        this.updateSelectAll(this.data.get('_optionsList'));
        this.watch('_optionsList', (optionsList: Option[][]) => {
            this.updateSelectAll(optionsList);
        });
    }

    /**
     * 设置 list 区域距离底部高度，展示多选按钮区域
     */
    setListPaddingBottom() {
        const footer = this.ref('footer') as unknown as HTMLBaseElement;
        if (footer) {
            this.data.set('_listPaddingBottom', footer.offsetHeight + 'px');
        }
    }

    /**
     * mobile 单选 - 横向 tab 式需展示打勾
     */
    showCheck(option: Option) {
        const direction = this.data.get('direction');
        return option.checked && direction === 'horizontal';
    }

    /**
     * mobile 多选 - 需展示预选择
     */
    showCircle(option: Option, layer: number) {
        const direction = this.data.get('getDirection');
        return layer === 0
            && !!option.options?.length
            && (option.preChecked || option.allChecked)
            && direction === 'vertical';
    }

    /**
     * 更新全选状态
     * @param optionsList 选项列表
     */
    updateSelectAll(optionsList: Option[][]) {
        const currentLayer = this.data.get('_currentLayer');
        for (let layer = currentLayer; layer > 0; layer--) {
            const options = optionsList[layer]?.filter((item: Option) => !item.disabled);

            const currentOptionsLength = options && options.length;
            let preSelectedLength = 0;
            let allCheckedLength = 0;

            options && options.forEach((option: Option) => {
                if (option.options?.length && option.allChecked) {
                    allCheckedLength++;
                }
                else if (option.options?.length && option.preChecked) {
                    preSelectedLength++;
                }
                else if ((!option.options || !option.options?.length) && option.checked) {
                    allCheckedLength++;
                }
            });

            this.data.set(`_selectAll[${layer}].checked`, allCheckedLength === currentOptionsLength);
            this.data.set(`_selectAll[${layer}].indeterminate`, preSelectedLength > 0
                || (allCheckedLength < currentOptionsLength && allCheckedLength > 0));
        }
    }

    /**
     * 点击全选
     */
    handleSelectAllClicked(event: Event) {
        const maxOptions = this.data.get('maxOptions');
        if (!maxOptions) {
            return;
        }

        const currentLayer = this.data.get('_currentLayer');
        const selectAll = this.data.get('_selectAll');
        const isCurrentlyChecked = selectAll && selectAll[currentLayer] && selectAll[currentLayer].checked;

        // 如果当前是选中状态，说明正在取消选中，不需要拦截
        if (isCurrentlyChecked) {
            return;
        }

        let currentOptions = this.data.get('_optionsList')[currentLayer];
        currentOptions = currentOptions?.filter((item: Option) => !item.disabled);

        // 计算当前层所有节点的叶子节点总数
        let totalLeafCount = 0;
        for (const option of currentOptions) {
            totalLeafCount += this.countLeafNodes(option);
        }

        const preSelectedOptionsCnt = this.data.get('preSelectedOptionsCnt');
        if (totalLeafCount + preSelectedOptionsCnt <= maxOptions) {
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
     * 点击[全选]
     * 将当前层的选项全部选中
     */
    handleSelectAllChanged(event: {event: Event, checked: boolean}, layer: number) {
        const selectedPath = this.data.get('_selectedPath');
        const activityValues = this.data.get('_activityValues');
        const lastSelectedOption = selectedPath[layer - 1].find((item: Option) =>
            item.value === activityValues[layer - 1]);
        const options = lastSelectedOption?.options?.filter((item: Option) => !item.disabled);

        if (!Array.isArray(options)) {
            return;
        }

        // 创建Map来存储每一层的选项，避免重复
        const layerOptionsMap: Map<number, Map<string, Option>> = new Map();
        // 递归处理节点及其子节点的选中状态
        const processOptionsRecursively = (opts: Option[], currentLayer: number) => {
            if (!opts || !opts.length) {
                return;
            }

            // 更新当前层级节点的选中状态
            opts.forEach((opt: Option) => {
                const isChecked = event.checked
                    ? !opt.options?.length
                    : false;
                this.updateOptionChecks([opt], isChecked, event.checked);
            });

            // 确保当前层级在Map中存在
            if (!layerOptionsMap.has(currentLayer)) {
                layerOptionsMap.set(currentLayer, new Map<string, Option>());
            }

            const currentLayerMap = layerOptionsMap.get(currentLayer)!;

            // 先添加已存在的选项
            if (selectedPath[currentLayer]) {
                (selectedPath[currentLayer] as Option[]).forEach(item => {
                    currentLayerMap.set(item.value, item);
                });
            }

            // 再添加新的选项，如果已存在则更新
            opts.forEach(item => {
                currentLayerMap.set(item.value, item);
            });

            // 处理有子节点的选项
            const nextLayerOptions: Option[] = [];
            opts.forEach(opt => {
                if (opt.options?.length) {
                    // 设置全选状态
                    opt.allChecked = event.checked;

                    // 获取非禁用的子选项
                    const childOptions = opt.options.filter(item => !item.disabled);
                    if (childOptions.length) {
                        // 收集下一层的所有选项
                        nextLayerOptions.push(...childOptions);
                    }
                }
            });

            // 如果有下一层的选项，递归处理
            if (nextLayerOptions.length) {
                processOptionsRecursively(nextLayerOptions, currentLayer + 1);
            }
        };
        processOptionsRecursively(options, layer);

        // 将Map中的选项转换回数组，并更新selectedPath
        layerOptionsMap.forEach((optionsMap, layerIndex) => {
            selectedPath[layerIndex] = Array.from(optionsMap.values());
        });

        // 更新数据
        this.data.set('_selectedPath', JSON.parse(JSON.stringify(selectedPath)));

        // 更新父节点状态
        if (layer > 0) {
            // 确保类型正确，将selectedIndices转换为字符串数组
            this.updateParentStatus(layer, activityValues, selectedPath as Option[][]);
        }
    }

    handleSelectSearchOption(option: Option, event: Event) {
        let options = this.data.get('options');
        if (option.disabled) {
            return;
        }
        if (option.checked) {
            this.handleSelect(0, option, option._labelPath.length - 1, event);
        }
        else {
            option._valuesPath.forEach((value, index) => {
                let pathOption = options.find(option => option.value === value);

                if (pathOption) {
                    this.handleSelect(0, pathOption, index, event);
                    if (pathOption.options) {
                        options = pathOption.options;
                    }
                }
            });
        }
    }

    /**
     * 选中项未暴露时，滚动至其暴露
     */
    scrollToSelectedOptions() {
        const optionsList = this.data.get('_optionsList');
        const position: number[][] = [];

        optionsList.forEach((options: Option[], layer: number) => {
            const index = options.findIndex(item => item.checked);
            position.push([layer, index]);
        });

        if (!position.length) {
            return;
        }

        const optionsListEl = this.ref('list') as unknown as HTMLElement;

        position.forEach(([layer, index]) => {
            const optionEl = optionsListEl.children?.[layer]?.children?.[index];

            if (!optionEl) {
                return;
            }

            const bounding = optionEl.getBoundingClientRect();

            // 判断元素是否在可视区域内
            const isFullyVisible = (
                bounding.top >= 0
                && bounding.left >= 0
                && bounding.bottom <= window.innerHeight
                && bounding.right <= window.innerWidth
            );

            if (!isFullyVisible) {
                optionEl.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            }
        });
    }

    /**
     * 关闭面板
     */
    closePanel() {
        this.handleClose();
    }

    onInputFocus() {
        this.data.set('_searching', true);
    }
    onInput(value: string) {
        this.data.set('_searchValue', value);
    }
    onClearInput() {
        this.data.set('_searchValue', '');
    }
    onCancelSearch() {
        this.data.set('_searching', false);
        this.data.set('_searchValue', '');
    }
}
