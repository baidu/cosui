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
import Avatar from '@cosui/cosmic/avatar';
import Button from '@cosui/cosmic/button';
import Icon from '@cosui/cosmic/icon';
import {isURL} from '@cosui/cosmic/util';
import type {GreetingCardProps, GreetingCardData} from './interface';

export default class GreetingCard extends Component<GreetingCardData> {
    static template = `
        <div class="cosd-greeting-card cosd-greeting-card-card-wrap">
            <div class="cosd-greeting-card-card">
                <div class="cosd-greeting-card-card-wrapper">
                    <!-- 头像 -->
                    <div class="cosd-greeting-card-avatar-wrapper">
                        <div class="cosd-greeting-card-avatar-container">
                            <img
                                class="cosd-greeting-card-avatar-image"
                                s-if="avatar"
                                src="{{avatar}}"
                            />
                            <slot></slot>
                        </div>
                    </div>

                    <!-- 内容区域 -->
                    <div class="cosd-greeting-card-body">
                        <!-- 文本内容 -->
                        <div class="cosd-greeting-card-body-text">
                            <div class="cosd-greeting-card-spacer cosd-greeting-card-spacer-top"></div>
                            <div
                                s-if="content"
                                class="cosd-greeting-card-body-text-content"
                            >
                                <div class="cosd-greeting-card-body-text-content-inner">
                                    {{content}}
                                </div>
                            </div>
                            <div class="cosd-greeting-card-spacer cosd-greeting-card-spacer-bottom"></div>

                        </div>

                        <!-- 操作按钮 -->
                        <div
                            s-if="voice || video"
                            class="cosd-greeting-card-body-action-btns"
                        >
                            <!-- 视频按钮 -->
                            <component
                                s-if="video"
                                s-is="{{video.linkInfo && video.linkInfo.href ? 'a' : 'div'}}"
                                s-bind="{{video.linkInfo}}"
                                class="cosd-greeting-card-body-action-btns-btn cosd-greeting-card-video-btn"
                                on-click="handleVideoClick($event)"
                            >
                                <cos-icon
                                    s-if="video.icon && !isUrl(video.icon)"
                                    name="{{video.icon}}"
                                    class="cos-space-mr-xxs cosd-greeting-card-video-btn-icon"
                                />
                                <img
                                    s-if="video.icon && isUrl(video.icon)"
                                    class="cos-space-mr-xxs cosd-greeting-card-video-btn-img"
                                    src="{{video.icon}}"
                                />
                                <span class="cosd-greeting-card-video-btn-text">{{video.text}}</span>
                            </component>
                            <!-- 语音按钮 -->
                            <component
                                s-if="voice"
                                s-is="{{voice.linkInfo && voice.linkInfo.href ? 'a' : 'div'}}"
                                s-bind="{{voice.linkInfo}}"
                                class="cosd-greeting-card-body-action-btns-btn cosd-greeting-card-voice-btn"
                                on-click="handleVoiceClick($event)"
                            >
                                <cos-icon
                                    s-if="voice.icon && !isUrl(voice.icon)"
                                    name="{{voice.icon}}"
                                    class="cos-space-mr-xxs cosd-greeting-card-voice-btn-icon"
                                />
                                <img
                                    s-if="voice.icon && isUrl(voice.icon)"
                                    class="cos-space-mr-xxs cosd-greeting-card-voice-btn-img"
                                    src="{{voice.icon}}"
                                />
                                <span>{{voice.text}}</span>
                            </component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-avatar': Avatar,
        'cos-button': Button,
        'cos-icon': Icon
    };

    initData(): GreetingCardProps {
        return {
            // 头像图片url
            avatar: '',
            // 打招呼标题
            title: '',
            // 打招呼内容
            content: '',
            // 语音按钮数据
            voice: null,
            // 视频按钮数据
            video: null
        };
    }

    isUrl = isURL;

    /**
     * 处理语音按钮点击
     */
    handleVoiceClick(event: MouseEvent) {
        this.fire('voice-click', {event});
    }

    /**
     * 处理视频按钮点击
     */
    handleVideoClick(event: MouseEvent) {
        this.fire('video-click', {event});
    }
}
