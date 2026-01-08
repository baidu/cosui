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

export enum ToastPosition {
    Top = 'top',
    Middle = 'middle',
    Bottom = 'bottom',
}

export enum ToastType {
    // Mobile 和 PC 端均支持的枚举类型
    Success = 'success',
    // Mobile 端枚举类型
    Avatar = 'avatar',
    Refresh = 'refresh',
    // PC 端枚举类型
    Info = 'info',
    Error = 'error',
    Warning = 'warning',
}

export enum ToastSize {
    MD = 'md',
    LG = 'lg',
}

export enum ToastActionType {
    Link = 'link',
    Button = 'button',
}

/**
 * Toast 配置接口
 */
export interface ToastConfig {
    /**
     * 消息文本
     * @default ''
     */
    message: string;

    /**
     * Toast 类型
     * @default undefined
     */
    type?: ToastType;

    /**
     * Toast 大小
     * @default ToastSize.MD - 默认值为中等大小
     */
    size?: `${ToastSize}`;

    /**
     * 是否显示关闭按钮
     * @default false
     */
    closable?: boolean;

    /**
     * Toast 持续显示时间
     * @default 默认值随着端变化
     */
    duration?: number;

    /**
     * Toast 显示位置
     * @default ToastPosition.Middle - 默认值随着端变化
     */
    position?: ToastPosition;

    /**
     * Toast 距离页面顶部的高度，单位 px
     * @default undefined
     */
    top?: number | undefined;

    /**
     * Toast 上的 action 区域文本
     * @default undefined
     */
    actionText?: string;

    /**
     * Toast 上的操作类型
     * @default ToastActionType.Link - 默认值为链接风格
     */
    actionType?: ToastActionType;

    /**
     * Toast 上的 action 区域回调函数
     * @default undefined
     */
    onAction?: (event?: Event) => void;

    /**
     * Toast 关闭时的回调函数
     * @default undefined
     */
    onClose?: (event?: Event) => void;

    /**
     * 用于定位 Toast 的父元素选择器
     * @default undefined
     */
    parentSelector?: HTMLElement;

    /**
     * 图标旋转一周的时长
     * @default 0
     */
    animationDuration?: number;

    /**
     * 是否允许使用原生 Toast
     * @default true
     */
    allowNative?: boolean;
}

export type ToastData = Required<ToastConfig>;

export interface ToastEvents {
    /**
     * 点击操作按钮时触发
     */
    action: {event: Event};

    /**
     * 手动关闭Toast时触发
     */
    close: {event: Event};

    /**
     * Toast消失时触发
     */
    dismiss: void;
}