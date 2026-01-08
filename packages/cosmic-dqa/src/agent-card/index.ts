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
 * @file agent-card 组件
 */

import {Component} from 'san';
import type {AgentCardData} from './interface';
import Image from '@cosui/cosmic/image';

export default class AgentCard extends Component<AgentCardData> {

    static trimWhitespace = 'all';

    static template = `
        <component
            s-is="linkInfo && linkInfo.href ? 'a' : 'div'"
            s-bind="{{linkInfo}}"
            class="cosd-agent-card"
        >
            <div class="cosd-agent-card-thumbnail">
                <cos-image
                    src="{{thumbnail}}"
                    class="cos-image-3-4 cos-image-fit-cover cos-image-position-center cosd-agent-card-image"
                >
                    <div
                        s-if="actionText"
                        class="cosd-agent-card-action-text"
                    >
                        {{actionText}}
                    </div>
                </cos-image>
            </div>
            <div class="cosd-agent-card-title">{{title}}</div>
            <div class="cosd-agent-card-caption">{{caption}}</div>
        </component>
    `;

    static components = {
        'cos-image': Image
    };

    initData(): AgentCardData {
        return {
            thumbnail: '',
            actionText: '',
            title: '',
            caption: '',
            linkInfo: null
        };
    }
}