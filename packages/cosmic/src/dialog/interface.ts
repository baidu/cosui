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

export enum HeaderIcon {
    info = 'info-circle-fill',
    success = 'check-circle-fill',
    warning = 'info-circle-fill',
    error = 'close-circle-fill'
}

export interface DialogEvents {
    close: {event: Event};
    ok: {event: Event};
    cancel: {event: Event};
    customBehavior: {event: Event};
}

export interface DialogProps {
    /**
     * 弹窗是否打开
     * @default false
     */
    open?: boolean;

    /**
     * 标题文字
     * @default ''
     */
    title?: string;

    /**
     * 确定按钮文字，无内容时不显示
     * @default '确定'
     */
    okText?: string;

    /**
     * 取消按钮文字，无内容时不显示
     * @default '取消'
     */
    cancelText?: string;

    /**
     * customBehavior 按钮文字，无内容时不显示
     * @default ''
     */
    customBehaviorText?: string;

    /**
     * 蒙层是否点击可关闭
     * @default false
     */
    outsideClosable?: boolean;

    /**
     * 是否显示关闭按钮
     * @default false
     */
    closable?: boolean;

    /**
     * 是否不显示标题；当为 true 时，视为开启异形模式，内容区不再预留间距
     * @default false
     */
    headless?: boolean;

    /**
     * 是否不显示底部操作区
     * @default false
     */
    footless?: boolean;

    /**
     * 弹窗类型
     * @default null
     */
    appearance?: 'info' | 'success' | 'warning' | 'error' | null;
}

export type DialogData = Required<DialogProps>;
