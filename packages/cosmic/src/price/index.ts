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
 * @file price
 * @description 2024/08/22 迁移自 cosmic-card
 */

import {Component} from 'san';
import {PriceData, SizeData} from './interface';
import {formatPrice, splitNumber} from './util';
/*
* 表示1万
*/
const UNIT_WAN = 10000;
/*
* 表示1亿
*/
const UNIT_YI = 100000000;

/**
 * 格式化价格数字
 *
 * @param price - 价格数字或字符串数字
 * @returns 格式化后的价格
 */
export default class Price extends Component<PriceData> {
    static trimWhitespace = 'all';

    static template = `
        <span class="cos-price cosc-price">
            <!-- 价格符号 -->
            <span
                s-if="sign"
                class="cos-price-sign cosc-price-sign cos-sign-{{'sign' | getSize}} cosc-sign-{{'sign' | getSize}}"
            >
                {{sign}}
            </span>
            <!-- 价格值/区间范围 -->
            <span class="cos-price-value cosc-price-value{{'num' | getValueSize}}">
                <fragment s-if="!range">
                    <span class="cos-price-value-integer{{'integer' | getValueSize}}">
                        {{computedValue.integer}}
                    </span>
                    <span
                        s-if="computedValue.decimal"
                        class="cos-price-value-decimal{{'decimal' | getValueSize}}"
                    >
                        {{computedValue.decimal}}
                    </span>
                    <span
                        s-if="computedValue.quantityUnit"
                        class="cos-space-ml-3xs cos-price-value-quantity-unit{{
                            'quantityUnit' | getValueSize}}"
                    >
                        {{computedValue.quantityUnit}}
                    </span>
                </fragment>
                <fragment s-else>
                    <span class="cos-price-value-integer{{'integer' | getValueSize}}">
                        {{computedValue.min.integer}}
                    </span>
                    <span
                        s-if="computedValue.min.decimal"
                        class="cos-price-value-decimal{{'decimal' | getValueSize}}"
                    >
                        {{computedValue.min.decimal}}
                    </span>
                    <span
                        s-if="computedValue.min.quantityUnit"
                        class="cos-space-ml-3xs cos-price-value-quantity-unit{{
                            'quantityUnit' | getValueSize}}"
                    >
                        {{computedValue.min.quantityUnit}}
                    </span>
                    <span>-</span>
                    <span class="cos-price-value-integer{{'integer' | getValueSize}}">
                        {{computedValue.max.integer}}
                    </span>
                    <span
                        s-if="computedValue.max.decimal"
                        class="cos-price-value-decimal{{'decimal' | getValueSize}}"
                    >
                        {{computedValue.max.decimal}}
                    </span>
                    <span
                        s-if="computedValue.max.quantityUnit"
                        class="cos-space-ml-3xs cos-price-value-quantity-unit{{
                            'quantityUnit' | getValueSize}}"
                    >
                        {{computedValue.max.quantityUnit}}
                    </span>
                </fragment>
            </span>
            <!-- 价格单位 -->
            <span
                s-if="unit"
                class="cos-space-ml-3xs cos-price-unit cosc-price-unit cos-{{
                    'unit' | getSize}} cosc-{{'unit' | getSize}}"
            >
                {{unit}}
            </span>
            <!-- 价格原始值 -->
            <span
                s-if="originValue"
                class="cos-price-origin-value cosc-price-origin-value cos-{{'originValue' | getSize}}
                    cosc-{{'originValue' | getSize}}"
            >
                <span
                    s-if="sign"
                >
                    {{sign}}
                </span>
                {{computedOriginValue}}
            </span>
            <span
                s-if="originText"
                class="cos-price-origin-text cosc-price-origin-text cos-{{'originText' | getSize}}
                    cosc-{{'originText' | getSize}}"
            >
                {{originText}}
            </span>
        </span>
    `;

    static computed = {
        /**
         * 计算价格值
         *
         * @param this 当前对象实例
         * @returns 计算后的价格值
         */
        computedValue(this: Price) {
            const format = this.data.get('format');
            const value = this.data.get('value') as number;
            const max = +this.data.get('max');
            const min = +this.data.get('min');
            const range = this.data.get('range');

            // 不需要格式化的 value 直接返回
            if (!format) {
                return range ? {min: splitNumber(min), max: splitNumber(max)} : splitNumber(value);
            }
            const numValue = +value;
            const ellipsis = this.data.get('ellipsis');
            const coscPrice = range ? max : numValue;
            // 数值单位
            let quantityUnit = '';
            // 计算最小值，统一区间价格的单位
            let computedMinPrice = 0;
            if (coscPrice >= UNIT_WAN && coscPrice < UNIT_YI) {
                quantityUnit = ellipsis ? '万+' : '万';
                computedMinPrice = min / UNIT_WAN;
            }
            else if (coscPrice >= UNIT_YI) {
                quantityUnit = ellipsis ? '亿+' : '亿';
                computedMinPrice = min / UNIT_YI;
            }
            else {
                quantityUnit = '';
                computedMinPrice = min;
            }
            // 判断是否为区间价格
            if (range) {
                const splittedMax = splitNumber(formatPrice(max) + quantityUnit);
                const splittedMin = splitNumber(parseFloat(computedMinPrice.toFixed(2)));
                return {
                    min: splittedMin,
                    max: splittedMax
                };
            }

            const origin = formatPrice(numValue, ellipsis) + quantityUnit;
            return splitNumber(origin);
        },
        /**
         * 计算原始值
         *
         * @param this 价格对象
         * @returns 返回格式化后的原始值字符串
         */
        computedOriginValue(this: Price) {
            const originValue = +this.data.get('originValue');
            if (originValue >= UNIT_WAN && originValue < UNIT_YI) {
                return formatPrice(originValue) + '万';
            }
            else if (originValue >= UNIT_YI) {
                return formatPrice(originValue) + '亿';
            }
            return formatPrice(originValue);
        }
    };
    static filters: any = {

        /**
        * 获取字体大小
        *
        * @param this 当前对象
        * @param key 字体大小
        * @returns 返回对应的字体大小
        */
        getSize(this: Price, key: keyof SizeData) {
            const size = this.data.get('size');
            return typeof size === 'object' ? size?.[key] : size;
        },

        /**
        * 获取价格值字号大小
        *
        * @param this 当前对象
        * @param key 价格值字号大小
        * @returns 返回对应的字号大小
        */
        getValueSize(this: Price, key: keyof SizeData['num']) {
            const size = this.data.get('size');

            if (key === 'num') {
                // 当 key 为 num 且 size 非对象时，使用 size
                // 当 key 为 num 且 size.num 为字符串时，使用 size.num
                // 当 key 为 num 且 size.num 非字符串时，则设置默认字号
                return typeof size === 'object'
                    ? typeof size?.num === 'string' ? ` cos-${size?.num} cosc-${size?.num}` : 'xs'
                    : ` cos-${size} cosc-${size}`;
            }

            if (typeof size === 'string') {
                // 特殊处理整数/小数/数量单位，当没有特殊设置时，遵循父级 cos-price-value 的字号
                return '';
            }
            const valueSize = size?.num;
            if (typeof valueSize === 'object') {
                // key 不存在，则默认使用整数字号
                return valueSize?.[key]
                    ? ` cos-${valueSize?.[key]}`
                    : ` cos-${valueSize?.integer}` || '';
            }
            // 未设置整数字号，则不设置，遵循父级 cos-price-value 的字号
            return '';
        }
    };

    initData(): PriceData {
        return {
            // 是否需要组件进行格式化价格
            format: true,
            // 货币符号
            sign: '',
            // 区间价格形态
            range: false,
            // 当前价格
            value: '--',
            // 区间价格最低价
            min: 0,
            // 区间价格最高价
            max: 0,
            // 展示单位
            unit: '',
            // 原始价格，有删除线
            originValue: 0,
            // 原始第三价格，无删除线，可为自定义文本
            originText: 0,
            // 省略符号
            ellipsis: false,
            // 字体大小
            size: 'xs'
        };
    };
}
