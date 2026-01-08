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
 * @file searching-outlines 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import {isURL} from '@cosui/cosmic/util';
import type {SearchingOutlinesData, SearchingOutlinesEvents} from './interface';

export default class SearchingOutlines extends Component<SearchingOutlinesData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-searching-outlines cosd-searching-outlines-{{appearance}}">
            <div class="cosd-searching-outlines-title">
                <template s-if="{{title.icon}}">
                    <span
                        s-if="{{isUrl(title.icon)}}"
                        class="cosd-searching-outlines-title-image"
                    >
                        <cos-image src="{{title.icon}}"/>
                    </span>
                    <span
                        s-else
                        class="cosd-searching-outlines-title-icon"
                    >
                        <cos-icon name="menu-more"/>
                    </span>
                </template>
                <span
                    s-else-if="{{title.emoji}}"
                    class="cosd-searching-outlines-title-emoji"
                >
                    {{title.emoji}}
                </span>
                <span class="cosd-searching-outlines-title-text">{{title.text}}</span>
            </div>
            <div s-for="item, index in outlines" class="cosd-searching-outlines-item" >
                <div class="cosd-searching-outlines-item-title">
                    <a
                        s-bind="item.linkInfo"
                        class="cosd-searching-outlines-link"
                        on-click="handleLinkClick($event, item.title, index, item.query)"
                    >
                        <span s-if="{{appearance === 'regular'}}">
                            <span>{{getOutlinePrefix(item.title)}}</span>
                            <span style="white-space: nowrap;">
                                {{getOutlineSuffix(item.title)}}
                                <cos-icon
                                    name="research"
                                    class="cosd-searching-outlines-link-icon"
                                />
                            </span>
                        </span>
                        <span
                            s-else
                            class="cosd-searching-outlines-underline"
                        >
                            {{item.title}}
                        </span>
                    </a>
                </div>
                <template s-if="item.outlines">
                    <ul class="cosd-searching-outlines-item-sublist">
                        <li
                            s-for="subItem, subIndex in item.outlines"
                            class="cosd-searching-outlines-item-sublist-item"
                        >
                            <a
                                s-bind="subItem.linkInfo"
                                class="cosd-searching-outlines-link"
                                on-click="handleLinkClick($event, subItem.title, index, item.query, subIndex)"
                            >
                                <span class="cosd-searching-outlines-underline">{{subItem.title}}</span>
                                <span
                                    s-if="{{appearance === 'regular'}}"
                                    class="cosd-searching-outlines-link-icon"
                                >
                                    <cos-icon name="research"/>
                                </span>
                            </a>
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-image': Image
    };

    initData(): SearchingOutlinesData {
        return {
            title: {
                icon: '',
                emoji: '',
                text: ''
            },
            outlines: [],
            appearance: 'dashed'
        };
    }

    isUrl = isURL;

    getOutlinePrefix(title: string) {
        return title.slice(0, -1);
    }

    getOutlineSuffix(title: string) {
        return title.slice(-1);
    }

    handleLinkClick(event: Event, title: string, index: number, query?: string, subIndex?: number) {
        const options = {
            event,
            title,
            index,
            subIndex: subIndex ?? -1
        };
        query && Object.assign(options, {query});
        this.fire<SearchingOutlinesEvents['click']>('click', options);
    }
}
