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

export interface TagProps {
    /**
     * 标签尺寸
     * @default sm
     * @platform PC/Mobile
     */
    size?: 'sm' | 'md';
    /**
    * 标签风格
    *  'filled'表示填充型
    *  'outline'表示线型
    * @default filled
    * @platform PC/Mobile
    */
    appearance?: 'filled' | 'outline';

    /**
    * 标签是否为单字符
    * @default false
    * @platform PC/Mobile
    */
    _singleText?: boolean;
};


export type TagData = Required<TagProps>;