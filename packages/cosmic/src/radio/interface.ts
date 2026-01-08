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

export type Appearance = 'tag' | 'mark';

export interface RadioProps {
    appearance: Appearance;
    disabled: boolean;
    value: string | number;
    checked: boolean;
};

export interface RadioMessages {
    'cos:radio-checked-changed': {
        value: string | number;
        event: Event;
    };
}

export type RadioData = Required<RadioProps>;