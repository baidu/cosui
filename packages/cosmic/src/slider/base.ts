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

import {Component} from 'san';
import {SliderData, Boundary, SliderEvents} from './interface';
import Tooltip from '@cosui/cosmic/tooltip';
import {Position} from '../util';

export default class Slider extends Component<SliderData> {

    static trimWhitespace = 'all';

    static components = {
        'cos-tooltip': Tooltip
    };

    static computed = {

        /**
         * 左边手柄的 value 值
         */
        leftHandleValue(this: Slider) {
            const value = this.data.get('value');
            return Array.isArray(value) ? value[0] : value;
        }
    };

    static filters = {
        tooltipFormatValue: (value: number, tooltipFormat: (value: number) => string) => {
            return tooltipFormat && typeof tooltipFormat === 'function' ? tooltipFormat(value) : value;
        }
    };

    /**
     * 触摸开始 x 位置
     */
    startX: number;

    /**
     * 触摸开始时的手柄 value 值
     */
    startHandleValue: number | null;

    /**
     * 是否拖拽中
     */
    dragging: boolean;

    isRightHandle: boolean;

    mouseup: null | ((event: MouseEvent) => void);
    mousemove: null | ((event: MouseEvent) => void);

    initData(): SliderData {
        return {
            value: 0,
            disabled: false,
            max: 100,
            min: 0,
            step: 1,
            marks: false,
            range: false,
            tooltip: true,
            tooltipFormat: null,
            _open: false,
            _rightOpen: false,
            _trackPosition: '',
            _marks: [],
            _getPopupContainer: () => {
                return this.el;
            }
        };
    }

    inited() {
        const {value, max, min} = this.data.get();
        let newValue: number | number[] = min;
        if (Array.isArray(value)) {
            newValue = [Math.max(value[0], min), Math.min(value[1], max)];
        }
        else {
            newValue = Math.min(Math.max(value, min), max);
            // range 模式下，value 需要为数组
            this.data.get('range') && (newValue = [newValue, newValue]);
        }
        this.data.set('value', newValue);
        this.startHandleValue = null;
        this.mouseup = () => {};
        this.mousemove = () => {};
    }

    attached() {
        this.watch('value', (value: number | number[]) => {
            this.updatedTrackPosition();
            this.fire<SliderEvents['change']>('change', {value});
            if (this.data.get('tooltip')) {
                this.nextTick(() => {
                    this.data.get('_open') && (this.ref<Tooltip>('leftHandle'))?.updatePosition();
                    this.data.get('_rightOpen') && (this.ref<Tooltip>('rightHandle'))?.updatePosition();
                });
            }
        });
        this.nextTick(() => {
            this.updatedTrackPosition();
            this.formatMarks();
        });
    }

    /**
     * 格式化 marks
     * @returns 格式化后的 marks
     */
    formatMarks() {
        const {marks, min, max, step} = this.data.get();
        if (!marks) {
            return [];
        }
        const _marks = [];
        if (marks === true) {
            for (let i = min; i <= max; i += (+step)) {
                const item = {
                    label: i,
                    offset: this.transformPercentage(i),
                    boundary: i === min ? Boundary.MIN : i === max ? Boundary.MAX : Boundary.NONE
                };
                _marks.push(item);
            }
        }
        else {
            Object.keys(marks).forEach(key => {
                const item = {
                    label: marks[key],
                    offset: this.transformPercentage(+key),
                    boundary: +key === min ? Boundary.MIN : +key === max ? Boundary.MAX : Boundary.NONE
                };
                _marks.push(item);
            });
        }
        this.data.set('_marks', _marks);
    }

    /**
     * 把值根据 min、max 转换为百分比
     * @param value 值
     * @returns 百分比
     */
    transformPercentage(value: number) {
        const {min, max} = this.data.get();
        return ((value - min) / (max - min)) * 100;
    }

    /**
     * 把移动的距离转换为对应 step 取整后的值
     * @param distance 距离
     * @returns 值
     */
    transformValue(distance: number) {
        const railWidth = this.ref('rail')?.getBoundingClientRect()?.width;
        if (!railWidth) {
            return 0;
        }
        const {min, max, step} = this.data.get();

        // 移动百分比
        const percentage = Math.abs(distance) / railWidth;

        // 对应的值
        let valueChange = percentage * (max - min);

        // 值对应 step 取整
        return Math.round(valueChange / (+step)) * (+step);
    }

    /**
     * 更新左手柄的 value 值
     * @param newValue 新的 value 值
     */
    updatedLeftHandleValue(newValue: number) {
        Array.isArray(this.data.get('value'))
            ? this.data.set('value[0]', newValue)
            : this.data.set('value', newValue);
    }

    /**
     * 更新 track 的位置
     */
    updatedTrackPosition() {
        const value = this.data.get('value');
        if (this.data.get('range')) {
            const leftHandleOffset = this.transformPercentage(value[0]);
            const rightHandleOffset = this.transformPercentage(value[1]);
            this.data.set('_trackPosition', `
                width: ${rightHandleOffset - leftHandleOffset}%;
                left: ${leftHandleOffset}%;`);
        }
        else {
            const leftHandleOffset = this.transformPercentage(value);
            this.data.set('_trackPosition', `width: ${leftHandleOffset}%;`);
        }
    }

    /**
     * 处理边界情况，左手柄不能超过右手柄，右手柄不能超过左手柄
     * @param value value 值
     * @param isRightHandle 是否是右手柄
     * @returns 格式化后的值
     */
    formatBoundary(value: number, isRightHandle: boolean = false) {
        if (isRightHandle) {
            const leftHandleValue = this.data.get('leftHandleValue');
            return Math.max(value, leftHandleValue);
        }

        const rightHandleValue = this.data.get('range') ? this.data.get('value')[1] : this.data.get('max');
        return Math.min(value, rightHandleValue);

    }
    /**
     * 处理拖拽手柄行为，对应更新 value 值
     * @param event TouchEvent | MouseEvent
     */
    handleMove(event: TouchEvent | MouseEvent) {
        event.preventDefault();
        if (event.changedTouches && event.changedTouches.length !== 1
            || this.startHandleValue === null || this.data.get('disabled')) {
            return;
        }
        this.dragging = true;
        const currentX = (event as TouchEvent).touches?.[0]?.clientX || (event as MouseEvent).clientX;
        const {min, max} = this.data.get();

        // 获得触摸实时偏移距离
        const deltaX = currentX - this.startX;

        // 获得触摸方向
        const direction = deltaX > 0 ? Position.RIGHT : Position.LEFT;

        const valueChange = this.transformValue(deltaX);

        const newValue = direction === Position.RIGHT
            ? Math.min(this.startHandleValue + valueChange, max)
            : Math.max(this.startHandleValue - valueChange, min);

        if (this.isRightHandle) {
            this.data.set('_rightOpen', true);
            this.data.set('value[1]', this.formatBoundary(newValue, true));
        }
        else {
            this.data.set('_open', true);
            this.updatedLeftHandleValue(this.formatBoundary(newValue));
        }
    }

    handleClick(event: Event) {
        if (this.data.get('disabled')) {
            return;
        }
        const railRect = this.ref('rail')?.getBoundingClientRect();
        const newValue = this.transformValue(event.clientX - railRect.left);
        const value = this.data.get('value');
        const [leftVal, rightVal] = Array.isArray(value) ? value : [value, value];
        const isLeftCloser = Math.abs(newValue - leftVal) < Math.abs(newValue - rightVal);

        if (isLeftCloser || !this.data.get('range')) {
            const newLeftVal = this.formatBoundary(newValue);
            newLeftVal !== leftVal && (this.updatedLeftHandleValue(newLeftVal),
            this.fire<SliderEvents['change-complete']>('change-complete', {value: this.data.get('value')}));
        }
        else {
            const newRightVal = this.formatBoundary(newValue, true);
            newRightVal !== rightVal && (this.data.set('value[1]', newRightVal),
            this.fire<SliderEvents['change-complete']>('change-complete', {value: this.data.get('value')}));
        }
    }
}