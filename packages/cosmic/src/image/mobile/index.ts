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
 * @file Image mobile端
 */

import Icon from '@cosui/cosmic/icon';
import type {MobileImageData, ImageEvents} from '../interface';
import {Component} from 'san';
import {getFirstPaint} from '../util';


/**
 * 双端实现差异
 * - PC: 图片组件若设置了填充模式或填充位置，使用 div 背景图实现；其余情况使用 img 标签实现。
 *       二者展现其一，通过 display: none / block 控制。
 * - Mobile: 无论是否设置填充模式或填充位置，均使用 img 标签实现。
 */
export default class Image extends Component<MobileImageData> {
    static template = `
        <div class="cos-image">
            <!-- 占位区 -->
            <slot s-if="!src" name="placeholder">
                <div class="cos-image-placeholder">
                </div>
            </slot>
            <img
                s-else
                class="cos-image-body"
                s-bind="finalLazy
                    ? {
                        'data-lazy-src': src,
                        'loading': 'lazy'
                    }
                    : {
                        src: src
                    }
                "
                alt="{{alt}}"
                on-load="handleLoad"
                on-error="handleError"
            />
            <!-- 内容区，内容插槽 -->
            <div class="cos-image-content">
                <slot />
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        finalLazy(this: Image) {
            return this.data.get('lazy') && !this.firstPaint;
        }
    };

    /**
     *  图片首次渲染的时间戳
     */
    firstPaint: number;

    initData(): MobileImageData {
        return {
            src: '',
            alt: '',
            lazy: false
        };
    }

    inited() {
        let parent = this.parentComponent;
        this.firstPaint = getFirstPaint(parent);
    }

    handleLoad(event: Event) {
        this.fire<ImageEvents['load']>('load', {event});
    }

    handleError(event: Event) {
        this.fire<ImageEvents['error']>('error', {event});
    }
}
