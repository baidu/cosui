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
 * @file RowLanes 组件 Interface
 */

export interface RowLanesItem {
    [key: string]: unknown;
    /**
     * 元素宽度
     */
    width: number;
    /**
     * 元素高度
     */
    height: number;
    /**
     * 是否禁用自适应宽度调整
     * @default false
     */
    allowAdaptive?: boolean;
}

export interface RowLanesProps {
    /**
     * 资源列表
     *
     * @default []
     * @platform PC/Mobile
     */
    items: RowLanesItem[];

    /**
     * 间距, 数字类型表示水平垂直间距, 数组类型表示 [水平间距, 垂直间距]
     *
     * @default 0
     * @platform PC/Mobile
     */
    gutter?: number | [number, number];

    /**
     * 容器宽度
     *
     * @default 0
     * @platform PC/Mobile
     */
    containerWidth: number;

    /**
     * 横向布局的基准高度
     */
    rowHeight: number;

    /**
     * 一行最少排列的元素
     * @default 2
     * @platform PC/Mobile
     */
    minCols: number;

    /**
     * 一行最多排列的元素
     * @default 8
     * @platform PC/Mobile
     */
    maxCols: number;

    /**
     * 最后一行的对齐方式。默认 start 表示最后一行保持自然尺寸、不拉伸；
     * 设为 justify 时最后一行将拉伸以填满剩余的容器宽度。
     * @default 'start'
     * @platform PC/Mobile
     */
    lastRowAlign?: 'start' | 'justify';

    /**
     * 行数据（Flex 布局用）
     *
     * @default []
     * @platform PC/Mobile
     */
    _rows: RenderItem[][];
}

/**
 * 内部渲染项
 */
export interface RenderItem {
    raw: RowLanesItem;
    ratio: number;
    width: number;
    allowAdaptive: boolean;
    /**
     * 元素相对于容器左上角的位置
     */
    position?: {
        left: number;
        top: number;
    };
    /**
     * 元素在原始数组中的索引
     */
    index?: number;
}

export type RowLanesData = Required<RowLanesProps>;
