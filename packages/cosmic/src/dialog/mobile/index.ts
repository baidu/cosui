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
 * @file dialog 组件
 */

import {Component} from 'san';
import Icon from '@cosui/cosmic/icon';
import {DialogData, DialogEvents, DialogProps} from '../interface';
import {Position, lockScroll} from '../../util';

export default class Dialog extends Component<DialogData> {
    static template = `
        <div
            s-if="open"
            class="cos-dialog{{headless ? ' cos-dialog-headless' : ''}}{{
                alignVertical ? ' cos-dialog-align-vertical' : ''}}">
            <div class="cos-dialog-mask" on-touchmove="handleTouchmove"></div>
            <div class="cos-dialog-container">
                <div
                    s-if="!headless && title"
                    class="cos-dialog-header"
                    on-touchmove="handleTouchmove">{{ title }}</div>
                <div
                    s-elif="!headless && !title"
                    on-touchmove="handleTouchmove">
                    <slot name="title"/>
                </div>
                <div
                    s-ref="cos-dialog-body"
                    on-touchstart="handleContainerTouchstart"
                    on-touchmove="handleContainerTouchmove"
                    class="cos-dialog-body">
                    <slot/>
                </div>
                <div
                    s-if="!footless"
                    class="cos-dialog-footer"
                    on-touchmove="handleTouchmove">
                    <div class="cos-divider" />
                    <div class="cos-dialog-operate-button">
                        <button
                            s-if="showCancelText"
                            on-click="handleCancel"
                            class="cos-dialog-cancel">
                            {{ cancelText }}
                        </button>
                        <div
                            s-if="{{showCancelText && showOkText}}"
                            class="{{alignVertical ? 'cos-divider' : 'cos-divider-vertical'}}"/>
                        <button
                            s-if="showOkText"
                            on-click="handleOk"
                            class="cos-dialog-ok">
                            {{ okText }}
                        </button>
                        <div
                            s-if="{{(okText || cancelText) && customBehaviorText}}"
                            class="{{alignVertical ? 'cos-divider' : 'cos-divider-vertical'}}"/>
                        <button
                            s-if="showCustomBehaviorText"
                            class="cos-dialog-custom-behavior"
                            on-click="handleCustomBehavior">
                            {{ customBehaviorText }}
                        </button>
                    </div>
                </div>
                <div
                    s-if="closable"
                    class="cos-dialog-close"
                    on-touchmove="handleTouchmove"
                    on-click="handleClose">
                    <cos-icon name="close"/>
                </div>
            </div>
        </div>
    `;

    static components = {
        'cos-icon': Icon
    };

    static computed = {
        alignVertical(this: Dialog) {
            return this.data.get('showOkText')
                && this.data.get('showCancelText')
                && this.data.get('showCustomBehaviorText');
        },
        showOkText(this: Dialog) {
            const okText = this.data.get('okText');
            return okText && typeof okText === 'string';
        },
        showCancelText(this: Dialog) {
            const cancelText = this.data.get('cancelText');
            return cancelText && typeof cancelText === 'string';
        },
        showCustomBehaviorText(this: Dialog) {
            const customBehaviorText = this.data.get('customBehaviorText');
            return customBehaviorText && typeof customBehaviorText === 'string';
        }
    };

    touchstartY: number;
    initData(): DialogProps {
        return {
            open: false,
            title: '标题',
            okText: '确认',
            cancelText: '取消',
            customBehaviorText: '',
            closable: false,
            headless: false,
            footless: false
        };
    }

    inited(): void {
        this.touchstartY = 0;
    }

    handleTouchmove(e: Event) {
        e.stopPropagation();
        e.preventDefault();
    }

    handleContainerTouchstart(e: TouchEvent) {
        // 多根手指触摸屏幕时，不处理
        if (e.changedTouches.length !== 1) {
            return;
        }
        this.touchstartY = e.touches[0].clientY;
    }

    handleContainerTouchmove(e: TouchEvent) {
        if (e.changedTouches.length !== 1) {
            e.preventDefault();
            return;
        }
        const currentY = e.touches[0].clientY;
        const el = this.ref('cos-dialog-body') as unknown as HTMLElement;
        let direction = currentY - this.touchstartY > 0
            ? Position.BOTTOM
            : Position.TOP;
        lockScroll(e, el, direction);
    }

    handleClose(e: Event) {
        this.data.set('open', false);
        this.fire<DialogEvents['close']>('close', {event: e});
    }

    handleOk(e: Event) {
        this.fire<DialogEvents['ok']>('ok', {event: e});
    }

    handleCancel(e: Event) {
        this.fire<DialogEvents['cancel']>('cancel', {event: e});
    }

    handleCustomBehavior(e: Event) {
        this.fire<DialogEvents['customBehavior']>('customBehavior', {event: e});
    }
}