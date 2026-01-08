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
 * 格式化价格数字
 * @param price - 价格数字或字符串数字
 * @param ellipsis - 是否省略小数点后两位
 * @returns 格式化后的价格
 */

export function formatPrice(price: number | string, ellipsis = false): number {
    const numPrice = +price;
    let computedPrice = 0;
    if (numPrice > 0 && numPrice < 10000) {
        computedPrice = numPrice;
    }
    else if (numPrice >= 10000 && numPrice < 100000000) {
        computedPrice = numPrice / 10000;
    }
    else if (numPrice >= 100000000) {
        computedPrice = numPrice / 100000000;
    }
    // 当小数点后第一位数字为0，则显示数值取整
    let str = computedPrice.toString().split('.')[1];
    if (str && str.startsWith('0') && str.length > 1) {
        return Math.round(computedPrice);
    }
    else if (ellipsis) {
        return Math.floor(computedPrice);
    }
    return parseFloat(computedPrice.toFixed(2));
}

/**
 * 分割整数、小数点、小数、数字单位
 */
export function splitNumber(num: number | string) {
    const numStr = typeof num === 'string' ? num : num.toString();
    const unitMatch = numStr.match(/[\d.]+([亿\+万\+]*)/);
    const pureNum = unitMatch ? numStr.replace(unitMatch[1], '') : numStr;
    const parts = pureNum.split('.');
    return {
        integer: parts[0],
        decimal: parts.length > 1 ? `.${parts[1]}` : '',
        quantityUnit: unitMatch ? unitMatch[1] : ''
    };
}
