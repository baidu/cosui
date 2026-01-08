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
 * @file tag
 */

import {Component} from 'san';
import {TagData} from './interface';

export default class Tag extends Component<TagData> {
    static trimWhitespace = 'all';

    static template = `
        <span
            class="cos-tag{{size ? ' cos-' + size : ''}}{{
                appearanceClass
            }}{{
                _singleText ? ' cos-tag-single-text' : ''
            }}"
        >
            <slot></slot>
        </span>
    `;

    static computed = {

        /**
         * tag 变体对应的 class
         */
        appearanceClass(this: Tag) {
            const appearance = this.data.get('appearance');

            // 使用时设置字体色 token，则组件内部不设置默认 token
            const textToken = this.data.get('class')?.includes('cos-color-text');
            if (!appearance) {
                return '';
            }
            return appearance === 'filled'
                ? `${textToken ? '' : ' cos-color-text-on-primary'} cos-tag-filled`
                : ` cos-tag-${appearance}`;
        }
    };

    initData(): TagData {
        return {
            size: 'sm',
            appearance: 'filled',
            _singleText: false
        };
    }

    attached() {
        this.nextTick(() => {
            const innerText = (this.el as HTMLElement)?.innerText;
            // 单字符 sm 尺寸标签，左右间距不修改（仍为 2px），避免间距增大导致样式违和（正方形变长方形）
            if (innerText?.trim()?.length <= 1) {
                this.data.set('_singleText', true);
            }
        });
    }
}