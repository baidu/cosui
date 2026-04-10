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
    _renderItems: MasonryItem[];

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
     * 瀑布流计算出的容器高度，防止容器塌陷
     *
     * @default 0
     * @platform PC/Mobile
     */
    _containerHeight?: number;
}

export type MasonryData = Required<MasonryProps>;
