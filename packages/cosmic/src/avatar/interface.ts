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

import {Size} from '../util';

export interface AvatarProps {
    /**
     * 头像图像的地址
     * @default '''
     */
    src: string;

    /**
     * 图像无法显示时的替代文本
     * @default '''
     */
    alt: string;

    /**
     * 用于图像还没加载完成时的占位显示
     * @default '''
     */
    placeholder: string;

    /**
     * 头像的尺寸
     * @default Size.MD
     */
    size: Size;

    /**
     * 用于图像加载失败时展示
    */
    fallback: string;

    /**
     * 头像是否在加载中
     */
    _loading: boolean;

    /**
     * 头像是否加载失败
     */
    _error: boolean;
};

export type AvatarData = Required<AvatarProps>;
