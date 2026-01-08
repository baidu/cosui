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
 * @file URL 验证工具
 * @description 判断字符串是否为合法的 URL 地址
 */

/**
 * 判断给定的字符串是否为合法的 URL 地址
 *
 * @param str 待判断的字符串
 * @returns 如果给定的字符串是合法的 URL 地址，则返回 true；否则返回 false
 */
export function isURL(str: string | undefined | null): boolean {
    if (!str || typeof str !== 'string') {
        return false;
    }

    // 去除首尾空格
    const trimmedStr = str.trim();
    if (!trimmedStr) {
        return false;
    }

    return trimmedStr.toLowerCase().startsWith('http');
}

