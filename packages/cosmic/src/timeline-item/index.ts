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
 * @file TimelineItem 组件
 */

import {Component} from 'san';
import {TimelineItemData} from './interface';

export default class TimelineItem extends Component<TimelineItemData> {
    static template = /* html */ `
        <div class="cos-timeline-item">
            <div class="cos-timeline-item-axis">
                <div class="cos-timeline-item-dot"></div>
                <div class="cos-timeline-item-line"></div>
            </div>

            <div class="cos-timeline-item-wrapper">
                <div s-if="{{title}}" class="cos-timeline-item-header{{ appearance == 'strong'
                    ? ' cos-timeline-item-text-title'
                    : ' cos-timeline-item-text-time'}}">
                    {{title}}
                </div>
                <div class="cos-timeline-item-content">
                    <slot name="content">
                    </slot>
                </div>
            </div>
        </div>
    `;

    initData(): TimelineItemData {
        return {
            appearance: '',
            title: ''
        };
    }
}