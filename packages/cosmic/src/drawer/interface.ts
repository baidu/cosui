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

import {Position} from '../util';
/**
 * Drawer 配置接口
 */
export interface DrawerProps {
    /**
     * 抽屉是否显示
     * @default false
     */
    open: boolean;
    /**
     * 抽屉的弹出方向
     * @default Position.Bottom
     */
    position?: Position;

    /**
     * 是否显示遮罩层
     * @default true
     */
    mask?: boolean;

    /**
     * 标题文字
     * @default undefined
     */
    title?: string;

    /**
     * 是否显示关闭按钮
     * @default true
     */
    closeable?: boolean;

    /**
     * 是否支持滑动关闭
     * @default false
     */
    closeOnSwipe?: boolean;

    /**
     * 指定父级 DOM，弹层将会渲染至该 DOM
     * @default undefined
     */
    getPopupContainer?: () => HTMLElement;

    /**
     * 遮罩层样式
     * @default '''
     */
    _maskStyle: string;

    /**
     * 容器样式
     * @default '''
     */
     _containerStyle: string;

    /**
     * Drawer 关闭时的回调函数
     * @default undefined
     */
    close?: (event?: Event) => void;

    /**
     * Drawer 关闭时是否销毁DOM
     * 该属性适用于解决特定业务场景下，频繁创建和销毁 DOM 带来的性能开销问题
     * 或某些场景下组件内部状态需要保持的场景
     * @default true
     */
    destroyOnClose?: boolean;

    /**
     * 组件内部渲染状态
     */
    _open: boolean;
}

export interface DrawerEvents {
    close: {
        event: Event;
    };
}

export type DrawerData = Required<DrawerProps>;