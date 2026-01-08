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
import Tag from '@cosui/cosmic/tag';
import Avatar from '@cosui/cosmic/avatar';
import type {MicroContentItemData} from './interface';

export default class MicroContentItem extends Component<MicroContentItemData> {

    static template = `
        <!-- component 包裹一层 div，保证能够正常触发 native 监听事件 -->
        <div class="cosd-micro-content-scroll-item-wrapper">
            <component
                s-is="linkInfo.href ? 'a' : 'div'"
                s-bind="linkInfo"
                class="cosd-micro-content-scroll-item{{appearance === 'bottom'
                    ? ' cosd-micro-content-scroll-item-bottom'
                    : ''
                }}"
            >
                <!-- 作者在上 -->
                <div
                    class="cosd-micro-content-scroll-item-author"
                    s-if="appearance === 'top'"
                >
                    <cos-avatar class="cosd-micro-content-scroll-item-author-avatar"
                        src="{{avatar}}"
                        alt="{{author}}"
                        size="xs"
                    />
                    <div class="cosd-micro-content-scroll-item-author-name">
                        {{author}}
                    </div>
                    <div class="cosd-micro-content-scroll-item-author-colon">
                        ：
                    </div>
                </div>
                <div class="cosd-micro-content-scroll-item-content">
                    <div s-if="thumbnail" class="cosd-micro-content-scroll-item-content-thumbnail">
                        <cos-image
                            src="{{thumbnail}}"
                            class="cos-image-1-1 cos-image-fit-cover"
                        />
                    </div>
                    <div class="cosd-micro-content-scroll-item-content-text cos-text-body cos-space-m-none">
                        <cos-tag
                            s-if="tag"
                            appearance="filled"
                            class="cosd-micro-content-scroll-item-content-tag"
                        >
                            {{tag}}
                        </cos-tag>
                        {{content}}
                    </div>
                </div>
                <!-- 作者在下 -->
                <div
                    class="cosd-micro-content-scroll-item-author"
                    s-if="appearance === 'bottom'"
                >
                    <cos-avatar class="cosd-micro-content-scroll-item-author-avatar"
                        src="{{avatar}}"
                        alt="{{author}}"
                        size="xs"
                    />
                    <div class="cosd-micro-content-scroll-item-author-name">
                        {{author}}
                    </div>
                    <div class="cosd-micro-content-scroll-item-author-suffix">
                        的分享
                    </div>
                </div>
            </component>
        </div>
    `;

    static components = {
        'cos-image': Image,
        'cos-avatar': Avatar,
        'cos-tag': Tag
    };

    initData(): MicroContentItemData {
        return {
            avatar: '',
            author: '',
            content: '',
            thumbnail: '',
            tag: '',
            linkInfo: {},
            appearance: 'top'
        };
    }
}
