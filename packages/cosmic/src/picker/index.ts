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
 * @file Picker 组件
 */

import {Component} from 'san';
import {PickerData, PickerEvents} from './interface';

export default class PickerView extends Component<PickerData> {
    static template = `
    <div class="cos-picker">
        <div
            s-ref="picker"
            class="cos-picker-columns cos-row"
        >
            <div
                s-for="column, columnIndex in columns"
                s-ref="{{'column_' + columnIndex}}"
                class="cos-picker-column cos-col"
                on-scroll="handleScroll(columnIndex)"
            >
                <div
                    s-ref="{{'columnContainer_' + columnIndex}}"
                    class="cos-picker-column-scroll"
                >
                    <div
                        s-for="item, index in column"
                        s-ref="columnItem"
                        class="cos-picker-column-item{{_selectedIndex[columnIndex] === index
                            ? ' cos-picker-column-item-active' : ''}}"
                        on-click="handleItemClick(columnIndex, index)"
                    >
                        <slot
                            var-item="item"
                            var-index="index"
                        ><span>{{item}}</span></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    pickerColumnsRef: HTMLElement[] | null[];
    scrollTimeout: number | null;
    itemHeight: number;
    initData(): PickerData {
        return {
            columns: [],
            selectedIndex: [],
            _selectedIndex: []
        };
    }
    inited() {
        this.pickerColumnsRef = [];
        this.itemHeight = 38;
    }
    attached() {
        let selectedIndex = this.data.get('selectedIndex');
        const columns = this.data.get('columns');

        !selectedIndex.length && (selectedIndex = Array(columns.length).fill(0));
        this.data.set('_selectedIndex', [...selectedIndex]);

        this.nextTick(() => {
            const pickerRef = this.ref('picker') as unknown as HTMLElement;
            const height = pickerRef.offsetHeight;

            const columnItem = this.ref('columnItem') as unknown as HTMLElement;
            const itemStyle = getComputedStyle(columnItem);
            const marginTop = parseFloat(itemStyle.marginTop);
            const marginBottom = parseFloat(itemStyle.marginBottom);
            const itemHeight = columnItem.offsetHeight + marginTop + marginBottom;
            this.itemHeight = itemHeight;

            /**
             * 增加这个 padding 是为了保证滚动到最后一项时，最后一项可以覆盖 selected 的高亮样式
             * 因此这里计算的 padding 是 selected 的高亮样式垂直居中距离 picker 底部的距离
             */
            const padding = height / 2 - columnItem.offsetHeight / 2;
            columns.forEach((column: any, index: number) => {
                const columnContainer = this.ref(`columnContainer_${index}`) as unknown as HTMLElement;
                columnContainer.style.padding = `${padding}px 0`;
                this.pickerColumnsRef.push(this.ref(`column_${index}`));
            });

            this.scrollToIndex(selectedIndex, true);
        });

        this.watch('selectedIndex', (newValue: number[]) => {
            setTimeout(() => {
                this.scrollToIndex(newValue);
            }, 100);
        });
    }

    detached() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
    }
    // 滚动对齐逻辑
    getCenterIndex(columnIndex: number) {
        const scrollTop  = (this.pickerColumnsRef[columnIndex] as HTMLElement).scrollTop;
        const nearestIndex = Math.round(scrollTop / this.itemHeight); // 最接近的索引

        if (nearestIndex !== this.data.get('_selectedIndex')[columnIndex]) {
            this.fire<PickerEvents['change']>('change', {
                columnIndex,
                index: nearestIndex
            });
            this.data.set(`_selectedIndex[${columnIndex}]`, nearestIndex);
        }
    }

    handleScroll(columnIndex: number) {
        clearTimeout(this.scrollTimeout as number);
        this.scrollTimeout = null;
        this.scrollTimeout = setTimeout(this.getCenterIndex.bind(this, columnIndex), 100) as unknown as number;
    }

    scrollToIndex(selectedIndex: number[], isFirst = false) {
        this.data.set('_selectedIndex', [...selectedIndex]);
        this.pickerColumnsRef.forEach((column: any, columnIndex: number) => {
            const index = selectedIndex[columnIndex] || 0;
            const offset = index === 0 ? 0 : index * this.itemHeight;
            column?.scrollTo({
                top: offset,
                behavior: isFirst ? 'auto' : 'smooth'
            });
        });
    }

    handleItemClick(columnIndex: number, index: number) {
        this.data.set(`_selectedIndex[${columnIndex}]`, index);
        this.scrollToIndex(this.data.get('_selectedIndex'));
        this.fire<PickerEvents['change']>('change', {
            columnIndex,
            index
        });
    }
}
