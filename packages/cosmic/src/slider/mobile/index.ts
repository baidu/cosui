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
 *
 * @file Slider 组件
 */

import SliderBase from '../base';
import {SliderEvents} from '../interface';

export default class Slider extends SliderBase {

    static template = `
        <div class="cos-slider{{disabled ? ' cos-slider-disabled' : ''}}" on-click="handleClick">
            <div s-ref="rail" class="cos-slider-rail" />
            <div style="{{_trackPosition}}" class="cos-slider-track" />
            <cos-tooltip
                s-ref="leftHandle"
                trigger="custom"
                open="{{_open && tooltip}}"
                content="{{leftHandleValue | tooltipFormatValue(tooltipFormat)}}"
                getPopupContainer="{{_getPopupContainer}}"
                style="left: {{transformPercentage(value[0] ? value[0] : value)}}%;"
                class="cos-slider-handle-left"
                on-touchstart="native:handleTouchStart"
                on-touchmove="native:handleMove"
                on-touchend="native:handleTouchEnd"/>
            <cos-tooltip
                s-if="range"
                s-ref="rightHandle"
                trigger="custom"
                open="{{_rightOpen && tooltip}}"
                content="{{value[1] | tooltipFormatValue(tooltipFormat)}}"
                getPopupContainer="{{_getPopupContainer}}"
                style="left: {{transformPercentage(value[1])}}%;"
                class="cos-slider-handle-right"
                on-touchstart="native:handleTouchStart($event, true)"
                on-touchmove="native:handleMove($event)"
                on-touchend="native:handleTouchEnd($event)"/>

            <div class="cos-slider-marks">
                <!-- 最小/最大刻度外要有 3px 的间距 -->
                <span s-for="mark in _marks" style="left: {{mark.offset}}%;{{
                    mark.boundary === 'min' ? 'margin-left: 3px;' : ''}}{{
                    mark.boundary === 'max' ? 'margin-left: -3px;' : ''}}" />
            </div>
            <div class="cos-slider-marks-label">
                <!-- 最小/最大刻度的文字描述不能超出轨道 -->
                <span s-for="mark, index in _marks" data-index="{{index}}"
                    style="left: {{mark.offset}}%;{{
                    mark.boundary === 'min' ? 'transform: translateX(0);' : ''}}{{
                    mark.boundary === 'max' ? 'transform: translateX(-100%);' : ''}}">
                    {{mark.label}}</span>
            </div>
        </div>
    `;

    handleTouchStart(event: TouchEvent, isRightHandle: boolean = false) {
        event.preventDefault();
        // 多根手指触摸屏幕时，不处理
        if (event.changedTouches.length !== 1 || this.data.get('disabled')) {
            return;
        }
        this.isRightHandle = isRightHandle;
        if (isRightHandle) {
            this.data.set('_rightOpen', true);
            this.startHandleValue = this.data.get('value')[1];
        }
        else {
            this.data.set('_open', true);
            this.startHandleValue = this.data.get('leftHandleValue');
        }
        this.startX = event.touches[0].clientX;
    }

    handleTouchEnd() {
        if (this.data.get('disabled')) {
            return;
        }
        this.isRightHandle ? this.data.set('_rightOpen', false) : this.data.set('_open', false);
        const value = this.data.get('value');
        this.isRightHandle
            ? value[1] !== this.startHandleValue
                && this.fire<SliderEvents['change-complete']>('change-complete', {value})
            : this.data.get('leftHandleValue') !== this.startHandleValue
                && this.fire<SliderEvents['change-complete']>('change-complete', {value});
        this.startHandleValue = null;
    }

}