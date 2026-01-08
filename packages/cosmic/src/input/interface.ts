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

export interface InputProps {

    /**
     * 输入框类型
     */
    type?: string;

    /**
     * 输入值
     */
    value: string;

    /**
     * 输入框占位文案
     */
    placeholder?: string;

    /**
     * 输入框尺寸
     */
    size?: 'sm' | 'md' | 'lg';

    /**
     * 输入框禁用态
     */
    disabled?: boolean;

    /**
     * 输入的最大长度
     */
    maxlength?: number;

    /**
     * 输入的最小长度
     */
    minlength?: number;

    /**
     * 清空按钮
     */
    clear?: boolean;

    /**
     * 字数统计
     */
    count?: boolean;

    /**
     * 输入框风格
     */
    appearance?: 'outline' | 'filled';

    /**
     * 移动设备虚拟键盘上回车键的显示方式，与原生 enterkeyhint 一致
     */
    enterkeyhint?: string;

    /**
     * 输入框聚焦状态
     */
    _focus?: boolean;

    /**
     * 按钮 slot
     */
    _buttonSlot?: boolean;

    /**
     * 标题 slot
     */
    _titleSlot?: boolean;

    /**
     * 前置 slot
     */
    _prefixSlot?: boolean;
}

export interface InputEvents {
    change: {
        event: Event;
        value: string;
    };
    input: {
        event: Event;
        value: string;
    };
    blur: {
        event: Event;
    };
    focus: {
        event: Event;
    };
    clear: {
        event: Event;
    };
    keyup: {
        event: Event;
    };
    keydown: {
        event: Event;
    };
}

export type InputData = Required<InputProps>;
