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
 * @file product-card 组件接口
 */

import type {LinkInfo} from '@cosui/cosmic/util/interface';
import type {PriceProps} from '@cosui/cosmic/price/interface';

export interface ProductCardProps {
    /**
     * 跳转信息
     */
    linkInfo: LinkInfo;
    /**
     * 缩略图地址
     */
    thumbnail: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 标签列表
     */
    tags?: Array<TagItem | string>;
    /**
     * 价格信息
     */
    price?: PriceProps;
    /**
     * 销售信息，如“月销 1.2 万”
     */
    sales?: string;
    /**
     * 产品描述，以数组形式传入时使用分割线切分展示
     */
    caption?: string | string[];
    /**
     * 来源
     */
    source?: string;
}

export interface TagItem {

    /**
     * 标签文本
     */
    text: string;
    /**
     * 标签内的 icon 名称
     */
    icon?: string;
    /**
     * 标签文本颜色，应传具体的颜色样式 css
     */
    color?: string;
    /**
     * 标签背景颜色
     */
    bgColor?: string;
    /**
     * 标签内的 icon 的背景颜色
     */
    iconBgColor?: string;
}

export type ProductCardData = Required<ProductCardProps>;
