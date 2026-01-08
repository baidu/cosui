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

import {Node, Parent} from 'mdast';
import {Root, Element} from 'hast';

export interface DirectiveInfo {

    // 指令名称
    name: string;

    // 属性
    properties?: Record<string, unknown>;

    // 文本内容
    content?: string;

    children?: Node[];
}

export interface MdastTransformerParam {
    node: Node;
    index?: number;
    parent?: Parent;
    dataMap?: DataMap;
}

export interface HastTransformerParam {
    node: Element;
    index?: number;
    parent?: Element | Root;
    dataMap?: DataMap;
}

export interface DataMap {
    [key: string]: unknown;
}
export interface Directives {
    [key: string]: (info: DirectiveInfo, dom?: ChildNode | null) => HTMLElement | string | void;
}

export interface Transformers {
    mdast?: Record<string, (params: MdastTransformerParam) => void>;
    hast?: Record<string, (params: HastTransformerParam) => void>;
}

export interface Options {
    directives?: Directives;
    transformers?: Transformers;
    singleTilde?: boolean;
    autolink?: boolean;
}
