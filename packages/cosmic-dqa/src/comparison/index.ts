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
 * @file comparison 组件 mobile 端
 */

import {Component} from 'san';
import type {ComparisonData} from './interface';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';

export default class Comparison extends Component<ComparisonData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-comparison" disable-tts>
            <component
                s-is="{{linkInfo.href ? 'a' : 'div'}}"
                s-bind="{{linkInfo}}"
                class="cosd-comparison-targets {{linkInfo.href ? 'cos-link' : ''}}"
            >
                <div class="cosd-comparison-targets-left">
                    <div class="cosd-comparison-logo">
                        <cos-image
                            class="cosd-comparison-logo-img cos-image-fit-contain cos-image-position-center"
                            src="{{targets[0].image}}"
                        />
                    </div>
                    <span class="cos-color-text">{{targets[0].name}}</span>
                </div>
                <cos-icon class="cosd-comparison-targets-vs" name="{{delimiter.icon || _defaultIcon}}"/>
                <div class="cosd-comparison-targets-right">
                    <span>{{targets[1].name}}</span>
                    <div class="cosd-comparison-logo">
                        <cos-image
                            class="cosd-comparison-logo-img cos-image-fit-contain cos-image-position-center"
                            src="{{targets[1].image}}"
                        />
                    </div>
                </div>
            </component>
            <div class="cosd-comparison-bar" s-if="{{computedBars.length}}">
                <div class="cosd-comparison-bar-item" s-for="item,index in computedBars" style="width:{{item.value}}%;">
                    <div style="--cosd-color-comparison-bar:{{item.color || _defaultBgColor[index]}};
                        background: var(--cosd-color-comparison-bar, {{item.color || _defaultBgColor[index]}});"></div>
                    <span>{{item.text}}</span>
                </div>
            </div>
            <div class="cosd-comparison-table" s-if="{{items.length}}">
                <div class="cosd-comparison-table-item" s-for="item in items">
                    <div class="cos-color-text cos-font-medium">{{item.values && item.values[0]}}</div>
                    <div class="cos-color-text-slim cos-font-regular">{{item.name}}</div>
                    <div class="cos-color-text cos-font-medium">{{item.values && item.values[1]}}</div>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-image': Image
    };

    static computed = {
        computedBars() {
            const bar = this.data.get('bar');
            if (!Array.isArray(bar)) {
                return [];
            }
            return bar.map(val => {
                val.value = Math.ceil(val.value * 100);
                return val;
            });
        }
    };

    initData(): ComparisonData {
        return {
            linkInfo: {},
            delimiter: {
                icon: 'vs'
            },
            targets: [],
            bar: [],
            items: [],
            _defaultBgColor: [
                '#FC3250',
                '#FFBE0D',
                '#0335FE'
            ],
            _defaultIcon: 'vs'
        };
    }

    attached(): void {
        this.fire('render-finished');
    }
}
