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
import Card from './card';
import Filled from './filled';
import type {GreetingCardProps, GreetingCardData} from './interface';

export default class GreetingCard extends Component<GreetingCardData> {

    static template = `
        <component
            s-is="{{appearance === 'card' ? 'appearance-card' : 'appearance-filled'}}"
            s-ref="greetingCard"
            avatar="{{avatar}}"
            title="{{title}}"
            content="{{content}}"
            voice="{{voice}}"
            video="{{video}}"
            on-voice-click="handleVoiceClick"
            on-video-click="handleVideoClick"
        >
            <slot></slot>
        </component>
    `;

    static components = {
        'appearance-card': Card,
        'appearance-filled': Filled
    };

    initData(): GreetingCardProps {
        return {
            // 头像图片url
            avatar: '',
            // 打招呼标题
            title: '',
            // 打招呼内容
            content: '',
            // 卡片样式
            appearance: 'card',
            // 语音按钮数据
            voice: null,
            // 视频按钮数据
            video: null
        };
    }

    /**
     * 处理语音按钮点击
     */
    handleVoiceClick(params: {event: MouseEvent}) {
        this.fire('voice-click', params);
    }

    /**
     * 处理视频按钮点击
     */
    handleVideoClick(params: {event: MouseEvent}) {
        this.fire('video-click', params);
    }
}