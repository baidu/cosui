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

const isObject = (v: unknown): v is Record<string, unknown> => {
    return Object.prototype.toString.call(v) === '[object Object]';
};

// 深度合并两个对象
export const deepMerge = (target: any, source: any): any => {
    if (!isObject(target) || !isObject(source)) {
        if (Array.isArray(target) && Array.isArray(source)) {
            return source;
        }

        return source;
    }

    const output = {...target};

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const targetValue = target[key];
            const sourceValue = source[key];

            if (isObject(targetValue) && isObject(sourceValue)) {
                output[key] = deepMerge(targetValue, sourceValue);
            }
            else {
                output[key] = sourceValue;
            }
        }
    }

    return output;
};
