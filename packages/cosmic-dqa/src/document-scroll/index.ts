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
import DocumentCard from './card';
import type {DocumentScrollData, DocumentCardData, DocumentScrollEvents} from './interface';
import type {SwiperEvents} from '@cosui/cosmic/swiper/interface';

export default class DocumentScroll extends Component<DocumentScrollData> {

    static template = `
        <div class="cosd-document-scroll">
            <cos-swiper
                attr-disable-audio
                space-between="8"
                on-change="handleChange"
                on-scrollend="handleScrollEnd"
            >
                <cos-swiper-item
                    s-for="item, index in items"
                    width="{{span === 12 ? '100%' : 'calc(' + (span / 12 * 100) + '% - 4px)'}}"
                >
                    <document-card
                        s-bind="item"
                        on-click="native:handleItemClick(item, $event)"
                    ></document-card>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'document-card': DocumentCard
    };

    initData(): DocumentScrollData {
        return {
            items: [],
            span: 12
        };
    }
    handleItemClick(item: DocumentCardData, event: Event) {
        this.fire<DocumentScrollEvents['item-click']>('item-click', {
            item,
            event
        });
    }
    handleScrollEnd(params: SwiperEvents['scrollend']) {
        this.fire<DocumentScrollEvents['scrollend']>('scrollend', params);
    }
}
