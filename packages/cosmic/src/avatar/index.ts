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
import type {AvatarData} from './interface';
import {Size} from '../util';

export default class Avatar extends Component<AvatarData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-avatar cos-avatar-{{size}}">
            <!-- 占位图，仅在加载中时显示 -->

            <div s-if="_loading && placeholder"
                class="cos-avatar-placeholder"
                style="background-image:url({{placeholder}});"
            >
            </div>

            <!-- 主图片，加载成功时显示（如果没有加载占位图则直接展示） -->
            <img
                s-if="(!placeholder || !_loading) && !_error"
                class="cos-avatar-img"
                src="{{src}}"
                alt="头像"
            />

            <!-- 兜底图加载失败时显示灰色圆形背景 -->
            <div s-if="_error"
                class="cos-avatar-fallback"
                style="{{fallback ? 'background-image:url(' + fallback + ');' : ''}}"
            >
            </div>
        </div>
    `;

    initData(): AvatarData {
        return {
            src: '',
            alt: '',
            placeholder: '',
            fallback: '',
            size: Size.MD,
            _loading: true,
            _error: false
        };
    }

    /**
     * 组件挂载到 DOM 后，预加载主图片
     */
    attached() {
        const src = this.data.get('src');
        this.preloadImage(src);

        // 监听 src 变化，重新加载图片
        this.watch('src', val => {
            this.preloadImage(val);
        });
    }

    /**
     * 预加载图片
     */
    preloadImage(src: string) {
        if (src) {
            const img = new Image();
            img.onload = () => this.load();
            img.onerror = () => this.error();
            img.src = src;
        }
        else {
            // 没有提供 src 时，直接设置为加载失败
            this.error();
        }
    }

    /**
     * 图片加载成功的回调
     */
    load() {
        this.data.set('_loading', false);
        this.data.set('_error', false);
    }

    /**
     * 图片加载失败的回调
     */
    error() {
        this.data.set('_loading', false);
        this.data.set('_error', true);
    }
}
