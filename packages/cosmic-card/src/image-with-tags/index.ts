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
 * @file ImageWithTags 组件
 */

import {Component} from 'san';
import type {ImageWithTagsData, ImageWithTagsEvents} from './interface';
import Icon from '@cosui/cosmic/icon';
import Tag from '@cosui/cosmic/tag';
import image from '@cosui/cosmic/image';

export default class ImageWithTags extends Component<ImageWithTagsData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cosc-image-with-tags">
            <cos-image
                s-bind="{{image}}"
                on-load="handleLoad"
                on-error="handleError"
            >
                <div s-for="item in overlays"
                    class="cosc-image-with-tags-overlay
                    {{item.position | positionClass}}">
                    <component
                        s-is="{{item.tag ? 'cos-tag' : (item.text ? 'div' : 'cos-icon')}}"
                        name="{{!item.tag && !item.text ? item.icon : ''}}"
                        s-bind="{{item.tag}}"
                    >
                        <cos-icon
                            s-if="{{(item.tag || item.text) && item.icon}}"
                            name="{{item.icon}}"/>
                        {{item.text}}
                    </component>
                </div>
                <div s-if="{{mask.top}}" class="cosc-image-with-tags-mask-top"></div>
                <div s-if="{{mask.bottom}}" class="cosc-image-with-tags-mask-bottom"></div>
                <slot/>
            </cos-image>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-tag': Tag,
        'cos-image': image
    };

    static filters = {
        positionClass(position: string) {
            if (position) {
                return `cosc-image-with-tags-${position}`;
            }
            return 'cosc-image-with-tags-left-top';
        }
    };
    static computed = {
        /**
         * 计算图片应有的的遮罩位置
         */
        mask(this: ImageWithTags) {
            const overlays = this.data.get('overlays');
            const maskPosition = {
                'top': false,
                'bottom': false
            };
            if (!overlays.length) {
                return maskPosition;
            }
            overlays.forEach(item => {
                if (item.position === 'left-bottom' || item.position === 'right-bottom') {
                    maskPosition.bottom = true;
                }
                else {
                    maskPosition.top = true;
                }
            });
            return maskPosition;
        }
    };
    initData(): ImageWithTagsData {
        return {
            image: null,
            overlays: []
        };
    }
    handleLoad(event: Event) {
        this.fire<ImageWithTagsEvents['load']>('load', {event});
    }

    handleError(event: Event) {
        this.fire<ImageWithTagsEvents['error']>('error', {event});
    }
}