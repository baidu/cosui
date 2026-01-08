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

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export interface SizeData {

    /**
     * 符号字号
     */
    sign?: Size;

    /**
     * 数值字号
     */
    num?: Size | {

        /**
         * 整数字号
         */
        integer?: Size;

        /**
         * 小数字号
         */
        decimal?: Size;

        /**
         * 数量单位字号
         */
        quantityUnit?: Size;
    };

    /**
     * 单位字号
     */
    unit?: Size;

    /**
     * 原始值字号
     */
    originValue?: Size;

    /**
     * 原始文本字号
     */
    originText?: Size;
}
export interface PriceProps {
    /**
     * 是否格式化
     */
    format?: boolean;

    /**
     * 符号标识
     */
    sign?: string;
    /**
     * 是否为区间价格
     */
    range?: boolean;
    /**
     * 价格数值
     */
    value: number | string;

    /**
     * 最小值
     */
    min: number | string;

    /**
     * 最大值
     */
    max: number | string;
    /**
     * 单位标识
     */
    unit?: string;
    /**
     * 原始价格数值
     */
    originValue: number | string;

    /**
     * 原始价格文本
     */
    originText?: number | string;

    /**
     * 是否省略
     */
    ellipsis?: boolean;
    /**
     * 字号
     */
    size?: string | SizeData ;
};

export type PriceData = Required<PriceProps>;
