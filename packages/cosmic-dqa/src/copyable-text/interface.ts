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
 * @file copyable-text/interface.ts
 * @description copyable-text Interface
 */

export interface CopyableTextProps {
    // 变体
    appearance: 'paragraph' | 'phrase';
    // 左下角标签
    note?: string;
    // 文本内容
    content: Array<Record<string, unknown>>;
    // 打字机参数
    typing?: Record<string, unknown> | null;
    // markdown 渲染完成
    _renderFinished: boolean;
}

export interface CopyableTextEvents {
    'copy-click': {
        event: Event;
        content: string;
    };

    'typing-finished': void;
}

export type CopyableTextData = Required<CopyableTextProps>;