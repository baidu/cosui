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
                closeDelay="{{200}}"
                open="{{_open && tooltip}}"
                content="{{leftHandleValue | tooltipFormatValue(tooltipFormat)}}"
                getPopupContainer="{{_getPopupContainer}}"
                style="left: {{transformPercentage(value[0] ? value[0] : value)}}%;"
                class="cos-slider-handle-left"
                on-mousedown="native:handleMousedown"
                on-mouseenter="native:handleMouseenter(false)"
                on-mouseleave="native:handleMouseleave(false)"/>
            <cos-tooltip
                s-if="range"
                s-ref="rightHandle"
                trigger="custom"
                closeDelay="{{200}}"
                open="{{_rightOpen && tooltip}}"
                content="{{value[1] | tooltipFormatValue(tooltipFormat)}}"
                getPopupContainer="{{_getPopupContainer}}"
                style="left: {{transformPercentage(value[1])}}%;"
                class="cos-slider-handle-right"
                on-mousedown="native:handleMousedown($event, true)"
                on-mouseenter="native:handleMouseenter(true)"
                on-mouseleave="native:handleMouseleave(true)"/>

            <div class="cos-slider-marks">
                <span s-for="mark in _marks" style="left: {{mark.offset}}%;{{
                    mark.boundary === 'min' ? 'margin-left: 3px;' : ''}}{{
                    mark.boundary === 'max' ? 'margin-left: -3px;' : ''}}" />
            </div>
            <div class="cos-slider-marks-label">
                <span s-for="mark, index in _marks" data-index="{{index}}"
                    style="left: {{mark.offset}}%;{{
                    mark.boundary === 'min' ? 'transform: translateX(0);' : ''}}{{
                    mark.boundary === 'max' ? 'transform: translateX(-100%);' : ''}}">
                    {{mark.label}}</span>
            </div>
        </div>
    `;

    /**
     * 如果 mouseup 事件绑定在手柄上，当按下鼠标移动到手柄外面再松开时，手柄的 mouseup 不会触发
     * 为保证任何地方松开鼠标时都触发 mouseup，需要在 document 上监听
     * @param event MouseEvent
     * @param isRightHandle 是否是右手柄
     */
    handleMousedown(event: MouseEvent, isRightHandle: boolean = false) {
        event.preventDefault();
        if (this.data.get('disabled')) {
            return;
        }
        this.isRightHandle = isRightHandle;
        this.startHandleValue = isRightHandle
            ? this.data.get('value')[1]
            : this.data.get('leftHandleValue');
        this.startX = event.clientX;
        this.mouseup = this.handleMouseup.bind(this);
        this.mousemove = this.handleMove.bind(this);
        document.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
    }


    handleMouseup(event: MouseEvent) {
        // 在 PC 端，mousedown → mousemove(只有鼠标移动才触发，一次或多次) → mouseup → click 事件是连续触发，按顺序执行的
        // 为避免 click 事件中更改 mouseup 已确定的 value 值，阻止 mouseup 触发 click 事件
        event.preventDefault();
        this.dragging = false;
        if (this.data.get('disabled')) {
            return;
        }
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
        this.isRightHandle ? this.data.set('_rightOpen', false) : this.data.set('_open', false);
        const value = this.data.get('value');
        this.isRightHandle
            ? value[1] !== this.startHandleValue
            && this.fire<SliderEvents['change-complete']>('change-complete', {value})
            : this.data.get('leftHandleValue') !== this.startHandleValue
            && this.fire<SliderEvents['change-complete']>('change-complete', {value});
        this.startHandleValue = null;
    }

    // 鼠标移入
    handleMouseenter(isRightHandle: boolean) {
        if (this.data.get('disabled') || this.dragging
            || this.data.get('_open') || this.data.get('_rightOpen')) {
            return;
        }
        isRightHandle ? this.data.set('_rightOpen', true) : this.data.set('_open', true);
    }

    // 鼠标移出
    handleMouseleave(isRightHandle: boolean) {
        if (this.data.get('disabled') || this.dragging) {
            return;
        }
        isRightHandle ? this.data.set('_rightOpen', false) : this.data.set('_open', false);
    }
}