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
import {TagData} from '@cosui/cosmic/tag/interface';

export interface OverlayItem {
    /**
     * 展现方位
     * @default 'left-top'
     */
    position: 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';

    /**
     * 展现图标名称，仅 type 为 icon 时支持
     * @default ''
     */
    icon?: string;

    /**
     * 展现文字，type 为 text/tag 时支持
     * @default '''
     */
    text?: string;

    /**
     * 展现标签参数，仅 type 为 tag 时支持
     * @default null
     */
    tag?: TagData;
}

export interface ImageWithTagsProps {
    /**
     * image 组件参数
     * @default null
     */
    image: PCImageData | MobileImageData | null;

    /**
     * 定义覆盖在图片上方的内容
     * @default []
     */
    overlays: OverlayItem[] | [];
};
export interface ImageWithTagsEvents {
    load: {
        event: Event;
    };
    error: {
        event: Event;
    };
}
export type ImageWithTagsData = Required<ImageWithTagsProps>;
