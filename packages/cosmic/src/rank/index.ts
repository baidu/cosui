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
 * @file rank
 */

import {Component} from 'san';
import {RankData} from './interface';

export default class Rank extends Component<RankData> {
    static trimWhitespace = 'all';

    static template = `
        <span
            class="cos-rank{{
                size ? ' cos-' + size + '-' + digit : ''}}{{
                appearance ? ' cos-rank-' + appearance : ''}}{{
                index > 4 ? '' : ' cos-rank-' + appearance + '-' + index}}"
        >
            <span class="cos-rank-index">{{rank}}</span>
        </span>
    `;

    static computed = {
        digit(this: Rank) {
            const digit = String(this.data.get('index')).length;
            return digit < 3 ? '2' : digit > 3 ? '4' : '3';
        },
        rank(this: Rank) {
            const index = this.data.get('index');
            const indexNumber = Number(index);

            return isNaN(indexNumber) ? index : indexNumber > 999 ? '999+' : indexNumber;
        }
    };

    /**
     * @description 初始化数据函数，返回一个包含默认值的对象
     * @returns {Object} 包含默认值的对象，属性为size、index和appearance，分别是字符串类型，默认值为'lg'、1和'filled-leaf'
     */
    initData(): RankData {
        return {
            size: 'lg',
            index: 1,
            appearance: 'filled-leaf'
        };
    }
}
