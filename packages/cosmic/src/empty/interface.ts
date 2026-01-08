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

import {Size} from '../util';

export interface EmptyProps {
    /**
     * 组件尺寸，'sm'|'md'，对应卡内空状态、空页面两种类型
     * @default Size.SM
     */
    size: Size;
    /**
     * 图标信息，判断是否为 url，否则作为 icon 名称
     */
    icon: string;
    /**
     * 标题内容
     */
    title: string;
    /**
     * 辅助描述信息
     */
    description?: string;
};

export type EmptyData = Required<EmptyProps>;