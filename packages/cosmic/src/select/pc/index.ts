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
 * @file
 */

import Popover from '@cosui/cosmic/popover';
import SelectTags from '../../common/selected-tags';
import SelectBase from '../base';
import type {OptionItem, SelectEvents} from '../interface';
export default class Select extends SelectBase {
    static template = `
        <div class="cos-select">
            <div on-click="togglePanel">
                <slot name="entry">
                    <div class="cos-select-entry{{_openPanel ? ' cos-select-entry-active' : ''}}">
                        <span
                            s-if="label && (!multiple || (multiple && !entryText))"
                            class="cos-select-entry-label"
                        >{{label}}</span>
                        <span s-if="entryText && !multiple}}" class="cos-select-entry-text">{{entryText}}</span>
                        <cos-selected-tags s-else-if="entryText && multiple}}"
                            options="{{_selectedOptions}}"
                            on-delete="handleRemoveTag"
                        />
                        <span s-else class="cos-select-entry-placeholder">{{placeholder}}</span>
                        <cos-icon name="{{ _openPanel ? 'up' : 'down'}}" />
                    </div>
                </slot>
            </div>
            <cos-popover
                s-ref="selectPanel"
                class="cos-select-panel"
                open="{=_openPanel=}"
                title="{{title}}"
                on-close="closePanel">
                <div s-if="{{multiple && appearance === 'mark' && !maxOptions}}" class="cos-select-option-mark">
                    <cos-checkbox
                        s-bind="{{selectAllParams}}"
                        on-click="native:capture:multiSelectAllClicked($event)"
                        on-change="multiSelectAllChanged"
                        appearance="mark"
                    >
                        全选
                    </cos-checkbox>
                </div>
                <div
                    s-ref="selectList"
                    style="padding-bottom: {{_listPaddingBottom}}"
                    class="cos-select-panel-list cos-select-panel-list-{{appearance}}"
                >
                    <template s-for="option, index in options">
                        <!-- 分组筛选器, 有子选项 -->
                        <template s-if="option.options">
                            <div class="cos-select-option-group">{{option.label || option.value}}</div>
                            <template s-for="subOption, subIndex in option.options">
                                <option
                                    multiple="{{multiple}}"
                                    option="{{subOption}}"
                                    appearance="{{appearance}}"
                                    on-click="native:capture:selectOption(index, subIndex, subOption, $event)">
                                </option>
                            </template>
                        </template>
                        <option
                            s-else
                            multiple="{{multiple}}"
                            option="{{option}}"
                            appearance="{{appearance}}"
                            on-click="native:capture:selectOption(index, subIndex, option, $event)">
                        </option>
                    </template>
                </div>
                <div s-if="showFooter" s-ref="footer" class="cos-select-panel-footer">
                    <div s-if="multiHelpText" class="cos-select-panel-footer-text">{{multiHelpText}}</div>
                    <div class="cos-select-panel-footer-buttons">
                        <cos-button appearance="secondary" on-click="multiReset">重置</cos-button>
                        <cos-button on-click="multiConfirm">确认（{{_preSelectOptions.length}}）</cos-button>
                    </div>
                </div>
            </cos-popover>
        </div>
    `;

    static components = {
        ...super.components,
        'cos-popover': Popover,
        'cos-selected-tags': SelectTags
    };

    static computed = {
        ...super.computed,
        entryText(this: Select) {
            const selectedOptions = this.data.get('_selectedOptions');
            if (selectedOptions.length === 0) {
                return '';
            }
            const labels = selectedOptions.map((option: any) => {
                return option.label || option.value;
            });
            return labels.join('、');
        },
        showFooter(this: Select) {
            return this.data.get('multiple') && this.data.get('appearance') === 'tag';
        }
    };

    closePanel() {
        this.fire<SelectEvents['toggle-panel']>('toggle-panel', {
            open: false
        });
    }

    /**
     * 选择筛选项：PC列表多选
     */
    selectOption(index: number, subIndex: number, option: OptionItem, event: Event) {
        if (option.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        // 如果是多选mark样式，实现实时更新
        if (this.data.get('multiple') && this.data.get('appearance') === 'mark') {
            // 调用基类处理基础选中逻辑
            super.multiSelectOption(index, subIndex, option, event);

            // PC端特有逻辑 - 直接使用 _selectedOptions
            const selectedOptions = this.data.get('_selectedOptions');
            const value = selectedOptions.map(opt => opt.value);

            this.data.set('value', value);

            // 触发change事件
            this.fire<SelectEvents['change']>('change', {
                event,
                value
            });

            if (this.data.get('showSelected')) {
                this.nextTick(() => {
                    this.setListPaddingBottom();
                });
            }
        }
        else {
            // 其他情况直接调用父类方法
            super.selectOption(index, subIndex, option, event);
        }
    }

    /**
     * 多选全选状态改变：PC列表多选
     */
    multiSelectAllChanged(event: { event: Event, checked: boolean }) {
        // 如果是mark样式多选，实现实时更新
        if (this.data.get('multiple') && this.data.get('appearance') === 'mark') {
            // 调用基类处理基础全选逻辑
            super.multiSelectAllChanged(event);

            // 确保数据已更新
            this.nextTick(() => {
                // 获取更新后的选中项
                const selectedOptions = this.data.get('_preSelectOptions') || this.data.get('_selectedOptions');
                const value = selectedOptions.map(item => item.value);

                // 更新必要的数据
                this.data.set('_selectedOptions', selectedOptions);
                this.data.set('value', value);

                // 触发change事件
                this.fire<SelectEvents['change']>('change', {
                    event: event.event,
                    value
                });

                if (this.data.get('showSelected')) {
                    this.setListPaddingBottom();
                }
            });
        }
        else {
            // 其他情况直接调用父类方法
            super.multiSelectAllChanged(event);
        }
    }

    scrollToIndex(index: number): void {

        const containerNode = this.ref('selectList') as unknown as HTMLElement;
        if (containerNode?.parentElement) {
            const scrollTop = containerNode?.scrollTop;
            const {top: listTop, height: listHeight} = containerNode.parentElement.getBoundingClientRect();
            // 只筛选所有可选项（option），跳过分组节点
            const optionNodes = Array.from(
                containerNode.querySelectorAll('.cos-select-option'),
                node => node as HTMLElement
            );
            const selectedNode = optionNodes[index];
            if (!selectedNode) {
                return;
            }
            const {top, height} = selectedNode.getBoundingClientRect();

            // 判断元素是否在可视区域内
            const isFullyVisible = top - listTop < listHeight;

            // 元素不在可视区域内，平滑滚动到该元素
            if (!isFullyVisible) {
                containerNode.parentElement.scrollTo({
                    top: scrollTop + top - listTop - listHeight + height,
                    behavior: 'smooth'
                });
            }
        }
    }

    /**
     * 处理删除标签的逻辑
     *
     * @param data 包含事件和索引的对象
     */
    handleRemoveTag(data: {event: Event, index: number}) {
        const options = this.data.get('options');
        const multiple = this.data.get('multiple');
        const _selectedOptions = this.data.get('_selectedOptions');
        const deleteOption = _selectedOptions[data.index];

        options?.forEach((option: OptionItem, index: number) => {
            if (Array.isArray(option.options)) {
                option.options.forEach((subOption: OptionItem, subIndex: number) => {
                    if (subOption.value === deleteOption.value) {
                        this.data.set(`options[${index}].options[${subIndex}].checked`, false);
                    }
                });
            }
            else {
                option.value === deleteOption.value && this.data.set(`options[${index}].checked`, false);
            }
        });

        _selectedOptions.splice(data.index, 1);
        this.data.splice('_selectedOptions', [data.index, 1]);
        multiple && this.data.set('_preSelectOptions', [].concat(_selectedOptions));

        const selectedValues = _selectedOptions.map((item: OptionItem) => item.value);
        this.data.set('value', selectedValues);

        this.fire<SelectEvents['change']>('change', {
            event: data.event,
            value: selectedValues
        });
    }
}