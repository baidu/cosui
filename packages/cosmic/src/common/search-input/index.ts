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
 * @file 搜索框
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import Input from '@cosui/cosmic/input';
import type {SearchInputProps} from './interface';
import {Debounce} from '../../util';

export default class SearchInput extends Component<SearchInputProps> {
    static template = `
        <div class="cos-search-input">
            <cos-input
                class="cos-flex-1 cos-search-input-box"
                maxlength="{{maxLength}}"
                placeholder="{{placeholder}}"
                appearance="filled"
                value="{{value}}"
                clear
                on-focus="onFocus"
                on-input="onInput"
                on-clear="onClear"
            >
                <cos-icon
                    slot="prefix"
                    name="search"
                    class="cos-color-text-minor"
                />
            </cos-input>
            <span s-if="active" class="cos-space-ml-xs cos-search-input-cancel" on-click="onCancel">取消</span>
        </div>
    `;

    static components = {
        'cos-icon': Icon,
        'cos-input': Input
    };

    debounce: Debounce | null;

    initData() {
        return {
            maxLength: 20,
            placeholder: '搜索',
            active: false,
            value: ''
        };
    }

    detached() {
        this.fire('cancel');
        this.debounce?.clean();
    }
    onFocus() {
        this.fire('focus');
    }
    onInput(data: {value: string}) {
        if (!this.debounce) {
            this.debounce = new Debounce(100);
        }
        this.debounce?.debounce(() => this.fire('input', data.value), this);
    }
    onClear() {
        this.fire('clear');
    }
    onCancel() {
        this.fire('cancel');
    }
}