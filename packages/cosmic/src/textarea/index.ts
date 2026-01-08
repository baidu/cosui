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
 * @file Textarea
 */

import {Component} from 'san';
import type {TextareaProps, TextareaEvents, TextareaData} from './interface';
import calcTextareaHeight from './calc-textarea-height';
import {isIOS, isAndroid, isBaiduBox} from '../util';

export default class Textarea extends Component<TextareaData> {

    static template = `
        <div
            style="{{height ? 'height:' + height + 'px;' : ''}}"
            class="cos-textarea cos-flex cos-flex-col cos-space-p-sm cos-textarea-{{appearance}}{{
                disabled ? ' cos-disabled' : ''}}{{_bottomSuffixSlot ? ' cos-space-pr-xxs cos-space-pb-xxs' : ''}}"
        >
            <div s-ref="title">
                <slot name="title"></slot>
            </div>
            <textarea
                s-ref="textarea"
                class="cos-textarea-box"
                value="{{value}}"
                rows="{{rows}}"
                placeholder="{{placeholder}}"
                disabled="{{disabled}}"
                minlength="{{minlength}}"
                on-blur="handleBlur"
                on-focus="handleFocus"
                on-input="handleInput"
                on-change="handleChange"
                on-click="handleClick"
                on-keydown="handleKeyDown($event)"
                on-compositionstart="handleCompositionstart"
                on-compositionend="handleCompositionend"
            >
            </textarea>
            <div
                s-if="clear || count || _bottomSuffixSlot"
                s-ref="bottom"
                class="cos-textarea-bottom cos-flex cos-flex-row cos-items-center"
            >
                <div s-if="count" class="cos-textarea-count cos-shrink-0 cos-color-text-minor{{
                    clear || _bottomSuffixSlot ? ' cos-space-mr-md' : ''}}"
                >
                    {{value.length}}/{{maxlength}}
                </div>
                <div
                    s-if="clear"
                    class="cos-textarea-clear cos-shrink-0 cos-color-text{{
                        _bottomSuffixSlot ? ' cos-space-mr-md' : ''}}"
                    on-click="handleClearClick"
                >清空</div>
                <slot name="bottomSuffix"/>
            </div>
        </div>
    `;

    timer: null | ReturnType<typeof setTimeout>;
    focus: boolean;
    innerHeight: number;
    scrollTimeout: null | ReturnType<typeof setTimeout>;
    isComposing: boolean;

    initData(): TextareaProps {
        return {
            value: '',
            placeholder: '',
            appearance: 'outline',
            height: undefined,
            disabled: false,
            rows: 2,
            maxlength: undefined,
            minlength: undefined,
            clear: false,
            count: false,
            maxHeight: undefined,
            _initialHeight: undefined,
            _bottomSuffixSlot: !!(this as any).sourceSlots.named.bottomSuffix
        };
    }

    created() {
        this.focus = false;
        this.innerHeight = window.innerHeight;
        this.isComposing = false;
    }

    attached() {
        const maxHeight = this.data.get('maxHeight');

        // 设置了最大高度时，监听输入值的变化实现高度自适应
        if (maxHeight) {
            this.watch('value', () => this.resizeTextarea());
        }
    }

    detached() {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
    }

    resizeTextarea() {
        const {maxHeight, height, _initialHeight} = this.data.get();
        const textarea = this.ref('textarea') as unknown as HTMLTextAreaElement;
        const title = this.ref('title') as unknown as HTMLElement;
        const bottom = this.ref('bottom') as unknown as HTMLElement;

        // height在不断更新值，这里需要记录下初始高度
        if (!_initialHeight) {
            this.data.set('_initialHeight', height || (this.el as HTMLElement)?.offsetHeight);
        }
        const textAreaHeight = calcTextareaHeight({
            value: textarea.value || '',
            maxHeight: maxHeight as number,
            initialHeight: this.data.get('_initialHeight'),
            extraHeight: (title?.offsetHeight || 0) + (bottom?.offsetHeight || 0),
            style: getComputedStyle(textarea)
        });
        this.data.set('height', textAreaHeight);
    }

    /**
     * 新增处理键盘事件
     * @param event 键盘事件
     */
    handleKeyDown(event: KeyboardEvent) {
        this.fire<TextareaEvents['keydown']>('keydown', {event});
    }

    /**
     * 兼容 ios 上输入后，清空输入框时多行 placeholder 只显示一行的问题
     * @param element textarea
     * @param value 输入值
     */
    resetPlaceholder(element: HTMLTextAreaElement, value: string | undefined) {
        const placeholder = this.data.get('placeholder');
        if (!isIOS || value || !placeholder || !element?.placeholder) {
            return;
        }
        // 强制浏览器重新处理该元素的渲染状态，修复显示异常
        element.placeholder = placeholder;
    }

    limitValueLength = (value: string) => {
        const maxlength = this.data.get('maxlength');
        if (maxlength && value.length > maxlength) {
            const textareaRef = this.ref('textarea') as unknown as HTMLTextAreaElement;
            const selectionEnd = textareaRef.selectionEnd;
            if (selectionEnd) {
                const valueArr = [...value];
                const exceededLength = valueArr.length - maxlength;
                valueArr.splice(selectionEnd - exceededLength, exceededLength);
                return valueArr.join('');
            }
            return value.slice(0, maxlength);
        }
        return value;
    };

    updateInputValue(value: string) {
        // 低版本ios（如15.4）中textarea原生属性maxlength对换行符的计数不准确，会导致实际输入与字数统计不一致问题
        // 这里统一采用js来限制输入长度
        let limitedValue = this.limitValueLength(value);
        const textareaRef = this.ref('textarea') as unknown as HTMLTextAreaElement;
        let {selectionStart, selectionEnd} = textareaRef;
        textareaRef.value = limitedValue || '';

        const limitDiffLen = value.length - limitedValue.length;
        if (limitDiffLen) {
            selectionStart -= limitDiffLen;
            selectionEnd -= limitDiffLen;
        }

        textareaRef.setSelectionRange(
            Math.min(selectionStart, limitedValue.length),
            Math.min(selectionEnd, limitedValue.length),
        );
        this.data.set('value', limitedValue);

        return limitedValue;
    }

    handleInput(event: InputEvent) {
        if (!event || !event.target) {
            return;
        }
        let originalValue = (event.target as HTMLTextAreaElement).value;
        let value = originalValue;
        // 在输入法输入的场景，value算是临时值，不做长度校验，这一点和原生maxlength保持一致
        if (!this.isComposing) {
            value = this.updateInputValue(value);
        }
        // Compositionend中派发的事件，若未过长，则不触发input，因为input已触发过一次
        if (event.isTrusted || originalValue !== value) {
            this.fire<TextareaEvents['input']>('input', {event, value});
        }
        this.resetPlaceholder(event.target as HTMLTextAreaElement, value);
    }

    handleChange(event: Event) {
        const value = this.data.get('value');
        this.fire<TextareaEvents['change']>('change', {event, value});
    }

    handleBlur(event: Event) {
        this.focus = false;
        this.fire<TextareaEvents['blur']>('blur', {event});
    }

    scrollIntoView() {
        this.scrollTimeout && clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
        const textarea = this.ref('textarea') as unknown as HTMLTextAreaElement;
        if (!textarea) {
            return;
        }

        // 300ms 的延迟，确保软键盘已经弹起
        this.scrollTimeout = setTimeout(() => {
            const bounding = textarea.getBoundingClientRect();

            /**
             * 判断当前元素是否在可视区
             * 元素聚焦，并且窗口变小，说明软键盘弹起，需要滚动到可视区
             */
            if ((bounding.top >= 0 && bounding.bottom <= window.innerHeight)
                    || !this.focus || window.innerHeight >= this.innerHeight) {
                return;
            }

            textarea.scrollIntoView({behavior: 'instant', block: 'center'});
        }, 300);
    }

    // 不触发 focus 事件
    handleFocus(event: Event) {
        this.focus = true;
        this.fire<TextareaEvents['focus']>('focus', {event});
    }

    // 修复安卓存在端外浏览器点击输入框，软键盘弹起，导致输入框被遮挡的问题
    handleClick() {
        if (isBaiduBox || !isAndroid) {
            return;
        }
        this.scrollIntoView();
    }

    handleClearClick(event: Event) {
        this.data.set('value', '');
        const {_initialHeight, maxHeight, height} = this.data.get();

        // 针对设置了最大高度的情况，清空时需还原到初始高度
        if (maxHeight && _initialHeight && _initialHeight !== height) {
            this.data.set('height', _initialHeight);
        }
        (this.ref('textarea') as unknown as HTMLInputElement).focus();
        this.fire<TextareaEvents['clear']>('clear', {event});

        // 在 iOS 上 value 的更新不会立即引起视图刷新，这里延迟 10ms 确保视图刷新后重置 placeholder
        if (!isIOS) {
            return;
        }
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.resetPlaceholder(this.ref('textarea') as unknown as HTMLTextAreaElement, '');
        }, 10);
    }

    handleCompositionstart() {
        this.isComposing = true;
    }

    handleCompositionend(event: Event) {
        this.isComposing = false;

        // 由于Compositionend触发时机晚于input，导致输入法输入的最终结果未被input事件正确处理
        // 这里派发一次input事件
        event.target?.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            composed: true
        }));
    }
}
