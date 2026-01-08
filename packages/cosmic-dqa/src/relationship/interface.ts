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

import type {SwiperEvents} from '@cosui/cosmic/swiper/interface';

export interface LinkInfo {
    [key: string]: any;
}
export interface Member {
    // 头像
    avatar: string;
    // 名称
    name: string;
    // 人物头像形状
    avatarShape?: '' | 'circle';
    // 关系
    relation?: string;
    linkInfo?: LinkInfo;
}
export interface RelationshipProps {
    // 成员列表
    members: Member[];
    overscrollLinkInfo?: LinkInfo;
}

export type RelationshipData = Required<RelationshipProps>;

export interface RelationshipEvents {
    click: {
        event: Event;
        from: string;
    };

    scrollend: SwiperEvents['scrollend'];
}