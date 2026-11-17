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
import type {ProductCardData, ProductCardProps, TagItem} from './interface';
import Image from '@cosui/cosmic/image';
import Price from '@cosui/cosmic/price';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';

export default class ProductCard extends Component<ProductCardData> {
    static template = `
        <component
            s-is="{{linkInfo.href ? 'a' : 'div'}}"
            s-bind="linkInfo.href ? linkInfo : ''"
            class="cosd-product-card{{linkInfo.href ? ' cos-link' : ''}}"
        >
            <div class="cos-col-3 cosd-product-card-thumbnail">
                <cos-image
                    src="{{thumbnail}}"
                    class="cos-image-fit-cover cos-image-position-center cos-image-1-1"
                />
            </div>
            <div class="cos-col-8 cosd-product-card-content">
                <div>
                    <div class="cosd-product-card-title cos-text-subtitle">
                        {{title}}
                    </div>
                    <div s-if="_tags.length" class="cosd-product-card-line cosd-product-card-tags">
                        <cos-tag
                            s-for="tag in _tags"
                            appearance="filled"
                            style="{{{
                                color: tag.color || 'var(--cos-color-text-tiny-active)',
                                'background-color': tag.bgColor || 'var(--cos-tag-color-bg)'
                            }}}"
                        >
                            <cos-icon
                                s-if="{{tag.icon}}"
                                name="{{tag.icon}}"
                                class="cosd-product-card-tags-icon"
                                style="{{{
                                    'background-color': tag.iconBgColor || 'var(--cos-tag-color-bg)'
                                }}}"
                            />
                            {{tag.text}}
                        </cos-tag>
                    </div>
                    <div
                        s-if="_caption.length"
                        class="cosd-product-card-line cos-text-body cos-space-mt-xs cosd-product-card-caption"
                    >
                        <fragment s-for="item, index in _caption">
                            <span
                                s-if="index"
                                class="cosd-product-card-caption-divider cos-divider-vertical"
                            ></span>
                            <span class="cosd-product-card-caption-item">
                                {{item}}
                            </span>
                        </fragment>
                    </div>
                </div>
                <div>
                    <div
                        s-if="price"
                        class="cosd-product-card-line cosd-product-card-price"
                    >
                        <cos-price size="md" s-bind="price" />
                        <span s-if="sales" class="cosd-product-card-sales">
                            {{sales}}
                        </span>
                    </div>
                    <div
                        s-if="source"
                        class="cosd-product-card-line cosd-product-card-source cos-space-mb-none"
                    >
                        {{source}}
                    </div>
                </div>
            </div>
        </component>
    `;

    static trimWhitespace = 'all';

    static components = {
        'cos-image': Image,
        'cos-price': Price,
        'cos-tag': Tag,
        'cos-icon': Icon
    };

    static computed = {
        _tags(this: ProductCard): TagItem[] {
            const tags = this.data.get('tags');
            const _tags: TagItem[] = [];

            // 处理简写形式的标签，默认为灰色、线型
            tags.forEach(item => {
                if (!item) {
                    return;
                }
                if (typeof item === 'string') {
                    _tags.push({
                        text: item
                    });
                }
                else {
                    _tags.push(item);
                }
            });

            return _tags;
        },
        _caption(this: ProductCard): string[] {
            const caption = this.data.get('caption');

            if (!caption) {
                return [];
            }

            return (typeof caption === 'string' ? [caption] : caption).filter(item => !!item);
        }
    };

    initData(): ProductCardProps {
        return {
            linkInfo: {
                href: ''
            },
            thumbnail: '',
            title: '',
            tags: [],
            price: undefined,
            sales: '',
            caption: '',
            source: ''
        };
    }
}
