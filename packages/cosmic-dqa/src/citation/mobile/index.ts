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
 * @file citation 组件 mobile 端
 */

import {Component} from 'san';
import Tooltip from '@cosui/cosmic/tooltip';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';
import Avatar from '@cosui/cosmic/avatar';
import type {CitationProps, CitationData, CitationEvents, CitationMethods} from '../interface';

export default class Citation extends Component<CitationData> implements CitationMethods {

    static trimWhitespace = 'all';
    static template = `
        <fragment>
            <span
                s-if="appearance === 'link'"
                class="cosd-citation cosd-citation-link-wrapper"
            >
                <a
                    s-bind="{{linkInfo}}"
                    class="cosd-citation-link"
                    on-click="handleClick($event, 'citationLink')"
                >
                    <span class="cosd-citation-link-first">
                        <span s-if="source && source.logo" class="cosd-citation-link-logo-wrapper">
                            <img src="{{source.logo}}" class="cosd-citation-link-logo">
                        </span>
                        <!-- 兜底图标 -->
                        <cos-icon
                            s-else-if="source && source.icon"
                            name="{{source.icon}}"
                            class="cosd-citation-link-icon"
                        />
                        {{titleFirstWord}}
                    </span>
                    <span class="cosd-citation-link-text">{{titleAfterWord}}</span>
                </a>
            </span>
            <cos-tooltip
                s-else
                s-ref="tooltip"
                class="cosd-citation{{appearance === 'tag' ? ' cosd-citation-tag' : ''}} cos-link"
                position="bottom"
                disabled="{{disabled || !title}}"
                getPopupContainer="{{getPopupContainer}}"
                on-toggle="handleToggle"
            >
                <span
                    class="{{appearance === 'tag' ? 'cosd-citation-tag-citationId' : 'cosd-citation-citationId'}}"
                    style="{{appearance === 'tag' ? (source.tag.colorVars || '') : ''}}"
                    data-nolog="true"
                    on-click="handleClick($event, appearance === 'tag' ? 'citationTag' : 'citationId')"
                >
                    {{citationId}}
                    <span s-if="appearance === 'tag'">
                        <span class="cosd-citation-tag-text">{{source.tag.text}}</span>
                    </span>
                </span>
                <a
                    slot="content"
                    s-bind="{{linkInfo}}"
                    class="cosd-citation-tooltip"
                    on-click="handleClick($event, 'tooltip')"
                >
                    <div class="cosd-citation-headline">
                        参考来源：
                    </div>
                    <div class="cos-flex">
                        <div s-if="thumbnail" class="cosd-citation-thumbnail">
                            <cos-image
                                class="cos-image-1-1 cos-image-fit-cover cos-image-position-center"
                                src="{{thumbnail}}"
                            >
                                <div
                                    s-if="isVideo"
                                    style="
                                        position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        transform: translate(-50%, -50%);
                                        font-size: 24px;
                                    "
                                >
                                    <cos-icon name="play" />
                                </div>
                            </cos-image>
                        </div>
                        <div class="cos-line-clamp-3">
                            <div class="cos-line-clamp-2 cosd-citation-title">
                                <span>{{titleBeforeWord}}</span>
                                <span style="text-wrap: nowrap;">
                                    {{titleLastWord}}
                                    <cos-icon class="cosd-citation-title-arrow" name="right"/>
                                </span>
                            </div>
                            <div s-if="source" class="cosd-citation-source cos-flex cos-items-center cos-line-clamp-1">
                                <cos-avatar
                                    s-if="source.logo"
                                    size="xs"
                                    class="cos-space-mr-xxs cosd-citation-source-logo"
                                    src="{{source.logo}}"
                                />
                                <span class="cos-line-clamp-1 cos-color-text-slim">{{source.name}}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </cos-tooltip>
        </fragment>
    `;

    static components = {
        'cos-image': Image,
        'cos-avatar': Avatar,
        'cos-icon': Icon,
        'cos-tooltip': Tooltip
    };
    static computed = {
        titleBeforeWord(this: Citation) {
            return this.data.get('title').slice(0, -1);
        },
        titleLastWord(this: Citation) {
            return this.data.get('title').slice(-1);
        },
        titleFirstWord(this: Citation) {
            return this.data.get('source')?.name?.slice(0, 1) || '';
        },
        titleAfterWord(this: Citation) {
            return this.data.get('source')?.name?.slice(1) || '';
        }
    };

    private _hideTooltipFn: () => void;

    initData(): CitationProps {
        return {
            getPopupContainer: () => {
                return document.body;
            },
            appearance: '',
            disabled: false,
            isVideo: false,
            citationId: '',
            thumbnail: '',
            source: undefined,
            title: '',
            linkInfo: {
                href: ''
            }
        };
    }

    detached() {
        document.removeEventListener('scroll', this._hideTooltipFn);
    }
    hideTooltip() {
        const tooltip = this.ref<Tooltip>('tooltip');
        tooltip && tooltip.close();
    }

    handleToggle(showTooltip: boolean) {
        this._hideTooltipFn = this.hideTooltip.bind(this);
        document[showTooltip ? 'addEventListener' : 'removeEventListener']('scroll', this._hideTooltipFn);
        this.fire<CitationEvents['toggle']>('toggle', {
            open: showTooltip
        });
    }
    handleClick(event: Event, from: string) {
        if (from === 'tooltip') {
            this.hideTooltip();
        }
        this.fire<CitationEvents['click']>('click', {
            event,
            from
        });
    }
}
