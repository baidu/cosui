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
 * @file Icon
 * icon 的 css 源码在 iconfont 仓库中
 */

import {Component} from 'san';
import type {IconData} from './interface';
export default class Icon extends Component<IconData> {

    static trimWhitespace = 'all';
    static template = `
        <i class="cos-icon{{name ? ' cos-icon-' + name : ''}}"/>
    `;

    initData(): IconData {
        return {
            name: ''
        };
    }
}
