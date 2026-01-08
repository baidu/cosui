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
 */

export interface OptionItem {
    /**
     * 选项值
     */
    value: string;
    /**
     * 选项文本
     */
    label?: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 子选项
     */
    options?: OptionItem[];
    /**
     * 是否选中
     */
    checked?: boolean;
    /**
     * 选项图标
     */
    icon?: string;
}

export interface SearchOptionItem extends OptionItem {
    /**
     * 选项平铺后，记录其树节点路径
     */
    indexPath: number[];
}

export interface SelectProps {
    /**
     * 默认选项
     *
     * @default ''
     * @platform PC/Mobile
     */
    value: string | string[];

    /**
     * 筛选标签
     *
     * @default ''
     * @platform PC/Mobile
     */
    label?: string;

    /**
     * 标题
     *
     * @default ''
     * @platform Mobile
     */
    title?: string;

    /**
     * 未选取前默认文案
     *
     * @default ''
     * @platform PC/Mobile
     */
    placeholder?: string;

    /**
     * 选项列表
     *
     * @default []
     * @platform PC/Mobile
     */
    options: OptionItem[];

    /**
     * 选项视觉风格
     *
     * @default 'mark'
     * @platform PC/Mobile
     */
    appearance?: 'mark' | 'tag';

    /**
     * 是否允许多选
     *
     * @default false
     * @platform PC/Mobile
     */
    multiple?: boolean;

    /**
     * 多选时允许选择的项目上限
     *
     * @default undefined
     * @platform PC/Mobile
     */
    maxOptions?: number;

    /**
     * 多选时是否在筛选面板中展示已选项
     *
     * @default false
     * @platform PC/Mobile
     */
    showSelected?: boolean;

    /**
     * 是否可搜索
     * @default false
     * @platform Mobile
     */
    searchable?: boolean;

        /**
     * 搜索值
     */
    _searchValue: string;

    /**
     * 是否正在搜索
     */
    _searching: boolean;

    /**
     * 是否打开选择面板
     */
    _openPanel: boolean;

    /**
     * 多选时的预选选项
     */
    _preSelectOptions: OptionItem[];

    /**
     * 已选择的选项
     */
    _selectedOptions: OptionItem[];

    /**
     * 列表底部内边距
     */
    _listPaddingBottom: number;
}

export type SelectData = Required<SelectProps>;

export interface SelectEvents {
    /**
     * 选项改变时触发
     */
    change: {
        event: Event;
        value: string | string[];
    };

    /**
     * 点击切换筛选面板时触发
     */
    'toggle-panel': { open: boolean};
}

export interface SelectMethods {

    /**
     * 展开 / 关闭筛选面板
     */
    togglePanel: () => void;
}