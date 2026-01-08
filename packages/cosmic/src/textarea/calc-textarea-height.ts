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
 *
 *
 * @file textarea 高度自适应
 */

const HIDDEN_STYLE = `
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1000;
    overflow: hidden;
    height: 0;
    visibility: hidden;
`;

const CONTEXT_STYLE = [
    'line-height',
    'font-family',
    'font-size',
    'width',
    'box-sizing'
];

// textarea 组件整体内间距
const PADDING = 24;

// textarea 组件整体边框宽度
const BORDER = 2;

let hiddenTextarea: HTMLTextAreaElement | null = null;

/**
 * 计算 textarea 高度，实现高度自适应
 * @param target 文本域 HTMLTextAreaElement
 * @param maxHeight 组件最大高度 number
 * @param initialHeight 组件初始默认高度 number
 * @param extraHeight 除去输入框外其余元素的高度 number
 *
 * @returns height 文本域高度
 */
export default function calcTextareaHeight(params: {
    value: string;
    maxHeight: number;
    initialHeight: number;
    extraHeight: number;
    style: CSSStyleDeclaration;
}): number {
    const {value, maxHeight, initialHeight, extraHeight, style} = params;
    if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
    }

    const contextStyle  = CONTEXT_STYLE
        .map(name => `${name}:${style.getPropertyValue(name)}`)
        .join(';');
    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = value;

    // 获取当前内容高度
    const contentHeight = hiddenTextarea.scrollHeight + extraHeight + PADDING + BORDER;
    hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
    hiddenTextarea = null;

    if (initialHeight < contentHeight) {
        return contentHeight < maxHeight ? contentHeight : maxHeight;
    }

    return initialHeight;
};