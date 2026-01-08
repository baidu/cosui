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
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';
import Tag from '@cosui/cosmic/tag';
import type {ShopAddressProps, ShopAddressData, ShopAddressEvents} from './interface';

export default class ShopAddress extends Component<ShopAddressData> {
    static template = `
        <span
            class="cosd-shop-address cos-text-body cos-line-clamp-1"
            style="{{boxStyle}}"
        >
            <a
                s-if="folded && poi"
                s-bind="{{linkInfo}}"
                class="cosd-shop-address-weak"
                on-click="handleClick"
            >
                <cos-icon name="shop" class="cosd-shop-address-weak-icon" />
                <span s-if="poi.area" class="cos-space-ml-xxs">{{poi.area}}</span>
                <span s-if="poi.area" class="cos-space-ml-xxs cosd-shop-address-line">|</span>
                <span s-if="poi.name" class="cos-space-ml-xxs cos-line-clamp-1">{{poi.name}}</span>
            </a>
            <div s-else class="cosd-shop-address-block">
                <a
                    s-bind="{{linkInfo}}"
                    class="cosd-shop-address-info"
                    on-click="handleClick"
                >
                    <div class="cosd-shop-address-image-container">
                        <cos-image
                            src="{{thumbnail}}"
                            class="cos-image-1-1 cos-image-fit-cover cos-image-position-center cosd-shop-address-image"
                        />
                    </div>
                    <div class="cosd-shop-address-desc">
                        <div class="cosd-shop-address-subtitle cos-line-clamp-1">{{title}}</div>
                        <div s-if="distance || poi.address" class="cos-line-clamp-1 cos-color-text-minor">
                            <span class="cosd-shop-address-text">
                                <span>{{distance}}</span>
                                <span s-if="distance && poi.address" class="cosd-shop-address-line">|</span>
                                <template  s-if="tags && tags.length > 0">
                                    <cos-tag
                                        s-for="tag in tags"
                                        appearance="filled"
                                        class="cosd-shop-address-tag"
                                    >
                                        {{tag.text}}
                                    </cos-tag>
                                </template>
                                <span s-if="poi.address">{{poi.address}}</span>
                            </span>
                        </div>
                    </div>
                </a>
                <a
                    s-bind="{{navigationInfo}}"
                    class="cosd-shop-address-navigation"
                    on-click="invokeMap"
                >
                    <cos-icon name="navigation" class="cosd-shop-address-navigation-icon" />
                </a>
            </div>
        </span>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon,
        'cos-tag': Tag
    };
    static computed = {
        boxStyle(this: ShopAddress) {
            const folded = this.data.get('folded');
            const maxWidth = this.data.get('maxWidth') || '100%';
            if (folded) {
                return {
                    display: 'inline-block',
                    'max-width': maxWidth,
                    'padding-right': maxWidth === '100%' ? '0' : '6px'
                };
            }
            return {
                display: 'block',
                width: '100%'
            };
        }
    };

    initData(): ShopAddressProps {
        return {
            thumbnail: '',
            title: '',
            distance: '',
            tags: [],
            linkInfo: {},
            navigationInfo: {},
            invokeInfo: {},
            poi: undefined,
            folded: false
        };
    }

    attached() {
        this.nextTick(() => {
            const invokeInfo = this.data.get('invokeInfo');
            this.fire<ShopAddressEvents['poi-ready']>('poi-ready', {
                posName: 'pos_invoke_bdmap_direction',
                params: invokeInfo?.params,
                defaultUrl: invokeInfo?.defaultUrl,
                inited: (invokeCallback: (event: Event) => void) => {
                    // 导航点击覆盖常规处理函数
                    this.invokeMap = (event: Event) => {
                        this.fire<ShopAddressEvents['click']>('click', {event, from: 'navigation'});
                        invokeCallback(event);
                    };
                }
            });
        });
    }

    // 调起地图导航
    invokeMap(event: Event) {
        this.fire<ShopAddressEvents['click']>('click', {event, from: 'navigation'});
    };

    handleClick(event: Event) {
        this.fire<ShopAddressEvents['click']>('click', {event});
    }
}
