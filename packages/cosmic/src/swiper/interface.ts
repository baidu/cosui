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

import type {LinkInfo} from '../util/interface';

export interface SwiperProps {
    /**
     * 是否自动切换
     * @default false
     * @platform PC/Mobile
     */
    autoplay?: boolean | 'visible';

    /**
     * 自动切换的时间间隔，单位为毫秒
     * @default 3000
     * @platform PC/Mobile
     */
    interval?: number;

    /**
     * 是否循环展示
     * @default false
     * @platform PC/Mobile
     */
    loop?: boolean;

    /**
     * 指示器位置或类型。 number仅适用于PC端arrow参数为bottom的情况，显示页码
     * @default ''
     * @platform PC/Mobile
     */
    indicator?: '' | 'left' | 'center' | 'right' | 'outer' | 'number';

    /**
     * 当前活动的位置
     * @default 0
     * @platform PC/Mobile
     */
    activeIndex?: number;

    /**
     * 内容间距
     * @default 9
     * @platform PC/Mobile
     */
    spaceBetween?: number;

    /**
     * 点击对齐方式
     */
    alignType?: 'left' | 'center';

    /**
     * 吸附功能
     * @default 'none'
     * @platform Mobile/PC
     */
    snapAlign?: string;

    /**
     * 滚动过程中是否会强制停止元素
     * @default 'normal'
     * @platform Mobile/PC
     */
    snapStop?: string;

    /**
     * 滚动行为
     * @default 'smooth'
     * @platform Mobile/PC
     */
    scrollBehavior?: 'auto' | 'smooth' | '';

    /**
     * 指示器列表
     * swiperItem 在 attached 挂载，SSR 场景下指示器渲染较慢，故监听 swiperItem inited，渲染指示器
     */
    _indicatorItems?: Array<Record<string, unknown>>;

    /**
     * 指示器列表长度
     */
    _indicatorItemsLen?: number;

    /**
     * 是否自适应高度
     * @default false
     * @platform PC/Mobile
     */
    autoHeight?: boolean;

    /**
     * Swiper高度
     * @default 0
     * @platform PC/Mobile
     */
    _swiperHeight: number;

    /**
     * Swiper项列表
     * @default []
     * @platform PC/Mobile
     */
    _swiperItems: any[];

    /**
     * 是否是初始渲染
     * @default true
     * @platform PC/Mobile
     */
    _isInitialRender: boolean;
}

export interface SwiperPcProps extends SwiperProps {

    /**
     * 箭头位置
     * @default 'sides'
     * @platform PC
     */
    arrow?: 'sides' | 'bottom';

    /**
     * 是否开启横滑滚动功能
     * @default false
     * @platform PC
     */
    scrollable?: boolean;

    /**
     * 偏移量
     * @default 0
     * @platform PC
     */
    _transOffset: number;

    /**
     * 总宽度
     * @default 0
     * @platform PC
     */
    _totalWidth: number;

    /**
     * 组件内真正使用的 activeIndex
     * @default 0
     * @platform PC
     */
    _activeIndex: number;

    /**
     * 上一个激活的索引
     * @default 0
     * @platform PC
     */
    _prevActiveIndex: number;

    /**
     * 开始循环标记
     * @default false
     * @platform PC
     */
    _startLoop?: boolean;

    /**
     * Swiper项数量
     * @default 0
     * @platform PC
     */
    _swiperItemsLen?: number;

    /**
     * Swiper列表宽度
     * @default 0
     * @platform PC
     */
    _swiperListWidth?: number;

}

export interface SwiperMobileProps extends SwiperProps {
    /**
     * 是否带有横向滚动条
     * @default false
     * @platform Mobile
     */
    scrollbar?: boolean;

    /**
     * Swiper宽度
     * @default 0
     * @platform Mobile
     */
    _swiperWidth: number;


    /**
     * 查看更多跳转链接
     * @default ''
     * @platform Mobile
     */
    overscrollUrl?: string;

    /**
     * 查看更多跳转链接属性集
     * @default {}
     * @platform Mobile
     */
    overscrollLinkInfo?: LinkInfo;

    /**
     * 查看更多文案
     * @default '左滑更多'
     * @platform Mobile
     */
    overscrollText?: string;

    /**
     * 松手查看文案
     * @default '松手查看'
     * @platform Mobile
     */
    overscrollMoveText?: string;

    /**
     * 上一次的索引
     * @default 0
     * @platform Mobile
     */
    _prevIndex?: number;

    /**
     * 滑块偏移量
     * @default 0
     * @platform Mobile
     */
    _slide?: number;

    /**
     * 当前激活的索引
     * 组件内真正使用的 activeIndex，如果不分开 scroll 的时候更新 activeIndex 会闪动停止 scroll
     */
    _activeIndex: number;

    /**
     * 查看更多偏移量计算
     * @default 0
     * @platform Mobile
     */
    _offsetX?: number;

    /**
     * 开始索引
     * @platform Mobile
     */
    _startIndex?: number;

    /**
     *标记触摸是否已结束
     * @default false
     * @platform Mobile
     */
    _touchEndPending?: boolean;

    /**
     * swiperItem 是否可见
     * 针对传了activeIndex的情况，避免展现ssr阶段渲染的内容切换到默认项的过程，因此这种情况下item先默认隐藏后才展现
     * @platform Mobile
     */
    _itemHidden?: boolean;
}

// 添加事件接口定义
export interface SwiperEvents {
    /**
     * 切换内容时触发
     * @platform PC/Mobile
     */
    'change': {
        index: number;
        prevIndex: number;
        autoplay: boolean;
        event?: Event | null;
    };

    /**
     * 横滑出现触发查看更多时触发
     * @platform Mobile
     */
    'over-scroll': {
        el: HTMLElement;
    };

    /**
     * 滑动结束时触发
     * @platform Mobile/PC
     */
    'scrollend': {
        index: number;
        prevIndex: number;
    };

    /**
     * 滑动过程触发
     * @platform Mobile/PC
     */
    'scroll': {
        event: Event;
    };
}

export type SwiperPcData = Required<SwiperPcProps>;
export type SwiperMobileData = Required<SwiperMobileProps>;
export type SwiperData = Required<SwiperMobileProps & SwiperPcProps>;

export interface SwiperPCMethods {
    scrollToIndex(index: number, needFireChange?: boolean): void;
    prev?(): void;
    next?(): void;
    updatedWidth?(): void;
}

export interface SwiperMobileMethods {
    scrollToIndex(index: number, behavior?: 'auto' | 'smooth'): void;
}
