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
 * @file 平台判断
 */

const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const uaLower = ua.toLowerCase();

/**
 * 判断是否为 android，注意 SSR 无法使用
 */
export const isAndroid = /android/ig.test(ua);

/**
 * 判断是否是 ios，注意 SSR 无法使用
 */
export const isIOS = /(iPhone|iPod|iPad)/ig.test(ua);


/**
 * 判断是否为鸿蒙系统, 注意 SSR 无法使用
 */
export const isArkWeb = ua.indexOf('ArkWeb') > -1;


/**
 * 判断是否为 isBaiduBox，注意 SSR 无法使用
 */
export const isBaiduBox = !isArkWeb && (uaLower.includes('baiduboxapp') || uaLower.includes('bdhonorbrowser'));