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
import Image from '@cosui/cosmic/image';
import Tag from '@cosui/cosmic/tag';
import Price from '@cosui/cosmic/price';
import type {CarScrollData, CarItem, CarScrollEvents} from './interface';

export default class CarScroll extends Component<CarScrollData> {
    static trimWhitespace = 'all';
    static template = `
        <div class="cosd-car-scroll">
            <cos-swiper
                attr-disable-audio
                class="cosd-car-scroll-swiper"
                space-between="{{8}}"
            >
                <cos-swiper-item
                    s-for="item, index in items"
                    width="calc(100% / 2.3 - var(--cos-space-3xs))"
                    class="cosd-car-scroll-item"
                >
                    <component
                        s-is="{{item.linkInfo && item.linkInfo.href ? 'a' : 'div'}}"
                        s-bind="item.linkInfo"
                        class="cosd-car-scroll-card"
                        on-click="native:handleItemClick(item, index, $event)"
                    >
                        <div class="cosd-car-scroll-image-wrapper">
                            <cos-image
                                class="cosd-car-scroll-image{{
                                    item.objectFit === 'contain' ? ' cos-image-fit-contain' : ' cos-image-fit-fill'
                                }}"
                                src="{{item.image}}"
                            />
                        </div>
                        <div class="cosd-car-scroll-content{{
                            _lineClamp > 1 ? ' cosd-car-scroll-content-multi-line' : ''
                        }}">
                            <div class="cosd-car-scroll-title cosd-car-scroll-title-{{
                                _lineClamp
                            }}">{{item.title}}</div>
                            <div class="cosd-car-scroll-bottom">
                                <div class="cosd-car-scroll-price">
                                    <cos-price
                                        s-if="_parsedPrices[index]"
                                        s-bind="{{_parsedPrices[index]}}"
                                    />
                                    <span s-else class="cosd-car-scroll-price-text">{{item.price}}</span>
                                </div>
                                <div s-if="item.tags && item.tags.length" class="cosd-car-scroll-tags">
                                    <cos-tag
                                        s-for="tag in item.tags"
                                        appearance="filled"
                                        size="sm"
                                        class="cosd-car-scroll-tag cos-color-bg-dent"
                                    >{{tag}}</cos-tag>
                                </div>
                            </div>
                        </div>
                    </component>
                </cos-swiper-item>
            </cos-swiper>
        </div>
    `;

    static components = {
        'cos-swiper': Swiper,
        'cos-swiper-item': SwiperItem,
        'cos-image': Image,
        'cos-tag': Tag,
        'cos-price': Price
    };

    static computed = {
        _lineClamp(this: CarScroll) {
            const lineClamp = this.data.get('lineClamp');
            // 验证是否是有效的数字（1、2、3），如果不是则默认使用 2
            if (lineClamp === 1 || lineClamp === 2 || lineClamp === 3) {
                return lineClamp;
            }
            return 2;
        },
        _parsedPrices(this: CarScroll) {
            const items = this.data.get('items') || [];
            const prices: Record<number, any> = {};

            items.forEach((item: CarItem, index: number) => {
                const priceStr = item.price;
                // 解析价格字符串，如 "¥29.99-34.69万" 或 "¥29.99万起"
                const regex = /¥?([\d.]+)(?:-([\d.]+))?(万|元)?(起)?/;
                const match = regex.exec(priceStr);
                if (!match) {
                    // 如果不匹配价格格式，不设置 prices[index]，让模板显示纯文本
                    return;
                }

                const sign = '¥';
                const min = parseFloat(match[1]);
                const max = match[2] ? parseFloat(match[2]) : min;
                const unit = match[3] || '';
                const suffix = match[4] || '';

                // 如果有区间价格
                if (match[2]) {
                    // 转换为元（如果是万），Price组件会自动格式化
                    const minValue = unit === '万' ? min * 10000 : min;
                    const maxValue = unit === '万' ? max * 10000 : max;
                    prices[index] = {
                        sign,
                        range: true,
                        value: minValue,
                        min: minValue,
                        max: maxValue,
                        unit: suffix,
                        originValue: 0,
                        format: true
                    };
                }
                else {
                    // 单个价格，转换为元（如果是万）
                    const value = unit === '万' ? min * 10000 : min;
                    prices[index] = {
                        sign,
                        range: false,
                        value,
                        min: value,
                        max: value,
                        unit: suffix,
                        originValue: 0,
                        format: true
                    };
                }
            });

            return prices;
        }
    };

    initData(): CarScrollData {
        return {
            items: [],
            lineClamp: 1
        };
    }

    handleItemClick(item: CarItem, index: number, event: Event) {
        this.fire<CarScrollEvents['item-click']>('item-click', {
            item,
            index,
            event
        });
    }
}

