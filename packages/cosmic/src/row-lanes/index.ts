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
 * @file RowLanes 组件
 */

import {Component} from 'san';
import type {RowLanesData, RenderItem} from './interface';

export default class RowLanes extends Component<RowLanesData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-row-lanes">
            <div
                s-ref="container"
                class="cos-row-lanes-container"
                style="
                    width: {{containerWidth}}px;
                    --cos-row-lanes-gutter-x: {{_gutter[0]}}px;
                    --cos-row-lanes-gutter-y: {{_gutter[1]}}px;
                "
            >
                <template s-for="row,rowIndex in _rows">
                    <div
                        class="cos-row-lanes-row"
                    >
                        <div
                            s-for="item,index in row"
                            class="cos-row-lanes-item"
                            style="width: {{item.width}}px;"
                        >
                            <slot
                                var-item="{{item.raw}}"
                                var-column-index="{{index}}"
                                var-row-index="{{rowIndex}}"
                                var-position="{{item.position}}"
                                var-index="{{item.index}}"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </div>
    `;

    static computed = {
        /**
         * 将 gutter 配置转换为 [水平间距, 垂直间距] 格式
         * 支持 number | [number, number] 两种输入
         */
        _gutter(this: RowLanes) {
            const gutter = this.data.get('gutter');
            return Array.isArray(gutter) ? gutter : [gutter, gutter];
        }
    };

    _layoutAnimationFrame: number | null;

    /**
     * 组件初始化数据
     * @items 图片列表，每项需包含 width/height
     * @gutter 间距，支持 number 或 [水平, 垂直]
     * @containerWidth 容器宽度，用于计算布局
     * @rowHeight 基准行高
     * @minCols 一行元素最小列数
     * @maxCols 一行元素最大列数
     * @_rows 内部计算后的行数据
     */
    initData(): RowLanesData {
        return {
            items: [],
            gutter: 0,
            containerWidth: 0,
            rowHeight: 180,
            minCols: 2,
            maxCols: 8,
            lastRowAlign: 'start',
            _rows: []
        };
    }

    inited(): void {
        this._layoutAnimationFrame = null;
        const containerWidth = this.data.get('containerWidth');
        if (containerWidth > 0) {
            this.calcLayout(containerWidth);
        }
    }

    /**
     * 组件挂载完成后，监听关键数据变化并触发重新布局
     */
    attached(): void {
        ['items', 'gutter', 'containerWidth', 'rowHeight', 'minCols', 'maxCols', 'lastRowAlign'].forEach(key => {
            this.watch(key, () => this.scheduleLayout());
        });
    }

    detached(): void {
        this._layoutAnimationFrame && cancelAnimationFrame(this._layoutAnimationFrame);
        this._layoutAnimationFrame = null;
    }

    /**
     * 调度布局计算，使用防抖避免频繁计算
     * 取消之前的动画帧，重新请求新的动画帧来执行布局
     */
    scheduleLayout() {
        if (this._layoutAnimationFrame) {
            cancelAnimationFrame(this._layoutAnimationFrame);
        }

        this._layoutAnimationFrame = requestAnimationFrame(() => {
            this._layoutAnimationFrame = null;

            const containerWidth = this.data.get('containerWidth');
            if (containerWidth > 0) {
                this.calcLayout(containerWidth);
            }
        });
    }

    /**
     * 核心布局计算算法
     *
     * 布局策略（按设计文档）：
     * 1. 遍历每个图片，计算宽高比 ratio = width / height
     * 2. 预计算加入该图片后的行宽度，判断是否需要换行
     * 3. 换行条件（二选一）：
     *    - 当前行已有 minCols 列且预估宽度 > 容器宽度（半宽换行策略）
     *    - 当前行已达 maxCols 列（强制换行）
     * 4. 结算行时：
     *    - 非最后一行：固定行高，调整元素宽度填满容器（宽图优先分配）
     *    - 最后一行：超出容器时等比缩放，不超出时不作调整
     *
     * 固定宽度元素处理：
     * - allowAdaptive === false 时，宽度 = baseHeight * ratio，不参与宽度调整
     *
     * @param containerWidth 容器可用宽度
     */
    calcLayout(containerWidth: number) {
        const items = this.data.get('items') || [];
        const gutter: [number, number] = this.data.get('_gutter');

        const baseHeight = this.data.get('rowHeight');
        const minCols = this.data.get('minCols');
        const maxCols = this.data.get('maxCols');
        const lastRowAlign = this.data.get('lastRowAlign');
        const horizontalGutter = gutter[0];

        const rows: RenderItem[][] = [];

        let rowItems: RenderItem[] = [];

        // 维护当前行的累积状态，避免重复遍历
        let cumulativeAdaptiveRatioSum = 0;
        let cumulativeFixedWidth = 0;
        // 维护当前行的累积位置
        // 当前行的 top 位置
        let currentRowTop = 0;
        // 当前行内元素的累积 left 位置
        let currentRowLeft = 0;

        /**
         * 结算一行：计算该行最终宽度
         *
         * @param isLastRow 是否最后一行
         *
         * 布局策略（按设计文档）：
         * 1. 固定行高为 baseHeight
         * 2. 计算行宽度差值 diff = containerWidth - rowWidth
         * 3. 超出容器：所有元素等比缩放
         * 4. 未超出容器：可调整元素分配 diff 填满（宽图优先）
         * 5. 最后一行未超出：不做调整（不拉伸）
         */
        const flushRow = (isLastRow: boolean) => {
            if (!rowItems.length) {
                return;
            };

            const col = rowItems.length;
            const totalGutter = horizontalGutter * (col - 1);

            // 计算当前行的自然宽度（按 baseHeight 计算）
            let rowWidth = 0;
            rowItems.forEach(item => {
                const itemWidth = baseHeight * item.ratio;
                item.width = itemWidth;
                rowWidth += itemWidth;
            });
            rowWidth += totalGutter;

            const diff = containerWidth - rowWidth;

            const needProcess = !(isLastRow && rowWidth <= containerWidth && lastRowAlign !== 'justify') && diff !== 0;

            if (needProcess) {
                const adjustableItems = rowItems.filter(item => item.allowAdaptive !== false);

                if (adjustableItems.length > 0) {
                    const wideItems = adjustableItems.filter(item => item.ratio > 1);
                    // 如果宽图的数量大于等于2,把剩余宽度平摊给宽图;小于2则把剩余宽度平摊给所有图片
                    const targetItems = wideItems.length >= 2 ? wideItems : adjustableItems;

                    const diffPerItem = diff / targetItems.length;

                    targetItems.forEach(item => {
                        item.width += diffPerItem;
                    });
                }

                if (adjustableItems.length === 0 && rowWidth > 0 && rowWidth > totalGutter) {
                    const scale = containerWidth / rowWidth;

                    rowItems.forEach(item => {
                        item.width *= scale;
                    });
                }
            }

            // 计算每个元素的位置
            let itemLeft = currentRowLeft;
            rowItems.forEach(item => {
                item.position = {
                    left: itemLeft,
                    top: currentRowTop
                };
                itemLeft += item.width + horizontalGutter;
            });

            rows.push([...rowItems]);

            rowItems = [];
            // 结算后重置累积状态
            cumulativeAdaptiveRatioSum = 0;
            cumulativeFixedWidth = 0;
            // 更新下一行的 top 位置（累加当前行的 baseHeight + 垂直间距）
            currentRowTop += baseHeight + gutter[1];
            currentRowLeft = 0;
        };

        for (let i = 0; i < items.length; i++) {
            const raw = items[i];
            // 计算图片宽高比，height为0时默认为1（正方形）
            const ratio = raw.height > 0 ? raw.width / raw.height : 1;

            // 构建图片项数据结构
            // allowAdaptive: 默认为 true（自适应），设为 false 则固定宽度
            const item: RenderItem = {
                raw,
                ratio,
                width: ratio * baseHeight,
                allowAdaptive: raw.allowAdaptive !== false,
                index: i
            };

            // 基于累积状态计算加入新元素后的值
            const nextAdaptiveRatioSum = cumulativeAdaptiveRatioSum
                + (item.allowAdaptive ? ratio : 0);
            const nextFixedWidth = cumulativeFixedWidth
                + (!item.allowAdaptive ? baseHeight * ratio : 0);

            const col = rowItems.length + 1;
            const totalGutter = horizontalGutter * (col - 1);

            // 当前行宽（按 baseHeight 预估）
            const nextWidth = nextFixedWidth + nextAdaptiveRatioSum * baseHeight + totalGutter;

            const itemWidth = item.width;

            /**
             * 换行判断逻辑：
             * 1. 半宽换行策略：当前行已有 minCol 列，且加入此图后预估宽度超过容器宽度
             *    （使用 itemWidth / 2 是为了让图片不完全超出边界）
             * 2. 强制换行：已达到最大列数 maxCol
             */
            const isOverWidth = rowItems.length >= minCols
                && nextWidth - itemWidth / 2 > containerWidth;
            const isMaxColumnReached = rowItems.length >= maxCols;
            const shouldBreak = isOverWidth || isMaxColumnReached;

            if (shouldBreak) {
                flushRow(false);
                // 当前 item 是新行的第一个元素，需要初始化累积状态
                cumulativeAdaptiveRatioSum = item.allowAdaptive ? ratio : 0;
                cumulativeFixedWidth = !item.allowAdaptive ? baseHeight * ratio : 0;
            }
            else {
                // 更新累积状态
                cumulativeAdaptiveRatioSum = nextAdaptiveRatioSum;
                cumulativeFixedWidth = nextFixedWidth;
            }
            rowItems.push(item);
        }
        flushRow(true);

        this.data.set('_rows', rows);
    }
}
