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
 * @file utils
 */

/**
 * 比较两个日期的大小，仅比较年月日
 *
 * @param dayA 日期A
 * @param dayB 日期B
 */
export function compareDay(dayA: Date, dayB: Date) {
    if (!dayA || !dayB) {
        return;
    }

    const newDayA = new Date(dayA.getFullYear(), dayA.getMonth(), dayA.getDate());
    const newDayB = new Date(dayB.getFullYear(), dayB.getMonth(), dayB.getDate());

    if (newDayA < newDayB) {
        return 1;
    }
    if (newDayA > newDayB) {
        return -1;
    }
    return 0;
}

/**
 * 判断目标日期是否在起始日期和结束日期之间
 *
 * @param startDate 起始日期
 * @param endDate 结束日期
 * @param targetDate 目标日期
 * @returns 如果目标日期在起始日期和结束日期之间，则返回 true；否则返回 false
 */
export function isBetweenDate(startDate: Date, endDate: Date, targetDate: Date) {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const targetTime = targetDate.getTime();
    return targetTime > startTime && targetTime < endTime;
}