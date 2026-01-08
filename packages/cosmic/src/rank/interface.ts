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

export type Size = 'sm' | 'md' | 'lg';
export type Appearance = 'filled-leaf' | 'filled' | 'subtle';

export interface RankProps {
    /**
    * 排行标签尺寸
    * @default lg
    * @platform PC/Mobile
    */
    size?: Size;

    /**
    * 标签序号
    * @default 1
    * @platform PC/Mobile
    */
    index: number;

    /**
    * 标签风格
    * @default filled-leaf
    * @platform PC/Mobile
    */
    appearance?: Appearance;
};

export type RankData = Required<RankProps>;