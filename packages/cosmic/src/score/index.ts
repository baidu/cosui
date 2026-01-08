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
 * @file Score 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {ScoreData, ScoreProps, ScoreEvents, ScoreType, Size} from './interface';

const SIZE_WIDTH = {
    [Size.SM]: 12,
    [Size.MD]: 14,
    [Size.LG]: 24
};

export default class Score extends Component<ScoreData> {
    static trimWhitespace = 'all';

    static template = `
        <div class="cos-score cos-score-{{size}}{{controlled ? ' cos-score-controlled' : ''}}{{
            showStar ? ' cos-items-center' : ' cos-items-baseline'}}"
        >
            <!-- 分数 (注意这里 formattedValue*1 不能写成 +formattedValue -->
            <!-- bad case: csr 环境正常，ssr 环境下渲染 PC 模板时的报错 -->
            <span
                s-if="score"
                class="cos-score-count{{(formattedValue*1 || 0) ? '' : ' cos-score-zero'}}"
            >
                {{formattedValue}}
            </span>

            <!-- 星星图标 -->
            <div
                s-if="showStar"
                s-ref="container"
                class="cos-score-icon-container{{score ? ' cos-score-icon-bottom' : ''}}"
                on-click="handleClick"
            >
                <!-- 实心行 -->
                <div class="cos-score-row">
                    <!-- 整星实心行 -->
                    <span
                        s-for="star, index in _score.fullList"
                        :key="{{'icon' + index}}"
                        class="cos-score-icon"
                    >
                        <cos-icon name="star-fill" />
                    </span>
                    <!-- 半星实心行 -->
                    <span
                        s-if="_score.halfPart"
                        class="cos-score-icon cos-score-icon-decimal"
                        style="{{emptyStyle}}"
                    >
                        <cos-icon name="star-fill" />
                    </span>
                </div>

                <!-- 空心行 -->
                <div class="cos-score-row-empty">
                    <span
                        s-for="star, index in totalList"
                        :key="{{'icon' + index}}"
                        class="cos-score-icon-empty"
                    >
                        <cos-icon name="star-fill" />
                    </span>
                </div>
            </div>
            <span s-if="showUnit" class="cos-score-unit {{(formattedValue*1 || 0) ?
            '' : 'cos-score-zero'}}">{{unit}}</span>

            <!-- 文字 -->
            <span class="cos-score-text"><slot /></span>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        emptyStyle(this: Score) {
            const size = this.data.get('size') || Size.MD;
            const score = this.data.get('_score');
            const baseRatio = SIZE_WIDTH[size] / SIZE_WIDTH[Size.MD];
            const width = score.halfPart * baseRatio;
            return `width: ${width}em;`;
        },

        _score(this: Score) {
            const scoreType = this.data.get('type');
            let fullList = [];
            let halfPart = 0;
            const max = this.data.get('max');
            const currentValue = +this.data.get('formattedValue') || 0;
            const value = currentValue > max ? max : currentValue;
            const num = value / max * (scoreType === ScoreType.Single ? 1 : 5);
            if (scoreType === ScoreType.Single) {
                if (num === 1) {
                    // 当评分为满分时，显示一个满星
                    fullList = new Array(1);
                    halfPart = 0;
                }
                else {
                    // 非满分情况下，fullList 为空，halfPart 为小数部分
                    fullList = [];
                    halfPart = num;
                }
            }
            else {
                // 非单星评分的处理方式
                const length = Math.floor(num);
                fullList = new Array(length);
                halfPart = num === length ? 0 : num % 1;
            }
            return {
                // 获取分数的整数部分，即整星数量
                fullList,
                // 分数的小数值
                halfPart
            };
        },

        /**
         * 返回星星总数，五星评分为5个，单星评分为1个
         *
         * @returns {number[]} 星星总数
         */
        totalList(this: Score): number[] {
            const scoreType = this.data.get('type');
            return scoreType === ScoreType.Single ? [1] : [1, 2, 3, 4, 5];
        },

        /**
         * 返回是否展示星星
         *
         * @returns {boolean} 是否展示星星
         */
        showStar(this: Score): boolean {
            const scoreType = this.data.get('type');
            // 当评分无数据时，不展示星星
            const currentValue = this.data.get('value');
            // 视 value 为非 0 的空值情况为评分无数据
            if (!currentValue && currentValue !== 0) {
                return false;
            }
            return scoreType !== ScoreType.Text;
        },

        /**
         * 返回是否展示单位，type 为 text 时展示单位
         *
         * @returns {boolean} 是否展示单位
         */
        showUnit(this: Score): boolean {
            const scoreType = this.data.get('type');
            const value = this.data.get('value');
            // 当评分无数据时，不展示单位
            if (!value && value !== 0) {
                return false;
            }
            return scoreType === ScoreType.Text;
        },

        /**
         * 返回格式化后的分数
         *
         * @returns {string} 格式化后的分数
         */
        formattedValue(this: Score): string {
            let currentValue = this.data.get('value');
            // 视 value 为非 0 的空值情况为评分无数据
            if (!currentValue && currentValue !== 0) {
                return '暂无评分';
            }
            // 传入的 value 为字符串时，转换为数字（agent 场景会出现）
            if (typeof currentValue === 'string') {
                // 不可转换为数字时，NaN 兜底为 0
                currentValue = parseFloat(currentValue) || 0;
            }
            currentValue = Math.max(currentValue, 0);
            return currentValue.toFixed(1);
        }
    };
    initData(): ScoreProps {
        return {
            value: undefined,
            max: 5,
            score: false,
            unit: '分',
            type: ScoreType.Multiple,
            controlled: false,
            clearable: true,
            size: Size.MD
        };
    }

    handleClick(event: MouseEvent) {
        if (!this.data.get('controlled') || this.data.get('type') === ScoreType.Single) {
            return;
        }

        const container = this.ref('container') as unknown as HTMLElement;
        // 元素距离屏幕左侧的距离
        const rootX = container?.getBoundingClientRect().left;
        // 元素宽度
        const rootWidth = container.offsetWidth;
        const diffX = event.clientX - rootX;
        const num = diffX / rootWidth;
        let value = Math.ceil(num * (this.data.get('max') || 5));
        const originalValue = +this.data.get('formattedValue') || 0;

        // 若配置可清除，且点击的星星数与当前值相同，则清空
        if (value === originalValue && this.data.get('clearable')) {
            value = 0;
        }

        this.data.set('value', value);

        if (value !== originalValue) {
            this.fire<ScoreEvents['change']>('change', {value, event});
        }
    }
}