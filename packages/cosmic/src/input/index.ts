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
 * @file Input
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import type {InputProps, InputData, InputEvents} from './interface';
import {isAndroid, isBaiduBox} from '../util';
import {Animations} from '../util/animations';

const CLAMP_CLS = 'cos-line-clamp-1';

export default class Input extends Component<InputData> {

    static template = `
        <div class="cos-input cos-flex cos-{{size}} cos-input-{{appearance}}{{
            disabled ? ' cos-disabled' : ''}}{{
            appearance === 'filled' && _buttonSlot ? ' cos-input-space' : ''}}{{
            _focus ? ' cos-input-focus': ''}}"
        >
            <div
                s-if="_prefixSlot"
                class="cos-space-mr-sm cos-shrink-0"
            >
                <slot name="prefix"/>
            </div>
            <!-- ue要求slot距离右侧间距为固定值，因此这里需要div来定义slot样式 -->
            <div
                s-if="_titleSlot"
                class="cos-input-title-slot cos-space-mr-sm"
                on-click="handleTitleClick"
            >
                <slot name="title"></slot>
            </div>
            <div
                s-if="(placeholder || value) && (_titleSlot || _prefixSlot) && appearance === 'outline'"
                class="cos-divider-vertical cos-space-mr-sm cos-shrink-0 cos-input-divider"
                style="height: 18px;transform: none"
            />
            <input
                s-ref="input"
                type="{{type || 'input'}}"
                value="{=value=}"
                placeholder="{{placeholder}}"
                disabled="{{disabled}}"
                maxlength="{{maxlength}}"
                minlength="{{minlength}}"
                enterkeyhint="{{enterkeyhint}}"
                class="cos-input-box"
                on-blur="handleBlur"
                on-focus="handleFocus"
                on-input="handleInput"
                on-change="handleChange"
                on-click="handleClick"
                on-keyup="handleKeyUp"
                on-keydown="handleKeyDown"
            >
            <div
                s-if="clear && value && _focus"
                class="cos-input-clear cos-space-ml-md cos-color-text-tiny"
                on-click="handleClearClick"
                on-mousedown="handleMousedown"
                s-transition="getFadeTransition"
            >
                <cos-icon name="close-circle-fill"/>
            </div>
            <div s-if="count && maxlength" class="cos-input-count cos-space-ml-md cos-color-text-minor">
                {{value.length}}/{{maxlength}}
            </div>
            <div
                s-if="_buttonSlot"
                class="cos-input-button-slot cos-space-ml-md"
            >
                <slot name="button"></slot>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    innerHeight: number;
    scrollTimeout: null | ReturnType<typeof setTimeout>;

    initData(): InputProps {
        return {
            type: '',
            value: '',
            placeholder: '',
            size: 'lg',
            appearance: 'outline',
            disabled: false,
            clear: false,
            count: false,
            maxlength: undefined,
            minlength: undefined,
            enterkeyhint: '',
            _focus: false,
            _titleSlot: !!(this as any).sourceSlots.named.title,
            _buttonSlot: !!(this as any).sourceSlots.named.button,
            _prefixSlot: !!(this as any).sourceSlots.named.prefix
        };
    }

    created() {
        this.innerHeight = window.innerHeight;
    }

    detached() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
    }

    getFadeTransition() {
        return Animations.fade;
    }

    handleBlur(event: Event) {
        this.data.set('_focus', false);

        // 失焦时，输入框内容自动回到首位，且展示截断样式
        this.data.get('value') && (this.ref('input') as unknown as HTMLInputElement).classList.add(CLAMP_CLS);
        this.fire<InputEvents['blur']>('blur', {event});
    }

    handleFocus(event: Event) {
        this.data.set('_focus', true);
        const input = (this.ref('input') as unknown as HTMLInputElement);
        input.classList.contains(CLAMP_CLS) && input.classList.remove(CLAMP_CLS);
        const length = (this.data.get('value') + '').length;

        // 聚焦，光标移至最后
        this.nextTick(() => {
            input.setSelectionRange(length, length);
            input.scrollLeft = input.scrollWidth;
        });
        this.fire<InputEvents['focus']>('focus', {event});
    }

    scrollIntoView() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
        const input = this.ref('input') as unknown as HTMLInputElement;
        if (!input) {
            return;
        }

        // 300ms 的延迟，确保软键盘已经弹起
        this.scrollTimeout = setTimeout(() => {
            const bounding = input.getBoundingClientRect();

            /**
             * 判断当前元素是否在可视区
             * 元素聚焦，并且窗口变小，说明软键盘弹起，需要滚动到可视区
             */
            if ((bounding.top >= 0 && bounding.bottom <= window.innerHeight)
                    || !this.data.get('_focus') || window.innerHeight >= this.innerHeight) {
                return;
            }

            input.scrollIntoView({behavior: 'instant', block: 'center'});
        }, 300);
    }

    // 修复安卓存在端外浏览器点击输入框，软键盘弹起，导致输入框被遮挡的问题
    handleClick() {
        if (isBaiduBox || !isAndroid) {
            return;
        }
        this.scrollIntoView();
    }

    handleInput(event: Event) {
        const value = this.data.get('value');
        this.fire<InputEvents['input']>('input', {event, value});
    }

    handleChange(event: Event) {
        const value = this.data.get('value');
        this.fire<InputEvents['change']>('change', {event, value});
    }

    handleClearClick(event: Event) {
        this.data.set('value', '');
        (this.ref('input') as unknown as HTMLInputElement).focus();
        this.fire<InputEvents['clear']>('clear', {event});
    }

    handleMousedown(event: Event) {

        // 点击清空按钮时，不触发input blur
        event.preventDefault();
    }

    handleTitleClick() {
        (this.ref('input') as unknown as HTMLInputElement).focus();
    }

    handleKeyUp(event: Event) {
        this.fire<InputEvents['keyup']>('keyup', {event});
    }

    handleKeyDown(event: Event) {
        this.fire<InputEvents['keydown']>('keydown', {event});
    }
}
