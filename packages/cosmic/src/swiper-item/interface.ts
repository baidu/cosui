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

export interface SwiperItemProps {
    /**
     * 宽度
     */
    width?: string;

    /**
     * swiperItem 是否可见
     * 针对传了activeIndex的情况，避免展现ssr阶段渲染的内容切换到默认项的过程，因此这种情况下item先默认隐藏后才展现
     */
    _itemHidden?: boolean;

    /**
     * 内容宽度
     */
    _itemWidth?: number;

    /**
     * 是否高度自适应
     */
    _itemAutoHeight?: boolean;
}

export interface SwiperItemMessages {
    /**
     * swiper-item初始化完成事件
     */
    'cos:swiper-item-inited': Record<string, never>;
    /**
     * swiper-item挂载完成事件
     */
    'cos:swiper-item-attached': {
        el?: Element;
        elWidth: number;
    };
    /**
     * swiper-item卸载事件
     */
    'cos:swiper-item-detached': {
        el?: Element;
        elWidth: number;
    };
}

export type SwiperItemData = Required<SwiperItemProps>;