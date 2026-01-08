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

export interface PickerProps {

    /**
     * 滚轮数据
     */
    columns: Array<Array<string | number | Record<string, any>>>;

    /**
     * 外部数据传入选中项的索引
     */
    selectedIndex: number[];

    /**
     * 组件内部选中项的索引
     */
    _selectedIndex: number[];
}

export interface PickerEvents {
    change: {
        columnIndex: number;
        index: number;
    };
}

export type PickerData = Required<PickerProps>;