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
 * @file switcher 组件
 */

import {Component} from 'san';
import type {SwitchData, SwitchEvents} from './interface';

export default class Switcher extends Component<SwitchData> {
    static trimWhitespace = 'all';

    static template = `
        <div
            class="cos-switcher{{
                disabled ? ' cos-disabled' : ''}}{{
                size === 'md' ? ' cos-md' : ' cos-sm'}}{{
                checked ? ' cos-checked' : ''}}"
            on-click="swiperClick"
        >
            <div class="cos-switcher-slider"/>
        </div>
    `;

    initData(): SwitchData {
        return {
            checked: false,
            size: 'md',
            disabled: false
        };
    }

    swiperClick(event: Event) {
        if (this.data.get('disabled')) {
            return;
        };

        const checked = this.data.get('checked');
        this.data.set('checked', !checked);
        this.fire<SwitchEvents['change']>('change', {
            event,
            checked: !checked
        });
    }
}