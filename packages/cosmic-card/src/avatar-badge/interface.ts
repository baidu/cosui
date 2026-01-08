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

import {Size} from '../util/constant';

export enum Type {
    V1 = 'vip-1',
    V2 = 'vip-2',
    V3 = 'vip-3',
    LIVE = 'live'
}

export interface AvatarBadgeProps {
    /**
     * 徽章类型
     * @default null
     */
    type: Type | null;

    /**
     * 使用文字徽章，与 type 互斥，且优先级比 type 高
     * @default ''
     */
    text: string;

    /**
     * 徽章大小
     * @default null
     */
    size: Size | null;
};
export type AvatarBadgeData = Required<AvatarBadgeProps>;
