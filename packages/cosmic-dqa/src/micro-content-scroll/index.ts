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
import MicroContentItem from './item';
import type {
    MicroContentScrollData,
    MicroContentItemData,
    MicroContentScrollEvents
} from './interface';

export default class MicroContentScroll extends Component<MicroContentScrollData> {

    static template = `
        <div class="cosd-micro-content-scroll">
            <div class="cosd-micro-content-scroll-title" s-if="title">
                {{title}}
            </div>
            <cos-swiper
                <!-- attr-disable-audio 标识元素禁用播报 -->
                attr-disable-audio
                space-between="8"
                on-change="handleChange"
                on-scrollend="handleScrollEnd"
                on-scroll="handleScroll"
            >
                <cos-swiper-item
                    s-for="item, index in items"
                    width="{{span === 12 ? '100%' : 'calc(' + (span / 12 * 100) + '% - 4px)'}}"
                >
                    <!-- item 是商业返回的html -->
                    <div
                        s-if="item.content && item.content.html"
                        s-bind="item.linkInfo"
                        on-click="handleItemClick(item, $event)"
                    >
                        <!-- bca-disable-next-line -->
                        {{item.content.value | raw}}
                    </div>
                    <micro-content-item
                        s-else
                        s-bind="item"
                        appearance="{{appearance}}"
                        on-click="native:handleItemClick(item, $event)"
                    />
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'micro-content-item': MicroContentItem
    };

    initData(): MicroContentScrollData {
        return {
            items: [],
            title: '',
            span: 12,
            appearance: 'top'
        };
    }
    handleItemClick(item: MicroContentItemData, event: Event) {
        this.fire<MicroContentScrollEvents['itemClick']>('item-click', {
            item,
            event
        });
    }
    handleScrollEnd(params: {index: number, prevIndex: number}) {
        this.fire<MicroContentScrollEvents['scrollend']>('scrollend', params);
    }
}
