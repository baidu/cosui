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

export type Position = 'top' | 'top-start' | 'top-end'
    | 'bottom' | 'bottom-start' | 'bottom-end'
    | 'left' | 'left-start' | 'left-end'
    | 'right' | 'right-start' | 'right-end';

/**
 * 设计规范限制的样式
 * welt：贴边安全距离，pc 默认为 16 px；wise 默认为 9 px
 * padding：pc 小三角的高度或者宽度 / 2 加上 2 px 的间距; wise 小三角的高度或者宽度 / 2 加上 3 px 的间距
 */
export const SafeLimitMap = {
    'mobile': {
        welt: 9,
        padding: 9
    },
    'pc': {
        welt: 16,
        padding: 8
    }
};

export interface TipPosition {
    position?: Position;
    top?: number | null;
    right?: number | null;
    left?: number | null;
    bottom?: number | null;
    availableHeight?: number | null;
    availableWidth?: number | null;
    contentStyle?: string;
    arrowTop?: number | null;
    arrowRight?: number | null;
    arrowBottom?: number | null;
    arrowLeft?: number | null;
}

export interface TooltipTriggerProps {
    /**
     * 气泡内容
     * @default '''
     */
    content: string;

    /**
     * 气泡位置
     * @default 'top'
     */
    position: Position;

    /**
     * 是否展示气泡，仅在 trigger 为 'custom' 时生效
     * @default false
     */
    open: boolean;

    /**
     * 气泡挂载的 DOM 节点，气泡将被限定在这个节点范围内
     * @default document.body
     */
    getPopupContainer?: () => HTMLElement;

    /**
     * 气泡类名
     * @default ''
     */
    bubbleClass?: string;

    /**
     * 瞄点指向元素
     */
    _ownerEl?: HTMLElement;

    /**
     * tooltip 位置
     */
    _tipPosition?: TipPosition;

    /**
     * 是否 hover 瞄点元素
     * @default false
     * mobile
     */
    _hoverTarget?: boolean;

    /**
     * 是否 hover 气泡
     * @default false
     * mobile
     */
    _hoverTooltip?: boolean;

    /**
     * 平台
     * pc / mobile
     */
    _platform: keyof typeof SafeLimitMap;
};

export interface TooltipProps extends TooltipTriggerProps {
    /**
     * 是否禁用弹出提示
     * @default false
     */
    disabled: boolean;

    /**
     * 延迟出现的时间
     * @default 0
     */
    openDelay: number;

    /**
     * 延迟消失的时间
     * @default 0
     */
    closeDelay: number;

    /**
     * 触发展示的时机
     * @default pc: hover; wise: click
     */
    trigger: 'hover' | 'click' | 'custom';
};

export type TooltipTriggerData = Required<TooltipTriggerProps>;
export type TooltipData = Required<TooltipProps>;

export interface TooltipMethods {
    updatePosition(): void;
}