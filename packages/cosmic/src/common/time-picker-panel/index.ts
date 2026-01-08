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
 */

import {Component} from 'san';
import Picker from '@cosui/cosmic/picker';
import type {TimePickerPanelProps} from './interface';

export default class TimePickerPanel extends Component<TimePickerPanelProps> {
    static template = `
        <template>
            <div class="cos-time-picker-panel-header">
                <div s-for="item, index in format" class="cos-time-picker-panel-header-item">
                    <span class="cos-time-picker-panel-header-item-value">
                        {{timeInfo[item].list[timeInfo[item].selectedIndex]}}
                    </span>
                    <span
                        s-if="index < format.length - 1"
                        class="cos-time-picker-panel-header-item-split"
                    > : </span>
                </div>
                <div
                    class="cos-time-picker-panel-header-item"
                    s-if="format.length === 1 && format[0] === 'HH'"
                >
                    <span
                        class="cos-time-picker-panel-header-item-split"
                    > : </span>
                    <span class="cos-time-picker-panel-header-item-value">00</span>
                </div>
            </div>
            <div class="cos-time-picker-panel-content" >
                <cos-picker
                    class="cos-gutter"
                    style="--cos-grid-gutter: 6px"
                    columns="{{pickerData.columns}}"
                    selected-index="{{pickerData.selectedIndex}}"
                    on-change="onPickerViewChange"
                />
                <div class="cos-time-picker-panel-content-selected">
                    <div
                        class="cos-time-picker-panel-content-selected-item"
                        s-for="item in format"
                    ></div>
                </div>
            </div>
        </template>
    `;

    static components = {
        'cos-picker': Picker
    };

    initData(): TimePickerPanelProps {
        return {
            format: [],
            pickerData: {
                columns: [],
                selectedIndex: 0
            },
            timeInfo: {}
        };
    }

    onPickerViewChange(data: {columnIndex: number, index: number}) {
        this.fire('change', data);
    }
}

