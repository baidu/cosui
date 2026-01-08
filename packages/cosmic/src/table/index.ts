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
 * @file table 组件
 */

import {Component} from 'san';
import {
    TableData,
    TableColumnProps,
    ProcessedColumnProps,
    TableRow,
    ClickOption,
    TableEvents
} from './interface';
import {Throttle} from '../util';

// scroll 值可能是小数，设置一个滚动触发阀值
const SCROLL_THRESHOLD = 2;

export default class Table extends Component<TableData> {

    static trimWhitespace = 'all';

    static template = /* html */`
        <div class="cos-table" on-scroll="debounceScroll">
            <table
                style="table-layout: {{layout}};"
                class="cos-table-main{{
                    striped ? ' cos-table-striped' : ''}}{{
                    border === 'all' ? ' cos-table-border' : ''}}"
            >
                <thead s-if="_hasTableHead" class="cos-table-head">
                    <tr class="cos-table-head-tr">
                        <th
                            s-for="col, columnIndex in _processedColumns"
                            style="{{col._styles}}"
                            class="cos-table-th cos-table-th-align-{{
                                col.align || 'left'}}{{
                                col._classes}}"
                        >
                            <slot name="header" var-column="col" var-columnIndex="columnIndex">
                                <div class="cos-table-th-content">{{col.title}}</div>
                            </slot>
                            <!-- 行边框，因需 0.5px 宽度且伪元素被固定列阴影占用，所以用实际 div 解决 -->
                            <div
                                s-if="border === 'all' || border === 'row'"
                                class="cos-table-border-row"
                            ></div>
                            <!-- 列左边框，第一列不需要，因需 0.5px 宽度且伪元素被固定列阴影占用，所以用实际 div 解决 -->
                            <div
                                s-if="border === 'all' && columnIndex !== 0"
                                class="cos-table-border-col"
                            ></div>
                        </th>
                    </tr>
                </thead>
                <tbody s-if="_processedColumns.length" class="cos-table-body">
                    <tr
                        s-for="row, rowIndex in data"
                        class="cos-table-body-tr"
                    >
                        <template s-for="col, columnIndex in _processedColumns">
                            <td
                                s-show="calcRowSpan(col, row, rowIndex) && calcColSpan(col, row, rowIndex)"
                                style="{{col._styles}}"
                                class="cos-table-td cos-table-td-align-{{
                                    col.align || 'left'}}{{
                                    col._classes}}"
                                rowspan="{{calcRowSpan(col, row, rowIndex)}}"
                                colspan="{{calcColSpan(col, row, rowIndex)}}"
                                on-click="cellClick($event, {row, rowIndex, columns[columnIndex], columnIndex})"
                            >
                                <slot
                                    s-if="_cellSlot"
                                    name="cell"
                                    var-row="row"
                                    var-column="col"
                                    var-rowIndex="rowIndex"
                                >
                                    <div class="cos-table-td-content">{{col | renderField(row, rowIndex)}}</div>
                                </slot>
                                <slot
                                    s-else
                                    name="{{col.prop}}"
                                    var-row="row"
                                    var-column="col"
                                    var-rowIndex="rowIndex"
                                >
                                    <div class="cos-table-td-content">{{col | renderField(row, rowIndex)}}</div>
                                </slot>
                                <!-- 行边框，因需 0.5px 宽度且伪元素被固定列阴影占用，所以用实际 div 解决 -->
                                <div
                                    s-if="(border === 'all' || border === 'row') && rowIndex !== data.length - 1"
                                    class="cos-table-border-row"
                                ></div>
                                <!-- 列左边框，第一列不需要，因需 0.5px 宽度且伪元素被固定列阴影占用，所以用实际 div 解决 -->
                                <div
                                    s-if="border === 'all' && columnIndex !== 0"
                                    class="cos-table-border-col"
                                ></div>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    static filters = {
        renderField(col: TableColumnProps, row: TableRow, rowIndex: number) {
            const {content, prop} = col;

            if (typeof content === 'function') {
                return content.call(this, row[prop], row, rowIndex);
            }
            if (prop) {
                return row[prop];
            }
            return '';
        }
    };

    // 节流对象，用于滚动事件处理
    throttle: Throttle | null;

    initData(): TableData {
        return {
            data: [],
            columns: [],
            layout: 'fixed',
            border: 'none',
            striped: true,

            _processedColumns: [],
            _hasTableHead: false,
            _hasFixedColumn: false,
            _cellSlot: !!(this as any).sourceSlots.named.cell
        };
    }

    inited() {
        this.processColumns();
    }

    created() {
        this.watch('columns', (columns: TableColumnProps[]) => {
            this.processColumns(columns);
        });
    }

    attached() {
        this.nextTick(() => this.setColumnShadow());
    }

    detached() {
        this.data.set('_processedColumns', []);

        // 清除throttle
        this.throttle?.clean();
    }

    /**
     * 根据列表配置处理表格属性/样式，并判断和缓存是否有表头、是否有固定列
     * @param columns 列配置
     */
    processColumns(columns = this.data.get('columns')): void {
        if (!Array.isArray(columns)) {
            return;
        }

        let hasTableHead = false;
        let hasFixedColumn = false;

        const processedColumns: ProcessedColumnProps[] = [];

        for (const col of columns) {
            if (!hasTableHead && col.title) {
                hasTableHead = true;
            }
            if (!hasFixedColumn && col.fixed) {
                hasFixedColumn = true;
            }

            const newCol: ProcessedColumnProps = {...col};

            // 设置单元格宽度
            newCol._styles = col.width
                ? (!isNaN(+col.width) ? `width: ${col.width}px;` : `width: ${col.width}`)
                : '';
            processedColumns.push(newCol);
        }

        this.data.set('_processedColumns', processedColumns);
        this.data.set('_hasTableHead', hasTableHead);
        this.data.set('_hasFixedColumn', hasFixedColumn);

        hasFixedColumn && this.fixedColumns(processedColumns);
    }

    /**
     * 计算和处理固定列偏移量
     * @param columns 列配置
     */
    fixedColumns(columns = this.data.get('_processedColumns')): void {
        const fixedColumns: ProcessedColumnProps[] = [];

        // 记录固定列的列宽总和
        let fixedDistance = 0;
        let realDistance = 0;
        // 标识上一个固定列
        let lastColumn = null;

        let columnIndex = 0;
        const len = columns.length;
        while (columnIndex < len) {
            const col: ProcessedColumnProps = {...columns[columnIndex]};
            const {fixed = false, _styles = ''} = col;

            const width = col.width
                ? (!isNaN(+col.width) ? col.width : 0)
                : 0;

            if (fixed) {
                // 左贴边的距离取决于左边固定列的列宽总和
                col._styles = `position: sticky; z-index: 1; ${_styles}left: ${fixedDistance}px;`;
                col._fixedDistance = fixedDistance;
                col._distance = realDistance;
                // 左贴边滚动左边界：scrollLeft  > 当列距离左边的距离（前面列的列宽总和）- 当列需要固定列的距离（前面固定列的列宽总和）
                col._leftFixedThreshold = realDistance - fixedDistance;

                // 累加当前固定列的宽度
                fixedDistance += width;

                if (lastColumn) {
                    // 上一固定列的左贴边滚动右边界是下一固定列左边界。即开始下一列贴边，就不需要展示当前列的阴影
                    lastColumn._leftShadowThreshold = col._leftFixedThreshold;
                }
                lastColumn = col;
            }
            // 累加当前列的宽度
            realDistance += width;

            fixedColumns.push(col);
            columnIndex++;
        }
        lastColumn && (lastColumn._leftShadowThreshold = realDistance);

        lastColumn = null;
        while (columnIndex--) {
            const col: ProcessedColumnProps = fixedColumns[columnIndex];
            const {fixed = false, _fixedDistance = 0, _distance = 0} = col;
            const width = col.width
                ? (!isNaN(+col.width) ? col.width : 0)
                : 0;

            if (fixed) {
                // 右贴边的距离取决于右边固定列的列宽总和
                const fixedRight = fixedDistance - _fixedDistance - width;
                col._styles += `right:${fixedRight}px;`;

                col._rightFixedThreshold = realDistance - _distance - fixedDistance + _fixedDistance;

                if (lastColumn) {
                    lastColumn._rightShadowThreshold = col._rightFixedThreshold;
                }

                lastColumn = col;
            }
        }
        lastColumn && (lastColumn._rightShadowThreshold = realDistance);

        this.data.set('_processedColumns', fixedColumns);
    }

    /**
     * 计算行合并单元格值
     * @param col 列配置
     * @param row 行数据
     * @param rowIndex 行索引
     */
    calcRowSpan(col: TableColumnProps, row: TableRow, rowIndex: number) {
        let rowspan = col.rowspan;
        if (!rowspan) {
            return 1;
        }

        if (typeof rowspan === 'function') {
            const rowSpanValue = rowspan.call(this, row[col.prop], row, rowIndex);
            return rowSpanValue === undefined ? 1 : rowSpanValue;
        }

        return rowspan;
    }

    /**
     * 计算列合并单元格值
     * @param col 列配置
     * @param row 行数据
     * @param rowIndex 行索引
     */
    calcColSpan(col: TableColumnProps, row: TableRow, rowIndex: number) {
        let colspan = col.colspan;
        if (!colspan) {
            return 1;
        }

        if (typeof colspan === 'function') {
            const colSpanValue = colspan.call(this, row[col.prop], row, rowIndex);
            return colSpanValue === undefined ? 1 : colSpanValue;
        }

        return colspan;
    }

    /**
     * 滚动事件增加节流
     */
    debounceScroll() {
        if (!this.throttle) {
            this.throttle = new Throttle(50, true);
        }
        this.throttle.throttle(this.setColumnShadow, this);
    }

    /**
     * 整表宽度超出时，容器可滚动。此时为固定列增加或移除阴影
     */
    setColumnShadow(): void {
        if (!this.data.get('_hasFixedColumn')) {
            return;
        }

        // 表格实际左边框到当前可见内容最左边的距离
        const scrollWrapper = this.el as HTMLDivElement;
        const scrollLeft = scrollWrapper?.scrollLeft || 0;
        const scrollWidth = scrollWrapper?.scrollWidth || 0;
        const clientWidth = scrollWrapper?.clientWidth || 0;

        if (scrollWidth <= clientWidth && scrollLeft === 0) {
            return;
        }

        // 表格右边框实际到当前可见内容最右边的距离
        const scrollRight = scrollWidth - clientWidth - scrollLeft;

        const columns = this.data.get('_processedColumns');
        const len = columns.length;
        for (let columnIndex = 0; columnIndex < len; columnIndex++) {
            const col = columns[columnIndex];
            if (!col.fixed || !col.width || isNaN(+col.width)) {
                continue;
            }

            const {
                _leftFixedThreshold = 0,
                _leftShadowThreshold = 0,
                _rightFixedThreshold = 0,
                _rightShadowThreshold = 0
            } = col;

            let classes = (scrollLeft - _leftFixedThreshold > SCROLL_THRESHOLD
                && _leftShadowThreshold - scrollLeft >= SCROLL_THRESHOLD
            )
                ? ' cos-table-column-left-shadow'
                : '';

            classes += (scrollRight - _rightFixedThreshold > SCROLL_THRESHOLD
                && _rightShadowThreshold - scrollRight >= SCROLL_THRESHOLD
            )
                ? ' cos-table-column-right-shadow'
                : '';

            this.data.set(`_processedColumns[${columnIndex}]._classes`, classes);
        }
    }

    /**
     * 点击单元格，派发当行点击事件和当格点击事件
     */
    cellClick(event: Event, clickOption: ClickOption) {
        this.fire<TableEvents['row-click']>('row-click', {
            row: clickOption.row,
            index: clickOption.rowIndex,
            event
        });

        this.fire<TableEvents['cell-click']>('cell-click', {
            ...clickOption,
            event
        });
    }
}