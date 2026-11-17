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
import type {LocationCardData, LocationCardProps, TagItem} from './interface';
import Image from '@cosui/cosmic/image';
import Score from '@cosui/cosmic/score';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';

export default class LocationCard extends Component<LocationCardData> {
    static template = `
        <component
            s-is="{{linkInfo.href ? 'a' : 'div'}}"
            s-bind="linkInfo.href ? linkInfo : ''"
            class="cosd-location-card{{linkInfo.href ? ' cos-link' : ''}} {{
                appearance === 'filled' ? ' cosd-location-card-pack' : ''}}"
        >
            <div class="cos-col-3 cosd-location-card-thumbnail">
                 <cos-image
                    src="{{thumbnail}}"
                    class="cos-image-fit-cover cos-image-position-center cos-image-1-1"
                />
            </div>
            <div class="cosd-location-card-content">
                <div class="cosd-location-card-title cos-text-subtitle">
                    {{title}}
                </div>
                <div s-if="tags.length" class="cosd-location-card-line cosd-location-card-tags">
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
                <div class="cosd-location-card-line cos-text-body cos-space-mt-xs">
                    <cos-score
                        s-if="_score"
                        s-bind="_score"
                        class="cosd-location-card-score"
                    />
                    <div class="cosd-location-card-no-score" s-else>暂无评分</div>
                    <div class="cos-line-clamp-1">
                        <span s-if="category" class="cosd-location-card-category">
                            {{category}}
                        </span>
                        <span s-if="averageCost && appearance === 'card'" class="cosd-location-card-cost">
                            {{averageCost}}
                        </span>
                        <span s-if="recommendedDuration" class="cosd-location-card-cost">
                            {{recommendedDuration}}
                        </span>
                    </div>
                </div>
                <div
                    s-if="address"
                    class="cosd-location-card-line cos-text-body cos-space-mt-xs cosd-location-card-address"
                >
                    {{address}}
                </div>
                <div class="cosd-location-card-line cos-text-body cos-space-mt-xs cosd-location-card-details">
                    <span
                        s-if="averageCost && appearance === 'filled'"
                        class="cosd-location-card-details-item"
                    >
                        {{averageCost}}
                    </span>
                    <span
                        s-if="openingHours"
                        class="cosd-location-card-details-item"
                    >
                        {{openingHours}}
                    </span>
                    <span
                        s-if="caption"
                        class="cosd-location-card-details-item"
                    >
                        {{caption}}
                    </span>
                </div>
            </div>
        </component>
    `;

    static trimWhitespace = 'all';

    static components = {
        'cos-image': Image,
        'cos-score': Score,
        'cos-tag': Tag,
        'cos-icon': Icon
    };

    static computed = {
        _score(this: LocationCard): ScoreProps | undefined {
            const score = this.data.get('score');
            return typeof score === 'number'
                ? {
                    value: score,
                    score: true
                }
                : score;
        },
        _tags(this: LocationCard): TagItem[] {
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
            recommendedDuration: '',
            openingHours: '',
            caption: '',
            tags: [],
            appearance: 'card'
        };
    }
}
