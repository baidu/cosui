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
 * @file Masonry 组件
 */

import {Component} from 'san';
import type {MasonryData} from './interface';

export default class Masonry extends Component<MasonryData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-masonry">
            <div
                s-ref="container"
                class="cos-masonry-container"
                style="width: {{containerWidth}}px; height: {{_containerHeight}}px;"
            >
                <template s-for="item,index in _renderItems">
                    <div
                        class="cos-masonry-container-item"
                        data-key="{{index}}"
                        style="{{item._style || ''}}"
                    >
                        <!-- 用于自定义插槽内容, raw表示用户传入的原始数据 -->
                        <slot
                            var-item="{{item.raw}}"
                            var-position="{{item._position}}"
                            var-column-index="{{item._columnIndex}}"
                            var-row-index="{{item._rowIndex}}"
                        >
                        </slot>
                    </div>
                </template>
            </div>
        </div>
    `;

    static computed = {
        _gutter(this: Masonry) {
            const gutter = this.data.get('gutter');
            return Array.isArray(gutter) ? gutter : [gutter, gutter];
        }
    };

    _layoutAnimationFrame: number | null;

    initData(): MasonryData {
        return {
            items: [],
            gutter: 0,
            columnCount: 2,
            containerWidth: 0,
            _renderItems: [],
            _containerHeight: 0
        };
    }

    inited(): void {
        this._layoutAnimationFrame = null;
        const containerWidth = this.data.get('containerWidth');
        if (containerWidth > 0) {
            this.calcLayout(containerWidth);
        }
    }

    attached(): void {
        const container = this.ref('container') as unknown as HTMLDivElement;
        if (!container) {
            return;
        }

        // 数据变化统一走调度
        ['items', 'gutter', 'columnCount', 'containerWidth'].forEach(key => {
            this.watch(key, () => this.scheduleLayout());
        });
    }

    detached(): void {
        this._layoutAnimationFrame && cancelAnimationFrame(this._layoutAnimationFrame);
        this._layoutAnimationFrame = null;
    }

    scheduleLayout() {
        // 1. 如果已有待执行的帧，先取消它
        if (this._layoutAnimationFrame) {
            cancelAnimationFrame(this._layoutAnimationFrame);
        }
        // 2. 重新开启新的帧请求
        this._layoutAnimationFrame = requestAnimationFrame(() => {
            this._layoutAnimationFrame = null;
            // detached 后ref已失效，兜底检查
            const container = this.ref('container') as unknown as HTMLDivElement;
            if (!container) {
                return;
            }
            const containerWidth = this.data.get('containerWidth');
            if (containerWidth > 0) {
                this.calcLayout(containerWidth);
            }
        });
    }

    calcLayout(width: number) {
        const items = this.data.get('items') || [];
        const columnCount = this.data.get('columnCount');
        const gutter: number[] = this.data.get('_gutter');
        // 获取每列宽度，要减去水平间距
        const columnWidth = (width - gutter[0] * (columnCount - 1)) / columnCount;
        // 内部维护的布局的每列高度，用于放置元素时判断高度最小的列
        const colHeights = new Array(columnCount).fill(0);
        // 维护一个元素数量的数组，用于计算元素起始下标
        const colCounts = new Array(columnCount).fill(0);
        const result = items.map(item => {
            // 计算元素的宽高比
            const ratio = Number(item.height / (item.width || columnWidth));
            // 根据宽高比和列宽计算元素高度
            const elementHeight = Number(ratio) * columnWidth;
            const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));
            // 如果设置了 columnIndex，则使用设置的 columnIndex；否则使用计算出的最短列索引
            const isValidIndex = typeof item.columnIndex === 'number'
                && item.columnIndex >= 0
                && item.columnIndex < columnCount;
            const column = (isValidIndex ? item.columnIndex : shortestColIndex) ?? 0;
            // 当前列的起始下标
            const indexInColumn = colCounts[column];
            // 计算元素在布局中的位置
            const x = column * (columnWidth + gutter[0]);
            const y = colHeights[column];
            // 更新该列的高度
            colHeights[column] += elementHeight + gutter[1];
            // 更新当前列中的元素数量起始下标
            colCounts[column] += 1;
            return {
                raw: item,
                _style: {
                    width: `${columnWidth}px`,
                    height: `${elementHeight}px`,
                    top: `${y}px`,
                    left: `${x}px`
                },
                _position: {
                    top: y,
                    left: x
                },
                _columnIndex: column,
                _rowIndex: indexInColumn
            };
        });
        // 更新渲染的元素布局信息
        const _renderItems = this.data.get('_renderItems') || [];
        this.data.splice('_renderItems', [0, _renderItems.length, ...result]);
        this.data.set('_containerHeight', Math.max(...colHeights) - gutter[1]);
    }
}
