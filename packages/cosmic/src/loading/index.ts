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
 * @file Loading
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import type {LoadingData} from './interface';

export default class Loading extends Component<LoadingData> {

    static template = `
        <div class="cos-loading cos-flex cos-loading-{{position}}{{
            appearance ? ' cos-loading-' + appearance : ''}}">

            <slot name="icon">
                <cos-icon class="cos-loading-icon" name="loading" />
            </slot>
            <div s-if="text" class="cos-loading-text">
                {{text}}
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    initData(): LoadingData {
        return {
            appearance: '',
            text: '加载中...',
            position: 'bottom'
        };
    }
}
