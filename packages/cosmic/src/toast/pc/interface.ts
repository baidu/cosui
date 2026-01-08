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

import {
    ToastConfig,
    ToastSize,
    ToastPosition,
    ToastActionType
} from '../interface';

// PC 端默认 Toast 配置
export const defaultConfig: ToastConfig = {
    /**
     * 消息文本
     * @default ''
     */
    message: '',

    /**
     * Toast 类型
     * @default undefined
     */
    type: undefined,

    /**
     * Toast 大小
     * @default ToastSize.MD - 默认值为中等大小
     */
    size: ToastSize.MD,

    /**
     * 是否显示关闭按钮
     * @default false
     */
    closable: false,

    /**
     * Toast 持续显示时间
     * @default 3000 - 默认值为 3000 毫秒
     */
    duration: 3000,

    /**
     * Toast 显示位置
     * @default ToastPosition.Middle - 默认值为屏幕上方
     */
    position: ToastPosition.Top,

    /**
     * Toast 上的 action 区域文本
     * @default undefined
     */
    actionText: undefined,

    /**
     * Toast 上的操作类型
     * @default ToastActionType.Link - 默认值为链接风格
     */
    actionType: ToastActionType.Link
};

export interface ToastComponentData extends ToastConfig {
    top: number;
    opacity: number;
}
