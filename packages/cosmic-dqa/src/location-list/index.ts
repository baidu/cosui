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
 * @file location-list 组件
 */

import {Component} from 'san';
import type {LocationCardData, LocationListData, LocationListEvents} from './interface';
import Swiper from '@cosui/cosmic/swiper';
import SwiperItem from '@cosui/cosmic/swiper-item';
import LocationCard from '@cosui/cosmic-dqa/location-card';

export default class LocationList extends Component<LocationListData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-location-list">
            <!-- 列表长度 <= 3 直接展示 -->
            <div
                s-if="items.length <= 3"
                s-for="item, index in items"
                class="cosd-location-list-container"
            >
                <location-card s-bind="{{item}}" on-click="native:handleClick($event, index, item)"/>
                <div s-if="index !== items.length - 1" class="cos-divider"/>
            </div>
            <!-- 列表长度 > 3 分页展示 -->
            <cos-swiper
                s-else
                indicator="outer"
                snap-align="start"
                snap-stop="always"
            >
                <cos-swiper-item s-for="page, pageIndex in pages" width="100%">
                    <div
                        s-for="item, index in page"
                        class="cosd-location-list-container"
                    >
                        <location-card
                            s-bind="{{item}}"
                            on-click="native:handleClick($event, pageIndex * 3 + index, item)"
                        />
                        <div s-if="index !== page.length - 1" class="cos-divider"/>
                    </div>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'location-card': LocationCard
    };

    static computed = {
        pages(this: LocationList) {
            const items = this.data.get('items');
            let pages: LocationCardData[][] = [];
            let curr: LocationCardData[] = [];
            items.forEach((item: LocationCardData, index: number) => {
                curr.push(item);
                if ((index + 1) % 3 === 0 || index === items.length - 1) {
                    pages.push(curr);
                    curr = [];
                }
            });
            return pages;
        }
    };

    initData(): LocationListData {
        return {
            items: []
        };
    }

    handleClick(event: Event, index: number, item: LocationCardData) {
        this.fire<LocationListEvents['click']>('click', {event, index, item});
    }
}
