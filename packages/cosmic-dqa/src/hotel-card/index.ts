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
import type {HotelCardData, HotelCardProps, TagItem} from './interface';
import Image from '@cosui/cosmic/image';
import Score from '@cosui/cosmic/score';
import Price from '@cosui/cosmic/price';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';

export default class HotelCard extends Component<HotelCardData> {
    static template = `
        <component
            s-is="{{linkInfo.href ? 'a' : 'div'}}"
            s-bind="linkInfo.href ? linkInfo : ''"
            class="cosd-hotel-card{{linkInfo.href ? ' cos-link' : ''}}"
        >
            <div class="cos-col-3 cosd-hotel-card-thumbnail">
                 <cos-image
                    src="{{thumbnail}}"
                    class="cos-image-fit-cover cos-image-position-center cos-image-1-1"
                />
            </div>
            <div class="cos-col-8 cosd-hotel-card-content">
                <div>
                    <div class="cosd-hotel-card-title cos-text-subtitle">
                        {{title}}
                    </div>
                    <div s-if="tags.length" class="cosd-hotel-card-line cosd-hotel-card-tags">
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
                                class="cosd-location-card-tags-icon"
                                style="{{{
                                    'background-color': tag.iconBgColor || 'var(--cos-tag-color-bg)'
                                }}}"
                            />
                            {{tag.text}}
                        </cos-tag>
                    </div>
                    <div class="cosd-hotel-card-line cos-text-body cos-space-mt-xs">
                        <cos-score
                            s-if="score"
                            s-bind="score"
                            class="cosd-hotel-card-score"
                        />
                        <div class="cos-space-ml-xs cos-line-clamp-1">
                            <span s-if="distance" class="cosd-hotel-card-range">
                                {{distance}}
                            </span>
                            <span s-if="district" class="cosd-hotel-card-district">
                                {{district}}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        s-if="price"
                        class="cosd-hotel-card-line cosd-hotel-card-price"
                    >
                        <cos-price size="md" s-bind="price"/>
                    </div>
                    <div
                        s-if="source"
                        class="cosd-hotel-card-line cos-text-body cos-space-mt-xs
                            cosd-hotel-card-source cos-space-mb-none"
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
        'cos-score': Score,
        'cos-price': Price,
        'cos-tag': Tag,
        'cos-icon': Icon
    };

    static computed = {
        _tags(this: HotelCard): TagItem[] {
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
        }
    };

    initData(): HotelCardProps {
        return {
            linkInfo: {
                href: ''
            },
            thumbnail: '',
            title: '',
            tags: [],
            score: undefined,
            distance: '',
            district: '',
            price: undefined,
            source: ''
        };
    }
}
