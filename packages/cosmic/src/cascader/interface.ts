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
 * @file Cascader Base Interface
 */

export interface SelectAllItem {
    /**
     * 是否全选当前层级所有选项
     */
    checked?: boolean;
    /**
     * 是否部分选中当前层级选项
     */
    indeterminate?: boolean;
}

export interface Option {
    /**
     * 已选中值
     */
    value: string;

    /**
     * 已选中标签文本
     */
    label: string;

    /**
     * 选项是否被禁用
     */
    disabled?: boolean;

    /**
     * 级联选项子选项数组
     */
    options?: Option[];

    /**
     * 是否选中
     */
    checked?: boolean;

    /**
     * 预选取
     * 多选场景下的预勾选，在点击确定按钮后转 checked
     * 和 checked 不同，勾选后没有确定，则 preChecked 会被重置，即状态保留时长不一致
     */
    preChecked?: boolean;

    /**
     * 全选
     */
    allChecked?: boolean;

    /**
     * 节点路径，用于展示完整的父级路径
     */
    _labelPath: string[];
    _valuesPath: string[];
}

interface CascaderBaseProps {
    /**
     * 已选中值
     */
    value?: string | string[];

    /**
     * 已选中标签文本
     */
    label?: string;

    /**
     * 标题
     */
    title?: string;

    /**
     * 未选取前默认文案
     */
    placeholder?: string;

    /**
     * 级联选项
     */
    options: Option[];

    /**
     * 是否允许多选
     */
    multiple?: boolean;

    /**
     * 多选时允许选择的上限
     */
    maxOptions?: number;

    /**
     * 是否开启搜索功能(wise)
     * @default false
     */

    searchable?: boolean;

    /**
     * 级联展开时，上一级导航展示位置
     * vertical 表示竖向递进式
     * horizontal 表示横向 tab 式
     */
    direction?: string;
}

export interface CascaderProps extends CascaderBaseProps {
    /**
     * 面板打开
     */
    _open?: boolean;

    /**
     * 选择路径
     */
    _selectedPath: Option[] | Option[][];

    /**
     * 当前的选项所在层级
     */
    _currentLayer: number;

    /**
     * 选项列表
     */
    _optionsList: Option[][];

    /**
     * 当前展现的路径
     */
    _activityValues: string[];

    /**
     *  已选取值
     */
    _value: string[];

    /**
     * 已选取选项 labels 集合
     */
    _selectedLabels: string[];

    /**
     * 存在 footer 距离底部的高度
     */
    _listPaddingBottom: number | string;

    /**
     * 已选取选项 option 集合
     */
    _selectedOptions: Option[];

    /**
     * 多选模式下各层级的全选状态
     * 数组元素包含 checked(是否全选) 和 indeterminate(是否部分选中) 属性
     */
    _selectAll?: SelectAllItem[];
    /**
     * 是否正在进行搜索
     * 控制搜索界面的显示状态
     */
    _searching?: boolean;
    /**
     * 当前搜索框的输入值
     * 用于过滤选项并高亮显示匹配结果
     */
    _searchValue?: string;
}

export type CascaderData = Required<CascaderProps>;

export interface CascaderEvents {
    change: {
        event?: Event;
        value?: string[] | string;
        label?: string[] | string;
    };
    // 打开面板时触发
    open: void;
    // 关闭面板时触发
    close: void;
}