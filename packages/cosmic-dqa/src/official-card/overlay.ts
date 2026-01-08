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
import Tag from '@cosui/cosmic/tag';
import Image from '@cosui/cosmic/image';
import Button from '@cosui/cosmic/button';
import type {OfficialCardData, OfficialCardEvents} from './interface';

export default class Overlay extends Component<OfficialCardData> {

    static template = `
        <div class="cosd-official-card-overlay">
            <div class="cosd-official-card-content {{caption ? 'cos-items-start' : 'cos-items-center'}}">
                <!-- logo  -->
                <div s-if="logo" data-module="text_clk" class="cosd-official-card-logo">
                    <cos-image
                        src="{{logo}}"
                        class="cos-image-fit-cover cos-image-position-center cos-image-1-1"
                    />
                </div>
                <!-- 官网、APP等介绍 -->
                <div class="cosd-official-card-info">
                    <div class="cosd-official-card-info-top">
                        <div class="cos-line-clamp-1" data-module="text_clk">
                            <div s-if="title" class="cosd-official-card-info-title">
                                <cos-tag
                                    s-if="showTag"
                                    appearance="filled"
                                    class="cos-color-bg-primary cosd-official-card-info-title-tag"
                                >
                                    {{showTag}}
                                </cos-tag>
                                <div class="cosd-official-card-info-title-text">{{title}}</div>
                            </div>
                            <div s-if="website" class="cosd-official-card-info-website">{{website}}</div>
                            <div s-else class="cosd-official-card-info-introduction">
                                <div s-if="score" class="cosd-official-card-info-score">
                                    {{score}}
                                </div>
                                <div
                                    s-if="introduction"
                                    class="cos-line-clamp-1 cos-text-body cosd-official-card-info-text"
                                >
                                    {{introduction}}
                                </div>
                            </div>
                            <div
                                s-if="(!settings || !settings.length) && caption && poster.src"
                                class="cosd-official-card-info-bottom"
                            >
                                <div
                                    class="cosd-official-card-info-caption"
                                    data-module="text_clk"
                                >
                                    {{caption}}
                                </div>
                            </div>
                        </div>
                        <object>
                            <component
                                s-is="{{actionLinkInfo ? 'a' : 'div'}}"
                                s-bind="actionLinkInfo"
                                class="cosd-official-card-button-wrapper"
                                data-module="download_clk"
                                on-click="handleBtnClick"
                            >
                                <!-- 按钮 -->
                                <cos-button
                                    s-if="{{actionText}}"
                                    size="sm"
                                    appearance="plain"
                                    class="cosd-official-card-button"
                                >
                                    {{actionText}}
                                </cos-button>
                            </component>
                        </object>
                    </div>
                    <object s-if="settings && settings.length && poster.src">
                        <div s-if="caption" class="cosd-official-card-info-bottom">
                            <div class="cosd-official-card-info-caption" data-module="text_clk">
                                {{caption}}
                            </div>
                            <!-- 隐私 权限等 -->
                            <div class="cosd-official-card-settings">
                                <component
                                    s-is="{{setting.linkInfo ? 'a' : 'div'}}"
                                    s-for="setting in settings"
                                    s-bind="setting.linkInfo"
                                    class="cosd-official-card-setting"
                                    on-click="handleSettingClick(setting, $event)"
                                >
                                    {{setting.text}}
                                </component>
                            </div>
                        </div>
                    </object>
                </div>
            </div>
            <object s-if="settings && settings.length && !poster.src">
                <div s-if="caption" class="cos-divider cos-space-mt-xs"></div>
                <div s-if="caption" class="cosd-official-card-info-bottom">
                    <div class="cosd-official-card-info-caption" data-module="text_clk">
                        {{caption}}
                    </div>
                    <!-- 隐私 权限等 -->
                    <div class="cosd-official-card-settings">
                        <component
                            s-is="{{setting.linkInfo ? 'a' : 'div'}}"
                            s-for="setting in settings"
                            s-bind="setting.linkInfo"
                            class="cosd-official-card-setting"
                            on-click="handleSettingClick(setting, $event)"
                        >
                            {{setting.text}}
                        </component>
                    </div>
                </div>
            </object>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-button': Button,
        'cos-tag': Tag
    };

    static computed = {
        showTag(this: Overlay) {
            const tag = this.data.get('tag');
            if (Array.isArray(tag) && tag?.length > 0) {
                return tag[0];
            }
            return tag;
        }
    };

    initData(): OfficialCardData {
        return {
            appearance: '',
            poster: {
                src: ''
            },
            linkInfo: null,
            tag: '',
            logo: '',
            title: '',
            actionText: '',
            actionLinkInfo: null,
            website: '',
            score: '',
            introduction: '',
            caption: '',
            settings: []
        };
    }
    handleBtnClick(event: Event) {
        this.data.get('actionLinkInfo') && event.stopPropagation();
        this.fire<OfficialCardEvents['button-click']>('button-click', {
            event
        });
    }
    handleSettingClick(setting: any, event: Event) {
        setting.linkInfo && event.stopPropagation();
    }
}
