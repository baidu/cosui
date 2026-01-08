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
import {EmptyData} from './interface';
import {Size} from '../util';
import Icon from '@cosui/cosmic/icon';
import {isURL} from '@cosui/cosmic/util';

const defaultIcon = {
    sm: 'https://gips0.baidu.com/it/u=686204025,3778150584&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f180_180',
    md: 'https://gips3.baidu.com/it/u=188694741,3942177833&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f360_270'
};

export default class Empty extends Component<EmptyData> {

    static trimWhitespace = 'all';

    static template = `
        <div class="cos-empty cos-empty-{{size}}">
            <img
                s-if="_isUrl"
                src="{{_icon}}"
                class="cos-empty-icon"
            />
            <cos-icon
                s-else
                name="{{icon}}"
                class="cos-empty-icon"
            />
            <div class="cos-empty-title">{{title}}</div>
            <div s-if="description" class="cos-empty-description">{{description}}</div>
            <slot />
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        _icon(this: Empty): string {
            const size = this.data.get('size');
            const icon = this.data.get('icon');
            return icon || defaultIcon[size];
        },
        _isUrl(this: Empty): boolean {
            const _icon = this.data.get('_icon');
            return isURL(_icon);
        }
    };

    initData(): EmptyData {
        return {
            size: Size.SM,
            icon: '',
            title: '',
            description: ''
        };
    }
}