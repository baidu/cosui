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

import type {LinkInfo} from '@cosui/cosmic/util/interface';

export interface CompanyGraphProps {
    /**
     * 跳转信息
     */
    linkInfo?: LinkInfo;
    /**
     * 图谱节点尺寸
     */
    size?: 'md' | 'sm';
    /**
     * 图谱中心节点名称
     */
    name: string;
    /**
     * 图谱上方一级关系节点列表
     */
    inbound?: GraphNode[];
    /**
     * 图谱下方一级关系节点列表
     */
    outbound?: GraphNode[];
}

export interface GraphChildNodeProps {
    /**
     * 图谱子节点类型
     */
    type: 'inbound' | 'outbound';
    /**
     * 图谱节点尺寸
     */
    size?: 'md' | 'sm';
    /**
     * 图谱子节点
     */
    data: GraphNode;
}

export interface GraphNode {
    /**
     * 图谱关系节点名称
     */
    name: string;
    /**
     * 图谱关系节点描述
     */
    caption?: string;
    /**
     * 图谱关系节点与中心节点关系
     */
    relation?: string;
}