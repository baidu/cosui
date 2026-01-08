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
 *
 * @file swiper-item
 */

import {Component} from 'san';
import {SwiperItemData, SwiperItemMessages} from './interface';

export default class SwiperItem extends Component<SwiperItemData> {
    static trimWhitespace = 'all';
    static template = `
        <div
            class="cos-swiper-item{{_itemHidden ? ' cos-invisible' : ''}}"
            style="width: {{width}};"
        >
            <fragment s-if="!_itemAutoHeight">
                <slot></slot>
            </fragment>
            <!-- 高度自适应场景: 用于获取 slot 内容高度 -->
            <div s-else class="cos-swiper-item-content">
                <slot></slot>
            </div>
        </div>
    `;

    initData(): SwiperItemData {
        return {
            width: 'auto',
            _itemHidden: this?.parentComponent?.data.get('_itemHidden'),
            _itemWidth: 0,
            _itemAutoHeight: this?.parentComponent?.data.get('autoHeight')
        };
    }

    inited() {
        this.dispatch<SwiperItemMessages['cos:swiper-item-inited']>('cos:swiper-item-inited', {});
    }

    attached() {
        this.nextTick(() => {
            const itemWidth = this.el?.getBoundingClientRect()?.width || 0;
            this.data.set('_itemWidth', itemWidth);
            this.dispatch<SwiperItemMessages['cos:swiper-item-attached']>('cos:swiper-item-attached', {
                el: this.el,
                elWidth: itemWidth
            });
        });
    }

    detached() {
        this.dispatch<SwiperItemMessages['cos:swiper-item-detached']>('cos:swiper-item-detached', {
            el: this.el,
            elWidth: this.data.get('_itemWidth')
        });
    }
}
