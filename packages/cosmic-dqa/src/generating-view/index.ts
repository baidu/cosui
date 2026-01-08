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
 * @file GeneratingView 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Image from '@cosui/cosmic/image';
import {isURL} from '@cosui/cosmic/util';
import {GeneratingViewProps, GeneratingViewData} from './interface';

export default class GeneratingView extends Component<GeneratingViewData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cosd-generating-view  cosd-generating-view-{{
                appearance === 'card' ? 'card' : 'filled'
                }}">
            <div class="cosd-generating-view-animation">
                <span class="cosd-generating-view-animation-blob cosd-generating-view-animation-blob-1"></span>
                <span class="cosd-generating-view-animation-blob cosd-generating-view-animation-blob-2"></span>
                <span class="cosd-generating-view-animation-blob cosd-generating-view-animation-blob-3"></span>
                <span class="cosd-generating-view-animation-blob cosd-generating-view-animation-blob-4"></span>
            </div>
            <div
                class="cosd-generating-view-content"
                style="{{appearance === 'card' ? 'background: ' + gradient + ';' : ''}}"
            >
                <slot name="icon">
                    <cos-image
                        s-if="{{isUrl(icon)}}"
                        src="{{icon}}"
                        class="cosd-generating-view-content-icon cos-image-fit-cover
                        cos-image-position-center"
                    />
                    <cos-icon
                        s-else
                        name="{{icon}}"
                        class="cosd-generating-view-content-icon"
                    />
                </slot>
                <div class="cosd-generating-view-content-info">
                    <span class="cosd-generating-view-content-info-title">
                        {{ title }}
                    </span>
                    <span class="cosd-generating-view-content-info-caption">
                        {{ caption }}
                    </span>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-image': Image
    };

    initData(): GeneratingViewProps {
        return {
            icon: '',
            title: '',
            caption: '',
            gradient: '',
            appearance: 'filled'
        };
    }

    isUrl = isURL;
}
