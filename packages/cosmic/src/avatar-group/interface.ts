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

export interface AvatarGroupProps {
    /**
     * 头像组尺寸
     * @default Size.MD
     */
    size: Size;
    /**
     * 是否开启头像组动画
     * @default false
     */
    animate: boolean;

    /**
     * 头像组宽度,修复开启动画后头像组宽度为 0 问题
     */
    _groupWidth: {
        width: string;
    } | null;

    /**
     * animate 辅助参数，延缓 cos-avatar-group-animate 样式生效，避免动画未计算完成时，头像已重叠在一起
     */
    _animate: boolean;
};

export type AvatarGroupData = Required<AvatarGroupProps>;