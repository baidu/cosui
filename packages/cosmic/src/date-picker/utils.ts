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

/**
 * 计算两个日期之间的天数差
 *
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 返回两个日期之间的天数差
 */
export const daysBetween = (date1: Date, date2: Date) => {
    // 获取两个日期的时间戳（毫秒）
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    // 计算差值（毫秒）
    const diffMs = Math.abs(time1 - time2);
    // 转换为天数（1天 = 24小时 × 60分钟 × 60秒 × 1000毫秒）
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return days;
};

/**
 * 检查给定的日期是否存在于指定的月份数组中
 *
 * @param date 需要检查的日期
 * @param monthsArray 包含年月信息的数组，数组元素为对象，对象包含 'year' 和 'month' 两个属性
 * @returns 如果日期存在于月份数组中则返回 true，否则返回 false
 */
export function isDateInMonths(date: Date, monthsArray: Array<{year: number, month: number}>) {
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth() + 1;

    // 检查月份数组中是否存在匹配的年和月
    return monthsArray.some(monthItem =>
        monthItem.year === dateYear && monthItem.month === dateMonth
    );
}