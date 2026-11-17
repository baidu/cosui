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

interface TypingConfig {
    mode: 'all' | 'sentence' | 'word';
    speed?: number;
    cursor?: boolean;
    hideMask: boolean;

    /** 逐句打字模式下，渐变动效的持续时长 */
    animationDuration?: number;
}
export interface Table {
    copy?: boolean;
    fullscreen?: boolean;
    download?: boolean;
}
export interface Code {
    fullscreen?: boolean;
    lineNumbers?: boolean;
    foldable?: boolean;
}
export interface MarkdownData {
    /**
     * markdown 语法文本
     * @default ''
     */
    content: string;
    config?: Config;
    typing?: TypingConfig;
    /**
     * 表格表头的配置
     */
    table?: Table;
    /**
     * 代码块的配置
     */
    code?: Code;
};

export interface Config {
    /**
     * 自定义的指令
     */
    [key: string]: {
        [key: string]: any;
    };
};

export interface MlSearchLinkContext {
    id?: string;
}

export interface MlSearchLinkInfo {
    clickable?: boolean;
    href?: string;
    target?: string;
    query?: string;
}

export interface MlSearchConfig {
    sa?: string;
    getLinkInfo?: (
        text: string,
        context?: MlSearchLinkContext
    ) => MlSearchLinkInfo;
}

export interface DirectiveInfo {
    name: string;
    properties?: {
        [key: string]: unknown;
    };
    content?: string;
    children?: HastNode[];
}
export interface MdastNode {
    name: string;
    data?: Record<string, unknown>;
    properties?: Record<string, unknown>;
    content?: string;
    url?: string;
}
export interface HastNode {
    type: string;
    tagName?: string;
    properties?: Record<string, unknown>;
    children?: HastNode[];
    value?: string;
    /** marklang 会把代码围栏 language 后面的元信息串挂到 code 节点的 data.meta 上 */
    data?: {
        [key: string]: unknown;
        meta?: string;
    };
}

// video 默认封面
export const DEFAULT_POSTER = 'https://gips2.baidu.com/it/u=2590552663,1638303207&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f1138_640';

export interface MarkdownMethods {
    stop(): void;
    focus(): void;
    blur(): void;
    refreshMlSearchLinks(ids?: string[]): void;
}

export interface MlIntentData {
    text: string;
    intentText: string;
    index?: number;
}
