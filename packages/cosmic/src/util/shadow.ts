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
 * 判断元素是否在 Shadow DOM 中
 * 背景：组件文档示例放在 Shadow DOM 中。当事件在组件外部捕获时，Shadow DOM 中发生的事件将会以 host 元素作为目标，而非真实的内部元素
 * 参考：https://zh.javascript.info/shadow-dom-events
 */

export function isInShadow(node?: Element) {
    let parent = node && node.parentNode;
    while (parent) {
        if (parent.toString() === '[object ShadowRoot]') {
            return true;
        }
        parent = parent.parentNode;
    }
    return false;
}