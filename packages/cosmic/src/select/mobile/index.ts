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

import Drawer from '@cosui/cosmic/drawer';
import SearchInput from '../../common/search-input';
import SelectBase from '../base';
import type {OptionItem} from '../interface';

export default class Select extends SelectBase {
    static template = `
        <div class="cos-select">
            <div on-click="togglePanel">
                <slot name="entry">
                    <div class="cos-select-entry{{_openPanel ? ' cos-select-entry-active' : ''}}">
                        <span s-if="label" class="cos-select-entry-label">{{label}}</span>
                        <span s-if="entryText" class="cos-select-entry-text">{{entryText}}</span>
                        <span s-else class="cos-select-entry-placeholder">{{placeholder}}</span>
                        <cos-icon name="{{ _openPanel ? 'up' : 'down'}}" />
                    </div>
                </slot>
            </div>
            <cos-drawer
                s-ref="selectPanel"
                class="cos-select-panel" open="{=_openPanel=}" title="{{title}}" on-close="closePanel"
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
                <div s-if="_searching" class="cos-select-panel-search">
                    <div
                        s-if="_searchValue && searchResult.length !== 0"
                        class="cos-select-panel-list cos-select-panel-list-mark"
                    >
                        <template s-for="option, index in searchResult">
                            <option
                                multiple="{{multiple}}"
                                option="{{option}}"
                                appearance="mark"
                                highlightText="{{_searchValue}}"
                                on-click="native:capture:
                                    selectOption(option.indexPath[0], option.indexPath[1], option, $event)">
                            </option>
                        </template>
                    </div>
                    <div
                        s-if="_searchValue && searchResult.length === 0"
                        class="cos-select-panel-list-empty"
                    >无结果</div>
                </div>
                <fragment s-else>
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
                                <div
                                    s-if="index < options.length - 1"
                                    class="cos-divider cos-select-panel-list-divider"
                                ></div>
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
                        <div s-if="multiTipText" class="cos-select-panel-footer-text">
                            {{multiTipText}}
                            <template s-for="option in _preSelectOptions">
                                <div class="cos-select-panel-footer-text-label">
                                    <span>{{option.label || option.value}}</span>
                                    <span on-click="handleRemoveTag(option.value)">
                                        <cos-icon name="close"></cos-icon>
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="cos-select-panel-footer-buttons">
                            <cos-button size="lg" appearance="secondary" on-click="multiReset">重置</cos-button>
                            <cos-button size="lg" on-click="multiConfirm">确认（{{_preSelectOptions.length}}）</cos-button>
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
        entryText(this: any) {
            const selectedOptions = this.data.get('_selectedOptions');
            if (selectedOptions.length === 0) {
                return '';
            }
            if (selectedOptions.length === 1) {
                return selectedOptions[0].label || selectedOptions[0].value;
            }
            const label = this.data.get('label');
            const title = this.data.get('title');
            return `${label ? '' : title}（已选 ${selectedOptions.length} 个）`;
        },
        showFooter(this: Select) {
            return this.data.get('multiple');
        },
        multiTipText(this: Select) {
            let text = [];
            const maxOptions = this.data.get('maxOptions');
            if (maxOptions) {
                text.push(`最多选 ${maxOptions} 项`);
            }

            const showSelected = this.data.get('showSelected');
            if (showSelected) {
                text.push('已选');
            }
            return text.join(' | ');
        }
    };

    setListPaddingBottom() {
        const footer = this.ref('footer') as unknown as HTMLBaseElement;
        if (footer) {
            this.data.set('_listPaddingBottom', footer.offsetHeight + 'px');
        }
    }

    handleRemoveTag(value: string) {
        const options = this.data.get('options');
        const selectedOptions: OptionItem[] = this.data.get('_preSelectOptions');

        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].value === value) {
                selectedOptions.splice(i, 1);
                break;
            }
        }
        this.data.set('_preSelectOptions', [...selectedOptions]);

        options.forEach((option: OptionItem, index: number) => {
            if (Array.isArray(option.options)) {
                option.options.forEach((subOption: OptionItem, subIndex: number) => {
                    if (subOption.value === value) {
                        this.data.set(`options[${index}].options[${subIndex}].checked`, false);
                    }
                });
            }
            else {
                option.value === value && this.data.set(`options[${index}].checked`, false);
            }
        });
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