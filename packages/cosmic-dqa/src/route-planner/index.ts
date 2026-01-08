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
 * @file route-planner 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Swiper from '@cosui/cosmic/swiper';
import Image from '@cosui/cosmic/image';
import SwiperItem from '@cosui/cosmic/swiper-item';
import LocationCard from '@cosui/cosmic-dqa/location-card';
import FoldSwitch from '@cosui/cosmic/fold-switch';
import type {RoutePlannerData, RoutePlannerEvents, LocationItem, RouteItem} from './interface';
import {formatTransportOptions, formatTag} from './utils';

const DEFAULT_SPACE_BETWEEN = 8;

export default class RoutePlanner extends Component<RoutePlannerData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-route-planner">
            <div class="cosd-route-planner-overview">
                <div class="cosd-route-planner-path">
                    <div s-for="location, index in locationList" class="cosd-route-planner-path-item">
                        <div class="cosd-route-planner-path-item-tag">
                            <cos-icon name="mappin-fill" class="cosd-route-planner-path-item-tag-icon"/>
                            {{location.title | formatTag}}
                        </div>
                        <div s-if="index !== 0" class="cos-divider cosd-route-planner-path-item-divider"/>
                    </div>
                </div>
                <cos-fold-switch
                    folded="{{folded}}"
                    on-toggle="toggle"
                    unfold-text="详情"
                    class="cosd-route-planner-switch" />
            </div>
            <cos-swiper class="cosd-route-planner-image-list" spaceBetween="{{_spaceBetween}}" s-if="{{folded}}">
                <cos-swiper-item
                    width="calc(33.33% - 9px)"
                    s-for="location, index in locationList"
                    class="cosd-route-planner-image-item"
                >
                    <cos-image
                        src="{{location.thumbnail}}"
                        class="cos-image-1-1 cos-image-fit-cover cos-image-position-center"
                    >
                        <div
                            class="cosd-route-planner-image-item-label"
                            on-click="handleLocationClick($event, index, location)"
                        >
                            <span class="cosd-route-planner-image-item-label-text">{{location.title}}</span>
                        </div>
                    </cos-image>
                </cos-swiper-item>
            </cos-swiper>
            <div class="cosd-route-planner-location-list" s-else>
                <div s-for="location, index in locationList">
                    <div
                        class="cosd-route-planner-location-item"
                        on-click="handleLocationClick($event, index, location)"
                    >
                        <cosd-location-card s-bind="{{location}}"/>
                    </div>
                    <div
                        s-if="{{routeMap[index]}}"
                        class="cosd-route-planner-location-route"
                        on-click="handleRouteClick($event, index, routeMap[index])"
                    >
                        <span class="cosd-route-planner-location-route-distance">{{routeMap[index].distance}}</span>
                        <span
                            s-if="{{routeMap[index].transportOptions.length > 1}}"
                            class="cosd-route-planner-location-route-divider"
                        >·</span>
                        <div
                            class="cosd-route-planner-location-route-option-item"
                            s-for="transportOption in routeMap[index].transportOptions"
                        >
                            <cos-icon
                                name="{{transportOption.icon}}"
                                class="cosd-route-planner-location-route-option-item-icon"
                            />
                            <span>{{transportOption.duration}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-image': Image,
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'cos-fold-switch': FoldSwitch,
        'cosd-location-card': LocationCard
    };

    static computed = {
        routeMap(this: RoutePlanner) {
            const routeList = this.data.get('routeList') || [];
            const locationList = this.data.get('locationList') || [];
            const locationIdList = locationList.map(locationItem => locationItem.id);
            let routeMap: Record<string, RouteItem> = {};
            // 将 routeList 整理为以起点地点 index 为索引的 map
            // 同时按照交通方式展示顺序对 transportOptions 进行排序，并添加 icon
            routeList.forEach((routeItem: RouteItem) => {
                const startLocationIndex = locationIdList.indexOf(routeItem.startLocationId);
                const endLocationIndex = locationIdList.indexOf(routeItem.endLocationId);
                routeItem.transportOptions = formatTransportOptions(routeItem.transportOptions || []);
                if (
                    startLocationIndex !== -1
                    && endLocationIndex !== -1
                    && endLocationIndex - startLocationIndex === 1
                ) {
                    routeMap[startLocationIndex] = routeItem;
                }
            });
            return routeMap;
        }
    };

    static filters = {
        formatTag(tag: string): string {
            return formatTag(tag);
        }
    };

    initData(): RoutePlannerData {
        return {
            folded: true,
            locationList: [],
            routeList: [],
            _spaceBetween: DEFAULT_SPACE_BETWEEN
        };
    }

    toggle() {
        this.data.set('folded', !this.data.get('folded'));
    }

    handleLocationClick(event: Event, index: number, item: LocationItem) {
        this.fire<RoutePlannerEvents['location-click']>('location-click', {event, index, item});
    }

    handleRouteClick(event: Event, index: number, item: RouteItem) {
        this.fire<RoutePlannerEvents['route-click']>('route-click', {event, index, item});
    }
}
