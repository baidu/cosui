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

export interface TextareaEvents {
    /**
     * 输入框的值发生变化并且元素失去焦点时触发
     */
    change: {event: Event, value: string};

    /**
     * 输入、删除或修改输入框的值时触发
     */
    input: {event: InputEvent, value: string};

    /**
     * 失去焦点时触发
     */
    blur: {event: Event};

    /**
     * 获得焦点时触发
     */
    focus: {event: Event};

    /**
     * 点击清空按钮时触发
     */
    clear: {event: Event};

    /**
     * 键盘按下时触发
     */
    keydown: {event: KeyboardEvent};
}

export interface TextareaProps {
    /**
     * 输入值
     */
    value?: string;

    /**
     * 输入框占位文案
     */
    placeholder?: string;

    /**
     * 输入框高度
     */
    height?: number;

    /**
     * 输入框最大高度
     */
    maxHeight?: number;

    /**
     * 输入框禁用态
     */
    disabled?: boolean;

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
     * 输入框行数
     */
    rows?: number;

    /**
     * 输入的最大长度
     */
    maxlength?: number;

    /**
     * 输入的最小长度
     */
    minlength?: number;

    /**
     * 输入框初始默认高度
     */
    _initialHeight?: number;

    /**
     * 底部插槽
     */
    _bottomSuffixSlot?: boolean;
}

export type TextareaData = Required<TextareaProps>;