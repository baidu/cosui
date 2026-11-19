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
    /** 无行号纯文本是否自动换行，默认 true；lineNumbers 为 true 时不生效 */
    wrap?: boolean;
    /** 定高滚动展示（内容超出容器宽度折行，整块纵向滚动）。与 foldable 互斥，优先级更高。PC 与 mobile 均支持 */
    scrollable?: boolean;
}

/**
 * 图表渲染配置（扁平开关）。传入该对象即开启 diagram，
 * 各字段控制内置基础控件是否展示。
 * 初始视图固定为图表；复杂交互（复位、置灰、全屏页自绘控件）
 * 由业务通过事件 + 命令式方法自行实现。
 */
export interface DiagramConfig {
    /** 展示 图/源码 切换按钮 */
    mode?: boolean;
    /** 复制按钮 */
    copy?: boolean;
    /** 下载按钮 */
    download?: boolean;
    /** 全屏按钮 */
    fullscreen?: boolean;
    /** 横竖屏切换按钮（移动端） */
    landscape?: boolean;
    /** 放大按钮 */
    'zoom-in'?: boolean;
    /** 缩小按钮 */
    'zoom-out'?: boolean;
    /** 复位 / 自适应按钮 */
    reset?: boolean;
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
    /**
     * 图表渲染配置：传入配置对象即开启（命中 mermaid / markmap / mindmap 代码块时
     * 渲染为可交互图表）；不传 / null / false 则关闭。各字段控制内置基础控件的展示。
     * @default undefined
     */
    diagram?: DiagramConfig | boolean;
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
