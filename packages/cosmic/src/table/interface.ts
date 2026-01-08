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

export type TableRow = Record<string, unknown>;

export interface TableColumnProps {

    /**
     * 对应列内容的字段名（key），用于确定此列的值
     */
    prop: keyof TableRow;

    /**
     * 列头(表头)标题
     */
    title?: string;

    /**
     * 对应列内容的过滤器函数。
     */
    content?: (value: unknown, row: Record<string, unknown>, rowIndex: number) => unknown;

    /**
     * 列宽(px)
     */
    width?: number;

    /**
     * 列内的文本排列方式
     * @default 'left'
     */
    align?: 'left' | 'right' | 'center';

    /**
     * 列是否固定
     */
    fixed?: boolean;

    /**
     * 列单元格跨越或扩展多少列
     */
    colspan?: (value: unknown, row: Record<string, unknown>, rowIndex: number) => number;

    /**
     * 单元格跨越或扩展多少行
     */
    rowspan?: (value: unknown, row: Record<string, unknown>, rowIndex: number) => number;
}

export interface ProcessedColumnProps extends TableColumnProps {

    /**
     * 当列距离左边缘需要固定的距离
     */
    _leftFixedThreshold?: number;

    /**
     * 当列超出左边缘需要展示阴影的距离
     */
    _leftShadowThreshold?: number;

    /**
     * 当列距离右边缘需要固定的距离
     */
    _rightFixedThreshold?: number;

    /**
     * 当列超出右边缘需要展示阴影的距离
     */
    _rightShadowThreshold?: number;

    /**
     * 当列左边固定列宽度总和
     */
    _fixedDistance?: number;

    /**
     * 当列左边列宽度总和
     */
    _distance?: number;

    /**
     * 当列配置行内样式
     */
    _styles?: string;

    /**
     * 当列配置样式
     */
    _classes?: string;
}

export interface TableProps {

    /**
     * 表格内容
     */
    data: TableRow[];

    /**
     * 表格列配置
     */
    columns: TableColumnProps[];

    /**
     * 布局形式
     * @default 'fixed'
     */
    layout?: 'auto' | 'fixed';

    /**
     * 边框展示形式
     * @default 'none'
     */
    border?: 'none' | 'row' | 'all';

    /**
     * 是否展示斑马格样式
     *
     * @default true
     */
    striped?: boolean;

    /**
     * 处理后的列数据（内部使用）
     */
    _processedColumns: ProcessedColumnProps[];

    /**
     * 是否有表头（内部使用）
     */
    _hasTableHead: boolean;

    /**
     * 是否有固定列（内部使用）
     */
    _hasFixedColumn: boolean;

    /**
     * 是否有单元格插槽（内部使用）
     */
    _cellSlot: boolean;
}

export type TableData = Required<TableProps>;

export interface ClickOption {

    /**
     * 行数据
     */
    row: TableRow;

    /**
     * 行索引
     */
    rowIndex: number;

    /**
     * 行配置
     */
    column: TableColumnProps;

    /**
     * 行索引
     */
    columnIndex: number;
}

export interface TableEvents {
    'row-click': {row: TableRow, index: number, event: Event};
    'cell-click': {row: TableRow, rowIndex: number, column: TableColumnProps, columnIndex: number, event: Event};
}