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

export interface SwitchProps {
    /**
     * 是否选中
     * @default false
     * @platform PC/Mobile
     */
    checked: boolean;
    /**
     * 开关尺寸
     * @sizeType sm/md
     * @default md
     * @platform PC/Mobile
     */
    size?: 'sm' | 'md';
    /**
     * 是否禁用
     * @default false
     * @platform PC/Mobile
     */
    disabled?: boolean;
}

export type SwitchData = Required<SwitchProps>;

export interface SwitchEvents {
    change: {event: Event, checked: boolean};
}