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

import {Component} from 'san';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';

import type {RelationshipProps, RelationshipData, RelationshipEvents} from './interface';
import type {SwiperEvents} from '@cosui/cosmic/swiper/interface';

export default class Relationship extends Component<RelationshipData> {
    static template = `
        <div class="cosd-relationship">
            <cos-swiper on-scrollend="handleScrollEnd" space-between="21">
                <cos-swiper-item s-for="member,index in members" width="57px">
                    <a
                        s-bind="member.linkInfo"
                        class="cosd-relationship-member"
                        on-click="handleClick($event, 'member')"
                    >
                        <cos-image
                            s-if="member.avatar"
                            src="{{member.avatar}}"
                            class="cosd-relationship-member-image cos-image-position-center cos-image-fit-fill
                                cosd-relationship-member-image-shape-{{
                                member.avatarShape}}"
                        />
                        <div
                            s-else
                            class="cosd-relationship-member-image-word cosd-relationship-member-image-shape-{{
                                member.avatarShape}}"
                        >
                            {{member.name && member.name[0]}}
                        </div>
                        <div class="cosd-relationship-member-name">{{member.name}}</div>
                        <div class="cosd-relationship-member-relation cos-line-clamp-1">{{member.relation}}</div>
                    </a>
                </cos-swiper-item>
                <cos-swiper-item
                    s-if="members.length >= 10 && overscrollLinkInfo && overscrollLinkInfo.href"
                    width="57px"
                    class="cos-flex cos-items-center"
                >
                    <a
                        s-bind="overscrollLinkInfo"
                        class="cos-flex cos-items-center cosd-relationship-more"
                        on-click="handleClick($event, 'more')"
                    >
                        <div class="cosd-relationship-overscroll-text">查看更多</div>
                        <span class="cosd-relationship-overscroll-icon">
                            <cos-icon name="right" />
                        </span>
                    </a>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon,
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem
    };

    initData(): RelationshipProps {
        return {
            members: [],
            overscrollLinkInfo: undefined
        };
    }

    attached() {}
    handleScrollEnd(params: SwiperEvents['scrollend']) {
        this.fire<RelationshipEvents['scrollend']>('scrollend', params);
    }
    handleClick(event: Event, from: string) {
        this.fire<RelationshipEvents['click']>('click', {
            event,
            from
        });
    }
}
