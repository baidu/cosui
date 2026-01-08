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
import Popover from '@cosui/cosmic/popover';
import type {Option} from '../interface';

export default class Cascader extends CascaderBase {
    static template = `
        <div class="cos-cascader">
            <div on-click="handleClick">
                <slot name="entry">
                    <div class="cos-cascader-entry{{_open ? ' cos-cascader-entry-active' : ''}}" s-ref="entry">
                        <span s-if="label && !showEntrySelectedTag" class="cos-cascader-entry-label">{{label}}</span>
                        <fragment s-if="entryText">
                            <cos-selected-tags
                                s-if="showEntrySelectedTag"
                                options="{{_selectedTags}}"
                                on-delete="handleRemoveTag"
                            />
                            <span s-else class="cos-cascader-entry-text">{{entryText}}</span>
                        </fragment>
                        <span s-else class="cos-cascader-entry-placeholder">{{placeholder}}</span>
                        <cos-icon name="{{ _open ? 'up' : 'down'}}" />
                    </div>
                </slot>
            </div>
            <cos-popover
                s-ref="panelRef"
                class="cos-cascader-panel{{
                    getDirection === 'horizontal' ? ' cos-cascader-panel-horizontal' : ''
                }}"
                open="{=_open=}"
                title="{{title}}"
                on-close="handleClose"
            >
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
            </cos-popover>
        </div>
    `;

    static components = {
        ...super.components,
        'cos-popover': Popover
    };

    static computed = {
        ...super.computed,

        /**
         * 入口展示文案
         */
        entryText(this: Cascader) {
            const selectedOptions = this.data.get('_selectedOptions');
            if (selectedOptions.length === 0) {
                return '';
            }
            return selectedOptions.map(option => option._labelPath.join('/')).join('、');
        },

        /**
         * 获取当前 direction，pc 下固定为 'vertical'
         */
        getDirection(this: Cascader) {
            return 'vertical';
        },

        showEntrySelectedTag(this: Cascader) {
            const multiple = this.data.get('multiple');
            const entryText =  this.data.get('entryText');
            return multiple && entryText;
        }
    };

    /**
     * pc 单选 - 递进展开式需展示打勾
     */
    showCheck(option: Option) {
        const multiple = this.data.get('multiple');
        return !multiple && option.checked;
    }

    /**
     * pc 多选全选点击选项实时更新数据
     */
    handleMultiSelectAllChanged(
        option: Option,
        layer: number,
        event: { event: Event, checked: boolean }
    ) {
        // 调用基类实现
        super.handleMultiSelectAllChanged(option, layer, event);

        // 统一触发change事件
        const selectedOptions = this.getSelectedLeafOptions();
        const value = selectedOptions.map(opt => opt.value);
        const label = selectedOptions.map(opt => opt.label || opt.value);

        this.data.set('_selectedOptions', selectedOptions);
        this.data.set('_selectedLabels', label);
        this.data.set('_value', value);

        this.fire('change', {
            event: event.event,
            value,
            label
        });
    }

    /**
     * pc 多选点击选项实时更新数据
     */
    handleMultiSelect(option: Option, layer: number, event: Event) {
        // 先调用基类的基础逻辑
        super.handleMultiSelect(option, layer, event);

        // PC 端特有逻辑
        const selectedOptions = this.getSelectedLeafOptions();
        const value = selectedOptions.map(opt => opt.value);
        const label = selectedOptions.map(opt => opt.label || opt.value);

        this.data.set('_selectedOptions', selectedOptions);
        this.data.set('_selectedLabels', label);
        this.data.set('_value', value);

        // 如果是叶子节点，触发change事件
        if (!option.options) {
            this.fire('change', {event, value, label});
        }

        // 更新活动路径
        const activityValues = this.data.get('_activityValues');
        activityValues[layer] = option.value;
        activityValues.length = layer + 1;
        this.data.set('_activityValues', activityValues);
    }

    /**
     * 获取所有选中的叶子节点
     */
    getSelectedLeafOptions(): Option[] {
        const selectedPath = this.data.get('_selectedPath') as Option[][];
        const selectedLeafOptions: Option[] = [];

        // 遍历所有层级的选项
        selectedPath.forEach(layerOptions => {
            // 找出所有已选中的叶子节点
            const selected = layerOptions.filter((option: Option) => {
                return (!option.options || option.options.length === 0) && option.checked;
            });

            // 将选中的选项添加到结果中
            selectedLeafOptions.push(...selected);
        });

        return selectedLeafOptions;
    }

    handleRemoveTag(data: {event: Event, index: number}) {
        const {event, index} = data;
        const selectedOptions = this.data.get('_selectedOptions');
        if (!Array.isArray(selectedOptions)) {
            return;
        }
        const deletedOption = selectedOptions[index];
        const _labelPath = deletedOption._labelPath;
        const layer = _labelPath.length - 1;

        this.data.set('_currentLayer', layer);
        this.data.set('_activityValues', deletedOption._valuesPath);
        this.buildOptionsList();


        this.handleSelect(data.index, deletedOption, layer, event);
        this.multiConfirm(event);
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

            let panelEl = this.ref('panelRef')?.el as unknown as HTMLElement;

            if (!panelEl) {
                return;
            }

            const optionBounding = optionEl.getBoundingClientRect();
            const panelBounding = panelEl.getBoundingClientRect();

            // 判断元素是否在 panelEl 的可视区域内
            const isFullyVisible = (
                optionBounding.top >= panelBounding.top
                && optionBounding.left >= panelBounding.left
                && optionBounding.bottom <= panelBounding.bottom
                && optionBounding.right <= panelBounding.right
            );

            if (!isFullyVisible) {
                optionEl.scrollIntoView({behavior: 'smooth', block: 'nearest'});
            }
        });
    }
}
