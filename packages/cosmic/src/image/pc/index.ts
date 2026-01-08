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
 * @file Image pc端
 */

import Icon from '@cosui/cosmic/icon';
import type {PCImageData, ImageEvents} from '../interface';
import {Component} from 'san';


/**
 * 双端实现差异
 * - PC: 图片组件若设置了填充模式或填充位置，使用 div 背景图实现；其余情况使用 img 标签实现。
 *       二者展现其一，通过 display: none / block 控制。
 * - Mobile: 无论是否设置填充模式或填充位置，均使用 img 标签实现。
 */
export default class Image extends Component<PCImageData> {
    static template = `
        <div class="cos-image{{hover ? ' cos-image-hover' : ''}}">
            <!-- 占位区 -->
            <slot s-if="!src" name="placeholder">
                <div class="cos-image-placeholder">
                </div>
            </slot>
            <fragment s-else>
                <!-- 若设置图片填充模式/位置，使用 background 展示图片 -->
                <div
                    class="cos-image-background"
                    style="{{'background-image: url(' + src + ');'}}"
                />
                <!-- 默认使用 img 展示图片 -->
                <img
                    src="{{src}}"
                    alt="{{alt}}"
                    class="cos-image-body"
                    on-load="handleLoad"
                    on-error="handleError"
                />
            </fragment>
            <!-- 内容区，内容插槽 -->
            <div class="cos-image-content">
                <slot />
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData(): PCImageData {
        return {
            src: '',
            alt: '',
            hover: false
        };
    }

    handleLoad(event: Event) {
        this.fire<ImageEvents['load']>('load', {event});
    }

    handleError(event: Event) {
        this.fire<ImageEvents['error']>('error', {event});
    }
}
