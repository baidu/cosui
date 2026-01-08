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
import type {SiteVcardData, SiteVcardProps, TagItem, SiteVcardEvents} from './interface';
import Avatar from '@cosui/cosmic/avatar';
import Tag from '@cosui/cosmic/tag';
import Icon from '@cosui/cosmic/icon';
import Button from '@cosui/cosmic/button';
import {isURL} from '@cosui/cosmic/util';
import Score from '@cosui/cosmic/score';
import type {ButtonEvents} from '@cosui/cosmic/button/interface';

export default class SiteVcard extends Component<SiteVcardData> {
    static template = `
    <div class="cos-link cosd-site-vcard">
        <div class="cosd-site-vcard-{{appearance || 'filled'}}">
            <div class="cosd-site-vcard-main">
                <component
                    s-is="{{linkInfo.href ? 'a' : 'div'}}"
                    s-bind="linkInfo"
                    class="cosd-site-vcard-main-container"
                >
                    <img s-if="logo && thumbnail" src="{{logo}}" class="cosd-site-vcard-logo"/>
                    <div
                        s-if="_hasIntroductionWhenNotCard && _hasLineUnderTitle && _introduction.position === 'top'"
                        class="cosd-site-vcard-main-introduction"
                    >
                        <div
                            s-ref="introductionTopText"
                            class="cosd-site-vcard-main-introduction-top-text{{
                            _introductionTruncation ? ' truncate' : ''}}"
                        >{{_introduction.value}}</div>
                        <div class="cos-divider cosd-site-vcard-main-introduction-top-divider" />
                    </div>
                    <div class="cosd-site-vcard-info">
                        <div
                            s-if="thumbnail || logo"
                            class="cosd-site-vcard-thumbnail{{
                                _showIntroductionUnderTitle ? '-large' : ''
                            }}"
                        >
                            <cos-avatar src="{{thumbnail || logo}}" size="md"/>
                        </div>
                        <div class="cosd-site-vcard-content">
                            <div class="cosd-site-vcard-title">
                                <fragment s-for="tag in _headTagList">
                                    <img
                                        s-if="tag.image"
                                        src="{{tag.image}}"
                                        class="cosd-site-vcard-title-tags cosd-site-vcard-title-head-tags"
                                    >
                                    <cos-tag
                                        s-elif="tag.text"
                                        appearance="{{tag.appearance}}"
                                        style="{{tag | styleFormat}}"
                                        class="cosd-site-vcard-title-tags cosd-site-vcard-title-head-tags"
                                    >
                                        {{tag.text}}
                                    </cos-tag>
                                </fragment>
                                <span
                                    class="cos-line-clamp-1 cosd-site-vcard-title-text {{
                                        _showIntroductionUnderTitle ? 'cosd-site-vcard-title-text-large' : ''
                                    }}"
                                >
                                    {{title}}
                                </span>
                                <fragment s-for="tag in _tailTagList">
                                    <img
                                        s-if="tag.image"
                                        src="{{tag.image}}"
                                        class="cosd-site-vcard-title-tags cosd-site-vcard-title-tail-tags"
                                    >
                                    <cos-tag
                                        s-elif="tag.text"
                                        appearance="{{tag.appearance}}"
                                        style="{{tag | styleFormat}}"
                                        class="cosd-site-vcard-title-tags cosd-site-vcard-title-tail-tags"
                                    >
                                        {{tag.text}}
                                    </cos-tag>
                                </fragment>
                            </div>
                            <div s-if="_showIntroductionUnderTitle">
                                <div class="cosd-site-vcard-under-title-introduction">{{_introduction.value}}</div>
                            </div>
                            <div s-else class="cosd-site-vcard-caption">
                                <cos-score
                                    s-if="score"
                                    value="{{score}}"
                                    score
                                    type="text"
                                    class="cosd-site-vcard-caption-score"
                                />
                                <div class="cosd-site-vcard-caption-text cos-line-clamp-1">
                                    <span
                                        s-if="score && (visits || caption)"
                                        class="cosd-site-vcard-caption-divider cos-divider-vertical-inverse"
                                    ></span>
                                    <cos-icon
                                        s-if="!isAgent && visits"
                                        name="qa"
                                        class="cosd-site-vcard-caption-visits-icon"
                                    />
                                    <span>{{visits}}</span>
                                    <span
                                        s-if="visits && caption"
                                        class="cosd-site-vcard-caption-divider cos-divider-vertical-inverse"
                                    ></span>
                                    <span>{{caption}}</span>
                                </div>
                                <div s-if="badgeText" class="cosd-site-vcard-caption-badge">
                                    {{badgeText}}
                                </div>
                            </div>
                        </div>
                        <div s-if="actionText || action.text"  class="cosd-site-vcard-button-wrapper">
                            <object>
                                <component
                                    s-if="actionText || action.text"
                                    s-is="{{_btnAttrs.href ? 'a' : 'div'}}"
                                    s-bind="_btnAttrs"
                                >
                                    <cos-button
                                        appearance="secondary"
                                        size="sm"
                                        class="cosd-site-vcard-button"
                                        on-click="handleButtonClick($event)"
                                    >
                                        {{actionText || action.text}}
                                    </cos-button>
                                </component>
                            </object>
                        </div>
                    </div>
                    <div
                        s-if="_hasIntroductionWhenNotCard && _hasLineUnderTitle && _introduction.position === 'bottom'"
                        class="cosd-site-vcard-main-introduction"
                    >
                        <div class="cos-divider cosd-site-vcard-main-introduction-bottom-divider" />
                        <div
                            s-ref="introductionBottomText"
                            class="cosd-site-vcard-main-introduction-bottom-text{{
                            _introductionTruncation ? ' truncate' : ''}}"
                        >{{_introduction.value}}</div>
                    </div>
                </component>
            </div>
            <div s-if="shortcut" class="cosd-site-vcard-shortcut">
                <div class="cos-divider cosd-site-vcard-shortcut-divider"/>
                <component
                    s-is="{{shortcut.linkInfo && shortcut.linkInfo.href ? 'a' : 'div'}}"
                    s-bind="shortcut.linkInfo"
                    class="cosd-site-vcard-shortcut-area"
                >
                    <div s-if="shortcut.logo" class="cosd-site-vcard-shortcut-area-logo">
                        <cos-avatar src="{{shortcut.logo}}" size="xs"/>
                    </div>
                    <div class="cosd-site-vcard-shortcut-area-name">{{shortcut.name}}</div>
                    <div class="cosd-site-vcard-shortcut-area-caption">{{shortcut.caption}}</div>
                </component>
            </div>
        </div>
        <a
            s-if="_introduction.value && appearance === 'card'"
            s-bind="linkInfo"
            class="cosd-site-vcard-introduction"
        >
            <div class="cosd-site-vcard-introduction-arrow"></div>
            <div class="cos-line-clamp-2">{{_introduction.value}}</div>
        </a>
    </div>
    `;

    static trimWhitespace = 'all';

    static components = {
        'cos-avatar': Avatar,
        'cos-tag': Tag,
        'cos-icon': Icon,
        'cos-score': Score,
        'cos-button': Button
    };

    static computed = {
        tagList(this: SiteVcard): TagItem[] | [] {
            const tags = this.data.get('tags');
            if (!tags || !tags.length) {
                return [];
            }
            // <div class="cosd-site-vcard-shortcut-divider"></div>
            return tags.map(tag => {
                if (typeof tag === 'string') {
                    if (isURL(tag)) {
                        return {
                            image: tag,
                            appearance: 'filled'
                        };
                    }
                    return {
                        text: tag,
                        appearance: 'filled',
                        color: '#4e6ef2'
                    };
                }
                return {
                    ...tag,
                    appearance: tag.appearance || 'filled',
                    color: tag.color || '#4e6ef2'
                };
            });
        },
        _headTagList(this: SiteVcard) {
            const tagList: TagItem[] = this.data.get('tagList');
            return tagList.filter(tag => tag.appearance === 'filled');
        },
        _tailTagList(this: SiteVcard) {
            const tagList: TagItem[] = this.data.get('tagList');
            return tagList.filter(tag => tag.appearance !== 'filled');
        },
        _btnAttrs(this: SiteVcard) {
            const linkInfo = this.data.get('linkInfo') || {};
            const {
                linkInfo: btnLinkInfo = {}
            } = this.data.get('action') || {};

            return btnLinkInfo.href ? btnLinkInfo : linkInfo;
        },

        _hasLineUnderTitle(this: SiteVcard) {
            // 标题下的一行（得分、访问量、引言）是否会展示
            return this.data.get('visits') || this.data.get('caption') || this.data.get('score');
        },

        _introduction(this: SiteVcard) {
            const introduction = this.data.get('introduction');
            if (typeof introduction === 'string') {
                return {
                    value: introduction,
                    position: 'bottom'
                };
            }
            return introduction || {};
        },

        _hasIntroductionWhenNotCard(this: SiteVcard) {
            return this.data.get('_introduction.value')
                && (this.data.get('appearance') === 'bar' || this.data.get('appearance') === 'filled');
        },

        _showIntroductionUnderTitle(this: SiteVcard) {
            return this.data.get('_hasIntroductionWhenNotCard') && !this.data.get('_hasLineUnderTitle');
        }
    };

    static filters = {
        styleFormat(tag: TagItem): string {
            if (tag.image) {
                return '';
            }
            return tag.appearance === 'filled'
                ? `background-color: ${tag.color};`
                : `border-color: ${tag.color}; color: ${tag.color};`;
        }
    };

    initData(): SiteVcardProps {
        return {
            linkInfo: {},
            actionText: '',
            title: '',
            caption: '',
            logo: '',
            tags: [],
            visits: '',
            appearance: 'filled',
            score: '',
            isAgent: false,
            introduction: '',
            action: {},
            thumbnail: '',
            shortcut: undefined,
            badgeText: '',
            _introductionTruncation: false
        };
    }

    attached(): void {
        this.nextTick(() => {
            this.checkIntroductionTruncation();
        });
    }

    // 检查introduction是否被截断，若被截断则在省略号后加双引号，否则在文本后加双引号
    checkIntroductionTruncation() {
        const introductionTopText = this.ref('introductionTopText') as unknown as HTMLElement;
        const introductionBottomText = this.ref('introductionBottomText') as unknown as HTMLElement;
        if (introductionTopText && introductionTopText.scrollHeight > introductionTopText.clientHeight
            || introductionBottomText && introductionBottomText.scrollHeight > introductionBottomText.clientHeight) {
            this.data.set('_introductionTruncation', true);
        }
    }

    handleButtonClick(buttonClickEvent: ButtonEvents) {
        this.fire<SiteVcardEvents['buttonClick']>('button-click', buttonClickEvent);
    }
}
