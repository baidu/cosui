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

import {PCImageData, MobileImageData} from '@cosui/cosmic/image/interface';
import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface ImageGroupProps {
    /**
     * 图片信息
     */
    list: PCImageData[] | MobileImageData[];
    /**
     * 组件整体跳转链接，不支持区分图片跳转
     */
    linkInfo?: LinkInfo;
    /**
     * 子项跨度，所占栅格列数
     */
    span?: number | null;
    /**
     * 最大行数，不超过 3 行
     */
    maxRow?: number;
    /**
     * 是否显示主图
     * 不对外保留，线上仅ai_ecology使用
     * default: false
     */
    showMainImage?: boolean;
    /**
     * 子项图片比例
     */
    ratio?: string;
    /**
     * 	是否以横滑样式展示图片
     *  default: false
     */
    scrollable?: boolean;
};


export enum RATIO {
    /**
     * 横图比例
     */
    HORIZONTAL = '3-2',
    /**
     * 方图比例
     */
    SQUARE = '1-1',
    /**
     * 竖图比例
     */
    VERTICAL = '3-4'
}
export interface ImageGroupEvents {
    scroll: {
        event: Event;
    };
    click: {
        event: Event;
        image: PCImageData | MobileImageData;
        index: number;
    };
}
export type ImageGroupData = Required<ImageGroupProps>;