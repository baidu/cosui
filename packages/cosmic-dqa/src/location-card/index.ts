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
import type {LocationCardData, LocationCardProps} from './interface';
import Image from '@cosui/cosmic/image';
import Score from '@cosui/cosmic/score';
import Tag from '@cosui/cosmic/tag';

export default class LocationCard extends Component<LocationCardData> {
    static template = `
        <template>
            <component
                s-is="{{linkInfo.href ? 'a' : 'div'}}"
                s-bind="linkInfo.href ? linkInfo : ''"
                class="cosd-location-card{{linkInfo.href ? ' cos-link' : ''}}"
            >
                <cos-image
                    src="{{thumbnail}}"
                    class="cosd-location-card-thumbnail cos-image-fit-cover cos-image-position-center"
                />
                <div class="cosd-location-card-content">
                    <div class="cosd-location-card-title cos-text-subtitle">
                        {{title}}
                    </div>
                    <div class="cosd-location-card-line cos-text-body cos-space-mt-xs">
                        <cos-score
                            s-if="score !== undefined && score >= 0"
                            class="cosd-location-card-score"
                            value="{{score}}"
                            score
                        />
                        <div class="cosd-location-card-no-score" s-else>暂无评分</div>
                        <div class="cos-line-clamp-1">
                            <span s-if="category" class="cosd-location-card-category">
                                {{category}}
                            </span>
                            <span s-if="averageCost" class="cosd-location-card-cost">
                                {{averageCost}}
                            </span>
                        </div>
                    </div>
                    <div
                        s-if="address"
                        class="cosd-location-card-line cos-text-body cos-space-mt-xs cosd-location-card-address{{
                            !openingHours && tags.length ? ' cos-space-mb-xs' : ''
                        }}"
                    >
                        {{address}}
                    </div>
                    <div
                        s-if="openingHours"
                        class="cosd-location-card-line cos-text-body cos-space-mt-xs cosd-location-card-hours{{
                            tags.length ? ' cos-space-mb-xs' : ''
                        }}"
                    >
                        {{openingHours}}
                    </div>
                    <div s-if="tags.length" class="cosd-location-card-line cosd-location-card-tags">
                        <cos-tag
                            s-for="tag in _tags"
                            appearance="filled"
                            class="{{tag.color === 'blue'
                                ? 'cos-color-text-on-primary-light cos-color-bg-primary-light'
                                : 'cos-color-text-tiny cos-color-bg-dent'
                            }}"
                        >
                            {{tag.text}}
                        </cos-tag>
                    </div>
                </div>
            </component>
        </template>
    `;

    static trimWhitespace = 'all';

    static components = {
        'cos-image': Image,
        'cos-score': Score,
        'cos-tag': Tag
    };

    static computed = {
        _tags(this: LocationCard) {
            const tags = this.data.get('tags');
            const _tags = [];

            // 处理简写形式的标签，默认为灰色、线型
            tags.forEach(item => {
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

    initData(): LocationCardProps {
        return {
            linkInfo: {
                href: ''
            },
            thumbnail: '',
            title: '',
            score: undefined,
            address: '',
            category: '',
            averageCost: '',
            openingHours: '',
            tags: []
        };
    }
}
