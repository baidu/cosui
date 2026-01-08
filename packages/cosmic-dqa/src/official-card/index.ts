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
import Image from '@cosui/cosmic/image';
import Overlay from './overlay';
import Centered from './centered';
import type {OfficialCardData, OfficialCardEvents} from './interface';

export default class OfficialCard extends Component<OfficialCardData> {

    static template = `
        <component
            s-is="linkInfo && linkInfo.href ? 'a' : 'div'"
            s-bind="{{linkInfo}}"
            class="cosd-official-card"
        >
            <centered
                s-if="isCentered"
                poster="{{poster}}"
                title="{{title}}"
                tag="{{tag}}"
                logo="{{logo}}"
                introduction="{{introduction}}"
            />
            <div
                s-elif="isMultiPoster"
                class="cosd-official-card-multi"
                style="background-color:{{poster.bgColor}}"
            >
                <div class="cosd-official-card-multi-wrapper">
                    <div class="cosd-official-card-multi-box">
                        <div
                            s-for="src in segmentMutilPosters.left"
                            style="background-image:url({{src}});background-size: cover;"
                            class="cosd-official-card-multi-img"
                        >
                        </div>
                    </div>
                    <div class="cosd-official-card-multi-box">
                        <div
                            s-for="src in segmentMutilPosters.center"
                            style="background-image:url({{src}});background-size: cover;"
                            class="cosd-official-card-multi-img"
                        >
                        </div>
                    </div>
                    <div class="cosd-official-card-multi-box">
                        <div
                            s-for="src in segmentMutilPosters.right"
                            style="background-image:url({{src}});background-size: cover;"
                            class="cosd-official-card-multi-img"
                        >
                        </div>
                    </div>
                </div>
                <!-- 蒙层  -->
                <div
                    s-if="{{poster.gradient}}"
                    class="cosd-official-card-mask"
                    style="background: {{poster.gradient}};"
                ></div>
                <overlay
                    poster="{{poster}}"
                    title="{{title}}"
                    tag="{{tag}}"
                    logo="{{logo}}"
                    actionText="{{actionText}}"
                    actionLinkInfo="{{actionLinkInfo}}"
                    website="{{website}}"
                    score="{{score}}"
                    introduction="{{introduction}}"
                    caption="{{caption}}"
                    settings="{{settings}}"
                    on-button-click="handleBtnClick"
                />
            </div>
            <!-- 背景图  -->
            <cos-image
                s-elif="poster.src"
                src="{{poster.src}}"
                class="cos-image-16-9"
            >
                <!-- 蒙层  -->
                <div
                    s-if="{{poster.gradient}}"
                    class="cosd-official-card-mask"
                    style="background: {{poster.gradient}};"
                ></div>
                <overlay
                    poster="{{poster}}"
                    title="{{title}}"
                    tag="{{tag}}"
                    logo="{{logo}}"
                    actionText="{{actionText}}"
                    actionLinkInfo="{{actionLinkInfo}}"
                    website="{{website}}"
                    score="{{score}}"
                    introduction="{{introduction}}"
                    caption="{{caption}}"
                    settings="{{settings}}"
                    on-button-click="handleBtnClick"
                />
            </cos-image>
            <div
                s-else
                class="cosd-official-card-no-bg"
            >
                <overlay
                    title="{{title}}"
                    tag="{{tag}}"
                    logo="{{logo}}"
                    actionText="{{actionText}}"
                    actionLinkInfo="{{actionLinkInfo}}"
                    website="{{website}}"
                    score="{{score}}"
                    introduction="{{introduction}}"
                    caption="{{caption}}"
                    settings="{{settings}}"
                    on-button-click="handleBtnClick"
                />
            </div>
        </component>
    `;

    static components = {
        'cos-image': Image,
        'overlay': Overlay,
        'centered': Centered
    };
    static computed = {
        isMultiPoster(this: OfficialCard): boolean {
            const poster = this.data.get('poster');
            return Array.isArray(poster.src) && poster.src.length > 1;
        },
        isCentered(this: OfficialCard): boolean {
            const appearance = this.data.get('appearance');
            return appearance === 'centered';
        },
        segmentMutilPosters(this: OfficialCard) {
            const {src} = this.data.get('poster');
            // 3, 5/2
            const left = [src[2], src.length >= 5 ? src[4] : src[1]];
            // 7/2, 1, 1
            const center = [src.length >= 7 ? src[6] : src[1], src[0], src.length >= 4 ? src[3] : src[0]];
            // 6/3, 2
            const right = [src.length >= 6 ? src[5] : src[2], src[1]];
            // 左边两行，中间三行，右边两行
            return {left, center, right};
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
    handleBtnClick(params: {event: Event}) {
        // TODO: 兼容代码应删掉
        this.fire<OfficialCardEvents['button-click']>('btn-click', params);
        this.fire<OfficialCardEvents['button-click']>('button-click', params);
    }
}
