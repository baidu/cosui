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
 *
 * @file AudioPlayer
 */

import {Component} from 'san';
import {EnhanceAudioPlayerData, AudioStatus} from './interface';
import Image from '@cosui/cosmic/image';
import Icon from '@cosui/cosmic/icon';

const formatTimeDuration = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export default class Audio extends Component<EnhanceAudioPlayerData> {

    static trimWhitespace = 'all';
    static template = `
        <div class="cos-audio-player-enhance">
            <cos-image
                src="{{poster}}"
                class="cos-audio-player-poster cos-image-fit-cover" />
            <div class="cos-audio-player-content">
                <div class="cos-audio-player-title cos-space-mb-none cos-text-subtitle cos-line-clamp-1">
                    {{title}}
                </div>
                <div class="cos-audio-player-time cos-space-mt-xs cos-text-subtitle-sm">
                {{_currentTime | durationFormat}}/{{_duration | durationFormat}}
                </div>
            </div>
            <div class="cos-audio-player-icon" on-click="toggle">
                <cos-icon name="{{_playStatus === 1 ? 'pause-circle' : 'play-circle'}}" />
            </div>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-icon': Icon
    };

    static filters = {
        durationFormat: (value: number) => {
            return formatTimeDuration(value);
        }
    };

    initData() {
        return {
            title: '',
            poster: '',
            _currentTime: 0,
            _duration: 0,
            _playStatus: AudioStatus.PENDING
        };
    }

    toggle(e: Event) {
        this.fire('click', e);
    }
}