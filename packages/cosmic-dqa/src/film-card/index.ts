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
 * @file film-card 组件入口文件
 */

import {Component} from 'san';
import Image from '@cosui/cosmic/image';
import Button from '@cosui/cosmic/button';
import type {FilmCardData, FilmCardEvents, FilmCardProps} from './interface';

export default class FilmCard extends Component<FilmCardData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-film-card">
            <div class="cos-col-3 cosd-film-card-thumbnail">
                <cos-image
                    class="cos-image-fit-cover cos-image-position-center"
                    src="{{thumbnail}}"
                    alt="{{title}}"
                />
            </div>
            <div class="cos-col-8 cosd-film-card-content">
                <div class="cosd-film-card-title">{{title}}</div>
                <div s-if="score.value" class="cosd-film-card-score">
                    <span s-if="score.source" class="cosd-film-card-score-source">{{score.source}}</span>
                    <span class="cosd-film-card-score-value">{{score.value}}</span>
                </div>
                <div s-if="_creditList.length" class="cosd-film-card-credit">
                    <span s-for="item in _creditList" class="cosd-film-card-credit-item">
                        <span class="cosd-film-card-credit-label">{{item.label}}</span>：{{item.value}}
                    </span>
                </div>
                <div s-if="_metaList.length" class="cosd-film-card-meta">
                    <div s-for="zone in _metaList" class="cosd-film-card-meta-item">
                        <span s-for="text in zone" class="cosd-film-card-meta-text">{{text}}</span>
                    </div>
                </div>
                <div s-if="source" class="cosd-film-card-source">{{source}}</div>
            </div>
            <component
                s-is="{{action.linkInfo.href ? 'a' : 'div'}}"
                s-if="action.text"
                s-bind="action.linkInfo"
                class="cosd-film-card-action"
                on-click="handleBtnClick"
            >
                <cos-button class="cosd-film-card-action-btn" appearance="secondary" size="sm">
                    {{action.text}}
                </cos-button>
            </component>
            <a
                s-if="linkInfo.href"
                s-bind="linkInfo"
                class="cosd-film-card-link"
                aria-label="{{title}}"
            ></a>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-button': Button
    };

    static computed = {
        _creditList(this: FilmCard) {
            const credit = this.data.get('credit') || [];
            return credit.filter(item => item && item.value);
        },

        // 年份、类型、片长各占一格，类型的多个值共占一格
        _metaList(this: FilmCard) {
            const year = this.data.get('year');
            const categories = this.data.get('categories') || [];
            const duration = this.data.get('duration');
            return [[year], categories, [duration]]
                .map(zone => zone.filter(item => !!item))
                .filter(zone => zone.length);
        }
    };

    initData(): FilmCardProps {
        return {
            linkInfo: {},
            thumbnail: '',
            title: '',
            score: undefined,
            credit: [],
            year: '',
            categories: [],
            duration: '',
            source: '',
            action: undefined
        };
    };

    handleBtnClick(event: Event) {
        event.stopPropagation();
        this.fire<FilmCardEvents['button-click']>('button-click', {event});
    }
};
