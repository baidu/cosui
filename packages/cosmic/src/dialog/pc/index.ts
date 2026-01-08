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
import Button from '@cosui/cosmic/button';
import {DialogData, HeaderIcon} from '../interface';

export default class Dialog extends Component<DialogData> {
    static template = `
        <div
            s-if="open"
            class="cos-dialog{{appearance ? ' cos-dialog-' + appearance : ''}}{{
                headless ? ' cos-dialog-headless' : ''}}"
            on-click="handleClick">
            <div
                class="cos-dialog-mask"
                on-click="handleMask">
            </div>
            <div
                class="cos-dialog-container">
                <div
                    s-if="!headless"
                    class="cos-dialog-header">
                    <cos-icon
                        s-if="appearance"
                        name="{{appearance | appearanceIcon}}"
                        class="cos-dialog-header-icon"/>
                    <div class="cos-dialog-title">{{ title }}</div>
                    <div
                        s-if="closable"
                        name="close"
                        class="cos-dialog-close"
                        on-click="handleClose">
                        <cos-icon name="close" />
                    </div>
                </div>
                <div s-elif="!headless && !title">
                    <slot name="title"/>
                </div>
                <div class="cos-dialog-body" s-ref="cos-dialog-body">
                    <slot/>
                </div>
                <div s-if="!footless" class="cos-dialog-footer">
                    <cos-button
                        s-if="showCancelText"
                        class="cos-dialog-cancel"
                        appearance="secondary"
                        on-click="handleCancel">
                        {{ cancelText }}
                    </cos-button>
                    <cos-button
                        s-if="showOkText"
                        class="cos-dialog-ok"
                        on-click="handleOk">
                        {{ okText }}
                    </cos-button>
                    <cos-button
                        s-if="showCustomBehaviorText"
                        class="cos-dialog-custom-behavior"
                        on-click="handleCustomBehavior">
                        {{ customBehaviorText }}
                    </cos-button>
                </div>
            </div>
        </div>
    `;
    static components = {
        'cos-icon': Icon,
        'cos-button': Button
    };

    static filters = {
        appearanceIcon: (appearance: keyof typeof HeaderIcon) => {
            return appearance && HeaderIcon[appearance];
        }
    };

    static computed = {
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

    styleEl: HTMLElement | null;
    initData(): DialogData {
        return {
            open: false,
            title: '标题',
            okText: '确认',
            cancelText: '取消',
            customBehaviorText: '',
            outsideClosable: false,
            closable: false,
            headless: false,
            footless: false,
            appearance: null
        };
    }

    attached() {
        this.watch('open', value => {
            if (value) {
                this.styleEl = document.createElement('style');
                // bca-disable-line
                this.styleEl.innerHTML = `
                    html, body {
                        overflow-y: hidden;
                    }
                `;
                document.head.appendChild(this.styleEl);
            }
            else {
                this.styleEl?.parentNode?.removeChild?.(this.styleEl);
            }
        });
    }

    handleClick(e: Event) {
        e.stopPropagation();
        e.preventDefault();
    }
    handleMask(e: Event) {
        this.data.get('outsideClosable') && this.handleClose(e);
    }
    handleClose(e: Event) {
        this.data.set('open', false);
        this.fire('close', {event: e});
    }

    handleOk(e: Event) {
        this.fire('ok', {event: e});
    }

    handleCancel(e: Event) {
        this.fire('cancel', {event: e});
    }

    handleCustomBehavior(e: Event) {
        this.fire('customBehavior', {event: e});
    }
}