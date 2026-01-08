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
 * @file title 组件
 */

import {Component} from 'san';
import type {TitleData} from './interface';
import Icon from '@cosui/cosmic/icon';
import Tag from '@cosui/cosmic/tag';
import {isURL} from '@cosui/cosmic/util';

export default class Title extends Component<TitleData> {
    static trimWhitespace = 'all';

    static template = `
        <h3 class="cosc-title">
            <!-- 用 span 不用 div 的原因：业务方直接从根节点上添加 cos-line-clamp-x 能正常截断 -->
            <component
                class="cosc-title-a{{
                    _linkHref ? ' cos-link' : ''}}{{
                    ' cosc-title-' + size + ' '}}"
                s-is="{{_linkHref ? 'a' : 'span'}}"
                href="{{_linkHref}}"
                s-bind="linkInfo"
            >
                <!-- icon：icon 组件或自定义 -->
                <template s-if="{{icon}}">
                    <cos-icon
                        s-if="{{!isUrl(icon)}}"
                        class="cosc-title-icon"
                        name="{{icon}}"
                    />
                    <span
                        s-else
                        class="cosc-title-icon cosc-title-icon-custom"
                        style="{{{'background-image': 'url(' + icon + ')'}}}"
                    ></span>
                </template>

                <!-- tag：tag 组件 -->
                <cos-tag
                    s-if="{{tag}}"
                    class="cosc-title-tag color-text-on-primary
                    cos-text-caption-sm cos-color-bg-primary cos-rounded-xxs"
                >
                    {{tag}}
                </cos-tag>

                <!-- 默认插槽 -->
                <span class="cosc-title-slot">
                    <slot></slot>
                </span>
            </component>
        </h3>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-tag': Tag
    };

    static computed = {
        /**
         * 获取链接地址
         *
         * @this {Title} - 当前Title实例
         * @returns {string} 返回链接地址，优先顺序：url > linkInfo.href
         */
        _linkHref(this: Title) {
            const url = this.data.get('url');
            const linkInfo = this.data.get('linkInfo');
            return url || (linkInfo && linkInfo.href) || '';
        }
    };

    initData(): TitleData {
        return {
            size: 'md',
            url: '',
            icon: '',
            tag: '',
            linkInfo: {}
        };
    }

    /**
     * 判断给定的字符串是否为合法的URL地址
     *
     * @param str 待判断的字符串
     * @returns 如果给定的字符串是合法的URL地址，则返回true；否则返回false
     */
    isUrl = isURL;
}
