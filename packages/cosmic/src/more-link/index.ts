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
 * @file 查看更多链接组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import type {MoreLinkData} from './interface';

export default class MoreLink extends Component<MoreLinkData> {

    static template = `
        <a
            class="cos-more-link cos-more-link-{{appearance}}"
            href="{{url || (linkInfo && linkInfo.href)}}"
            target="{{target || (linkInfo && linkInfo.target)}}"
            s-bind="linkInfo"
        >
            <span class="cos-more-link-container">
                <span class="cos-more-link-text">
                    <slot>查看更多</slot>
                </span>
                <cos-icon name="right" class="cos-more-link-icon"/>
            </span>
        </a>
    `;

    static components = {
        'cos-icon': Icon
    };

    /**
     * @description 初始化数据，返回一个包含url、target、appearance和linkInfo的对象
     * @returns {Object} 包含url、target、appearance和linkInfo的对象，
     *      其中url为字符串类型，target为字符串类型，appearance为'subtle'作为默认值，linkInfo为空对象{}
     */
    initData(): MoreLinkData {
        return {
            url: '',
            target: '',
            appearance: 'subtle',
            linkInfo: {}
        };
    }
}
