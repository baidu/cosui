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

import type san from 'san';

// ------------- 协议接口类型 -------------
export interface UI extends OldCompatible {
    type: string;
    props?: PropsConfig;
    if?: string;
    for?: string;
    children?: UI[];
    events?: {
        [key: string]: ActionConfig[];
    };
}

export interface PropsConfig {
    [prop: string]: unknown;
    'class'?: string;
    'style'?: StyleConfig;
    'appearance'?: string;
    'slot'?: string;
}

export interface ActionConfig {
    action: string;
    option?: Record<string, unknown>;
}

export interface StyleConfig {
    [key: string]: string | number;
}

// 历史兼容
interface OldCompatible {
    data: UI['props'];
    component: UI['type'];
}

// ------------- 协议解析器接口类型 -------------

export interface CompileOption extends CompileUIOption {
    ui: UI;
    dataExtends?: Data;
    actions?: {
        [key: string]: ActionListener;
    };
    // @deprecate
    onRendered?: () => void;
    onError?: ({errCode, errMsg}: ErrorOption) => void;
};

export interface CompileUIOption {
    components: {
        [key: string]: san.Component;
    };
    nodes?: {
        [key: string]: NodeTransformer;
    };
    events?: EventOption;
};

export interface NormalizedEventOption {
    [key: string]: {
        [key: string]: EventListenerOption | undefined;
    };
}

export interface EventOption {
    [key: string]: {
        [key: string]: EventListener | EventListenerOption | undefined;
    };
};

export interface EventListenerOption {
    dom?: boolean;
    listener: EventListener;
}

export interface ActionArgs {
    $event: unknown;
    $data: {
        [key: string]: unknown;
    };
    node: string;
    args: Record<string, unknown>;
};

export type ActionListener = (args: ActionArgs) => void;
export type EventListener = (event: unknown) => void;
export type Data = Record<string, unknown>;
export type NodeTransformer = (node: UI) => UI;

// ------------- 内部接口类型 -------------
export interface Context {
    tpl: string;
    parsers: {
        [key: string]: (node: UI, context: Context) => void;
    };
    events: NormalizedEventOption;
    nodes?: CompileOption['nodes'];
    data: Record<string, unknown>;
    asyncComptRefs: string[];
    dataIndex: number;
    parseError?: ErrorOption[];
}

export interface TagMap {[key: string]: string}
export type AppComponent = san.DefinedComponentClass<AppData, AppOption>;
export interface AppData {
    __renderState: RenderState;
    __appRendered: boolean;
    __asyncComptRendered: boolean;
};

export interface AppOption {
    appendData: (data: Data, options?: san.DataChangeOption) => void;

    __setState(state: RenderState): void;
    __checkAsyncComptRendered(): boolean;
    __handleRendered(): void;
    __handleProxy($event: unknown, eventName: string, tag: string, actionArr: ActionConfig[]): void;
    __handleError(option: ErrorOption): void;
};

export type AsyncCompt = san.Component<AppData> & {
    rendering: boolean;
};

export enum RenderState {
    INITED = 'inited',
    RENDERING = 'rendering',
    RENDERED = 'rendered'
};

// 错误信息
export enum ErrorCode {
    // 不支持的 type 类型
    NOT_SUPPORT_TYPE = 1001,
    // 不支持的 action 类型
    NOT_SUPPORT_ACTION = 1002
};

export interface ErrorOption {
    errCode: ErrorCode;
    errMsg: string;
    detail?: Record<string, unknown>;
};
