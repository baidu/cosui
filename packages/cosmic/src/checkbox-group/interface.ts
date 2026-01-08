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

export interface CheckboxGroupData {
    /**
     * 选中项
     */
    value: number[] | string[];

    /**
     * 是否禁用所有子项
     */
    disabled: boolean;
}

export interface CheckboxMessage {
    /**
     * 选项值
     */
    value: string | number;
    /**
     * 是否选中
     */
    checked: boolean;
}

export interface CheckboxEvents {
    /**
     * 选中值变化时触发
     */
    change: number[] | string[];
}
