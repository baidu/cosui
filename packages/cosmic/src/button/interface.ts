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

export interface ButtonProps {

    /**
     * 按钮尺寸
     */
    size?: 'md' | 'sm';

    /**
     * 是否是禁用态
     */
    disabled?: boolean;

    /**
     * 按钮风格
     */
    appearance?: 'primary' | 'secondary' | 'text' | 'text-primary' | 'icon';

    /**
     * 按钮是否处在活跃状态如：click、touch、mouse 等
     */
    _active?: boolean;
};

export interface ButtonEvents {
    click: {
        event: Event;
        disabled: boolean;
    };
}

export type ButtonData = Required<ButtonProps>;