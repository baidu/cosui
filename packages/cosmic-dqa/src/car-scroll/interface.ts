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

import type {LinkInfo} from '@cosui/cosmic/util/interface';

/**
 * 汽车信息数据
 */
export interface CarItem {
    /**
     * 跳转信息
     */
    linkInfo?: LinkInfo;
    /**
     * 汽车图片
     */
    image: string;

    /**
     * 图片适应方式，对应 CSS object-fit 属性
     * - 'cover': 图片铺满容器（默认），会盖住灰底背景
     * - 'contain': 图片适应容器，宽度80%比例，高度自适应，完整显示，灰底背景可见
     */
    objectFit?: 'cover' | 'contain';

    /**
     * 汽车名称
     */
    title: string;

    /**
     * 价格，如 "¥29.99-34.69万"、"¥29.99万起" 或 "停售"
     */
    price: string;

    /**
     * 标签列表，如 ["紧凑型SUV", "油耗6.6L起"]
     */
    tags?: string[];
}

export interface CarScrollProps {
    /**
     * 汽车信息列表
     */
    items: CarItem[];
    /**
     * 标题行数
     */
    lineClamp?: number;
}

export interface CarScrollEvents {
    'item-click': {
        item: CarItem;
        index: number;
        event: Event;
    };
}

export interface CarScrollData {
    items: CarItem[];
    lineClamp?: number;
}

