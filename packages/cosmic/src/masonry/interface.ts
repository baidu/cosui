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
 * @file Masonry 组件 Interface
 */

interface MasonryItem {
    [key: string]: unknown;
    /**
     * 自定义所在列
     */
    columnIndex?: number;

    /**
     * 元素宽度
     */
    width: number;

    /**
     * 元素高度
     */
    height: number;
}

/**
 * 布局计算后用于渲染的单个元素信息
 */
export interface MasonryRenderItem {
    /**
     * 用户传入的原始数据
     */
    raw: MasonryItem;

    /**
     * 元素定位样式
     */
    _style: {
        width: string;
        height: string;
        top: string;
        left: string;
    };

    /**
     * 元素在容器中的位置
     */
    _position: {
        top: number;
        left: number;
    };

    /**
     * 元素所在列索引
     */
    _columnIndex: number;

    /**
     * 元素在所在列中的行索引
     */
    _rowIndex: number;
}

export interface MasonryProps {
    /**
     * 列表数据
     *
     * @default []
     * @platform PC/Mobile
     */
    items: MasonryItem[];

    /**
     * 实际渲染的资源列表数据
     *
     * @default []
     * @platform PC/Mobile
     */
    _renderItems: MasonryRenderItem[];

    /**
     * 瀑布流列数
     *
     * @default 2
     * @platform PC/Mobile
     */
    columnCount?: number;

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
     * 列内元素的对齐方式。默认 'start' 表示各列元素保持自然高度、列底部参差不齐；
     * 设为 'justify' 时会将各列的剩余空间平摊给该列每张图片，使所有列底部对齐到最高列。
     *
     * @default 'start'
     * @platform PC/Mobile
     */
    rowAlign?: 'start' | 'justify';

    /**
     * 瀑布流计算出的容器高度，防止容器塌陷
     *
     * @default 0
     * @platform PC/Mobile
     */
    _containerHeight?: number;
}

export type MasonryData = Required<MasonryProps>;
