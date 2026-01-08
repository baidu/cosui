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
import Icon from '@cosui/cosmic/icon';
import type {CitationProps, CitationMethods, CitationEvents} from '../interface';

export default class Citation extends Component<CitationProps> implements CitationMethods {

    static trimWhitespace = 'all';
    static template = `
        <fragment>
            <span
                s-if="appearance === 'link'"
                class="cosd-citation cosd-citation-link-wrapper"
            >
                <a
                    s-bind="{{linkInfo}}"
                    target="_blank"
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
                class="cosd-citation{{appearance === 'tag' ? ' cosd-citation-tag' : ''}}"
                position="bottom"
                disabled="{{disabled || !title}}"
                getPopupContainer="{{getPopupContainer}}"
                on-toggle="handleToggle"
            >
                <span
                    class="{{appearance === 'tag' ? 'cosd-citation-tag-citationId' : 'cosd-citation-citationId'}}"
                    style="{{appearance === 'tag' ? (source.tag.colorVars || '') : ''}}"
                >
                    {{citationId}}
                    <span s-if="appearance === 'tag'">
                        <span class="cosd-citation-tag-text">{{source.tag.text}}</span>
                    </span>
                </span>
                <div
                    slot="content"
                    class="cosd-citation-tooltip{{tooltipPanelClickable ? ' cosd-citation-tooltip-clickable' : ''}}"
                    on-click="handlePanelClick"
                >
                    <div class="cosd-citation-headline">
                        内容摘自:
                    </div>
                    <a
                        s-bind="linkInfo"
                        s-ref="citationTitle"
                        target="_blank"
                        class="cos-line-clamp-2 cosd-citation-title"
                        on-click="handleClick($event, 'tooltip')"
                    >
                        <span>{{titleBeforeWord}}</span>
                        <span style="text-wrap: nowrap;">
                            {{titleLastWord}}
                            <cos-icon class="cos-space-ml-xxs" name="right"/>
                        </span>
                    </a>
                    <div class="cos-line-clamp-3">
                        <span>{{abstract}}</span>
                    </div>
                    <div s-if="source" class="cos-flex cos-items-center cos-space-mt-3xs">
                        <span class="cos-color-text-slim">{{source.name}}</span>
                    </div>
                </div>
            </cos-tooltip>
        <template>
    `;

    static components = {
        'cos-tooltip': Tooltip,
        'cos-icon': Icon
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

    initData(): CitationProps {
        return {
            getPopupContainer: () => {
                return document.body;
            },
            appearance: '',
            citationId: '',
            linkInfo: {
                href: ''
            },
            thumbnail: '',
            source: undefined,
            title: '',
            abstract: '',
            disabled: false,
            tooltipPanelClickable: false
        };
    }

    detached() {
        this.hideTooltip();
    }

    hideTooltip() {
        const tooltip = this.ref<Tooltip>('tooltip');
        tooltip && tooltip.close();
    }

    handleToggle(showTooltip: boolean) {
        this.fire<CitationEvents['toggle']>('toggle', {
            open: showTooltip
        });
    }
    handleClick(event: Event, from: string) {
        this.hideTooltip();
        this.fire<CitationEvents['click']>('click', {
            event,
            from
        });
    }

    handlePanelClick(event: MouseEvent) {
        if (!this.data.get('tooltipPanelClickable')) {
            return;
        }

        // 滑词选中时不触发跳转
        const selection = window.getSelection();
        if ((selection && selection.toString())) {
            return;
        }

        // 避免点击内部 a 标签时重复处理
        const target = event.target as HTMLElement;
        if (!target || target.closest('a')) {
            return;
        }

        (this.ref('citationTitle') as unknown as HTMLAnchorElement)?.click();
    }
}
